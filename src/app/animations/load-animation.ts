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
        transition(':enter', [
            style({
                opacity: 0,
                transform: 'translateY(10px)'
            }),
            animate('400ms 100ms ease-out')
        ])
    ]);

export const backgroundEnter =
    trigger('backgroundEnter', [
        transition(':enter', [
            style({
                transform: 'translateY(300px) rotateZ(-10deg)'
            }),
            animate('400ms 200ms ease')
        ])
    ]);

export const cardListFader =
    trigger('cardListFader', [
        transition(':enter', [
            query('div.card', style({
                transform: 'translateY(20px)',
                opacity: 0
            })),
            query('div.card',
                stagger('150ms', [
                    animate('300ms 100ms ease-out', style({
                        transform: 'translateY(0px)',
                        opacity: 1
                    }))
                ])
            )
        ])
    ]);

export const chipListFader =
    trigger('chipListFader', [
        transition(':enter', [
            query('mat-chip', style({
                transform: 'translateY(10px)',
                opacity: 0
            })),
            query('mat-chip',
                stagger('150ms', [
                    animate('300ms 500ms ease-out', style({
                        transform: 'translateY(0px)',
                        opacity: 1
                    }))
                ])
            )
        ])
    ]);

export const listFader =
    trigger('listFader', [
        transition(':enter', [
            query('mat-list-item', style({
                transform: 'translateY(20px)',
                opacity: 0
            })),
            query('mat-list-item',
                stagger('150ms', [
                    animate('300ms 300ms ease-out', style({
                        transform: 'translateY(0px)',
                        opacity: 1
                    }))
                ])
            )
        ])
    ]);
