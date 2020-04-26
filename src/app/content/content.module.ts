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
import { FeedCardComponent } from './feed-card/feed-card.component'
import { TagListComponent } from '../components/tag-list/tag-list.component';
import { DiscoverFeedComponent } from './discover-feed/discover-feed.component'
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    FeedComponent,
    FeedDetailsComponent,
    PeopleComponent,
    DiscoverComponent,
    DiscoverFeedComponent,
    GroupsComponent,
    SettingsComponent,
    FeedCardComponent,
    TagListComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  exports: [
    FeedComponent,
    FeedDetailsComponent,
    PeopleComponent,
    DiscoverComponent,
    DiscoverFeedComponent,
    GroupsComponent,
    SettingsComponent,
    FeedCardComponent
  ]
})
export class ContentModule { }
