import { Link } from "react-router-dom";
import splashImage from "../assets/splash-image.jpg";

const WelcomePage = () => {
  return (
    <>
      <div
        className="bg-center bg-[length:750px_]  bg-no-repeat flex flex-col justify-center md:bg-[length:1050px_] "
        style={{
          backgroundImage: `url(${splashImage})`,
          height: "100vh",
        }}
      >
        <section className="flex flex-col h-screen justify-end mb-10 md:ml-96">
          <div className="ml-7 ">
            <h1 className="font-Roboto text-opacity-0  text-purple font-outline-2 font-bold text-4xl ">
              LANDRUP
            </h1>
            <p className="font-RacingSansOne  text-hotPink font-outline-1  text-7xl ">
              DANS
            </p>
          </div>
          <div className="bg-purple mt-5 w-52 h-4"></div>
        </section>
        <div className="flex items-end  h-60  justify-center">
          <Link to="/Activity">
            <button className="items-center w-60 h-14 border-1 border-black border-solid bg-primarycolor mb-10 text-white rounded-xl animate-jump-in animate-duration-[1500ms] animate-delay-[1500ms] animate-ease-linear">
              Kom i gang
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
