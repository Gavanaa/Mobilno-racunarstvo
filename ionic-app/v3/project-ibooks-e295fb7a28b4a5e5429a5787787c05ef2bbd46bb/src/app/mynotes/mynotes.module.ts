import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MynotesPageRoutingModule } from './mynotes-routing.module';

import { MynotesPage } from './mynotes.page';
import { AddNoteModalComponent } from '../modals/add-note-modal/add-note-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MynotesPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [MynotesPage, AddNoteModalComponent],
})
export class MynotesPageModule {}
