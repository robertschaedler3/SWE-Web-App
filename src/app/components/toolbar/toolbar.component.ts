import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SearchService } from 'src/app/services/search.service';
import { StevensEvent } from 'src/app/models/event.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  results: StevensEvent[];
  lastKeyPress: number = 0;

  constructor(
    public auth: AuthService,
    public searchSvc: SearchService
  ) { }

  ngOnInit() {
  }

  search($event): void {
    if ($event.timeStamp - this.lastKeyPress > 200) {
      let query = $event.target.value;
      this.searchSvc.getEvents(query, query + '\uf8ff').subscribe(results => {
        this.results = results;
        console.log(results);
      });
    }
    this.lastKeyPress = $event.timeStamp;
  }

}
