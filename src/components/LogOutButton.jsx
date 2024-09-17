import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";

const LogOutButton = () => {
  const {
    loggedIn,
    setLoggedIn,
    token,
    setToken,
    userID,
    setUserID,
    userRole,
    setUserRole,
  } = useContext(UserContext);
  const navigate = useNavigate();
  const logout = () => {
    setToken(null);
    setLoggedIn(false);
    setUserID(null);
    setUserRole(null);
    navigate("/Login");
    console.log("login status" + loggedIn);
  };
  return (
    <>
      <button
        onClick={logout}
        className="items-center w-60 h-14 text-lg  bg-white mb-10 mx-5 text-primarycolor rounded-xl"
        type="button"
      >
        LOG OUT
      </button>
    </>
  );
};

export default LogOutButton;
