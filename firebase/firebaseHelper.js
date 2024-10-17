import {db} from './firebaseSetup';
import {collection, getDocs, addDoc, updateDoc, deleteDoc, doc} from 'firebase/firestore';


export async function getCollection(collectionName) {
    try {
        const snapshot = await getDocs(collection(db, collectionName));
        const items = [];
        snapshot.forEach((doc) => {
            items.push({ ...doc.data(), id: doc.id }); // Include the document ID
        });
        return items;
    } catch (e) {
        console.error("Error getting documents: ", e);
    }
}

export async function addItem(collectionName, item) {
    try {
        const docRef = await addDoc(collection(db, collectionName), item);
        // Return the item with its new ID
        return { ...item, id: docRef.id };
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



