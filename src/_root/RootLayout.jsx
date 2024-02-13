import { Topbar, Sidebar } from "../components/ui/shared/index";
import React from "react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      <Topbar />
      <Sidebar />
      <section>
        <Outlet />
      </section>
    </div>
  );
};

export default RootLayout;
