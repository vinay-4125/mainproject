import { Switch } from "@headlessui/react";
import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../src/config/firebase.config";

const StockSwitch = ({ id, quant }) => {
  const [enabled, setEnabled] = useState(quant);
  //   const itemId = id;
  //   console.log(itemId)
  const postData = (itemId) => {
    // console.log(itemId);
    const quantity = enabled;
    // console.log(quantity, itemId);
    const docRef = doc(db, "products", itemId);
    updateDoc(docRef, {
      quantity,
    });
  };

  useEffect(() => {
    postData(id);
  }, []);
  return (
    <>
      {enabled ? (
        <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
          Acitve
        </span>
      ) : (
        <span className="inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full">
          Out of Stock
        </span>
      )}
      <div className="py-2 px-2">
        <Switch
          checked={enabled}
          onClick={postData(id)}
          onChange={setEnabled}
          className={`${enabled ? "bg-teal-900" : "bg-red-700"}
          relative inline-flex flex-shrink-0 h-6 w-10 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${enabled ? "translate-x-4 " : "translate-x-0"}
            pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-300`}
          />
        </Switch>
      </div>
    </>
  );
};

export default StockSwitch;

{/* <Switch
          checked={enabled}
          onClick={postData(id)}
          onChange={setEnabled}
          className={`${enabled ? "bg-teal-900" : "bg-red-700"}
          relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${enabled ? "translate-x-5 translate-y-[0.4px]" : "translate-x-[0.7px] translate-y-[0.2px]"}
            pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-300`}
          />  </Switch> */}