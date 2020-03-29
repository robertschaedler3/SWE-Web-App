import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../utils/material.module';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    FooterComponent,
    NavComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    ToolbarComponent,
    FooterComponent,
    NavComponent
  ]
})
export class ComponentModule { }
