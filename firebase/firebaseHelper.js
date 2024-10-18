/**
 * This file contains the functions that interact with the Firebase Firestore database.
 * These functions are used to add, update, delete, and retrieve items from the database.
 * The functions use the Firebase SDK to interact with the Firestore database.
 * The functions are used in the application to manage the state of items (activities or diet entries).
 *
 * */

import {db} from './firebaseSetup';
import {collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where, onSnapshot} from 'firebase/firestore';


export function subscribeToCollection(collectionName, type, callback) {
    const q = query(collection(db, collectionName), where("type", "==", type));

    return onSnapshot(q, (querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
            items.push({...doc.data(), id: doc.id});
        });
        callback(items);
    }, (error) => {
        console.error("Error fetching documents: ", error);
        callback(null, error);
    });
}

export async function addItem(collectionName, item) {
    try {
        const docRef = await addDoc(collection(db, collectionName), item);
        // Return the item with its new ID
        return {...item, id: docRef.id};
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function updateItem(collectionName, item) {
    try {
        const docRef = doc(db, collectionName, item.id);
        await updateDoc(docRef, item);
    } catch (e) {
        console.error("Error updating document: ", e);
    }
}

export async function deleteItem(collectionName, item) {
    try {
        const docRef = doc(db, collectionName, item.id);
        await deleteDoc(docRef);
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
}





