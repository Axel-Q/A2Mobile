/**
 * This file is used to initialize the firebase app and export the firestore database.
 * The firebaseConfig object contains the configuration settings for the firebase app.
 */

import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_apiKey,
    authDomain: process.env.EXPO_PUBLIC_authDomain,
    projectId: process.env.EXPO_PUBLIC_projectId,
    storageBucket: process.env.EXPO_PUBLIC_storageBucket,
    messagingSenderId: process.env.EXPO_PUBLIC_messagingSenderId,
    appId: process.env.EXPO_PUBLIC_appId
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);