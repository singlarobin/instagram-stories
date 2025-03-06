import styled from "styled-components";

export const StoryContainer = styled.div`
    height: 100%;
    width: 100%;
    position: relative;

    .story-navigation {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
    }

    .left-click,
    .right-click {
        width: 50%;
        height: 100%;
    }
`;

export const StoryHeader = styled.div`
    position: absolute;
    width: 100%;
    top: 0px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    padding: 1rem;
    gap: 0.5rem;

    .progress-bar-container {
        width: 100%;
        display: flex;
        gap: 8px;
    }

    .progress-bar {
        flex: 1;
        height: 4px;
        background: var(--color-black);
        border-radius: 2px;
        overflow: hidden;
    }

    .progress-fill {
        height: 100%;
        background: white;
        transition: width 0.1s linear;
    }

    .profile-container {
        display: flex;
        gap: 1rem;
        justify-content: center;
        align-items: center;

        .text-container {
            display: flex;
            gap: 0.5rem;
            justify-content: center;
            align-items: center;
        }
    }
`;

export const StoryImg = styled.img`
    width: 100%;
    height: auto;
`;

export const ProfileImg = styled.img`
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
`;
