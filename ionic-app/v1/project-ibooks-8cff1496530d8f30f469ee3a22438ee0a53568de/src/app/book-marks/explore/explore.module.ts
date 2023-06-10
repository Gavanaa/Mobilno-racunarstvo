import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExplorePageRoutingModule } from './explore-routing.module';

import { ExplorePage } from './explore.page';
import { BookElemntComponent } from '../book-elemnt/book-elemnt.component';
import { BookModalComponent } from '../book-modal/book-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExplorePageRoutingModule
  ],
  declarations: [ExplorePage,BookElemntComponent,BookModalComponent]
})
export class ExplorePageModule {}
