import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComponentsModule } from '../../components/components.module';
import { ContentModule } from '../../content/content.module';

import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { UserEventsComponent } from '../../content/user-events/user-events.component';
import { UserEventsEditComponent } from '../../content/user-events-edit/user-events-edit.component';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  declarations: [
    UserEventsComponent,
    UserEventsEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    ContentModule,
    MaterialModule,
    MainLayoutRoutingModule
  ]
})
export class MainLayoutModule { }
