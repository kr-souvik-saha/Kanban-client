import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Auth/views/Home";
import SignIn from "./Auth/views/SignIn";
import SignUp from "./Auth/views/SignUp";
import { UserContextProvider } from "./Auth/context/UserContext";
import Protected from "./Auth/views/Protected";
import Profile from "./Auth/views/Profile";
import Logout from "./Auth/views/Logout";
import KanbanBoard from "./Kanban/Views/KanbanBoard";
import KanBanMain from "./Kanban/Views/KanbanMain";

function App() {
  const router = createBrowserRouter([
    {
      path: "/signup",
      element: <SignUp> </SignUp>,
    },
    {
      path: "/signin",
      element: <SignIn> </SignIn>,
    },
    {
      path: "/profile",
      element: (
        <Protected>
          <Profile> </Profile>{" "}
        </Protected>
      ),
    },
    {
      path: "/logout",
      element: <Logout> </Logout>,
    },
    {
      path: "/",
      element: (
        <Protected>
          <Home> </Home>{" "}
        </Protected>
      ),
    },
    {
      path: "/kanban",
      element: (
        <Protected>
          <KanBanMain />
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
          <RouterProvider router={router} />{" "}
        </div>{" "}
      </UserContextProvider>{" "}
    </>
  );
}

export default App;
