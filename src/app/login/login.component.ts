import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { fader } from '../animations/load-animation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fader]
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

}
