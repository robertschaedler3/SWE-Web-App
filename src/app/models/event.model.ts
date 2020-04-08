export interface StevensEvent {
    title: string;
    description: string;
    author: string;
    authorId: string;
    authorThumbnail?: string;
    start: Date;
    end: Date;
    building: string;
    room: number;
    thumbnail?: string;
}