import {
    transition,
    trigger,
    state,
    style,
    animate,
} from '@angular/animations';

export const zoom =
    trigger('zoom', [
        transition(':leave', [
            style({
                transform: 'scale(10)'
            }),
            animate('1000ms 1000ms ease-out')
        ])
    ]);