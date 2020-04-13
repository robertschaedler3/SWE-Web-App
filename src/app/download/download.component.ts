import { Component, OnInit } from '@angular/core';
import { fadeUp } from '../animations/load-animation';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss'],
  animations: [fadeUp]
})
export class DownloadComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
