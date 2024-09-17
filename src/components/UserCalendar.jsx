import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import LogOutButton from "./LogOutButton";
const UserCalendar = () => {
  const [userInfo, setUserInfo] = useState([]);
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
  console.log(userInfo);
  console.log(loggedIn);
  console.log(token);
  console.log(userID);
  return (
    <>
      <div className="min-h-screen bg-primarycolor">
        <h1 className="pl-5 pt-5 pb-10  text-gray text-4xl">Kalender</h1>

        {userInfo?.activities?.length > 0 ? (
          userInfo.activities?.map((activity, index) => (
            <Link to={`/ActivityDetailsPage/${activity.id}`} key={activity.id}>
              <section className="bg-white rounded-md w-auto mb-5 flex flex-col justify-center items-start pl-5 h-28 mx-5">
                <div key={index}>
                  <h2 className="text-black text-4xl pr-5 w-80 truncate">
                    {activity.name}
                  </h2>
                  <div className="flex gap-1">
                    <p className="text-black  text-lg">{activity.weekday}</p>
                    <p className="text-black text-lg">{activity.time}</p>
                  </div>
                </div>
              </section>
            </Link>
          ))
        ) : (
          <div>
            <p className="ml-5 text-lg text-white">
              You are not signed up for any classes
            </p>
            <Link to="/Activity">
              <p className="ml-5 mt-5 text-lg text-gray">
                Click <span className=" text-pink font-bold">here</span> to see
                classes
              </p>
            </Link>
          </div>
        )}
        <div className="flex mt-20 pb-10 font-semibold justify-center">
          <LogOutButton></LogOutButton>
        </div>
      </div>
    </>
  );
};

export default UserCalendar;
