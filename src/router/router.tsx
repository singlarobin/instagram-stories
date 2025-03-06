import { createBrowserRouter } from "react-router-dom";
import { Home } from "../Pages/Home/Home";
import { Stories } from "../Pages/Stories/Stories";

const allRoutes = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/stories/:userId",
        element: <Stories />,
    },
    //   {
    //     path: "*",
    //     element: <PrivateWrapper(ErrorPage),
    //   },
];

const routes = createBrowserRouter(
    allRoutes.map((route) => {
        return route;
    })
);

export default routes;
