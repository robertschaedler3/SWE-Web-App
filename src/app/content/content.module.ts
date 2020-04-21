import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';

import { FeedComponent } from './feed/feed.component';
import { PeopleComponent } from './people/people.component';
import { DiscoverComponent } from './discover/discover.component';
import { GroupsComponent } from './groups/groups.component';
import { SettingsComponent } from './settings/settings.component';
import { FeedDetailsComponent } from './feed-details/feed-details.component';
import { FeedCardComponent } from './feed-card/feed-card.component';
// import { UserEventsComponent } from './user-events/user-events.component';
// import { UserEventsEditComponent } from './user-events-edit/user-events-edit.component';



@NgModule({
  declarations: [
    FeedComponent,
    FeedDetailsComponent,
    PeopleComponent,
    DiscoverComponent,
    GroupsComponent,
    SettingsComponent,
    FeedCardComponent,
    // UserEventsComponent,
    // UserEventsEditComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    FeedComponent,
    FeedDetailsComponent,
    PeopleComponent,
    DiscoverComponent,
    GroupsComponent,
    SettingsComponent,
    FeedCardComponent
    // UserEventsComponent,
    // UserEventsEditComponent,
  ]
})
export class ContentModule { }
