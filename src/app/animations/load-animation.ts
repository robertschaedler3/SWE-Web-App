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
                transform: 'translateY(50px)'
            }),
            animate('400ms 100ms ease-out')
        ])
    ]);

export const cardListFader =
    trigger('cardListFader', [
        transition('* => *', [
            query('mat-card', style({
                transform: 'translateY(75px)',
                opacity: 0
            })),
            query('mat-card',
                stagger('100ms', [
                    animate('500ms 100ms ease-out', style({
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
