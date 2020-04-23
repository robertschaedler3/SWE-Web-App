import { Component, Input } from '@angular/core';
import { StevensEvent } from '../../models/event.model';
import { Tag } from '../../models/tag.model';


@Component({
  selector: 'app-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.scss']
})
export class FeedCardComponent {

  @Input() event: StevensEvent;
  @Input() tags: Tag[];

  constructor() {
  }

  formatTime(time: number) {
    return `${Math.floor(time / 3600) % 12}:${this.pad(Math.floor((time % 3600) / 60), 2)}`;
  }

  private pad(num: number, size: number): string {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

}
