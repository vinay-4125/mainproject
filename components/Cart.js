import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUserAuth } from "../src/context/UserAuthContext";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../src/features/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  const { user } = useUserAuth();

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
    dispatch(getTotals(cart));
  }, [cart]);

  let [isOpen, setIsOpen] = useState(false);

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
        className="px-4 py-1 relative text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-400 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
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
        <span className="absolute inset-0 object-right-top -mr-14 -mt-2">
          <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-black rounded-full text-xs font-semibold leading-4 bg-black text-white">
            {cart.cartTotalQuantity}
          </div>
        </span>
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="overflow-hidden fixed inset-0 z-10"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="absolute inset-0 bg-black bg-opacity-40" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            {/* <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span> */}
            <Transition.Child
              as={Fragment}
              enter="transform ease-in-out transition-transform duration-300"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform ease-in-out transition-transform duration-300"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="flex flex-col fixed inset-y-0 right-0 w-full max-w-sm bg-white">
                <div className="flex justify-between items-center p-4 shadow">
                  <Dialog.Title as="h3" className="text-xl font-bold">
                    Cart .....
                  </Dialog.Title>
                  <button
                    onClick={() => handleClearCart()}
                    className="p-2 rounded-md bg-indigo-500 hover:bg-indigo-400 text-white text-center"
                  >
                    Clear Cart
                  </button>
                  <button
                    onClick={closeModal}
                    className="p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                {cart.cartItems.length === 0 ? (
                  <div>
                    <p>Your cart is currently empty</p>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 flex flex-col">
                      <div className="flex-1 relative">
                        <div className="absolute inset-0 overflow-y-scroll">
                          <div className="flex flex-col divide-y divide-gray-100">
                            {cart.cartItems?.map((cartItem) => (
                              <div
                                key={cartItem.id}
                                v-for="(item, index) in new Array(100)"
                                className="flex p-4 space-x-4"
                              >
                                <div className="flex flex-col w-24">
                                  <Image
                                    className="mb-0.5"
                                    src="https://source.unsplash.com/random"
                                    alt={cartItem.price}
                                    width="100"
                                    height="100"
                                  />
                                  <button
                                    onClick={() =>
                                      handleRemoveFromCart(cartItem)
                                    }
                                    className="mt-2 px-3 py-3 text-xs font-semibold tracking-wider uppercase text-center rounded cursor-pointer focus:ring-1 focus:ring-black"
                                  >
                                    Remove
                                  </button>
                                </div>
                                <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      {cartItem.name}
                                    </h3>
                                    <p className="ml-4">₹{cartItem.price}</p>
                                  </div>
                                  {/* <div className="text-xl font-semibold leading-tight">
                                    {cartItem.name}
                                  </div>
                                  <div className="mt-2 text-gray-800 leading-normal">
                                    ₹{cartItem.price}
                                  </div> */}
                                  <div className="flex items-start justify-center w-24 max-w-fit rounded">
                                    <button
                                      onClick={() =>
                                        handleDecreaseCart(cartItem)
                                      }
                                      className="border rounded-md bg-indigo-200 hover:bg-indigo-100"
                                    >
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
                                          d="M18 12H6"
                                        />
                                      </svg>
                                    </button>
                                    <div className="px-3">{cartItem.cartQuantity}</div>
                                    <button
                                      onClick={() =>
                                        handleIncreaseCart(cartItem)
                                      }
                                      className="border rounded-md bg-indigo-200 hover:bg-indigo-100"
                                    >
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
                                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                  <div>
                                    ₹{cartItem.price * cartItem.cartQuantity}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="py-6 px-4 bg-gray-50">
                  <div className="text-xl text-center font-semibold">
                    Subtotal
                  </div>
                  <div className="text-xl text-center font-semibold">
                    ₹{cart.cartTotalAmount} (incl. GST)
                  </div>
                  <div className="text-center mt-4 text-gray-600">
                    To calculate the shipping costs go to the checkout page
                  </div>
                  <div className="mt-6">
                        <a
                          href="#"
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </a>
                      </div>
                  <div className="flex flex-col space-y-2 mt-4">
                  {user ? (
                    <button onClick={()=> router.push('/')} className="bg-indigo-500 p-3 text-white rounded-full hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Checkout
                    </button>
                  ) : (
                    <button onClick={()=> router.push('/login')} className="bg-indigo-500 p-3 text-white rounded-full hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Checkout
                    </button>
                  )}
                    <button
                      onClick={closeModal}
                      className="p-3 bg-white text-gray-500 hover:text-black rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
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
                          d="M7 16l-4-4m0 0l4-4m-4 4h18"
                        />
                      </svg>
                      Continue shopping
                    </button>
                  </div>
                </div>
                {/* <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Got it, thanks!
                  </button>
                </div> */}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default Cart;

{
  /* <div className="hover:scale-150 transition duration-500 hover:animate-spin cursor-pointer">
            
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
          </div> */
}
