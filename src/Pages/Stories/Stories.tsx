import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { IoCloseCircleOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

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

    const { storiesData, userData, usersHavingStoryList } = useSelector(
        (state: RootState) => state.homeReducer
    );

    const [currentStoryList, setCurrentStoryList] = useState<UserStorytype[]>(
        []
    );

    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [xtransitionValue, setxTransitionValue] = useState(-50);
    const ref = useRef(null);

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
        setxTransitionValue(-50);

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
        setxTransitionValue(50);
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
        <StoryContainer id="story-container" ref={ref}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={userId}
                    initial={{ opacity: 0, scale: 0.95, x: 50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95, x: xtransitionValue }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="story"
                >
                    <StoryHeader>
                        <div className="progress-bar-container">
                            {currentStoryList.map((_, index) => (
                                <div key={index} className="progress-bar">
                                    <div
                                        className={`progress-fill ${
                                            index === currentIndex
                                                ? "active"
                                                : ""
                                        }`}
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
                                <Text
                                    size="small"
                                    color="var(--color-gainsboro)"
                                >
                                    {currentStoryList[currentIndex].time}
                                </Text>
                            </div>
                        </div>
                    </StoryHeader>
                    <div className="story-navigation">
                        <div
                            className="left-click"
                            onClick={handlePrevStory}
                        ></div>
                        <div className="right-click" onClick={handleNextStory}>
                            <div
                                className="cross-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(-1);
                                }}
                            >
                                <IoCloseCircleOutline
                                    size={32}
                                    color="var(--color-white)"
                                />
                            </div>
                        </div>
                    </div>
                    <StoryImg src={currentStoryList[currentIndex].url} />
                </motion.div>
            </AnimatePresence>
        </StoryContainer>
    );
};
