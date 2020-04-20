import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CreateComponent, CreateComponentDialog } from '../content/create/create.component';
import { BackComponent } from './back/back.component';
import { SearchComponent } from './search/search.component';

import { MaterialModule } from '../material/material.module';
import { FileUploadComponent } from './file-upload/file-upload.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  declarations: [
    BackComponent,
    SearchComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    CreateComponent,
    CreateComponentDialog,
    FileUploadComponent,
  ],
  exports: [
    BackComponent,
    FooterComponent,
    SearchComponent,
    NavbarComponent,
    SidebarComponent,
    CreateComponent,
  ],
  entryComponents: [CreateComponentDialog]
})
export class ComponentsModule { }
