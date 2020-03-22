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
  MatSliderModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatGridListModule,
  MatChipsModule,
  MatAutocompleteModule
} from '@angular/material';
import { MaterialElevationDirective } from '../directives/material-elevation.directive';


@NgModule({
  declarations: [MaterialElevationDirective],
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
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatChipsModule,
    MatAutocompleteModule
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
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatChipsModule,
    MatAutocompleteModule,
    MaterialElevationDirective
  ]
})
export class MaterialModule { }
