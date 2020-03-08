import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { CreateEventDialogComponent } from 'src/app/create-event-dialog/create-event-dialog.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CreateEventDialogComponent
  ],
  imports: [
    CommonModule,
    MainLayoutRoutingModule,
  ],
  entryComponents: [CreateEventDialogComponent]
})
export class MainLayoutModule { }
