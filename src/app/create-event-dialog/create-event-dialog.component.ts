import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { StevensEvent } from '../models/event.model';

export interface DialogData {
  author: string;
  uid: string;
}

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
}

@Component({
  selector: 'app-create-event-dialog',
  templateUrl: './create-event-dialog.component.html',
  styleUrls: ['./create-event-dialog.component.scss']
})
export class CreateEventDialogComponent implements OnInit {

  eventForm: FormGroup;
  times: EventTime[] = [];

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  tags: string[] = ['Gregg'];
  allTags: string[] = ['Python', 'SEC', 'SSW', 'Hackathon', 'Office Hours'];

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    public dialogRef: MatDialogRef<CreateEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder
  ) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
  }

  ngOnInit(): void {
    this.times = this.generateTimes();
    // TODO: form validation
    this.eventForm = this.fb.group({
      title: '',
      description: '',
      day: `${new Date()}`,
      start: 0,
      end: 0,
      building: '',
      room: null,
    })
  }

  public onNoClick(): void {
    // TODO: confirm dialog close
    this.dialogRef.close();
  }

  public create(): void {
    const { title, description, day, start, end, building, room }: FormData = this.eventForm.value;

    let event_start = new Date(day);
    let event_end = new Date(day);
    let s = this.times[start];
    let e = this.times[end];
    event_start.setHours(s.hour, s.min);
    event_end.setHours(e.hour, e.min);

    const event: StevensEvent = {
      title,
      description,
      start: event_start,
      end: event_end,
      building,
      room,
      author: this.data.author,
      authorId: this.data.uid
    }
    // value.tags = this.tags;
    console.log(event);
    this.dialogRef.close(event);
  }

  private pad(num: number, size: number): string {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  private generateTimes(): EventTime[] {
    let times: EventTime[] = [];
    for (let i: number = 0; i < 2; i++) {
      let suffix: string = (i == 0) ? 'am' : 'pm';
      for (let hour: number = 1; hour <= 12; hour++) {
        for (let min: number = 0; min <= 45; min += 15) {
          // push EventTime object for easy date construction on event creation
          times.push({
            str: `${hour}:${this.pad(min, 2)}${suffix}`,
            hour: suffix === 'pm' ? hour + 12 : hour,
            min: min
          });
        }
      }
    }
    return times;
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add the tag
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.tagCtrl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }

}
