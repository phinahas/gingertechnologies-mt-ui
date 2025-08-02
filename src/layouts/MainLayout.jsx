import React from "react";
import { Outlet, Link } from "react-router-dom";
import CustomAppBar from "../components/CustomAppBar";

//hooks
import useInMobile from '../hooks/useInMobile'

const MainLayout = () => {

  const isMobile = useInMobile();

  if (isMobile) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>This app is not available on mobile devices.</h2>
      </div>
    );
  }

  return (
    <>
    <CustomAppBar/>
    <Outlet/>
    </>
  );
};

export default MainLayout;
