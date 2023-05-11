import UserContext from "./userData-context";

const UserProvider = (props) => {
  const userDataContextValue = {
    userAccessToken: "",
    userUID: "",
    userUsername: "",
    userEmail: "",
  };
  console.log("testtttttttt")
  return (
    <UserContext.Provider value={userDataContextValue}>
      {props.children}
    </UserContext.Provider>
  );
};
export default UserProvider;
