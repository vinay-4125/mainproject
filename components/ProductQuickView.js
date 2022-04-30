import { Fragment, useState } from "react";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { Rating } from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "../src/features/cartSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductQuickView({ product }) {
  let [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(product.rating);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <button
        type="button"
        onClick={openModal}
        // className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-1.5 text-center inline-flex items-center mr-2"
      >
        <Image
          className="w-full h-full object-center  object-cover group-hover:opacity-75"
          // src={product.imageSrc}
          src={product.url}
          alt={product.name}
          width="300"
          height="150"
          // width="350"
          // height="150"
          draggable="false"
        />
      </button>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={closeModal}
        >
          <div
            className="flex min-h-screen text-center md:block md:px-2 lg:px-4"
            style={{ fontSize: 0 }}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden md:inline-block md:align-middle md:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <div className="flex text-base  text-left transform transition w-full md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-4xl">
                <div className="w-full rounded-lg relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="sr-only">Close</span>
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

                  <div className="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8">
                    <div className="aspect-w-2 aspect-h-3 rounded-lg bg-transparent bg-gray-100 overflow-hidden sm:col-span-4 lg:col-span-5">
                      <Image
                        src={product.url}
                        alt={product.name}
                        width="900"
                        height="900"
                        className="object-center rounded-lg object-cover"
                      />
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                      <h2 className="text-2xl font-extrabold text-gray-900 sm:pr-12">
                        {product.name}
                      </h2>

                      <section
                        aria-labelledby="information-heading"
                        className="mt-2"
                      >
                        <h3 id="information-heading" className="sr-only">
                          Product information
                        </h3>

                        <p className="text-2xl text-gray-900">
                          ₹{product.price}
                        </p>

                        {/* Reviews */}
                        <div className="mt-6">
                          <h4 className="sr-only">Reviews</h4>
                          <div className="flex items-center">
                            <div className="flex items-center">
                                <Rating
                                  name="simple-controlled"
                                  value={value}
                                  onChange={(event, newValue) => {
                                    setValue(newValue);
                                  }}
                                />
                            </div>

                            <p className="sr-only">
                              {product.rating} out of 5 stars
                            </p>
                            <a
                              href="#"
                              className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              {product.reviewCount} review
                            </a>
                          </div>
                        </div>
                      </section>

                      <section
                        aria-labelledby="options-heading"
                        className="mt-10"
                      >
                        <h3 id="options-heading" className="sr-only">
                          Product options
                        </h3>

                        {/* <form> */}
                          {/* Colors */}
                          <div>
                            <h4 className="text-sm text-gray-900 font-medium">
                              <p className="font-bold text-lg">Description:</p>
                              <br />

                              {product.description}
                            </h4>
                          </div>

                          {/* Sizes */}
                          {/* <div className="mt-10">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm text-gray-900 font-medium">
                                Size
                              </h4>
                              <a
                                href="#"
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Size guide
                              </a>
                            </div>
                          </div> */}
                          {product.quantity ? (
                          <button
                            type="submit"
                            onClick={() => handleAddToCart(product)}
                            className="mt-6 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Add to Cart
                          </button>
                          ) : (
                            <button
                            type="submit"
                            disabled
                            className="mt-6 w-full disabled:cursor-not-allowed bg-indigo-200 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Add to Cart
                          </button>
                          )}
                        {/* </form> */}
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
