import { useState } from "react";
import { toasts } from "../ui-components";
import { useDispatch } from "react-redux";
import { updateUserList } from "../Pages/Home/homeReducer";

export const useFetchUserData = () => {
    const dispatch = useDispatch();
    const [isFetchingUser, setIsFetchingUser] = useState(false);

    const fetchUsersData = async () => {
        try {
            setIsFetchingUser(true);
            const response = await fetch("/assets/json/user.json");
            const data = await response.json();

            dispatch(
                updateUserList({
                    data: data,
                })
            );
        } catch (err) {
            if (err instanceof Error) {
                toasts("error", err.message, "error-user-data");
            }
        } finally {
            setIsFetchingUser(false);
        }
    };

    return {
        isFetchingUser,
        fetchUsersData,
    };
};
