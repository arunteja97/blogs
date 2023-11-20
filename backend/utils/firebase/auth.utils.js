import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";

import { app } from "./firebase.utils.js";

const auth = getAuth();

export const createUser = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        
        const {user} = userCredential;
        return user
        
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        
    });
}

export const signOutUser = async () => {

    await signOut(auth);
}

export const signInUser = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const {user} = userCredential;
    return user
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage)
  });

}

onAuthStateChanged(auth, (user)=> {
    if(user) console.log(user.uid)
    else console.log("signedout")
});
