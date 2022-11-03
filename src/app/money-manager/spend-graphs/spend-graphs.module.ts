import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpendGraphsPageRoutingModule } from './spend-graphs-routing.module';

import { SpendGraphsPage } from './spend-graphs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpendGraphsPageRoutingModule
  ],
  declarations: [SpendGraphsPage]
})
export class SpendGraphsPageModule {}
