import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import LoadingComponent from "../components/LoadingComponent";

import NavComponent from "../components/NavComponent";
const ActivityDetailsPage = () => {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState([]);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState([]);

  let userRegistation = false;
  let ageRestriction = true;

  let matchingID = userInfo?.activities?.some((obj) => {
    if (obj.id == id) {
      console.log("yes");
      return (userRegistation = true);
    }
    console.log("no");
    return (userRegistation = false);
  });
  if (userInfo.age <= activity.maxAge && userInfo.age >= activity.minAge) {
    // console.log("you can sign up");
    ageRestriction = false;
  } else ageRestriction = true;
  // // console.log("you can not sign up");
  const [userIsRegistered, setUserIsRegistered] = useState(matchingID);
  const { loggedIn, setLoggedIn, token, setToken, userID, setUserID } =
    useContext(UserContext);
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:4000/api/v1/activities/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setActivity(data);
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const signUp = async () => {
    try {
      let method = "POST";

      if (userRegistation) {
        method = "DELETE";
      }

      const response = await fetch(
        `http://localhost:4000/api/v1/users/${userID}/activities/${id}`,
        {
          method: method,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.error(`${method} request failed:`, response.statusText);
        return;
      }

      setUserIsRegistered((prev) => !prev);

      console.log(`${method} request successful!`);
    } catch (error) {
      console.error("Error handling sign up:", error);
    }
  };
  //////////////---------fetch user------------/////////////
  useEffect(() => {
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
  }, [userIsRegistered]);

  console.log(userRegistation);
  console.log(userInfo);
  console.log(matchingID + " is id matching");
  console.log(id);

  return (
    <>
      <div className="h-screen  bg-primarycolor">
        {!loading ? (
          <div>
            <section
              className="flex bg-cover  bg-[center] bg-no-repeat items-end justify-end  h-[411px] flex-col  "
              style={{
                backgroundImage: `url(${activity.asset?.url})`,
              }}
            >
              {loggedIn && ageRestriction == true ? (
                <button className="items-center  w-60 h-12 bg-primarycolor mb-5 mr-5 text-white rounded-xl">
                  Kun for folk mellem
                  {" " + activity?.minAge + "-" + activity?.maxAge} år
                </button>
              ) : loggedIn && userRegistation == true ? (
                <button
                  onClick={signUp}
                  className="items-center   w-60 h-12 bg-primarycolor mb-5 mr-5 text-white rounded-xl"
                >
                  Forlad
                </button>
              ) : ageRestriction == false && userRegistation == false ? (
                <button
                  onClick={signUp}
                  className="items-center font-Ubuntu  w-60 h-12 bg-primarycolor mb-5 mr-5 text-white rounded-xl"
                >
                  Tilmeld
                </button>
              ) : (
                ""
              )}
            </section>
            <section className="w-full h-auto pl-5 pt-5 bg-primarycolor">
              <h1 className="text-white font-Ubuntu text-2xl">
                {activity.name}
              </h1>
              <p className="text-white font-Ubuntu text-lg">
                {activity?.minAge + "-" + activity?.maxAge} år
              </p>

              <p className="text-white font-Ubuntu text-lg">
                {activity.weekday + " " + activity.time}
              </p>

              <p className="text-white mt-2 mr-5   pb-24 font-Ubuntu text-lg">
                {activity.description}
              </p>
            </section>
          </div>
        ) : (
          <LoadingComponent text="Details"></LoadingComponent>
        )}

        <NavComponent></NavComponent>
      </div>
    </>
  );
};

export default ActivityDetailsPage;
