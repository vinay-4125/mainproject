import { Dialog, Transition } from "@headlessui/react";
import { addDoc, collection } from "firebase/firestore";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { Fragment, useEffect, useState } from "react";
import { db, storage } from "../../../src/config/firebase.config";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";

export default function AddProductModal() {
  const router = useRouter();
  let [isOpen, setIsOpen] = useState(false);
  const [progresspercent, setProgresspercent] = useState(0);
  const [done, setDone] = useState(false);
  const [addProduct, setAddProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    url: "",
  });

  // const [name, setName] = useState();
  // const [price, setPrice] = useState();
  // const [description, setDescription] = useState();
  const [fileUrl, setFileUrl] = useState();

  const onFileChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;
    const imageRef = ref(storage, file.name);
    console.log(file.name);
    const metadata = {
      contentType: "image/jpeg",
    };
    const uploadFile = uploadBytesResumable(imageRef, file);
    uploadFile.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
        console.log("Image uploaded");
        setDone(true);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadFile.snapshot.ref).then((downloadURL) => {
          setFileUrl(downloadURL);
        });
      }
    );

    // uploadBytesResumable(imageRef, file.name)
    //   .then(() => {
    //     getDownloadURL(imageRef)
    //       .then((url) => {
    //         setFileUrl(url);
    //       })
    //       .catch((error) => {
    //         console.log(error.message, "error getting the image url");
    //       });
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   });

    // // console.log(file.name)
    // // const storageRef = ref(storage, file.name);
    // // const storageRef = ref(storage);
    // // // const fileRef = storageRef.child(file.name);
    // // const fileRef = ref(storageRef,file.name);
    // // // await fileRef.put(file);
    // // setFileUrl(await fileRef.getDownloadUrl());
    // setFileUrl(await getDownloadURL(ref(storage, file.name)));
    // console.log(fileUrl)
  };

  const registerInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddProduct({ ...addProduct, [name]: value });
  };

  const postData = async () => {
    const { name, price, description, url, category } = addProduct;
    url = fileUrl;
    console.log(category);
    try {
      await addDoc(collection(db, "products"), {
        name,
        price,
        category,
        description,
        url,
        quantity:true,
      });
      // window.location.reload();
      // setAddProduct({...addProduct, name:"", price:"", description:""})
    } catch (error) {
      toast.error("Fill all the fields");
      console.log(error.message);
    }
  };

  function closeModal() {
    setIsOpen(false);
    postData();
    setTimeout(() => {
      router.reload();
    }, 500);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="flex flex-row-reverse mr-32">
        <button
          onClick={openModal}
          className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-center justify-start px-3 py-2 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <p className="text-sm font-medium leading-none text-white">
            Add Product
          </p>
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              {/* <Dialog.Overlay className="fixed inset-0" /> */}
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  <div className="flex justify-between h-7 items-center">
                    Add Product Details
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
                </Dialog.Title>
                <div className="mt-2">
                  <form action="" onSubmit={postData}>
                    <div className="flex flex-wrap sm:justify-between">
                      <div className="mb-6">
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Product Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={addProduct.name}
                          onChange={registerInputs}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5 "
                          required
                        />
                      </div>
                      <div className="mb-6">
                        <label
                          htmlFor="price"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Product Price (₹)
                        </label>
                        <input
                          type="number"
                          name="price"
                          value={addProduct.price}
                          onChange={registerInputs}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5 "
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="price"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Product Category
                      </label>
                      <select
                        //   id="productsFilter"
                        name="category"
                        value={addProduct.category}
                        onChange={registerInputs}
                        className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      >
                        <option value=""></option>
                        <option value="supplements">Supplements</option>
                        <option value="oralhygiene">Oral hygiene</option>
                        <option value="cleaningalcohols">
                          Cleaning Alcohols
                        </option>
                        <option value="ayurved">Ayurved</option>
                        <option value="sexualwellness">Sexual Wellness</option>
                        <option value="healthdevices">Health Devices/Equipment</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Product Description
                      </label>
                      <textarea
                        name="description"
                        rows="4"
                        value={addProduct.description}
                        onChange={registerInputs}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Product Description..."
                      ></textarea>
                    </div>

                    <div className="mt-6 flex items-center space-x-6">
                      <div className="shrink-0">
                        {/* <img
                          className="h-16 w-16 object-cover rounded-full"
                          src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
                          alt="Current profile photo"
                        /> */}
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
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <label className="block">
                        <span className="sr-only">Choose product image</span>
                        <input
                          type="file"
                          name="url"
                          // value={addProduct.url}
                          onChange={onFileChange}
                          className="block w-full text-sm text-slate-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-violet-50 file:text-violet-700
                                    hover:file:bg-violet-100 cursor-pointer
                                    "
                        />
                      </label>
                    </div>
                  </form>
                </div>
                <br />
                {!fileUrl && (
                  <div className="w-full bg-gray-200 h-1 mb-6">
                    <div
                      className="bg-green-500 h-1"
                      style={{ width: `${progresspercent}%` }}
                    >
                      {progresspercent}%
                    </div>
                  </div>
                )}
                {/* <div class="w-full bg-gray-200 h-1 mb-6">
  <div class="bg-green-500 h-1" style="width: 25%"></div>
</div> */}
                {done ? (
                  <div className="mt-4">
                    <button
                      type="submit"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={closeModal}
                      // disabled={progresspercent}
                    >
                      Save Changes
                    </button>
                  </div>
                ) : (
                  <div className="mt-4">
                    <button
                      type="submit"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium cursor-not-allowed text-blue-900 bg-blue-50 border border-transparent rounded-md hover:bg-blue-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={closeModal}
                      disabled
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </Transition.Child>
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
        pauseOnHover
      />
    </>
  );
}
