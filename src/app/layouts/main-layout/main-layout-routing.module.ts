import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedDetailsComponent } from 'src/app/content/feed-details/feed-details.component';

import { FeedComponent } from 'src/app/content/feed/feed.component';
import { PeopleComponent } from 'src/app/content/people/people.component';
import { GroupsComponent } from 'src/app/content/groups/groups.component';
import { SettingsComponent } from 'src/app/content/settings/settings.component';
import { DiscoverComponent } from 'src/app/content/discover/discover.component';



const routes: Routes = [
    { path: 'feed', component: FeedComponent },
    { path: 'discover', component: DiscoverComponent },
    { path: 'people', component: PeopleComponent },
    { path: 'groups', component: GroupsComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'details', redirectTo: 'feed' },
    { path: 'details/:eventId', component: FeedDetailsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainLayoutRoutingModule { }
