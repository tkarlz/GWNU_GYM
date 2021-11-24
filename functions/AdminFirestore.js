import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

const db = firestore()

const CreateFacility = () => {
    const [result, setResult] = useState(null)

    const setData = async () => {
        try {
            // const data = await db.collection('Users').doc(uid).get()
            setResult(null)
        } catch {
            setResult(null)
        }
    }

    useEffect(() => {
        setData()
    }, [])

    return result
}

const RemoveFacility = async (type) => {
    try {
        await db.collection('Reservation').doc(type).delete()
        return true
    } catch {
        return false
    }
}

export {
    CreateFacility,
    RemoveFacility,
}