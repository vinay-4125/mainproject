import Image from "next/image";
import React from "react";
import { useUserAuth } from "../src/context/UserAuthContext";
import {useRouter } from "next/router"

const Account = () => {
    const Router = useRouter();
    const {logOut, user} = useUserAuth();
    const handleLogout = async()=>{
        try{
            await logOut();
            Router.push('/');
        }catch(err){
            console.log(err.message);
        }
    }
  return (
    <>
      <section className="flex flex-col md:flex-row h-screen items-center">
        <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
         <Image
            src="https://source.unsplash.com/random"
            // src={user.photoURL}
            alt=""
            className="w-full h-full object-cover"
            height="100"
            width="100"
          />
        </div>
        <div
          className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
          flex items-center justify-center"
        >
          <div className="w-full h-100">
            <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
              Hello, Welcome <br />
              {user && user.email} 
            </h1>
          </div>
            <br/>
          <button className="mt-8 p-2 rounded bg-blue-500 hover:bg-blue-700 hover:shadow-lg text-white" onClick={handleLogout}>Logout</button>
        </div>
      </section>
    </>
  );
};

export default Account;
