import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import TryOn from "./pages/TryOn";
import Wardrobe from "./pages/Wardrobe";
import Dashboard from "./pages/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "tryon", element: <TryOn /> },
      { path: "wardrobe", element: <Wardrobe /> },
      { path: "dashboard", element: <Dashboard /> },
    ],
  },
]);
