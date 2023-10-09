import { useEffect, useState } from "react";
import { profileController } from "../controller/UserController";
import Home from "./Home";

export default function Profile() {
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  useEffect(() => {
    async function fetchData() {
      const response = await profileController();
      let data;
      response ? (data = response) : (data = null);
      if (data) {
        setUserId(data.userId);
        setUserName(data.userName);
        setFirstName(data.firstName);
        setLastName(data.lastName);
      }
    }

    fetchData();
  }, []);
  return (
    <>
      <Home></Home>
      <div>
        <h1>{`Hello! ${firstName} ${lastName} your userName is ${userName} and id is ${userId}`}</h1>
      </div>
    </>
  );
}
