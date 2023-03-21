import React, { FC } from "react";

interface Props {
  placeholder: string;
  className: string
}

const Search: FC<Props> = ({ placeholder, className }) => {
  return (
    <input
      placeholder={placeholder}
      className={`w-full p-2 focus:outline-none border-2 border-gray-300 bg-gray-200 text-sm ${className}`}
      type="text"
    />
  );
};

export default Search;
