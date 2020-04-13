import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComponentsModule } from '../../components/components.module';
import { ContentModule } from '../../content/content.module';

import { MainLayoutRoutingModule } from './main-layout-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    ContentModule,
    MainLayoutRoutingModule
  ]
})
export class MainLayoutModule { }
