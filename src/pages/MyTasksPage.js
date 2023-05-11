import UnauthorizedPage from "./UnauthorizedPage";
import { validateToken } from "../util/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import NavigationBar from "../components/navigationBar/NavigationBar";

const MyTasksPage = () => {
  const auth = getAuth();
  const [isAuthorizedUser, setIsAuthorizedUser] = useState(true);

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
  if (!isAuthorizedUser) {
    return <UnauthorizedPage />;
  }

  return (
    <div>
      <NavigationBar />
      <h1>MyTasks</h1>
    </div>
  );
};
export default MyTasksPage;
