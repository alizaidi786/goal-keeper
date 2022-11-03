import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TasksViewPageRoutingModule } from './tasks-view-routing.module';

import { TasksViewPage } from './tasks-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TasksViewPageRoutingModule
  ],
  declarations: [TasksViewPage],
  providers: [DatePipe]
})
export class TasksViewPageModule {}
