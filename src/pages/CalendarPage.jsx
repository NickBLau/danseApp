import { useState, useEffect } from "react";
import UserCalendar from "../components/UserCalendar";
import InstructorCalendar from "../components/InstructorCalendar";
import NavComponent from "../components/NavComponent";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import LoadingComponent from "../components/LoadingComponent";
const CalendarPage = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState([true]);
  const [user, setUser] = useState([false]);
  const { loggedIn, setLoggedIn, token, setToken, userID, setUserID } =
    useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:4000/api/v1/users/${userID}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUserInfo(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  console.log(loading);
  return (
    <>
      {!loading ? (
        !loggedIn ? (
          navigate("/Login")
        ) : userInfo.role === "instructor" ? (
          <InstructorCalendar></InstructorCalendar>
        ) : userInfo.role === "default" ? (
          <UserCalendar></UserCalendar>
        ) : (
          ""
        )
      ) : (
        <LoadingComponent text="kalender"></LoadingComponent>
      )}

      <NavComponent></NavComponent>
    </>
  );
};

export default CalendarPage;
