import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyA-mBfOsIU-C1aWp38OV8lyGI8-Lk9D9U8",
    authDomain: "crown-db-d8b88.firebaseapp.com",
    projectId: "crown-db-d8b88",
    storageBucket: "crown-db-d8b88.appspot.com",
    messagingSenderId: "14817258924",
    appId: "1:14817258924:web:d507198a4d8ab2ddc91e09",
    measurementId: "G-R5QMYNS7K5"
};

export const createUserProfileDocument = async (userAuth, additionalData) =>{
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log("error creating user", error.message);
        }
    }
    return userRef;
}

firebase.initializeApp(config)

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
