import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

const db = firestore()

const CreateFacility = async (name, location, maximum, info, opening, closing) => {
    try {
        const temp = await db.collection('Reservation').where("name", "==", name).get()
        if (!temp.empty) throw new Error('Exist')

        await db.collection('Reservation').doc().set({
            name: name,
            location: location,
            maximum: maximum,
            info: info,
            opening: opening,
            closing: closing
        }, { merge: true })

        return true
    } catch {
        return false
    }
}

const UpdateFacility = async (type, name, location, maximum, info, opening, closing) => {
    try {
        const temp = await db.collection('Reservation').where("name", "==", name)
            .where(firestore.FieldPath.documentId(), '!=', type).get()
        if (!temp.empty) throw new Error('Exist')

        await db.collection('Reservation').doc(type).update({
            name: name,
            location: location,
            maximum: maximum,
            info: info,
            opening: opening,
            closing: closing
        })

        return true
    } catch {
        return false
    }
}

const RemoveFacility = async (type) => {
    try {
        await db.collection('Reservation').doc(type).delete()

        return true
    } catch {
        return false
    }
}

const AdminReservationInquiry = (type, day) => {  //  ('gym', '20211101')
    const [reservation, setReservation] = useState(null)
    const dbRef = db.collection('Reservation').doc(type)

    useEffect(() => {
        if (day === undefined) return
        const subscriber = dbRef.collection(day).onSnapshot(async (documentSnapshot) => {
            try {
                const temp = []

                for (const doc of documentSnapshot.docs) {
                    const users = doc.data()['users']
                    const rawUsersInfo = await Promise.all(users.map((el) => {
                        try {
                            return el.get()
                        } catch {
                            return false
                        }
                    }))
                    const usersInfo = rawUsersInfo.filter(el => el).map(el => el.data())
                    temp.push({ time: doc.id, num: users.length, users: usersInfo })
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

export {
    CreateFacility,
    UpdateFacility,
    RemoveFacility,
    AdminReservationInquiry,
}