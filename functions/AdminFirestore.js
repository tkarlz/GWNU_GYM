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

export {
    CreateFacility,
    UpdateFacility,
    RemoveFacility,
}