import React, { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { addPaymentMethod } from "../../src/features/cartSlice";
import Image from "next/image";

const plans = [
  {
    id: "1",
    name: "RazorPay",
    image:"/razorpaylogo.svg",
    alt: "paytm_logo",
  },
  // {
  //   id: "2",
  //   name: "Google Pay",
  //   image: "/googlepaylogo.png",
  //   alt: "googlePay_logo",
  // },
  {
    id: "3",
    name: "Cash On Delivery",
    image: "/cod.png",
    alt: "COD",
  },
];

const PaymentMethod = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(plans[0]);
  // console.log(selected)
  useEffect(() => {
    dispatch(addPaymentMethod(selected));
  }, [selected]);
  return (
    <>
      <div className="w-full px-4 py-16">
        <div className="w-full max-w-md mx-auto">
          <RadioGroup value={selected} onChange={setSelected}>
            <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
            <div className="space-y-2">
              {plans.map((plan) => (
                <RadioGroup.Option
                  key={plan.id}
                  value={plan}
                  className={({ active, checked }) =>
                    `${
                      active
                        ? "ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60"
                        : ""
                    }
                  ${
                    checked ? "bg-gray-300 bg-opacity-75 text-white" : "bg-white"
                  }
                    relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none`
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <div className="text-sm">
                            <Image
                              src={plan.image}
                              width="50"
                              height="50"
                              alt={plan.alt}
                            />
                            <RadioGroup.Label
                              as="p"
                              className={`font-medium  ${
                                checked ? "text-black" : "text-gray-900"
                              }`}
                            >
                              {plan.name}
                            </RadioGroup.Label>
                            {/* <RadioGroup.Description
                              as="span"
                              className={`inline ${
                                checked ? "text-sky-100" : "text-gray-500"
                              }`}
                            >
                              <span>
                                {plan.ram}/{plan.cpus}
                              </span>{" "}
                              <span aria-hidden="true">&middot;</span>{" "}
                              <span>{plan.disk}</span>
                            </RadioGroup.Description> */}
                          </div>
                        </div>
                        {checked && (
                          <div className="flex-shrink-0 text-black">
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
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
      </div>
    </>
  );
};

export default PaymentMethod;
