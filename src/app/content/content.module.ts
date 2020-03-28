import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed/feed.component';
import { PeopleComponent } from './people/people.component';



@NgModule({
  declarations: [
    FeedComponent,
    PeopleComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    FeedComponent,
    PeopleComponent
  ]
})
export class ContentModule { }
