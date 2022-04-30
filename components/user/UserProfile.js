import { setUserId } from "firebase/analytics";
import { updateProfile } from "firebase/auth";
import Confetti from 'react-confetti'
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { db } from "../../src/config/firebase.config";
import { useUserAuth } from "../../src/context/UserAuthContext";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import { useTimeout, useWindowSize } from "react-use";

const UserProfile = () => {
  const { user } = useUserAuth();
  const router = useRouter();
  // console.log(user)
  const [error, setError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const { width, height } = useWindowSize()
  const [isComplete] = useTimeout(4000);

  const [id, setId] = useState();
  const [profileUpdate, setProfileUpdate] = useState({
    displayName: "",
    phoneNumber: "",
  });
  let name, value;
  const registerInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setProfileUpdate({ ...profileUpdate, [name]: value });
  };

  // const getData = async (e) => {
  //   // console.log(item.id)
  //   const { displayName, uid } = user;
  //   // console.log(uid)
  //   // try {
  //   //   // const q = query(collection(db, "users"), where("uid", "==", `${uid}`));
  //   //   // const querySnapshot = await getDocs(q);
  //   //   // querySnapshot.forEach((doc) => {
  //   //   //   // doc.data() is never undefined for query doc snapshots
  //   //   //   console.log(doc.id, " => ", doc.data());
  //   //   // });
  //   //   console.log(phoneNumber)
  //   // } catch (error) {
  //   //   console.log(error);
  //   // }
  //   setProfileUpdate({
  //     ...profileUpdate,
  //     displayName,
  //   });
  // };
  const celebrate = (width,height) => {
    return(
      <Confetti
      width={width}
      height={height}
      recycle={!isComplete()}
    />
    )
  }

  const getData = async () => {
    const { displayName, uid } = user;
    const q = query(collection(db, "users"), where("uid", "==", `${uid}`));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      setId(doc.id);
      setPhoneNumber(doc.data().phoneNumber);
      // console.log(doc.data().phoneNumber)
    });

    // console.log(phoneNumber);
    setProfileUpdate({
      ...profileUpdate,
      displayName,
      phoneNumber,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { displayName, phoneNumber } = profileUpdate;

      const docRef = doc(db, "users", id);
      // const docDoc = query(docRef, where("uid", "==", `${uid}`));
      await updateProfile(user, {
        displayName,
      });
      await updateDoc(docRef, {
        displayName,
        phoneNumber,
      });
      toast.success("Profile updated successfully");
      celebrate(width,height);
    } catch (err) {
      setError(err.message);
    }
  };

  

  useEffect(() => {
    getData();
    // console.log("useEffect")
    // console.log(productDetails);
  }, []);
  return (
    <>
      <section className="flex flex-col md:flex-row  items-center">
        <div className="w-full h-100">
          <div className="">
            <div className="mt-10">
              <Link href="/">
                <a className="flex group w-20 text-blue-500 hover:text-blue-700 font-semibold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 group-hover:animate-pulse"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 16l-4-4m0 0l4-4m-4 4h18"
                    />
                  </svg>
                  <span className="px-2">Home</span>
                </a>
              </Link>
            </div>
            {error && (
              <div
                className="bg-red-100 rounded-lg py-5 px-6 text-base text-red-700 mb-3"
                role="alert"
              >
                {error}
              </div>
            )}
            <form
              action="#"
              className="mt-6"
              method="POST"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="block text-gray-700">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  autoFocus
                  name="displayName"
                  // autoComplete="true"
                  value={profileUpdate.displayName}
                  //   required
                  onChange={registerInputs}
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Phone Number</label>
                <input
                  type="number"
                  placeholder="Enter Phone Number"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  // autoFocus
                  name="phoneNumber"
                  // autoComplete="true"
                  value={profileUpdate.phoneNumber}
                  //   required
                  onChange={registerInputs}
                />
              </div>
              <div className="mt-6 flex items-center space-x-6">
                <div className="shrink-0">
                  {/* <img
                          className="h-16 w-16 object-cover rounded-full"
                          src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
                          alt="Current profile photo"
                        /> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <label className="block">
                  <span className="sr-only">Choose profile image</span>
                  <input
                    type="file"
                    name="url"
                    // onChange={onFileChange}
                    // value={productDetails.url}
                    className="block w-full text-sm text-slate-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-violet-50 file:text-violet-700
                                    hover:file:bg-violet-100 cursor-pointer
                                    "
                  />
                </label>
              </div>
              <button
                type="submit"
                className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </section>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default UserProfile;
