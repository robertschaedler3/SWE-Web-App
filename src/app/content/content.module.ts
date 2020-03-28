import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed/feed.component';
import { PeopleComponent } from './people/people.component';
import { DiscoverComponent } from './discover/discover.component';
import { GroupsComponent } from './groups/groups.component';



@NgModule({
  declarations: [
    FeedComponent,
    PeopleComponent,
    DiscoverComponent,
    GroupsComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    FeedComponent,
    PeopleComponent,
    DiscoverComponent,
    GroupsComponent
  ]
})
export class ContentModule { }
