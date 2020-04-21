import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { StevensEvent } from '../../models/event.model';
import { Tag } from '../../models/tag.model';
import { fadeUp, chipListFader } from '../../animations/load-animation';


@Component({
  selector: 'app-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.scss'],
  animations: [fadeUp, chipListFader]
})
export class FeedCardComponent {

  @Input() event: Observable<StevensEvent>;
  @Input() tags: Observable<Tag[]>;

  constructor() {
  }

}
