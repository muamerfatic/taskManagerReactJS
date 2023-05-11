import UnauthorizedPage from "./UnauthorizedPage";
import { validateToken } from "../util/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import NavigationBar from "../components/navigationBar/NavigationBar";
import UserDataContext from "../store/userData-context";
import axios from "axios";
import { myFirebaseUrl } from "../util/myFirebase";

const DashboardPage = () => {
  const auth = getAuth();
  const [isAuthorizedUser, setIsAuthorizedUser] = useState(true);
  const ctxUserData = useContext(UserDataContext);

  async function getUser() {
    try {
      //all of this just to get username :)
      const uid = JSON.parse(localStorage.getItem("userData")).uid;
      console.log(uid);
      const response = await axios.get(
        myFirebaseUrl + "users/" + uid + ".json"
      );
      const username = response.data.username;
      ctxUserData.userUsername = username;
      const userDataObject = {
        email: ctxUserData.userEmail,
        uid: auth.currentUser.uid,
        username,
      };
      localStorage.setItem("userData", JSON.stringify(userDataObject));
    } catch (error) {
      console.error(error);
    }
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      if (!validateToken(user.accessToken)) {
        setIsAuthorizedUser(false);
      }
    } else {
      // User is signed out
      setIsAuthorizedUser(false);
    }
  });

  useEffect(() => {
    getUser();
  }, [getUser]);

  console.log("context jeee ", ctxUserData);

  if (!isAuthorizedUser) {
    return <UnauthorizedPage />;
  }

  return (
    <div>
      <NavigationBar />
      <h1>Dashboard</h1>
    </div>
  );
};
export default DashboardPage;
