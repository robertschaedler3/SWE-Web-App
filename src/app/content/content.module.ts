import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed/feed.component';
import { PeopleComponent } from './people/people.component';
import { DiscoverComponent } from './discover/discover.component';



@NgModule({
  declarations: [
    FeedComponent,
    PeopleComponent,
    DiscoverComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    FeedComponent,
    PeopleComponent,
    DiscoverComponent
  ]
})
export class ContentModule { }
