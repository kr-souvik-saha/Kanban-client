import { useContext, useEffect } from "react";
import { logoutController } from "../controller/UserController";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Logout() {
  const { userName, setUserName, userId, setUserId } = useContext(UserContext);

  useEffect(() => {
    setUserName(null);
    setUserId(null);
    logoutController();
  }, []);
  return <Navigate to="/signin" replace={true}></Navigate>;
}
