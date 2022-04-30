import React from "react";
import AdminNavbar from "../../components/Admin/AdminNavbar";
import AdminSection from "../../components/Admin/AdminSection";
import Invoice from "../../components/Invoice";

const Invoiced = () => {
  return (
    <>
      {/* <Navbar />
      <Sidebar /> */}
      {/* <HomeDashboard/> */}
      <AdminNavbar current="true" />
      <AdminSection name="Invoice" length="null" />
      <Invoice />
    </>
  );
};

export default Invoiced;
