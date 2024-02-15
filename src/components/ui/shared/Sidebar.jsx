import React from "react";
import { Link } from "react-router-dom";
function Sidebar() {
  return (
    <nav className="leftsidebar">
      <div className="flex flex-col">
        <Link to="/" className="flex flex-1">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={170}
            height={36}
          />
        </Link>
      </div>
    </nav>
  );
}

export default Sidebar;
