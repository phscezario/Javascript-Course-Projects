import React from "react";
import { Header } from "../";
import * as S from "./styled";

const Layout = ({ children }) => {
  return (
    <S.WrapperLayout>
      <S.Title>Enter gitHub user name:</S.Title>
      <Header />
      {children}
    </S.WrapperLayout>
  );
};

export default Layout;
