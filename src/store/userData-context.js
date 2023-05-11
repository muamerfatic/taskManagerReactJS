import React from "react";

const UserDataContext = React.createContext({
  userAccessToken: "",
  userUsername: "",
  userEmail: "",
  userUID: "",
});

export default UserDataContext;
