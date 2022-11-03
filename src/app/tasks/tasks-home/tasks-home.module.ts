import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TasksHomePageRoutingModule } from './tasks-home-routing.module';

import { TasksHomePage } from './tasks-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TasksHomePageRoutingModule
  ],
  declarations: [TasksHomePage]
})
export class TasksHomePageModule {}
