import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../utils/material.module';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    FooterComponent,
    SearchComponent,
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
    SearchComponent
  ]
})
export class ComponentModule { }
