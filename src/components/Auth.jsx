import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { LoginPopup } from "../components";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Auth({ children, authentication, allowedRoles }) {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  let accountType = useSelector((state) => state.auth.accountType);
  console.log(accountType);
  accountType === null ? (accountType = "all") : accountType;

  useEffect(() => {
    if (!authentication && authStatus !== authentication) {
      return;
    }

    if (!allowedRoles.includes(accountType)) {
      toast.error("You lost your way!");
      navigate("/");
    }
  }, [authStatus, authentication, navigate]);

  if (authentication && authStatus !== authentication) {
    return <LoginPopup />;
  }

  return children;
}

export default Auth;
