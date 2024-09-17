import LogOutButton from "./LogOutButton";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext";

const InstructorCalendar = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [activity, setActivity] = useState([]);
  const [rosterInfo, setRosterInfo] = useState([]);
  const [length, setLength] = useState([0]);
  const [loading, setLoading] = useState(false);
  const { loggedIn, setLoggedIn, token, setToken, userID, setUserID } =
    useContext(UserContext);

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

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:4000/api/v1/activities/${userID}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setActivity(data);
        setLength(data.users.length);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);

    fetch(`http://localhost:4000/api/v1/users/${userID}/roster/${userID}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRosterInfo(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  console.log(activity.users);
  console.log(length);
  console.log(rosterInfo);
  // console.log(userInfo);
  return (
    <>
      <div className="min-h-screen pl-5 pt-5 bg-primarycolor">
        <section className="mb-5">
          <h1 className="text-4xl ml-5 pr-5 pb-5 text-white truncate">
            {activity.name}
          </h1>
        </section>

        <div className="flex flex-col">
          {length > 0 ? (
            rosterInfo.map((rosterInfo, index) => (
              <p className="text-white ml-5 text-lg" key={index}>
                {rosterInfo.firstname + " " + rosterInfo.lastname}
              </p>
            ))
          ) : (
            <p className="text-white ml-5 text-lg">
              Ingen brugere er i øjeblikket tilmeldt
            </p>
          )}
        </div>
        <div className="flex mt-20 font-semibold justify-center">
          <LogOutButton></LogOutButton>
        </div>
      </div>
    </>
  );
};

export default InstructorCalendar;
