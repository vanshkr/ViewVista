import React, { useEffect } from "react";
import { Button } from "../button";
import { Link, useNavigate } from "react-router-dom";
import { useSignOutAccount } from "@/lib/react-query/api";
import { useAuth } from "@/lib/context/AuthContext";
function Topbar() {
  const { mutateAsync: signOutAccount, isSuccess } = useSignOutAccount();
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);
  console.log(user);
  return (
    <section>
      {/*className="topbar"*/}
      <div className="flex-between py-4 px-5 items-center">
        <Link to="/" className="flex flex-1">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={130}
            height={325}
          />
        </Link>
        <div className="flex flex-1">
          <Button>
            <img
              variant="ghost"
              className="shad-button_ghost"
              src="/assets/icons/logout.svg"
              alt="logout"
              onClick={signOutAccount}
            />
          </Button>
          <Link to={`/profile/${user.id}`}>
            <img
              src={user.imageUrl || "/assets/images/profile-placeholder.svg"}
              alt="profile"
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Topbar;
