import { Component, Input } from '@angular/core';
import { Tag } from '../../models/tag.model';
import { chipListFader } from '../../animations/load-animation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
  animations: [chipListFader]
})
export class TagListComponent {

  @Input() tags: Tag[];

  constructor(
    private router: Router
  ) { }

  navigate(tagId) {
    console.log(tagId);
    this.router.navigate(['/discover', tagId]);
  }

}
