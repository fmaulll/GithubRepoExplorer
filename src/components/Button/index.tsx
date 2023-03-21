import React, { FC } from "react";

interface Props {
  children: React.ReactNode;
}

const Button: FC<Props> = ({ children }) => {
  return (
    <button className="w-full bg-blue-500 text-gray-200 p-2">{children}</button>
  );
};

export default Button;
