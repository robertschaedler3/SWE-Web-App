import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

import { AuthService } from '../../services/auth.service';
import { EventService } from '../../services/event.service';
import { FileUploadComponent } from '../../components/file-upload/file-upload.component';
import { StevensEvent } from '../../models/event.model';
import { Tag } from '../../models/tag.model';
import { User } from '../../models/user.model';

import { firestore } from 'firebase';

export interface FormData {
  title: string;
  description: string;
  day: Date;
  start: number;
  end: number;
  building: string;
  room: number;
}

export interface EventTime {
  str: string;
  hour: number;
  min: number;
  offset: number;
}

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  eventForm: FormGroup;

  user: User;

  visible = true;
  selectable = true;
  removable = true;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();

  filteredTags: Observable<Tag[]>;
  tags: Tag[] = [];
  allTags: Tag[] = [];

  times: EventTime[] = [];

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;

  @Input() id: string;
  @Input() event: StevensEvent;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private eventSvc: EventService
  ) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice())
    );
  }

  ngOnInit(): void {
    this.times = this.generateTimes();

    const offsetValidator: ValidatorFn = (fg: FormGroup) => {
      const start = fg.get('start').value;
      const end = fg.get('end').value;
      return start !== null && end !== null && start < end
        ? null
        : { range: true };
    };

    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      day: new FormControl(new Date()),
      start: [0, Validators.required],
      end: [4, Validators.required],
      building: ['', Validators.required],
      room: ['', Validators.required]
    }, { validators: offsetValidator });

    this.afs.collection('/tag').get().subscribe(tags => {
      for (let i = 0; i < tags.docs.length; i++) {
        let doc = tags.docs[i];
        this.allTags.push({ id: doc.id, name: doc.data().name });
      }
      if (this.event) {
        this.loadForm(this.event);
      }
    });
  }

  private pad(num: number, size: number): string {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  private generateTimes(): EventTime[] {
    // TODO: generate times starting from current time only

    let times: EventTime[] = [];
    for (let i: number = 0; i < 2; i++) {
      let suffix: string = (i == 0) ? 'am' : 'pm';
      for (let hour: number = 0; hour < 12; hour++) {
        for (let min: number = 0; min <= 45; min += 15) {
          // push EventTime object for easy date construction on event creation
          let hour_val = (hour === 0) ? 12 : hour;
          times.push({
            str: `${hour_val}:${this.pad(min, 2)}${suffix}`,
            hour: suffix === 'pm' ? hour_val + 12 : hour_val,
            min: min,
            offset: ((suffix === 'pm' ? hour + 12 : hour_val) * 60 * 60) + (min * 60)
          });
        }
      }
    }

    var hour = (new Date).getHours();
    var minute = Math.floor((new Date).getMinutes() % 15);
    let index = 0;
    // make index the start of the hour
    for (; index < times.length; index += 4) {
      const element = times[index];
      if (element.hour == hour) break;
    }

    // adjust index for minutes
    for (; index < times.length; index++) {
      const element = times[index];
      if (element.min < minute) {
        index--;
        break;
      }
    }

    while (index > 0) {
      times.push(times.shift());
      index--;
    }

    return times;
  }

  private getTimeIndex(time: number) {
    for (var i = 0; i < this.times.length; i++) {
      if (this.times[i].offset == time) return i;
    }
  }

  private loadForm({ title, description, day, start, end, building, room }: StevensEvent) {
    this.eventForm.patchValue({
      title: title,
      description: description,
      day: day.toDate(),
      start: this.getTimeIndex(start),
      end: this.getTimeIndex(end),
      building: building,
      room: room
    });
    this.eventSvc.getTags(this.id).subscribe(tags => {
      this.tags = tags;
      if (tags && tags.length > 0) {
        this.allTags = this.allTags.filter((val) => !this.tags.some(tag => tag.id == val.id))
      }
    })
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    let selected: Tag;
    for (let i = 0; i < this.allTags.length; i++) {
      if (this.allTags[i].id === value) {
        selected = this.allTags[i];
        break;
      }
    }
    if (!selected) return;

    // Add the tag
    if ((value || '').trim()) {
      const index = this.allTags.indexOf(selected);
      this.allTags.splice(index, 1);
      this.tags.push(selected);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.tagCtrl.setValue(null);
  }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
      this.allTags.push(tag);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const val = event.option.viewValue;
    let selected: Tag = null;
    for (let i = 0; i < this.allTags.length; i++) {
      if (this.allTags[i].name.toLowerCase() === val.toLowerCase()) {
        selected = this.allTags[i];
        break;
      }
    }

    if (!selected) return;

    const index = this.allTags.indexOf(selected);
    if (index >= 0) {
      this.allTags.splice(index, 1);
      this.tags.push(selected);
      this.tagInput.nativeElement.value = '';
      this.tagCtrl.setValue(null);
    }
  }

  private _filter(value: string): Tag[] {
    const filterValue = value.toLowerCase();
    return this.allTags.filter(tag => tag.name.toLowerCase().indexOf(filterValue) === 0);
  }

  create() {
    this.auth.user$.subscribe(async (user) => {
      const { title, description, day, start, end, building, room }: FormData = this.eventForm.value;
      const event: StevensEvent = {
        title,
        description,
        day: firestore.Timestamp.fromDate(day),
        start: this.times[start].offset,
        end: this.times[end].offset,
        building,
        room,
        author: user.displayName,
        authorId: user.uid,
        authorThumbnail: user.photoURL
      };

      if (this.fileUpload.file !== null) {
        const url = await this.fileUpload.startUpload();
        event.thumbnail = url;
      }

      this.eventSvc.createEvent(event, this.tags);
    })
  }

}
