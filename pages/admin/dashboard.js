import React from "react";
import AdminNavbar from "../../components/Admin/AdminNavbar";
import AdminSection from "../../components/Admin/AdminSection";


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
