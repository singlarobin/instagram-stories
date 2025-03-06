import { useEffect } from "react";

import "./App.css";

import { RouterProvider } from "react-router-dom";
import routes from "./router/router";
import { useFetchUserData } from "./hooks/useFetchUserData";
import { useFetchUserStories } from "./hooks/useFetchUserStories";
import { Loader } from "./ui-components";

function App() {
    const { isFetchingUser, fetchUsersData } = useFetchUserData();
    const { isFetchingStories, fetchUserStories } = useFetchUserStories();

    useEffect(() => {
        void fetchUsersData();
        void fetchUserStories();
    }, []);

    return (
        <>
            <RouterProvider router={routes} />
            <Loader showLoader={isFetchingUser || isFetchingStories} />
        </>
    );
}

export default App;
