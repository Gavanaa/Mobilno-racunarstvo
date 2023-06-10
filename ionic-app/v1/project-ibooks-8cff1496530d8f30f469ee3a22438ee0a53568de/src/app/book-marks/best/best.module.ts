import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BestPageRoutingModule } from './best-routing.module';

import { BestPage } from './best.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BestPageRoutingModule
  ],
  declarations: [BestPage]
})
export class BestPageModule {}
