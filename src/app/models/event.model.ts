export interface StevensEvent {
    id?: string;
    title: string;
    description: string;
    author: string;
    authorId: string;
    authorThumbnail?: string;
    day: Date;
    start: number;
    end: number;
    building: string;
    room: number;
    thumbnail?: string;
}