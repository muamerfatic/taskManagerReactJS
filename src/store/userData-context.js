import React from "react";

const UserDataContext = React.createContext({
  userUsername: "",
  userEmail: "",
  userUID: "",
  userBirthday: "",
  userPosition: "",
  setInitialValue: (initialEmail) => {},
  addBirthday: (newBirthday) => {},
  addPosition: (newPosition) => {},
});

export default UserDataContext;
