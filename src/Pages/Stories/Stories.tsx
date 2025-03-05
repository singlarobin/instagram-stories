import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { RootState } from "../../store";
import { Text } from "../../ui-components";
import { currentUserId } from "../../utils/constant";
import { UserStorytype } from "../Home/types";
import {
    ProfileImg,
    StoryContainer,
    StoryHeader,
    StoryImg,
} from "./Stories.styled";

export const Stories = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { userId } = params;

    const { homeReducer } = useSelector((state: RootState) => state);

    const [currentStoryList, setCurrentStoryList] = useState<UserStorytype[]>(
        []
    );

    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    const { storiesData, userData, usersHavingStoryList } = homeReducer;

    const currentUserDetail = userData.find((user) => user.id === userId);

    const [navigateToUserId, setNavigateToUserId] = useState<{
        next?: string;
        previous?: string;
    }>({});

    useEffect(() => {
        setCurrentStoryList(
            storiesData.filter((story) => story.userId === userId)
        );
    }, [userId, JSON.stringify(storiesData)]);

    useEffect(() => {
        if (userId !== currentUserId) {
            const currentUserIndex = usersHavingStoryList.findIndex(
                (user) => user.id === userId
            );

            let next: string | undefined = undefined;
            let previous: string | undefined = undefined;

            if (currentUserIndex !== -1) {
                if (currentUserIndex < usersHavingStoryList.length - 1) {
                    next = usersHavingStoryList[currentUserIndex + 1].id;
                }

                if (currentUserIndex > 0) {
                    previous = usersHavingStoryList[currentUserIndex - 1].id;
                }
            }

            setNavigateToUserId({
                next,
                previous,
            });
        }
    }, [currentUserId, userId, JSON.stringify(usersHavingStoryList)]);

    useEffect(() => {
        if (
            currentStoryList.length > 0 &&
            currentIndex < currentStoryList.length
        ) {
            const timer = setTimeout(() => {
                handleNextStory();
            }, currentStoryList[currentIndex].duration);

            setProgress(0);

            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return (
                        prev +
                        (100 * 100) / currentStoryList[currentIndex].duration
                    ); // Updates progress every 100ms
                });
            }, 100);

            return () => {
                clearTimeout(timer);
                clearInterval(interval);
            };
        }
    }, [currentIndex, currentStoryList]);

    const handleNavigation = (key: "previous" | "next") => {
        let navigateToId: string | undefined;
        if (navigateToUserId?.[key] !== undefined) {
            navigateToId = navigateToUserId[key];
        }

        if (navigateToId) {
            setCurrentIndex(0);
            navigate(`/stories/${navigateToId}`);
        } else {
            navigate("/");
        }
    };

    const handleNextStory = useCallback(() => {
        if (currentIndex < currentStoryList.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            return;
        }

        handleNavigation("next");
    }, [
        currentIndex,
        JSON.stringify(currentStoryList),
        JSON.stringify(navigateToUserId),
    ]);

    const handlePrevStory = useCallback(() => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
            return;
        }

        handleNavigation("previous");
    }, [currentIndex, JSON.stringify(navigateToUserId)]);

    if (
        currentStoryList == null ||
        currentStoryList == undefined ||
        currentStoryList.length == 0 ||
        currentUserDetail === undefined ||
        currentIndex >= currentStoryList.length
    ) {
        return null;
    }

    return (
        <StoryContainer>
            <StoryHeader>
                <div className="progress-bar-container">
                    {currentStoryList.map((_, index) => (
                        <div key={index} className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{
                                    width:
                                        index === currentIndex
                                            ? `${progress}%`
                                            : index < currentIndex
                                            ? "100%"
                                            : "0%",
                                }}
                            ></div>
                        </div>
                    ))}
                </div>
                <div className="profile-container">
                    <ProfileImg src={currentUserDetail.imageUrl} />
                    <div className="text-container">
                        <Text color="var(--color-white)">
                            {currentUserDetail.userName}
                        </Text>
                        <Text size="small" color="var(--color-gainsboro)">
                            {currentStoryList[currentIndex].time}
                        </Text>
                    </div>
                </div>
            </StoryHeader>
            <div className="story-navigation">
                <div className="left-click" onClick={handlePrevStory}></div>
                <div className="right-click" onClick={handleNextStory}></div>
            </div>
            <StoryImg src={currentStoryList[currentIndex].url} />
        </StoryContainer>
    );
};
