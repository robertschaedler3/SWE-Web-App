import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Event } from '../interfaces/event.interface';

export interface DialogData {
  success: boolean;
}

@Component({
  selector: 'app-create-event-dialog',
  templateUrl: './create-event-dialog.component.html',
  styleUrls: ['./create-event-dialog.component.scss']
})
export class CreateEventDialogComponent implements OnInit {

  eventForm: FormGroup;
  times: string[] = [];

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
    this.eventForm = this.fb.group({
      title: '',
      description: '',
      day: `${new Date()}`,
      start: this.times[0],
      end: this.times[0],
      building: '',
      room: null,
    })
    // this.eventForm.valueChanges.subscribe(console.log);
  }

  public onNoClick(): void {
    // TODO: confirm dialog close
    this.dialogRef.close();
  }

  public create(): void {
    // TODO: form validation
    const value: Event = this.eventForm.value;
    value.tags = this.tags;
    console.log(value);
    this.dialogRef.close(value);
  }

  private pad(num: number, size: number): string {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  private generateTimes(): string[] {
    let times: string[] = [];
    for (let i: number = 0; i < 2; i++) {
      let suffix: string = (i == 0) ? 'am' : 'pm';
      for (let hour: number = 1; hour <= 12; hour++) {
        for (let min: number = 0; min <= 45; min += 15) {
          times.push(`${hour}:${this.pad(min, 2)}${suffix}`);
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
