import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Protected({ children }) {
  const user = useContext(UserContext);

  if (!user.userId) {
    return <Navigate to="/signin" replace={true}></Navigate>;
  }
  return children;
}

export default Protected;
