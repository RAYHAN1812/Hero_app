import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../layouts/Mainlayout";
import Home from "../assets/pages/Home";
import Apps from "../assets/pages/Apps";
import Installation from "../assets/pages/Installation";
import Errorpage from "../assets/pages/Errorpage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout />,
    errorElement: <Errorpage />,
    children: [
      { index: true, element: <Home /> },
      { path: "apps", element: <Apps /> },
      { path: "installation", element: <Installation /> },
    ],
  },
  { path: "*", element: <Errorpage /> },
]);

export default router;
