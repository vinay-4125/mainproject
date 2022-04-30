import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../src/features/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { useUserAuth } from "../src/context/UserAuthContext";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";

// import useLocalStorage from "../src/hooks/useLocalStorage";

// export const localData = () => {
//   localStorage.getItem("cartItems")
//     ? JSON.parse(localStorage.getItem("cartItems"))
//     : []
// }

const Cart2 = () => {
  const { user } = useUserAuth();
  const router = useRouter();

  let [isOpen, setIsOpen] = useState(false);
  // const [storage, setStorage] = useLocalStorage('storage');

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };
  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };

  const handleIncreaseCart = (cartItem) => {
    dispatch(addToCart(cartItem));
  };

  const handleClearCart = () => {
    dispatch(clearCart(cart));
  };
  useEffect(() => {
    // const storage = localStorage.setItem("cartItems", JSON.stringify(cart.cartItems));
    // console.log(storage)
    dispatch(getTotals(cart));
  }, [cart]);

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="px-4 py-1 relative text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        {cart.cartTotalQuantity === 0 ? null : (
          <span className="absolute inset-0 object-right-top -mr-14 -mt-2">
            <div className="inline-flex items-center px-2 py-0.5 border-2 border-black rounded-full text-xs font-semibold leading-4 bg-black text-white">
              {cart.cartTotalQuantity}
            </div>
          </span>
        )}
      </button>
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-hidden z-10"
          onClose={closeModal}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          {" "}
                          Shopping cart{" "}
                        </Dialog.Title>

                        <button
                          onClick={() => handleClearCart()}
                          className="p-2 -mt-1 rounded-md bg-indigo-500 hover:bg-indigo-400 text-white text-center"
                        >
                          Clear Cart
                        </button>

                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setIsOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            {/* <XIcon className="h-6 w-6" aria-hidden="true" /> */}
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
                        </div>
                      </div>
                      {cart.cartItems.length === 0 ? (
                        <div className="mt-8">
                          <p>Your cart is currently empty</p>
                        </div>
                      ) : (
                        <>
                          <div className="mt-8">
                            <div className="flow-root">
                              <ul
                                role="list"
                                className="-my-6 divide-y divide-gray-200"
                              >
                                {cart.cartItems?.map((cartItem) => (
                                  <li key={cartItem.id} className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                      <Image
                                        src="https://source.unsplash.com/random"
                                        alt={cartItem.price}
                                        width="100"
                                        height="100"
                                        className="h-full w-full object-cover object-center"
                                      />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                      <div>
                                        <div className="flex justify-between text-base font-semibold text-gray-900">
                                          <h3>
                                            {/* <a href={cartItem.href}> */}{" "}
                                            {cartItem.name} {/* </a> */}
                                          </h3>
                                          <p className="ml-4">
                                            ₹{cartItem.price}
                                          </p>
                                        </div>
                                        {/* <p className="mt-1 text-sm text-gray-500">
                                    {cartItem.color}
                                  </p> */}
                                      </div>
                                      <div className="flex flex-1 items-end justify-between text-sm">
                                        {/* <p className="text-gray-500">
                                        Qty {cartItem.cartQuantity}
                                      </p> */}
                                        <div className="flex items-start justify-center w-24 max-w-fit rounded">
                                          <button
                                            onClick={() =>
                                              handleDecreaseCart(cartItem)
                                            }
                                            className="border rounded-md bg-slate-200 hover:bg-slate-100"
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              className="h-6 w-6"
                                              fill="none"
                                              viewBox="0 0 24 24"
                                              stroke="currentColor"
                                              strokeWidth="1"
                                            >
                                              <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M18 12H6"
                                              />
                                            </svg>
                                          </button>
                                          <p className="px-3">
                                            {cartItem.cartQuantity}
                                          </p>
                                          <button
                                            onClick={() =>
                                              handleIncreaseCart(cartItem)
                                            }
                                            className="border rounded-md bg-slate-200 hover:bg-slate-100"
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              className="h-6 w-6"
                                              fill="none"
                                              viewBox="0 0 24 24"
                                              stroke="currentColor"
                                              strokeWidth="1"
                                            >
                                              <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                              />
                                            </svg>
                                          </button>
                                        </div>

                                        <div className="flex">
                                          <button
                                            type="button"
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                            onClick={() =>
                                              handleRemoveFromCart(cartItem)
                                            }
                                          >
                                            Remove
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p className="font-bold text-xl">
                          ₹{cart.cartTotalAmount}
                        </p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      {user ? ( cart.cartItems.length === 0 ? (
                        <div className="mt-6">
                            {/* {toast.warning("Your cart is empty")} */}
                          <Link href="/">
                            <a className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                              Checkout
                            </a>
                          </Link>
                        </div>
                      ) : (<div className="mt-6">
                          <Link href="/checkout">
                            <a className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                              Checkout
                            </a>
                          </Link>
                        </div>)
                      ) : (
                        <div className="mt-6">
                          <Link href="/login">
                            <a className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                              Checkout
                            </a>
                          </Link>
                        </div>
                      )}
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{" "}
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => {setIsOpen(false);router.push("/")}}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
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

export default Cart2;
