import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';

import { FeedComponent } from './feed/feed.component';
import { PeopleComponent } from './people/people.component';
import { DiscoverComponent } from './discover/discover.component';
import { GroupsComponent } from './groups/groups.component';
import { SettingsComponent } from './settings/settings.component';
import { SearchComponent } from './search/search.component';
import { CreateComponent } from './create/create.component';
import { FeedDetailsComponent } from './feed-details/feed-details.component';



@NgModule({
  declarations: [
    FeedComponent,
    FeedDetailsComponent,
    PeopleComponent,
    DiscoverComponent,
    SearchComponent,
    GroupsComponent,
    SettingsComponent,
    CreateComponent
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
    SearchComponent,
    GroupsComponent,
    SettingsComponent,
    CreateComponent
  ]
})
export class ContentModule { }
