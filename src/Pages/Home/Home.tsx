import { useEffect, useMemo, useState } from "react";
import { HomeContainer, StoryContainer } from "./Home.styled";
import { Loader } from "../../ui-components";
import { useFetchUserData } from "./hooks/useFetchUserData";
import { useFetchUserStories } from "./hooks/useFetchUserStories";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { UserDetailsType } from "./types";
import { currentUserId } from "../../utils/constant";
import { StoryCard } from "../../components/StoryCard/StoryCard";

export const Home = () => {
    const { isFetchingUser, fetchUsersData } = useFetchUserData();
    const { isFetchingStories, fetchUserStories } = useFetchUserStories();

    const [userDataObj, setUserDataObj] = useState<
        Record<string, UserDetailsType>
    >({});
    const [usersHavingStoryList, setUserHavingStoryList] = useState<
        UserDetailsType[]
    >([]);

    const { homeReducer } = useSelector((state: RootState) => state);

    console.log("homeReducer", homeReducer, usersHavingStoryList);

    const { userData, storiesData } = homeReducer;

    useEffect(() => {
        void fetchUsersData();
        void fetchUserStories();
    }, []);

    useEffect(() => {
        setUserDataObj(
            userData.reduce((userObj, currentUser) => {
                return {
                    ...userObj,
                    [currentUser.id]: currentUser,
                };
            }, {})
        );
    }, [JSON.stringify(userData)]);

    useEffect(() => {
        void filterUsersHavingStories();
    }, [JSON.stringify(userDataObj), JSON.stringify(storiesData)]);

    const filterUsersHavingStories = () => {
        const userObj: Record<string, UserDetailsType> = {};

        storiesData
            .filter((currentStory) => currentStory.userId !== currentUserId)
            .forEach((currentStory) => {
                userObj[currentStory.userId] = userDataObj[currentStory.userId];
            });

        const userList: UserDetailsType[] = [];
        for (const userKey of Object.keys(userObj)) {
            userList.push(userObj[userKey]);
        }

        setUserHavingStoryList(userList);
    };

    return (
        <HomeContainer>
            <StoryContainer>
                <StoryCard
                    user={userData.find((user) => user.id === currentUserId)}
                    canCreate={true}
                />
                {usersHavingStoryList.map((user) => (
                    <StoryCard key={user.id} user={user} />
                ))}
            </StoryContainer>
            <Loader showLoader={isFetchingUser || isFetchingStories} />
        </HomeContainer>
    );
};
