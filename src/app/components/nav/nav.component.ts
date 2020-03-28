import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/feed', title: 'Feed', icon: 'dashboard' },
  { path: '/discover', title: 'Discover', icon: 'search' },
  { path: '/people', title: 'People', icon: 'people' },
  { path: '/groups', title: 'Groups', icon: 'group_work' },
  { path: '/settings', title: 'Settings', icon: 'settings' },
];

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {

  menuItems: any[];

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

}
