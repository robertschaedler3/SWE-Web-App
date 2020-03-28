import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { fader } from 'src/app/animations/load-animation';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  animations: [fader]
})
export class ToolbarComponent implements OnInit {

  constructor(
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
  }

}
