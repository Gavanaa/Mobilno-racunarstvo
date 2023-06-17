import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExplorePageRoutingModule } from './explore-routing.module';

import { ExplorePage } from './explore.page';
import { BookElemntComponent } from '../book-elemnt/book-elemnt.component';
import { BookModalComponent } from '../../modals/add-book-modal/book-modal.component';
import { EditBookModalComponent } from 'src/app/modals/edit-book-modal/edit-book-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExplorePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ExplorePage,
    BookElemntComponent,
    BookModalComponent,
    EditBookModalComponent,
  ],
})
export class ExplorePageModule {}
