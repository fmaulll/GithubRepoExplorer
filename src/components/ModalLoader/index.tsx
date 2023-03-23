import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ModalLoader = () => {
  return (
    <div className="bg-[rgba(0,0,0,0.2)] w-full fixed h-screen top-0 bottom-0 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <AiOutlineLoading3Quarters size="60" className="animate-spin" />
        Loading...
      </div>
    </div>
  );
};

export default ModalLoader;
