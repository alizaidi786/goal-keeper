import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TasksHomePage } from './tasks-home.page';

const routes: Routes = [
  {
    path: '',
    component: TasksHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksHomePageRoutingModule {}
