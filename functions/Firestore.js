import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

const db = firestore()

const IsAdmin = (uid) => {
    const [result, setResult] = useState(null)

    const getData = async () => {
        try {
            const data = await db.collection('Users').doc(uid).get()
            setResult(data.data()['admin'] ?? null)
        } catch {
            setResult(null)
        }
    }

    useEffect(() => {
        getData()
    }, [uid])

    return result
}

const GetInfo = (type) => {
    const [info, setInfo] = useState(null)
    const getData = async () => {
        try {
            const data = await db.collection('Info').doc(type).get()
            setInfo(data.data())
        } catch {
            setInfo(null)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return info
}

const GetFacilityList = () => {
    const [list, setList] = useState(null)
    const getData = async () => {
        try {
            const collection = await db.collection('Reservation').get()
            const temp = []

            for (const doc of collection.docs) {
                const data = doc.data()
                temp.push({ type: doc.id, location: data['location'], opening: data['opening'], closing: data['closing'] })
            }
            setList(temp)
        } catch {
            setList(null)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return list
}

const GetHistory = (uid) => {
    const [history, setHistory] = useState(null)
    const getData = async () => {
        try {
            const collection = await db.collection('Users').doc(uid).collection('history').get()
            const temp = []

            for (const doc of collection.docs) {
                const data = doc.data()
                temp.push({ day: doc.id, time: data['time'], type: data['type'] })
            }
            setHistory(temp)
        } catch {
            setHistory(null)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return history
}

const ReservationInquiry = (type, day) => {  //  ('gym', '20211101')
    const [reservation, setReservation] = useState(null)
    const dbRef = db.collection('Reservation').doc(type)

    useEffect(() => {
        const subscriber = dbRef.collection(day).onSnapshot(async (documentSnapshot) => {
            try {
                const info = (await dbRef.get()).data()
                const temp = [{ opening: info['opening'], closing: info['closing'], maximum: info['maximum'] }]

                for (const doc of documentSnapshot.docs) {
                    temp.push({ time: doc.id, num: doc.data()['users'].length })
                }
                setReservation(temp)
            } catch {
                setReservation(null)
            }
        });

        return () => subscriber();
    }, [])

    return reservation
}

const ReservationRegister = (type, day, time, uid) => { // ('gym', '20211101', ['0800', '0900'], user.uid)
    const [result, setResult] = useState(false)
    const dbRef = db.collection('Reservation').doc(type)

    const setData = async () => {
        try{
            await db.runTransaction(async (tran) => {
                const maximum = (await tran.get(dbRef)).data()['maximum']
                const users = await Promise.all(time.map((el) => {
                    return tran.get(dbRef.collection(day).doc(el))
                }))
                
                for (const [i, t] of time.entries()) {
                    const timeRef = dbRef.collection(day).doc(t)
                    if (users[i].data() && users[i].data()['users'].length >= maximum) {
                        throw new Error('Exceeded')
                    }
                    tran.set(
                        timeRef,
                        { users: firestore.FieldValue.arrayUnion(db.doc(`Users/${uid}`)) }, { merge: true }
                    )
                }
                tran.set(
                    db.collection('Users').doc(uid).collection('history').doc(day),
                    { type: type, time: time }, { merge: true }
                )
            })
            setResult(true)
        } catch(e) {
            setResult(false)
        }
    }

    useEffect(() => {
        setData()
    }, [])

    return result
}

const ReservationCancel = (type, day, time, uid) => { // ('gym', '20211101', ['0800', '0900'], user.uid)
    const [result, setResult] = useState(false)
    const resRef = db.collection('Reservation').doc(type).collection(day)
    const userRef = db.collection('Users').doc(uid)

    const deleteData = async () => {
        try{
            await db.runTransaction(async (tran) => {
                for (const t of time) {
                    const temp = await tran.get(resRef.doc(t))
                    const path = temp.data()['users'].map((el) => el.path)
                    if (!(path.includes(userRef.path)))
                        throw new Error('Not Exist')
                }
                
                for (const t of time) {
                    tran.update(resRef.doc(t), {
                        users: firestore.FieldValue.arrayRemove(userRef)
                    })
                }
                tran.delete(userRef.collection('history').doc(day))
            })
            setResult(true)
        } catch(e) {
            setResult(false)
        }
    }

    useEffect(() => {
        deleteData()
    }, [])

    return result
}

const GetCommunityList = (type, limit = null) => {
    const [post, setPost] = useState(null)
    const getData = async () => {
        try {
            const dbRef = db.collection('Community').doc(type).collection(type).orderBy('date', 'desc')
            if (limit) dbRef.limit(limit)
            const collection = await dbRef.get()
            const temp = []

            for (const doc of collection.docs) {
                temp.push(doc.data()['title'])
            }
            setPost(temp)
        } catch {
            setPost(null)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return post
}

const PostInCommunity = (type, title, contents, uid) => {  // ('gym', 'title', 'contents', user.uid)
    const [result, setResult] = useState(false)
    const batch = db.batch()

    const setData = async () => {
        try{
            const commRef = db.collection('Community').doc(type).collection(type).doc()
            const now = firestore.FieldValue.serverTimestamp()
            batch.set(commRef, {
                title: title,
                contents: contents,
                writer: db.doc(`Users/${uid}`),
                date: now
            }, { merge: true })

            batch.set(db.collection('Users').doc(uid).collection('community').doc(), {
                type: type,
                postRef: db.doc(commRef.path)
            }, { merge: true })

            await batch.commit()
            setResult(true)
        } catch(e) {
            setResult(false)
        }
    }

    useEffect(() => {
        setData()
    }, [])

    return result
}

export {
    IsAdmin,
    GetInfo,
    GetFacilityList,
    GetHistory,
    ReservationInquiry,
    ReservationRegister,
    ReservationCancel,
    GetCommunityList,
    PostInCommunity
}