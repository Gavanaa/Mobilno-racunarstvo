import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookDetailsPageRoutingModule } from './book-details-routing.module';

import { BookDetailsPage } from './book-details.page';
import { CommentsPage } from 'src/app/book-marks/explore/book-details/comments/comments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookDetailsPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [BookDetailsPage, CommentsPage],
})
export class BookDetailsPageModule {}
