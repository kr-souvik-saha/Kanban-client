import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./views/Home";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import { UserContextProvider } from "./context/UserContext";
import Protected from "./views/Protected";
import Profile from "./views/Profile";
import Logout from "./views/Logout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/signup",
      element: <SignUp></SignUp>,
    },
    {
      path: "/signin",
      element: <SignIn></SignIn>,
    },
    {
      path: "/profile",
      element: (
        <Protected>
          <Profile></Profile>
        </Protected>
      ),
    },
    {
      path: "/logout",
      element: <Logout></Logout>,
    },
    {
      path: "/",
      element: (
        <Protected>
          <Home></Home>
        </Protected>
      ),
    },
    {
      path: "*",
    },
  ]);
  return (
    <>
      <UserContextProvider>
        <div className="Route">
          <RouterProvider router={router} />
        </div>
      </UserContextProvider>
    </>
  );
}

export default App;
