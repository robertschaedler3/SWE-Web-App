import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { StevensEvent } from '../../models/event.model';
// import { MatAutocompleteSelectedEvent } from '@angular/material';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { Tag } from '../../models/tag.model';

interface SearchResult {
  events: StevensEvent[];
  people: User[];
  tags: Tag[];
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  results: SearchResult = {
    events: [],
    people: [],
    tags: []
  };
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
      let query: string = $event.target.value;
      this.searchSvc.getEvents(query.toUpperCase(), query.toLowerCase() + '\uf8ff').subscribe(results => this.results.events = results);
      this.searchSvc.getPeople(query.toUpperCase(), query.toLowerCase() + '\uf8ff').subscribe(results => this.results.people = results);
      this.searchSvc.getTags(query.toUpperCase(), query.toLowerCase() + '\uf8ff').subscribe(results => this.results.tags = results);
    }
    this.lastKeyPress = $event.timeStamp;
  }

  navigateToEvent(value) {
    this.router.navigate(['/details', value])
    this.searchInput.nativeElement.value = '';
  }

  navigateToProfile(value) {
    this.router.navigate(['/profile', value])
    this.searchInput.nativeElement.value = '';
  }

  navigateToTag(value) {
    this.router.navigate(['/tag', value])
    this.searchInput.nativeElement.value = '';
  }

}
