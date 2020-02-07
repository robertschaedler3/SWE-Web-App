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
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FooterComponent } from './footer/footer.component';
@NgModule({
  declarations: [ToolbarComponent, FooterComponent],
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
    MatSliderModule,
    ToolbarComponent,
    FooterComponent
  ]
})
export class ComponentModule { }
