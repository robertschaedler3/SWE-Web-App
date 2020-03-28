import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../utils/material.module';

import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { CreateEventDialogComponent } from 'src/app/create-event-dialog/create-event-dialog.component';
import { EventDetailsDialogComponent } from '../../event-details-dialog/event-details-dialog.component';
import { EventDetailsComponent } from '../../event-details/event-details.component';
import { ComponentModule } from 'src/app/components/components.module';
import { FeedComponent } from '../../content/feed/feed.component';
import { ContentModule } from 'src/app/content/content.module';

@NgModule({
  declarations: [
    DashboardComponent,
    CreateEventDialogComponent,
    EventDetailsDialogComponent,
    EventDetailsComponent,
  ],
  imports: [
    CommonModule,
    MainLayoutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentModule,
    ContentModule
  ],
  entryComponents: [CreateEventDialogComponent]
})
export class MainLayoutModule { }
