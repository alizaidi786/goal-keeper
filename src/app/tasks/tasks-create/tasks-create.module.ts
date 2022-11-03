import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { IonicModule } from '@ionic/angular';

import { TasksCreatePageRoutingModule } from './tasks-create-routing.module';

import { TasksCreatePage } from './tasks-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TasksCreatePageRoutingModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot()
  ],
  declarations: [TasksCreatePage],
  providers: [DatePipe]
})
export class TasksCreatePageModule {}
