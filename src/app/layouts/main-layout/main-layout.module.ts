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

@NgModule({
  declarations: [
    DashboardComponent,
    CreateEventDialogComponent,
    EventDetailsDialogComponent,
    EventDetailsComponent
  ],
  imports: [
    CommonModule,
    MainLayoutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentModule
  ],
  entryComponents: [CreateEventDialogComponent]
})
export class MainLayoutModule { }
