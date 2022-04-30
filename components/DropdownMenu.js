import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Fragment } from "react/cjs/react.production.min";
import { useUserAuth } from "../src/context/UserAuthContext";
import { useDispatch } from "react-redux";
import { resetState } from "../src/features/cartSlice";

const DropdownMenu = () => {
  const router = useRouter();
  const { user, logOut } = useUserAuth();
  const dispatch = useDispatch();
  const imageURL = user.photoURL;
  const profilePage = () => {
    router.push("/user");
  };
  const previousOrder = () => {
    router.push("/user");
  };
  const handleLogout = async () => {
    try {
      await logOut();
      dispatch(resetState())
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const userData = () => {
    const imageUrl = user;
  };

  const myLoader = () => {
    return;
  };

  useEffect(() => {
    myLoader();
  }, []);

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {/* <Image
              className="w-10 h-10 inline rounded-full"
              src={imageURL}
              alt=""
              width="45"
              height="45"
              draggable="false"
            /> */}
            <img
              className="w-10 h-10 inline rounded-full"
              src={imageURL}
              alt=""
              width="45"
              height="45"
              draggable="false"
            />
            {/* <ChevronDownIcon
            className="w-5 h-5 ml-2 -mr-1 text-indigo-200 hover:text-indigo-100"
            aria-hidden="true"
          /> */}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={profilePage}
                    className={`${
                      active ? "bg-indigo-500 text-white" : "text-gray-900"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    {/* {active ? (
                    <EditActiveIcon
                      className="w-5 h-5 mr-2"
                      aria-hidden="true"
                    />
                  ) : (
                    <EditInactiveIcon
                      className="w-5 h-5 mr-2"
                      aria-hidden="true"
                    />
                  )} */}
                    Profile
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                  onClick={previousOrder}
                    className={`${
                      active ? "bg-indigo-500 text-white" : "text-gray-900"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    {/* {active ? (
                    <DuplicateActiveIcon
                      className="w-5 h-5 mr-2"
                      aria-hidden="true"
                    />
                  ) : (
                    <DuplicateInactiveIcon
                      className="w-5 h-5 mr-2"
                      aria-hidden="true"
                    />
                  )} */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Previous Orders
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleLogout}
                    className={`${
                      active ? "bg-indigo-500 text-white" : "text-gray-900"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    {/* {active ? (
                    <DeleteActiveIcon
                      className="w-5 h-5 mr-2 text-indigo-400"
                      aria-hidden="true"
                    />
                  ) : (
                    <DeleteInactiveIcon
                      className="w-5 h-5 mr-2 text-indigo-400"
                      aria-hidden="true"
                    />
                  )} */}
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default DropdownMenu;
