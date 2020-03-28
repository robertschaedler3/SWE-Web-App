import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComponentModule } from 'src/app/components/components.module';
import { ContentModule } from 'src/app/content/content.module';
import { MaterialModule } from '../../utils/material.module';

import { MainLayoutRoutingModule } from './main-layout-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentModule,
    ContentModule,
    MaterialModule,
    MainLayoutRoutingModule
  ]
})
export class MainLayoutModule { }
