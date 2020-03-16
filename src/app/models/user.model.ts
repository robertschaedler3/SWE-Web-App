import { Tag } from './tag.model';
import { StevensEvent } from './event.model';

export interface User {
    uid: string;
    displayName: string;
    email: string;
    photoURL: string;
    attending?: StevensEvent[];
    subscribed?: Tag[];
}