import React, { useState, useEffect } from "react";
import splashImage from "../assets/splash-image.jpg";
import NavComponent from "../components/NavComponent";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import LogOutButton from "../components/LogOutButton";
const LoginPage = () => {
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
  const [loginError, setLoginError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  //////-------------------login--------------///////////
  const login = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      };
      setLoading(true);
      setLoginError(false);
      const response = await fetch("http://localhost:4000/auth/token", options);
      const data = await response.json();
      const tokenValue = data.token;
      const userIDValue = data.userId;
      const userRole = data.role;

      setToken(tokenValue);
      setUserID(userIDValue);
      setUserRole(userRole);
      setLoggedIn(true);
      console.log(loggedIn);

      console.log(response);
      console.log(data);
      setLoggedIn(true);
      navigate("/Calendar");
    } catch (error) {
      setLoginError(true);
      console.error(error);
      setLoggedIn(false);

      console.log("failure");
    } finally {
      setLoading(false);
    }
  };
  //////-------------------logout--------------///////////
  const logout = () => {
    setToken(null);
    setLoggedIn(false);
    setUserID(null);
    console.log("login status" + loggedIn);
  };

  //////-------------------zod--------------///////////
  const schema = z.object({
    user: z.string().min(4),
    password: z.string().min(3),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      console.log("submit_Data" + dataValue);
    } catch (error) {
      setError("root", {
        userMessage: "Username must be at least 40 characters",
        passwordMessage: "Password must be at least 3 characters",
      });
    }
  };
  //////-------------------logs--------------///////////
  useEffect(() => {
    console.log("login status " + loggedIn);
    console.log("userID " + userID);
    console.log("userRole " + userRole);
    console.log("userToken " + token);
  }, [loggedIn]);

  return (
    <div
      className="bg-center bg-[length:750px_] max-h-full w-screen bg-no-repeat flex flex-col justify-center"
      style={{
        backgroundImage: `url(${splashImage})`,
        height: "100vh",
      }}
    >
      <section className=" overflow-hidden grid grid-cols-7 grid-rows-7 ">
        <div className=" bg-primarycolor col-start-0 row-end-2 relative bottom-12 z-10  w-[440px] h-screen overflow-hidden  rotate-[65deg] opacity-50"></div>
        <div className="ml-10 col-start-1 col-end-7 z-20 row-start-3 w-full">
          <h1 className="text-5xl mb-5 text-white">Log ind</h1>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className="h-12 w-11/12 text-lg p-5 "
              type="text"
              placeholder="brugernavn"
              {...register("user", { required: true, min: 4 })}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.user && (
              <div className="text-red-500">Error!!! {errors.user.message}</div>
            )}
            <input
              className="h-12 w-11/12 text-lg p-5 "
              type="password"
              placeholder="adgangskode"
              {...register("password", { required: true, min: 3 })}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <div className="text-red-500">
                Error! {errors.password.message}
              </div>
            )}
            {!loggedIn ? (
              <button
                className="items-center w-60 h-14 bg-primarycolor mb-10 mx-5 text-lg text-white rounded-xl"
                onClick={login}
                disabled={isSubmitting}
                type="submit"
                // text={loading ? " Logger ind .." : "LOG IN"}
              >
                {loading ? " Logger ind .." : "LOG IN"}
              </button>
            ) : (
              <LogOutButton></LogOutButton>
            )}
          </form>
          <span className="ml-14 text-red-500">
            {loginError ? "Invalid username or password" : ""}
          </span>
        </div>
      </section>
      <div className="grid z-20">
        <NavComponent></NavComponent>
      </div>
    </div>
  );
};

export default LoginPage;
