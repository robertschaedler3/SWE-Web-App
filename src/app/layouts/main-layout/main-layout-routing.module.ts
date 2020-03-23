import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { EventDetailsComponent } from 'src/app/event-details/event-details.component';


const routes: Routes = [
    { path: 'upcoming', component: DashboardComponent },
    { path: 'details', redirectTo: 'dashboard' },
    { path: 'details/:eventId', component: EventDetailsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainLayoutRoutingModule { }
