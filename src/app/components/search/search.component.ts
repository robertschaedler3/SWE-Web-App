import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { StevensEvent } from 'src/app/models/event.model';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  results: StevensEvent[];
  lastKeyPress: number = 0;

  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;

  constructor(
    public searchSvc: SearchService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  search($event): void {
    if ($event.timeStamp - this.lastKeyPress > 300) {
      let query = $event.target.value;
      this.searchSvc.getEvents(query, query + '\uf8ff').subscribe(results => {
        this.results = results;
      });
    }
    this.lastKeyPress = $event.timeStamp;
  }

  navigateTo(value: MatAutocompleteSelectedEvent) {
    this.router.navigate(['/details', value.option.value])
    this.searchInput.nativeElement.value = '';
  }

}
