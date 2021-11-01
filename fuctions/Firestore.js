import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

const db = firestore()

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

const ReservationInquiry = (type, day) => {  //  ('gym', '20211101')
    const [reservation, setReservation] = useState(null)
    const dbRef = db.collection('Reservation').doc(type)

    useEffect(() => {
        const subscriber = dbRef.collection(day).onSnapshot(async (documentSnapshot) => {
            try {
                const info = (await dbRef.get()).data()
                const temp = []

                for (const el of documentSnapshot.docs) {
                    temp.push({ time: el.id, num: el.data()['users'].length, max: info['maximum'] })
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
                    if (users[i].data()['users'].length >= maximum) {
                        throw new Error('Exceeded')
                    }
                    tran.set(
                        timeRef,
                        { users: firestore.FieldValue.arrayUnion(db.doc(`Users/${uid}`)) }, { merge: true }
                    )
                }
                tran.set(
                    db.collection('Users').doc(uid).collection('history').doc(day),
                    { time: time }, { merge: true }
                )
            })
            setResult(true)
        } catch {
            setResult(false)
        }
    }

    useEffect(() => {
        setData()
    }, [])

    return result
}

export {
    GetInfo,
    ReservationInquiry,
    ReservationRegister
}