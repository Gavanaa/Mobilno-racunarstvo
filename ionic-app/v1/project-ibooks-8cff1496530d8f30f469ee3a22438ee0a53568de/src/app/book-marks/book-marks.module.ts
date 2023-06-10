import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookMarksPageRoutingModule } from './book-marks-routing.module';

import { BookMarksPage } from './book-marks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookMarksPageRoutingModule
  ],
  declarations: [BookMarksPage]
})
export class BookMarksPageModule {}
