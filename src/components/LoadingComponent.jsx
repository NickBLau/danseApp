import Lottie from "lottie-react";
import LoadingAnimation from "../assets/LoadingAnimation.json";

const LoadingComponent = ({ text }) => {
  return (
    <div className="h-screen  bg-primarycolor">
      <p className="text-center pt-5 text-lg text-white">Loader {text}</p>
      <Lottie animationData={LoadingAnimation} />
    </div>
  );
};

export default LoadingComponent;
