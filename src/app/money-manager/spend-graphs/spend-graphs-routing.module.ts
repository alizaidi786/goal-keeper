import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpendGraphsPage } from './spend-graphs.page';

const routes: Routes = [
  {
    path: '',
    component: SpendGraphsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpendGraphsPageRoutingModule {}
