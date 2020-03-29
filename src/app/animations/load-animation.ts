import {
    transition,
    trigger,
    state,
    style,
    animate,
    query,
    stagger
} from '@angular/animations';

export const fader =
    trigger('fader', [
        state('show', style({
            opacity: 1
        })),
        state('hide', style({
            opacity: 0
        })),
        transition(':enter', [
            style({
                opacity: 0,
            }),
            animate('600ms 100ms ease-out')
        ])
    ]);

export const fadeUp =
    trigger('fadeUp', [
        state('show', style({
            opacity: 1
        })),
        state('hide', style({
            opacity: 0
        })),
        transition(':enter', [
            style({
                opacity: 0,
                transform: 'translateY(50px) rotateX(-10deg)'
            }),
            animate('400ms 100ms ease-out')
        ])
    ]);

export const cardListFader =
    trigger('cardListFader', [
        transition(':enter', [
            query('div.event', style({
                transform: 'translateY(40px)',
                opacity: 0
            })),
            query('div.event',
                stagger('100ms', [
                    animate('300ms 600ms ease-out', style({
                        transform: 'translateY(0px)',
                        opacity: 1
                    }))
                ])
            )
        ])
    ]);

export const chipListFader =
    trigger('chipListFader', [
        transition('* => *', [
            query('mat-chip', style({
                transform: 'translateY(20px)',
                opacity: 0
            })),
            query('mat-chip',
                stagger('100ms', [
                    animate('300ms ease-out', style({
                        transform: 'translateY(0px)',
                        opacity: 1
                    }))
                ])
            )
        ])
    ]); 
