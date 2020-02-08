import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatToolbarModule,
  MatSelectModule,
  MatProgressBarModule,
  MatDividerModule,
  MatListModule,
  MatSlideToggleModule,
  MatExpansionModule,
  MatCardModule,
  MatIconModule,
  MatDialogModule,
  MatSliderModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatToolbarModule,
    MatSelectModule,
    MatProgressBarModule,
    MatDividerModule,
    MatListModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatSliderModule
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatToolbarModule,
    MatSelectModule,
    MatProgressBarModule,
    MatDividerModule,
    MatListModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatSliderModule
  ]
})
export class MaterialModule { }
