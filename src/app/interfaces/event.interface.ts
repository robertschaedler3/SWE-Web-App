import { Location } from './location.interface';
import { Tag } from './tag.interface';

export interface Event {
    id: number;
    title: string;
    description: string;
    day: Date;
    start_time: string;
    end_time: string;
    // location: Location;
    building: string;
    room: number;
    // tags: Tag[];
    tags: string[];
}