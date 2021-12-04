import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

const db = firestore()

const CheckUserInfo = (uid) => {
    const [result, setResult] = useState(null)

    const getData = async () => {
        if (uid === undefined) return
        try {
            const user = await db.collection('Users').doc(uid).get()
            const data = user.data()
            setResult({
                isAdmin: data['admin'] ?? false,
                isBlankInfo: data['studentId'] ? false : true
            })
        } catch {
            setResult(null)
        }
    }

    useEffect(() => {
        getData()
    }, [uid])

    return result
}

const GetUserDetailInfo = (uid) => {
    const [info, setInfo] = useState(null)

    const getData = async () => {
        if (uid === undefined) return
        try {
            const data = await db.collection('Users').doc(uid).get()
            setInfo(data.data())
        } catch {
            setInfo(null)
        }
    }

    useEffect(() => {
        getData()
    }, [uid])

    return info
}

const UpdateUserDetailInfo = async (uid, department, studentId) => {
    try {
        await db.collection('Users').doc(uid).update({
            department: department,
            studentId: studentId
        })

        return true
    } catch {
        return false
    }
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

    useEffect(() => {
        const subscriber = db.collection('Reservation').onSnapshot(async (documentSnapshot) => {
            try {
                const temp = []

                for (const doc of documentSnapshot.docs) {
                    const data = doc.data()
                    temp.push({
                        type: doc.id,
                        name: data['name'],
                        location: data['location'],
                        opening: data['opening'],
                        closing: data['closing'],
                        info: data['info'],
                        maximum: data['maximum']
                    })
                }
                setList(temp)
            } catch {
                setList(null)
            }
        });

        return () => subscriber();
    }, [])

    return list
}

const GetHistory = (uid) => {
    const [history, setHistory] = useState(null)
    const dbRef = db.collection('Users').doc(uid).collection('history')

    useEffect(() => {
        if (uid === undefined) return
        const subscriber = dbRef.orderBy(firestore.FieldPath.documentId()).onSnapshot(async (documentSnapshot) => {
            try {
                const temp = []

                for (const doc of documentSnapshot.docs) {
                    const data = doc.data()
                    temp.unshift({ day: doc.id, time: data['time'], name: data['name'], type: data['type'] })
                }
                setHistory(temp)
            } catch {
                setHistory(null)
            }
        });

        return () => subscriber();
    }, [uid])

    return history
}

const ReservationInquiry = (type, day) => {  //  ('gym', '20211101')
    const [reservation, setReservation] = useState(null)
    const dbRef = db.collection('Reservation').doc(type)

    useEffect(() => {
        const subscriber = dbRef.collection(day).onSnapshot(async (documentSnapshot) => {
            try {
                const temp = []

                for (const doc of documentSnapshot.docs) {
                    temp.push({ time: doc.id, num: doc.data()['users'].length })
                }
                setReservation(temp)
            } catch {
                setReservation(null)
            }
        });

        return () => subscriber();
    }, [day])

    return reservation
}

const ReservationRegister = async (type, day, time, uid) => { // ('gym', '20211101', ['0800', '0900'], user.uid)
    const dbRef = db.collection('Reservation').doc(type)

    try {
        await db.runTransaction(async (tran) => {
            const data = (await tran.get(dbRef)).data()
            const users = await Promise.all(time.map((el) => {
                return tran.get(dbRef.collection(day).doc(el))
            }))

            for (const [i, t] of time.entries()) {
                const timeRef = dbRef.collection(day).doc(t)
                if (users[i].data() && users[i].data()['users'].length >= data['maximum']) {
                    throw new Error('Exceeded')
                }
                tran.set(
                    timeRef,
                    { users: firestore.FieldValue.arrayUnion(db.doc(`Users/${uid}`)) }, { merge: true }
                )
            }
            tran.set(
                db.collection('Users').doc(uid).collection('history').doc(day),
                { type: type, name: data['name'], time: time }, { merge: true }
            )
        })
        return true
    } catch {
        return false
    }
}

const ReservationCancel = async (type, day, time, uid) => { // ('gym', '20211101', ['0800', '0900'], user.uid)
    const resRef = db.collection('Reservation').doc(type).collection(day)
    const userRef = db.collection('Users').doc(uid)

    try {
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
        return true
    } catch {
        return false
    }
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
                const data = doc.data()
                temp.push({
                    title: data['title'],
                    postid: doc.id
                })
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

const GetCommunityContents = (type, postid) => {
    const [post, setPost] = useState(null)

    const getData = async () => {
        try {
            const data = await db.collection('Community').doc(type).collection(type).doc(postid).get()
            setPost(data.data())
        } catch {
            setPost(null)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return post
}

const PostInCommunity = async (type, title, contents, uid) => {  // ('gym', 'title', 'contents', user.uid)
    const batch = db.batch()

    try {
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

        return true
    } catch {
        return false
    }
}

export {
    CheckUserInfo,
    GetUserDetailInfo,
    UpdateUserDetailInfo,
    GetInfo,
    GetFacilityList,
    GetHistory,
    ReservationInquiry,
    ReservationRegister,
    ReservationCancel,
    GetCommunityList,
    GetCommunityContents,
    PostInCommunity
}