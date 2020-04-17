import { Component, OnInit } from '@angular/core';

declare const $: any;
export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/feed', title: 'Feed', icon: 'dashboard', class: '' },
  { path: '/discover', title: 'Discover', icon: 'search', class: '' },
  { path: '/people', title: 'People', icon: 'people', class: '' },
  { path: '/my-events', title: 'My Events', icon: 'settings', class: 'active-pro' },
  // { path: '/groups', title: 'Groups', icon: 'group_work', class: '' },
  // { path: '/settings', title: 'Settings', icon: 'settings', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
