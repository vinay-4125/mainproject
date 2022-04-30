import React, { useState } from "react";
import { useRouter } from "next/router";
import useToggle from "../../src/hooks/useToggle";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Index = () => {
  // const [login , setLogin] = useState(false);
  // const [isOn, toggleIsOn] = useToggle();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [message, setMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = { username, password };
    const user = await axios.post("/api/auth/loginFunc", credentials);
    console.log(user.data.message);
    message = user.data.message;
    setMessage(message);
    if(message === "Invalid credentials"){
      toast.error(message);
    }
    if (user.status === 200) {
      if(message === "Successfull login"){
        toast.success(message)
      }
      router.push("/admin/product");
    }
    // if (username === "admin" && password === "admin") {
    //   toggleIsOn(false);
    //   // setLogin(false);
    //   router.push("/admin/dashboard");
    // } else if (username === "" && password === "") {
    //   // alert('Alert wrong credentials')
    //   // setLogin(true)
    //   toggleIsOn(true);
    // } else if (username !== "admin" && password !== "admin") {
    //   // setLogin(true);
    //   toggleIsOn(true);
    //   setUsername("");
    //   setPassword("");
    // } else {
    //   // setLogin(true);
    //   toggleIsOn(true);
    // }
  };

  return (
    <>
      <section>
        <div className="flex flex-col bg-indigo-200 justify-center min-h-screen py-12 sm:px-6 lg:px-8">
          {/* <ErrorAlert message={message}/> */}
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
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 ml-4 sm:ml-10 text-4xl font-extrabold text-neutral-600">
              {" "}
              SignIn{" "}
            </h2>
          </div>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="px-4 py-4 sm:px-10">
              <form className="space-y-6" action="#" method="POST">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-lg font-medium text-gray-700"
                  >
                    {" "}
                    Username{" "}
                  </label>
                  <div className="mt-1">
                    <input
                      name="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      autoComplete="username"
                      required
                      className="
                      block
                      w-full
                      px-5
                      py-3
                      text-base text-neutral-800
                      placeholder-gray-900
                      transition
                      duration-500
                      ease-in-out
                      transform
                      border border-transparent
                      rounded-lg
                      bg-gray-50
                      focus:outline-none
                      focus:border-transparent
                      focus:ring-2
                      focus:ring-black
                      focus:ring-offset-2
                      focus:ring-offset-gray-300
                    "
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-lg font-medium text-gray-700"
                  >
                    {" "}
                    Password{" "}
                  </label>
                  <div className="mt-1">
                    <input
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      required
                      className="
                      block
                      w-full
                      px-5
                      py-3
                      text-base text-neutral-800
                      placeholder-gray-300
                      transition
                      duration-500
                      ease-in-out
                      transform
                      border border-transparent
                      rounded-lg
                      bg-gray-50
                      focus:outline-none
                      focus:border-transparent
                      focus:ring-2
                      focus:ring-black
                      focus:ring-offset-2
                      focus:ring-offset-gray-300
                    "
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="
                      w-4
                      h-4
                      text-blue-600
                      border-gray-300
                      rounded
                      focus:ring-blue-500
                    "
                    />
                    <label
                      htmlFor="remember-me"
                      className="block ml-2 text-md text-neutral-600"
                    >
                      {" "}
                      Remember me{" "}
                    </label>
                  </div>
                  <div className="text-md">
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      {" "}
                      Forgot your password?{" "}
                    </a>
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    type="submit"
                    // onClick={(e) => handleSubmit(e)}
                    onClick={(e) => {
                      // toggleIsOn,
                      handleSubmit(e);
                    }}
                    className="
                    flex
                    items-center
                    justify-center
                    w-full
                    px-10
                    py-4
                    text-base
                    font-medium
                    text-center text-white
                    transition
                    duration-500
                    ease-in-out
                    transform
                    bg-blue-600
                    rounded-xl
                    hover:bg-blue-700
                    focus:outline-none
                    focus:ring-2
                    focus:ring-offset-2
                    focus:ring-blue-500
                  "
                  >
                    {" "}
                    Sign in{" "}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
