import React from "react";
import AdminNavbar from "../../components/Admin/AdminNavbar";
import AdminSection from "../../components/Admin/AdminSection";
import HomeDashboard from "../../components/Admin/HomeDashboard";
import HomeDashboard2 from "../../components/Admin/HomeDashboard2";

import Navbar from "../../components/Admin/Navbar";
import Sidebar from "../../components/Admin/sidebar";

const dashboard = () => {
  return (
    <>
      {/* <Navbar />
      <Sidebar /> */}
      {/* <HomeDashboard/> */}
      <AdminNavbar current="true"/>
      <AdminSection name="Dashboard" length="null"/>
    </>
  );
};

export default dashboard;
