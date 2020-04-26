import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireUploadTask } from '@angular/fire/storage/task';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  isHovering: boolean;

  file: File = null;

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;

  constructor(private storage: AngularFireStorage) {
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    if (files.length !== 1) {
      console.error("Only one file allowed.");
      return;
    }

    this.file = files.item(0);
    console.log(this.file);
  }

  startUpload(): Promise<string> {
    // The storage path
    const path = `test/${Date.now()}_${this.file.name}`;

    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, this.file);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.percentage.subscribe(console.log);

    return new Promise((resolve, reject) => {
      this.storage.upload(path, this.file).then(async () => {
        try {

          this.downloadURL = await ref.getDownloadURL().toPromise();
          console.log(this.downloadURL)
          resolve(this.downloadURL);
        } catch (error) {
          reject(error);
        }
      });
    })
  }

}
