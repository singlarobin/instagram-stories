import { useEffect } from "react";

import "./App.css";

import { RouterProvider } from "react-router-dom";
import routes from "./router/router";

function App() {
    return (
        <>
            <RouterProvider router={routes} />
        </>
    );
}

export default App;
