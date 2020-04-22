import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

import { StevensEvent } from '../../models/event.model';
import { EventService } from '../../services/event.service';
import { AuthService } from '../../services/auth.service';
import { FileUploadComponent } from '../../components/file-upload/file-upload.component';

export interface TagChip {
  id: string;
  name: string;
}

export interface DialogData {
  author: string;
  uid: string;
  photoURL: string;
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
  offset: number;
}

@Component({
  selector: 'app-create',
  templateUrl: 'create.component.html',
  styleUrls: ['create.component.scss'],
})
export class CreateComponent {

  constructor(
    public dialog: MatDialog,
    public auth: AuthService
  ) { }

  openDialog(id, photoURL, displayName): void {
    const dialogRef = this.dialog.open(CreateComponentDialog, {
      width: '800px',
      data: { uid: id, photoURL: photoURL, author: displayName }
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('event created');
    });
  }

}

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['create.component.scss'],
})
export class CreateComponentDialog implements OnInit {

  eventForm: FormGroup;
  times: EventTime[] = [];

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<TagChip[]>;
  tags: TagChip[] = [];
  allTags: TagChip[] = [];

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;

  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private eventSvc: EventService,
    public dialogRef: MatDialogRef<CreateComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice())
    );
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
      room: null
    })
    this.afs.collection('/tag').get().subscribe(tags => {
      tags.docs.forEach(doc => {
        this.allTags.push({ id: doc.id, name: doc.data().name });
      })
    });
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
            min: min,
            offset: (hour * 60 * 60) + (min * 60)
          });
        }
      }
    }
    return times;
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    let selected: TagChip;
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

  remove(tag: TagChip): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
      this.allTags.push(tag);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const val = event.option.viewValue;
    console.log(val);
    let selected: TagChip = null;
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

  private _filter(value: string): TagChip[] {
    const filterValue = value.toLowerCase();
    return this.allTags.filter(tag => tag.name.toLowerCase().indexOf(filterValue) === 0);
  }

  async create() {
    const { title, description, day, start, end, building, room }: FormData = this.eventForm.value;

    const event: StevensEvent = {
      title,
      description,
      day: day,
      start: this.times[start].offset,
      end: this.times[end].offset,
      building,
      room,
      author: this.data.author,
      authorId: this.data.uid,
      authorThumbnail: this.data.photoURL
    }

    if (this.fileUpload.file !== null) {
      const url = await this.fileUpload.startUpload();
      event.thumbnail = url;
    }

    this.eventSvc.createEvent(event, this.tags);
    this.dialogRef.close();
  }

}
