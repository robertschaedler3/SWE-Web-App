import { firestore } from 'firebase';

export interface StevensEvent {
    id?: string;
    title: string;
    description: string;
    author: string;
    authorId: string;
    authorThumbnail?: string;
    day: firestore.Timestamp;
    start: number;
    end: number;
    building: string;
    room: number;
    thumbnail?: string;
}