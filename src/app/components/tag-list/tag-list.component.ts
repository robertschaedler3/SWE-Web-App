import { Component, Input } from '@angular/core';
import { Tag } from '../../models/tag.model';
import { chipListFader } from '../../animations/load-animation';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
  animations: [chipListFader]
})
export class TagListComponent {

  @Input() tags: Tag[];

  constructor() { }

}
