import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    justify-content: center;
`;

export const Card = styled.div`
    border-radius: 50%;
    border: 3px solid var(--color-primary);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.2rem;
    position: relative;
`;

export const UserImg = styled.img`
    height: 4.8rem;
    width: 4.8rem;
    border-radius: 50%;
`;

export const CreateBtn = styled.div`
    position: absolute;
    bottom: 5px;
    right: 0px;
    background-color: white;
    border-radius: 50%;
    border: 2px solid var(--color-black);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.2rem;
`;
