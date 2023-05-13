import UserContext from "./userData-context";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { myFirebaseUrl } from "../util/myFirebase";
import { useState, useEffect, useCallback } from "react";

const UserProvider = (props) => {
  const [userUID, setUserUID] = useState("");
  const [userUsername, setUserUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userBirthday, setUserBirthday] = useState("");
  const [userPosition, setUserPosition] = useState("");
  const addBirthdayHandler = (newBirthday) => {
    setUserBirthday(newBirthday);
  };
  const addPositionHandler = (newPosition) => {
    setUserPosition(newPosition);
  };
  const setInitialValue = (initialEmail) => {
    setUserEmail(initialEmail);
  };
  const userDataContextValue = {
    userUID,
    userUsername,
    userEmail,
    userBirthday,
    userPosition,
    setInitialValue,
    addBirthday: addBirthdayHandler,
    addPosition: addPositionHandler,
  };

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      //User is signed in
      setUserUID(user.uid);
    } else {
      // User is signed out
    }
  });

  async function getUser() {
    try {
      const response = await axios.get(
        myFirebaseUrl + "users/" + userUID + ".json"
      );
      const data = response.data;
      setUserEmail(data.email);
      setUserUsername(data.username);
      setUserPosition(data.position);
      setUserBirthday(data.birthday);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <UserContext.Provider value={userDataContextValue}>
      {props.children}
    </UserContext.Provider>
  );
};
export default UserProvider;
