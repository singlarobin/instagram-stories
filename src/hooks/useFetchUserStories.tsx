import { useState } from "react";
import { toasts } from "../ui-components";
import { useDispatch } from "react-redux";
import { updateStoriesList } from "../Pages/Home/homeReducer";

export const useFetchUserStories = () => {
    const dispatch = useDispatch();
    const [isFetchingStories, setIsFetchingStories] = useState(false);

    const fetchUserStories = async () => {
        try {
            setIsFetchingStories(true);
            const response = await fetch("/assets/json/stories.json");
            const data = await response.json();

            dispatch(
                updateStoriesList({
                    data: data,
                })
            );
        } catch (err) {
            if (err instanceof Error) {
                toasts("error", err.message, "error-user-stories-data");
            }
        } finally {
            setIsFetchingStories(false);
        }
    };

    return {
        isFetchingStories,
        fetchUserStories,
    };
};
