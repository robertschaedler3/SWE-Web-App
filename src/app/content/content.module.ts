import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed/feed.component';
import { PeopleComponent } from './people/people.component';
import { DiscoverComponent } from './discover/discover.component';
import { GroupsComponent } from './groups/groups.component';
import { SettingsComponent } from './settings/settings.component';
import { MaterialModule } from '../utils/material.module';
import { SearchComponent } from './search/search.component';
import { CreateComponent } from './create/create.component';



@NgModule({
  declarations: [
    FeedComponent,
    PeopleComponent,
    DiscoverComponent,
    SearchComponent,
    GroupsComponent,
    SettingsComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    FeedComponent,
    PeopleComponent,
    DiscoverComponent,
    SearchComponent,
    GroupsComponent,
    SettingsComponent
  ]
})
export class ContentModule { }
