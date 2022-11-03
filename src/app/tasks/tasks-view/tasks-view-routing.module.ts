import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TasksViewPage } from './tasks-view.page';

const routes: Routes = [
  {
    path: '',
    component: TasksViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksViewPageRoutingModule {}
