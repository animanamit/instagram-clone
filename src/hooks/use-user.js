import { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { getUserByUserId } from "../services/firebase";

export default function useUser() {
  const [activeUser, setActiveUser] = useState({});
  const { user } = useContext(UserContext);
  useEffect(() => {
    // this function will be used to call the firebase service that gets the user data based on the user id
    // generate the function
    async function getUserObjByUserId() {
      const [response] = await getUserByUserId(user.uid);
      setActiveUser(response);
    }

    // check the context to see if there is a user logged in and authenticated, if so, get their data
    if (user) {
      if (user.uid) {
        // run the function
        getUserObjByUserId();
      }
    }
  }, [user]);

  return { user: activeUser };
}
