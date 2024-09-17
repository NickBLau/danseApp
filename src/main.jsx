import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import ActivityDetailsPage from "./pages/ActivityDetailsPage.jsx";
import ActivityPage from "./pages/ActivityPage.jsx";
import CalendarPage from "./pages/CalendarPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import WelcomePage from "./pages/WelcomePage.jsx";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<WelcomePage />} />
      <Route
        path="/ActivityDetailsPage/:id"
        element={<ActivityDetailsPage />}
      />
      <Route path="/Activity/" element={<ActivityPage />} />
      <Route path="/Calendar/" element={<CalendarPage />} />
      <Route path="/Login/" element={<LoginPage />} />
      <Route path="/Search/" element={<SearchPage />} />
      <Route path="/Welcome/" element={<WelcomePage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
