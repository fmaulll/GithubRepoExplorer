import React, { FC } from "react";

interface Props {
  children: React.ReactNode;
}

const Card: FC<Props> = ({ children }) => {
  return <div className="w-full lg:w-1/4 p-4 bg-white h-3/4">{children}</div>;
};

export default Card;
