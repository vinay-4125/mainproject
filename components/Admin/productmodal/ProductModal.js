import { Dialog, Transition } from "@headlessui/react";
import { doc, updateDoc } from "firebase/firestore";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import { Fragment, useEffect, useState } from "react";
import { db, storage } from "../../../src/config/firebase.config";

export default function ProductModal({ item }) {
  let [isOpen, setIsOpen] = useState(false);

  const [fileUrl, setFileUrl] = useState();
  const [progresspercent, setProgresspercent] = useState(0);

  const [productDetails, setProductDetails] = useState({
    id: "",
    name: "",
    price: "",
    category: "",
    description: "",
    url: "",
  });
  let count = 0;
  let name, value;
  const registerInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setProductDetails({ ...productDetails, [name]: value });
  };

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
  };

  const getData = () => {
    // console.log(item.id)
    setProductDetails({
      ...productDetails,
      id: item.id,
      name: item.name,
      category: item.category,
      price: item.price,
      description: item.description,
    });
  };

  const postData = () => {
    const { name, price, id, description, url, category } = productDetails;
    url = fileUrl;
    console.log(url);
    // console.log(id)
    // const getData = async () => {
    //   try {
    //     const items = await getDocs(collection(db, "products"));
    //     const productsArray = [];
    //     items.forEach((doc) => {
    //       const obj = {
    //         id: doc.id,
    //         ...doc.data(),
    //       };
    //       productsArray.push(obj);
    //     });
    //     setProducts(productsArray);
    //     // console.log(productsArray);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    if(url){

      const docRef = doc(db, "products", id);
      updateDoc(docRef, {
        name,
        price,
        category,
        description,
        url,
      });
    }else{
      const docRef = doc(db, "products", id);
      updateDoc(docRef, {
        name,
        price,
        category,
        description,
      });
    }
  };

  useEffect(() => {
    getData();
    // console.log(productDetails);
  }, [count]);

  function closeModal() {
    postData();
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
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-1.5 text-center inline-flex items-center mr-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
          <path
            fillRule="evenodd"
            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
            clipRule="evenodd"
          />
        </svg>
        Edit
      </button>

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
                    Edit Product Details
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
                  <form action="" method="post" onSubmit={postData}>
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
                          id="name"
                          name="name"
                          value={productDetails.name}
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
                          id="price"
                          name="price"
                          value={productDetails.price}
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
                        value={productDetails.category}
                        onChange={registerInputs}
                        className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      >
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
                        id="message"
                        rows="4"
                        name="description"
                        value={productDetails.description}
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
                          onChange={onFileChange}
                          value={productDetails.url}
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

                <div className="mt-4">
                  <button
                    type="submit"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
