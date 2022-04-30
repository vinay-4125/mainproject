import Image from "next/image";
import React from "react";

const Header = () => {



  return (
    <div>
      <div className="font-bold text-center mt-40 m-28 text-3xl flex justify-around flex-col sm:flex-row">
        <p className="my-auto sm:mx-12">The medicine you need at the tip of your fingertips. </p>
        {/* <p>Order now.</p> */}
        <span className="select-none">
          <Image src="/headeranimation.gif" height="330" width="430" alt="" draggable="false"/>
        </span>

      </div>
      {/* <div className="text-center">
        <input
          type="text"
          placeholder="Search Here...."
          className="sm:w-3/6 p-4 rounded border-2 bg-[#EDEDED]"
        />
      </div> */}
      {/* <Image src="https://icons8.com/illustrations/author/602a7603487a402c788ba374" width="100px" height="100px" /> */}
    </div>
  );
};

export default Header;
