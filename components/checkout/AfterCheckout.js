import React from "react";
import Navbar from "../Navbar";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Invoiced from "../Invoice";
import Footer from "../Footer";
import { useUserAuth } from "../../src/context/UserAuthContext";
import ShippingForm from "./ShippingForm";
import ShippingForm2 from "./ShippingForm2";
import PaymentMethod from "./PaymentMethod";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import PlaceOrder from "./PlaceOrder";

const steps = ["Shipping Address", "Payment mode", "Place Order"];

const AfterCheckout = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const router = useRouter();

  const cart = useSelector((state) => state.cart);

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    // if (!isStepOptional(activeStep)) {
    //   // You probably want to guard against something like this,
    //   // it should never occur unless someone's actively trying to break something.
    //   throw new Error("You can't skip a step that isn't optional.");
    // }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <>
      <Navbar />
      {cart.cartItems.length !== 0 ? (
        <div className="mt-48 sm:mt-32">
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length ? (
              <>
                {/* <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button
                    className="bg-indigo-500 hover:bg-indigo-400 text-white mr-5"
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                </Box> */}
              </>
            ) : (
              <>
                {/* <Typography sx={{ mt: 2, mb: 1 }}> */}
                {/* Step {activeStep + 1} */}
                {/* </Typography> */}
                <div className="flex justify-around mt-3">
                  {/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}> */}
                  <Button
                    // color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                    hidden={activeStep === 0 }
                    className="bg-indigo-500 disabled:cursor-not-allowed  disabled:text-white hover:bg-indigo-400 text-white ml-5"
                  >
                    Back
                  </Button>
                  {/* <Box sx={{ flex: "1 1 auto" }} /> */}
                  {/* {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )} */}

                  {activeStep === steps.length  ? null : (
                    <>
                      <Button
                        className="bg-indigo-500 hover:bg-indigo-400 diabled:cursor-not-allowed disabled:text-white text-white mr-5"
                        onClick={handleNext}
                        disabled={activeStep === 0}
                        hidden={activeStep === 0 || activeStep===2}
                      >
                        Next
                      </Button>
                    </>
                  )}
                  {/* </Box> */}
                </div>
                <div className="sm:mt-2 sm:mb-1">
                  {activeStep === 0 && <ShippingForm2 action={handleNext} />}
                  {activeStep === 1 && <PaymentMethod />}
                  {activeStep === 2 && <PlaceOrder />}
                </div>
              </>
            )}
          </Box>
        </div>
      ) : (
        <>
          <div className="mt-48 sm:mt-32">
            <div className="flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <p className="text-2xl my-auto font-bold">
                Oops! Your cart is empty
              </p>
            </div>
            <div className="mt-6 justify-center text-center text-sm text-gray-500">
              <p>
                <span aria-hidden="true">&larr;</span>
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => router.push("/")}
                >
                  Continue Shopping
                </button>
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AfterCheckout;

{
  /* <div className="p-5 mt-32">
<div className="mx-4 p-4">
  <div className="flex items-center">
    <div className="flex items-center text-indigo-600 relative">
      <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-indigo-600">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-bookmark ">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
      </div>
      <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-indigo-600">Personal</div>
    </div>
    <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-indigo-600" />
    <div className="flex items-center text-white relative">
      <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 bg-indigo-600 border-indigo-600">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-user-plus ">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="8.5" cy={7} r={4} />
          <line x1={20} y1={8} x2={20} y2={14} />
          <line x1={23} y1={11} x2={17} y2={11} />
        </svg>
      </div>
      <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-indigo-600">Account</div>
    </div>
    <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300" />
    <div className="flex items-center text-gray-500 relative">
      <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail ">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      </div>
      <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-gray-500">Message</div>
    </div>
    <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300" />
    <div className="flex items-center text-gray-500 relative">
      <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-database ">
          <ellipse cx={12} cy={5} rx={9} ry={3} />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      </div>
      <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-gray-500">Confirm</div>
    </div>
  </div>
</div>
<div className="mt-8 p-4">
  <div>
    <div className="font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3">Full Name</div>
    <div className="flex flex-col md:flex-row">
      <div className="w-full flex-1 mx-2 svelte-1l8159u">
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u">
          <input placeholder="First Name" className="p-1 px-2 appearance-none outline-none w-full text-gray-800" /> </div>
      </div>
      <div className="w-full flex-1 mx-2 svelte-1l8159u">
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u">
          <input placeholder="Last Name" className="p-1 px-2 appearance-none outline-none w-full text-gray-800" /> </div>
      </div>
    </div>
    <div className="flex flex-col md:flex-row">
      <div className="w-full mx-2 flex-1 svelte-1l8159u">
        <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase"> Username</div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u">
          <input placeholder="Just a hint.." className="p-1 px-2 appearance-none outline-none w-full text-gray-800" /> </div>
      </div>
      <div className="w-full mx-2 flex-1 svelte-1l8159u">
        <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase"> Your Email</div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u">
          <input placeholder="jhon@doe.com" className="p-1 px-2 appearance-none outline-none w-full text-gray-800" /> </div>
      </div>
    </div>
  </div>
  <div className="flex p-2 mt-4">
    <button className="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
hover:bg-gray-200  
bg-gray-100 
text-gray-700 
border duration-200 ease-in-out 
border-gray-600 transition">Previous</button>
    <div className="flex-auto flex flex-row-reverse">
      <button className="text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
hover:bg-indigo-600  
bg-indigo-600 
text-indigo-100 
border duration-200 ease-in-out 
border-indigo-600 transition">Next</button>
      <button className="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
hover:bg-indigo-200  
bg-indigo-100 
text-indigo-700 
border duration-200 ease-in-out 
border-indigo-600 transition">Skip</button>
    </div>
  </div>
</div>
</div> */
}
