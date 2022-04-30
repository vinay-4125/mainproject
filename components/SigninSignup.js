import React from 'react'
import { useRouter } from "next/router";

const SigninSignup = () => {
    const router = useRouter();
  return (
    <>
        <button
              onClick={() => router.push("/login")}
              className="inline-flex items-center justify-center px-4 py-2 text-base leading-6 bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg hover:shadow-lg whitespace-nowrap shadow-md"
            >
              Signin
            </button>
            <button
              onClick={() => router.push("/signup")}
              className="inline-flex items-center justify-center px-4 py-2 text-base leading-6 bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg hover:shadow-lg whitespace-nowrap shadow-md"
            >
              Signup
            </button>
    </>
  )
}

export default SigninSignup