import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedComponent } from '../../content/feed/feed.component';
import { FeedDetailsComponent } from '../../content/feed-details/feed-details.component';
import { PeopleComponent } from '../../content/people/people.component';
import { DiscoverComponent } from '../../content/discover/discover.component';
import { SettingsComponent } from '../../content/settings/settings.component';
import { UserEventsComponent } from '../../content/user-events/user-events.component';
import { UserEventsEditComponent } from '../../content/user-events-edit/user-events-edit.component';

export const routes: Routes = [
    { path: 'feed', component: FeedComponent },
    { path: 'details/:id', component: FeedDetailsComponent },
    { path: 'discover', component: DiscoverComponent },
    { path: 'people', component: PeopleComponent },
    {
        path: 'my-events', component: UserEventsComponent,
        children: [
            { path: ':id', component: UserEventsEditComponent }
        ]
    },
    { path: 'settings', component: SettingsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainLayoutRoutingModule { }
