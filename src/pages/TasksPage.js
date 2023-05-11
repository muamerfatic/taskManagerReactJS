import NavigationBar from "../components/navigationBar/NavigationBar";
import { validateToken } from "../util/auth";
import UnauthorizedPage from "./UnauthorizedPage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";

const TasksPage = () => {
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
      <h1>Tasks</h1>
    </div>
  );
};
export default TasksPage;
