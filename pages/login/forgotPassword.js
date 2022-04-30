import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { useUserAuth } from '../../src/context/UserAuthContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { forgotPassword } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email)
      toast.success("Email sent for password reset")
    } catch (error) {
      toast.error(error.message);
      console.log(error.message)
    }
  }

  return (
    <>
      <section className="flex flex-col md:flex-row h-screen items-center">
        <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
          <div className="grid place-items-center h-screen">
            <Image
              src="/loginanimation.gif"
              alt=""
              height="700"
              width="700"
              className=""
              // src="https://source.unsplash.com/random"
              // className="w-full h-full object-cover"
              // height="745"
              // width="1070"
            />
          </div>
        </div>
        <div
          className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
          flex items-center justify-center"
        >
          <div className="w-full h-100">
          <div className="">
            <div>
              <Link href="/login">
                <a className="flex group text-blue-500 hover:text-blue-700 font-semibold">
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
                  <span className="px-2">Login Page</span>
                </a>
              </Link>
            </div>
            <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
              Forget Password
            </h1>
            {/* {error && (
              <div
                className="bg-red-100 rounded-lg py-5 px-6 text-base text-red-700 mb-3"
                role="alert"
              >
                {error}
              </div>
            )} */}
            <form
              action="#"
              className="mt-6"
              method="POST"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  autoFocus
                  autoComplete="true"
                  //   required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
              >
                Submit
              </button>
            </form>
            </div>
          </div>
        </div>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
      </section>
    </>
  )
}

export default ForgotPassword