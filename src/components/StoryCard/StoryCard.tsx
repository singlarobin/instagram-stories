import { CiCirclePlus } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";

import type { UserDetailsType } from "../../Pages/Home/types";
import { Text } from "../../ui-components";
import { deploymentUrl } from "../../utils/envVariables";
import { Card, Container, CreateBtn, UserImg } from "./StoryCard.styled";

type StoryCardProps = {
    user?: UserDetailsType;
    canCreate?: boolean;
};

export const StoryCard = ({ user, canCreate = false }: StoryCardProps) => {
    if (user === null || user === undefined) {
        return;
    }
    return (
        <Container>
            <Card>
                <UserImg src={deploymentUrl + user.imageUrl} />
                {canCreate && (
                    <CreateBtn
                        onClick={() => {
                            alert("Need to be implemented!");
                        }}
                    >
                        <FaPlus size={20} color="var(--color-black)" />
                    </CreateBtn>
                )}
            </Card>
            <Text fontWeight={700}>{user.userName}</Text>
        </Container>
    );
};
