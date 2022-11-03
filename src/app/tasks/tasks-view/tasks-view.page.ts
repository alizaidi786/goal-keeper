import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-tasks-view',
  templateUrl: './tasks-view.page.html',
  styleUrls: ['./tasks-view.page.scss'],
})
export class TasksViewPage implements OnInit {
  
  task:Task;
  constructor(private serv: TasksService, private datePipe: DatePipe, private commonServ:CommonService) { }

  ngOnInit() {
   this.serv.selectedTask.subscribe(
    res => {
      this.task = res;
    }
   )
  }

  startTask(){
    let task = this.task;
    let todayDate = this.datePipe.transform(new Date(), 'y-M-d');
    task.actualStartDate = todayDate;
    task.status = 'In-progress';
    this.serv.updateTask(task).then(
     async res => {
        this.commonServ.tasks$.next(await this.serv.readTasks());
        this.task.status = 'In-progress';
        this.task.actualStartDate = todayDate;
      }
    )
  }

  finishTask(){
  let task = this.task;
  let todayDate = this.datePipe.transform(new Date(), 'y-M-d');
  task.actualFinishDate = todayDate;
  task.status = 'Completed';
   this.serv.updateTask(task).then(
    async res => {
      this.commonServ.tasks$.next(await this.serv.readTasks());
      this.task.status = 'Completed';
      this.task.actualFinishDate = todayDate;
    }
  )
  }

  checkStartDate(startDate){
    let todayDate = this.datePipe.transform(new Date(), 'y-M-d');
    if(startDate <= todayDate){
      return true;
    }
    return false;
  }

}
