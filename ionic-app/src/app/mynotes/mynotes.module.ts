import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MynotesPageRoutingModule } from './mynotes-routing.module';

import { MynotesPage } from './mynotes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MynotesPageRoutingModule
  ],
  declarations: [MynotesPage]
})
export class MynotesPageModule {}
