export type UserDetailsType = {
    id: string;
    name: string;
    userName: string;
    imageUrl: string;
};

export type UserStorytype = {
    id: string;
    userId: string;
    type: "image" | "video";
    url: string;
    duration: number;
    time: string;
    seen?: boolean;
};
