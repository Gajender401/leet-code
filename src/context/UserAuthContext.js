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
import { doc, setDoc, getDoc } from "firebase/firestore";


const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState();
  const [userData, setuserData] = useState()
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentuser) => {
      setUser(currentuser);
      if (currentuser) {
        const userId = currentuser.uid
          const userRef = doc(db, "users", userId);
          const userSnap = await getDoc(userRef);
          if (!userSnap.exists()) {
            await setDoc(doc(db, "users", userId), {
              uid: currentuser.uid,
              email: currentuser.email,
              createdAt: Date.now(),
              updatedAt: Date.now(),
              likedProblems: [],
              dislikedProblems: [],
              solvedProblems: [],
              starredProblems: [],
            });
          }
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
    return sendPasswordResetEmail(auth, email)
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