import React, { FC } from "react";

interface Props {
  children: React.ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="bg-gray-300 h-screen flex justify-center items-center">
      {children}
    </div>
  );
};

export default Layout;
