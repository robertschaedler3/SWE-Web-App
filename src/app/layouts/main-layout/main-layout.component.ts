import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ROUTES } from 'src/app/components/nav/nav.component';
import { fader } from 'src/app/animations/load-animation';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  animations: [fader]
})
export class MainLayoutComponent implements OnInit {

  listTitles: any;

  constructor(
    public location: Location,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Feed';
  }

}
