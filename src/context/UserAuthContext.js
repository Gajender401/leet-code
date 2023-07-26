"use client"
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "firebase/auth";
import { auth } from "../lib/firebase";
import { db } from "../lib/firebase"
import { doc, onSnapshot, setDoc, getDoc } from "firebase/firestore";


const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState();
  const [userData, setuserData] = useState()
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async(currentuser) => {
      setUser(currentuser);
      console.log(currentuser);

      const docRef = doc(db, "users", currentuser.email, 'user-data', 'user-data' );
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        // setDoc
      }

      try {
        // snapshot user data
      } catch (error) {
        
      }


    });

    return () => {
      unsubscribe();
    };
  }, []);



  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }


  function signUp(email, password, name) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        try {
          sendEmailVerification(auth.currentUser);
          updateProfile(name)
        } catch (error) {
        }
      });
    return
  }

  function resetPassword(email) {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        // ..
      });
  }


  function googleOAuth() {

    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        setUser(user)

      }).catch((e) => {


      });
  }

  function updateProfile(name) {
    updateProfile(auth.currentUser, {
      displayName: name
    }).then(() => {
      // Profile updated!
      // ...
    }).catch((error) => {

      // ...
    });
  }

  function logOut() {
    return signOut(auth);
  }



  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut, resetPassword, googleOAuth, updateProfile, userData }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}