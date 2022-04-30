import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
  confirmPasswordReset,
  // updatePhoneNumber,
} from "firebase/auth";
import { auth, db } from "../../src/config/firebase.config";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function signUp(email, password, displayName, phoneNumber) {
    const details = await createUserWithEmailAndPassword(auth, email, password);
    const data = details.user;
    console.log(phoneNumber);
    // console.log(details.user);
    let photoURL = `https://avatars.dicebear.com/api/initials/${displayName}.svg`;
    updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    }).then(() => {
      // console.log("displayname added")
    });
    // updatePhoneNumber(auth.currentUser, phoneNumber).then(() => {
    //   console.log("phoneNumber updated")
    // })
    try {
      // const querySnapshot = await getDocs(collection(db, "users"));
      // querySnapshot.forEach((doc)=>{
      //   if(doc.data().uid !== data.uid){
      //   }
      // })
      // const allUserData = [];
      // querySnapshot.forEach((doc) => {
      //   const obj = {
      //     id: doc.id,
      //     ...doc.data(),
      //   };
      //   allUserData.push(obj);
      // });
      // console.log(allUserData);
      // const que = allUserData.some((u) => u.uid === data.uid);
      // console.log(!que);

      // else{
      //   console.log("user added")
      addDoc(collection(db, "users"), {
        email: data.email,
        uid: data.uid,
        displayName: displayName,
        photoURL,
        phoneNumber,
        // orders: doc(db, "orders","h21VjyNTKzue2Kf5BnC1")
      });
      // }
    } catch (err) {
      console.log(err);
    }
  }
  function logOut() {
    return signOut(auth);
  }
  async function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    const details = await signInWithPopup(auth, googleAuthProvider);
    const data = details.user;
    console.log(data.user);
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const allUserData = [];
      querySnapshot.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        allUserData.push(obj);
      });
      console.log(allUserData);
      const que = allUserData.some((u) => u.uid === data.uid);
      console.log(que);
      if (que) {
        console.log("user exist");
      } else {
        addDoc(collection(db, "users"), {
          email: data.email,
          uid: data.uid,
          displayName: data.displayName,
          emailVerified: data.emailVerified,
          photoURL: data.photoURL
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  function forgotPassword(email) {
    return sendPasswordResetEmail(auth, email, {
      url: "http://localhost:3000/login",
    });
  }

  function resetPassword(oobCode, newPassword) {
    return confirmPasswordReset(auth, oobCode, newPassword);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      // console.log("Auth", currentuser);
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{
        user,
        logIn,
        signUp,
        logOut,
        googleSignIn,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
