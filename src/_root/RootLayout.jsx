import { Topbar, Sidebar, Bottombar } from "../components/ui/shared/index";
import React from "react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="md:flex w-full">
      <Topbar />
      <Sidebar />
      <section className="flex flex-1 h-full">
        <Outlet />
      </section>
      <Bottombar />
    </div>
  );
};

export default RootLayout;
