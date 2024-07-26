import reportWebVitals from "./reportWebVitals";
import ReactDOM from "react-dom/client";
import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import GameStart from "./routes/GameStart/GameStart";
import Game from "./routes/Game/Game";
import App from "./routes/App/App";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  {
    path: "/game",
    element: <Game />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
