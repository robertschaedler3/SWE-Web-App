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

  @Input() event: StevensEvent;
  @Input() tags: Tag[];

  constructor() {
  }

  formatTime(time: number) {
    return `${Math.floor(time / 3600)}:${this.pad(Math.floor(time % 3600), 2)}`;
  }

  private pad(num: number, size: number): string {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

}
