import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import NavComponent from "../components/NavComponent";
import { Link } from "react-router-dom";
const SearchPage = () => {
  const [loading, setLoading] = useState([]);
  const [activities, setactivities] = useState([]);
  const [search, setSearch] = useState("");
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

  const filteredActivities = activities.filter((activities) =>
    activities.name.toLowerCase().includes(search.toLowerCase())
  );
  console.log(filteredActivities);
  return (
    <div className="bg-primarycolor h-full">
      <h1 className="ml-5 py-5 text-4xl text-white">Søg</h1>

      <form
        onChange={(e) => setSearch(e.target.value)}
        className="w-auto  mx-5 h-10 flex justify-between items-center bg-[#c4c4c4] bg-opacity-30"
      >
        <input
          className="outline-none bg-transparent text-lg text-white p-5 w-full"
          type="search"
          name="search"
          id=""
        />
        <FiSearch className="text-2xl text-gray mr-2" />
      </form>
      <br />
      {!filteredActivities.length && search.length > 1 ? (
        <div className="ml-5 bg-primarycolor min-h-screen">
          <span className="flex text-lg text-gray">
            Your search did not give any results.
          </span>
          <span className=" text-gray">Try to search for something else</span>
        </div>
      ) : !loading ? (
        <div className="min-h-screen  bg-primarycolor">
          <h1 className=" text-gray pl-5 py-5 text-4xl">Aktiviteter</h1>
          <div className="flex flex-col pb-20 gap-8">
            {activities
              .filter((activities) => {
                return search.toLocaleLowerCase() === ""
                  ? ""
                  : activities.name.toLocaleLowerCase().includes(search);
              })
              .map((activities) => (
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
        <div className="min-h-screen  bg-primarycolor">
          <h2 className=" text-gray pl-5 py-5 text-4xl">Aktiviteter</h2>
        </div>
      )}

      <NavComponent></NavComponent>
    </div>
  );
};

export default SearchPage;
