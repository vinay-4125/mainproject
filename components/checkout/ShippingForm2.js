import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addShippingDetails } from "../../src/features/cartSlice";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

const ShippingForm = ({ action }) => {
  
  const dispatch = useDispatch();
  const shipping = useSelector((state) => state.cart);
  const [shippingDetails, setShippingDetails] = useState({
    fullname: "",
    mobileno: "",
    pincode: "",
    microaddress: "",
    majoraddress: "",
    city: "",
  });

  const registerInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setShippingDetails({ ...shippingDetails, [name]: value });
};

  const getData = () => {
    const previousData = JSON.parse(localStorage.getItem("shippingDetails"));
    // console.log(previousData)
    if (previousData) {
      setShippingDetails({
        ...shippingDetails,
        fullname: previousData.fullname,
        mobileno: previousData.mobileno,
        pincode: previousData.pincode,
        microaddress: previousData.microaddress,
        majoraddress: previousData.majoraddress,
        city: previousData.city,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullname, mobileno, pincode, microaddress, majoraddress, city } =
      shippingDetails;
      if(fullname==="" || mobileno==="" || pincode==="" || microaddress==="" || majoraddress==="" || city==="") {
          toast.error("Fill all the Fields")
      }else if(mobileno.length<10 || mobileno.length>=11) {
        toast.error("Fill a proper mobile number")
    }else if(pincode.length<6 || pincode.length>6) {
        toast.error("Fill a proper pincode")
    }
    else{
          dispatch(addShippingDetails(shippingDetails));
          action();
        }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <section>
        <div
          className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
          flex items-center justify-center -mt-20 -mb-12"
        >
          <div className="w-full h-100">
            <div className="">
              {/* {error && (
              <div
                className="bg-red-100 rounded-lg py-5 px-6 text-base text-red-700 mb-3"
                role="alert"
              >
              </div>
            )} */}
            <div className="mt-10">
              <Link href="/">
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
                  <span className="px-2">Home</span>
                </a>
              </Link>
            </div>
              <form className="mt-6" method="POST" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-gray-700">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter Full Name"
                    name="fullname"
                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    autoFocus
                    autoComplete="true"
                    //required
                    value={shippingDetails.fullname}
                    onChange={registerInputs}
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-gray-700">Mobile Number</label>
                  <input
                    type="Number"
                    placeholder="+91"
                    name="mobileno"
                    minLength={10}
                    maxLength={10}
                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none"
                    //required
                    value={shippingDetails.mobileno}
                    onChange={registerInputs}
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-gray-700">Pincode</label>
                  <input
                    type="number"
                    placeholder="6 digits [0-9] PIN code"
                    name="pincode"
                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    // autoFocus
                    autoComplete="true"
                    //required
                    value={shippingDetails.pincode}
                    onChange={registerInputs}
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-gray-700">
                    Flat, House no., Building, Company, Apartment
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    name="microaddress"
                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    // autoFocus
                    autoComplete="true"
                    //required
                    value={shippingDetails.microaddress}
                    onChange={registerInputs}
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-gray-700">
                    Area, Street, Sector, Village
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    name="majoraddress"
                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    // autoFocus
                    autoComplete="true"
                    //required
                    value={shippingDetails.majoraddress}
                    onChange={registerInputs}
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-gray-700">Town/City</label>
                  <input
                    type="text"
                    placeholder=""
                    name="city"
                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    // autoFocus
                    autoComplete="true"
                    //required
                    value={shippingDetails.city}
                    onChange={registerInputs}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
                >
                  Add Address
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover/>
    </>
  );
};

export default ShippingForm;
