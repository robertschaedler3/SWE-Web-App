import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../shared/material.module';

import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MainLayoutRoutingModule,
    MaterialModule
  ]
})
export class MainLayoutModule { }
