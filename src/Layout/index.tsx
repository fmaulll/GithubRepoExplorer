import React, { FC } from "react";
import { useSelector } from "react-redux";
import ModalLoader from "../components/ModalLoader";
import { RootState } from "../store";

interface Props {
  children: React.ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const isLoading = useSelector((state: RootState) => state.ui.loading);
  return (
    <div className="bg-gray-300 min-h-screen flex justify-center items-center">
      {children}
      {isLoading ? <ModalLoader /> : null}
    </div>
  );
};

export default Layout;
