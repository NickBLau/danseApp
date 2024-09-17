import { useState, useEffect } from "react";
import LoadingComponent from "../components/LoadingComponent";
import NavComponent from "../components/NavComponent";
import { Link } from "react-router-dom";
const ActivityPage = () => {
  const [loading, setLoading] = useState([]);
  const [activities, setactivities] = useState([]);
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:4000/api/v1/activities/")
      .then((response) => response.json())
      .then((data) => {
        setactivities(data);
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  console.log(activities);
  return (
    <>
      {!loading ? (
        <div className="min-h-full  bg-primarycolor">
          <h1 className=" text-gray pl-5 py-5 text-4xl">Aktiviteter</h1>
          <div className="flex pb-20 flex-col gap-8">
            {activities.map((activities) => (
              <Link
                to={`/ActivityDetailsPage/${activities.id}`}
                key={activities.id}
              >
                <section
                  className="flex bg-cover mx-5  bg-[center] bg-no-repeat rounded-t-3xl  rounded-bl-3xl justify-end  h-[344px] bg-black flex-col  "
                  style={{
                    backgroundImage: `url(${activities?.asset?.url})`,
                  }}
                >
                  <div className="w-full bg-pink bg-opacity-80 rounded-tr-3xl pl-5 flex flex-col justify-center rounded-bl-3xl h-24">
                    <h2 className="text-lg">{activities?.name}</h2>
                    <p className="text-lg">
                      {activities?.minAge + "-" + activities?.maxAge} år
                    </p>
                  </div>
                </section>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <LoadingComponent text=" Aktiviteter"></LoadingComponent>
      )}
      <NavComponent></NavComponent>
    </>
  );
};

export default ActivityPage;
