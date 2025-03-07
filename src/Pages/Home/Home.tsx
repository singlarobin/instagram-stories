import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store";
import { currentUserId } from "../../utils/constant";
import { StoryCard } from "../../components/StoryCard/StoryCard";

import { UserDetailsType } from "./types";
import { HomeContainer, StoryContainer } from "./Home.styled";
import { updateUsersHavingStoryList } from "./homeReducer";

export const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [userDataObj, setUserDataObj] =
        useState<Record<string, UserDetailsType>>();

    const { homeReducer } = useSelector((state: RootState) => state);

    const { userData, storiesData, usersHavingStoryList } = homeReducer;

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
        if (
            userDataObj !== null &&
            userDataObj !== undefined &&
            storiesData !== null &&
            storiesData !== undefined
        ) {
            void filterUsersHavingStories();
        }
    }, [JSON.stringify(userDataObj), JSON.stringify(storiesData)]);

    const filterUsersHavingStories = () => {
        if (userDataObj !== null && userDataObj !== undefined) {
            const userObj: Record<string, UserDetailsType> = {};

            storiesData
                .filter((currentStory) => currentStory.userId !== currentUserId)
                .forEach((currentStory) => {
                    userObj[currentStory.userId] =
                        userDataObj[currentStory.userId];
                });

            const userList: UserDetailsType[] = [];
            for (const userKey of Object.keys(userObj)) {
                if (userObj[userKey]) {
                    userList.push(userObj[userKey]);
                }
            }

            dispatch(
                updateUsersHavingStoryList({
                    data: userList,
                })
            );
        }
    };

    const handleShowStory = (userId: string) => {
        navigate(`/stories/${userId}`);
    };

    return (
        <HomeContainer>
            <StoryContainer id="story-list-container">
                <StoryCard
                    user={userData.find((user) => user.id === currentUserId)}
                    canCreate={true}
                    handleShowStory={handleShowStory}
                />
                {usersHavingStoryList.map((user) => (
                    <StoryCard
                        key={user.id}
                        user={user}
                        handleShowStory={handleShowStory}
                    />
                ))}
            </StoryContainer>
        </HomeContainer>
    );
};
