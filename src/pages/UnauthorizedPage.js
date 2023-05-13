import { useNavigate } from "react-router-dom";
import { removeAuthToken } from "../util/auth";
import { auth } from "../firebase";

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    //remove possible token in local storage, it could be not valid.
    auth
      .signOut()
      .then((res) => {
        console.log("odjavljujem se");
      })
      .catch((err) => {
        //there shouldn't every be an error from firebase but just in case
        //iako nema usera ne bi trebao biti error :)
      });

    removeAuthToken();
    navigate("/");
  };
  return (
    <div>
      <h1>You shouldn't be here, because you are not logged in!</h1>
      <button onClick={onClickHandler}>Go to home page!</button>
    </div>
  );
};
export default UnauthorizedPage;
