import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useUserAuth } from "../src/context/UserAuthContext";
import Cart2 from "./Cart2";
import DropdownMenu from "./DropdownMenu";
import SigninSignup from "./SigninSignup";

const Navbar = () => {
  const router = useRouter();
  const { user } = useUserAuth();
  // const [data, setData] = useState("")

  // const getOrdersById = async () => {
  //   const userDetails = user;
  //   const { uid } = userDetails;
  //   console.log(uid);
  //   const ordersRef = collection(db, "users");
  //   const orderDoc = query(ordersRef, where("uid", "==", `${uid}`));
  //   const querySnapshot = await getDocs(orderDoc);
  //   querySnapshot.forEach((doc) => {
  //     let userss = doc.data();
  //     console.log(userss);
  //     setData(userss.displayName)
  //   });
  // };
// useEffect(() => {
//   getOrdersById();
// },[data])


  // console.log(user);
  return (
    <>
      {/* <nav className="relative w-full px-8 text-gray-700 bg-[#90DDF0] body-font">
        <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
          <p  className="relative z-10 flex items-center w-auto text-2xl font-extrabold leading-none text-[#07393C] select-none">tails.</p>
          <div className="relative z-10 inline-flex items-center space-x-3 md:ml-5 lg:justify-end">
            <button className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-[#07393c] whitespace-nowrap bg-[#C2F0ED] border-gray-200 shadow-sm hover:bg-[#5EA2AF] hover:text-white focus:outline-none focus:shadow-none rounded">
              Sign in
            </button>
            <span className="inline-flex rounded-md shadow-sm">
              <button className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-[#07393c] whitespace-no-wrap bg-[#C2F0ED] border border-blue-700 shadow-sm hover:bg-[#5EA2AF] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded">
                Sign up
              </button>
            </span>
          </div>
        </div>
      </nav> */}
      <nav className="fixed z-10 bg-white top-0 left-0 right-0">
        <div className="relative w-full text-gray-700 px-8">
          <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
            <Link href="/">
            <a>
              <p className="relative cursor-pointer z-10 flex items-center w-auto text-4xl font-extrabold leading-none select-none">
                Anna Purna.
              </p>
            </a>
            </Link>
            <div className="relative z-10 inline-flex items-center space-x-3 mt-5 sm:mt-5 md:ml-5 lg:justify-end">
              {!user ? <SigninSignup /> : null}
              {/* <button
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
            </button> */}
              {/* <Cart/> */}
              {user ? (
                <h3 className="font-mono font-bold text-xl">
                  Welcome {user.displayName}
                </h3>
              ) : null}
              <Cart2 />

              {/* <button>
              <Image
                className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                src="https://source.unsplash.com/random"
                alt=""
                width="48"
                height="48"
                draggable="false"
              />
            </button> */}

              {/* //TODO: dropdown  */}
              {user ? <DropdownMenu /> : null}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

{
  /* <a href="#_" className="relative font-medium leading-6 text-gray-600 transition duration-150 ease-out hover:text-gray-900" x-data="{ hover: false }" @mouseenter="hover = true" @mouseleave="hover = false">
              <span className="block">Home</span>
              <span className="absolute bottom-0 left-0 inline-block w-full h-0.5 -mb-1 overflow-hidden">
                <span x-show="hover" className="absolute inset-0 inline-block w-full h-full transform bg-gray-900" x-transition:enter="transition ease duration-200" x-transition:enter-start="scale-0" x-transition:enter-end="scale-100" x-transition:leave="transition ease-out duration-300" x-transition:leave-start="scale-100" x-transition:leave-end="scale-0" />
              </span>
            </a> */
}
