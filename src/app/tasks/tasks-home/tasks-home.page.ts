import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject, Subject } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';
import { TasksCreatePage } from '../tasks-create/tasks-create.page';
import { ToastController } from '@ionic/angular';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-tasks-home',
  templateUrl: './tasks-home.page.html',
  styleUrls: ['./tasks-home.page.scss'],
})
export class TasksHomePage implements OnInit{
  component = TasksCreatePage;
  
  tasks:Task[] = [];
  constructor(private serv: TasksService, private commonServ: CommonService ,private router:Router,private toastController: ToastController) { }

  async ngOnInit() {
   this.commonServ.tasks$.subscribe(
      res => {
        if(res){
          this.tasks = res;
        }
      }
    )
  }
  // async ngOnChanges(){
  //   this.tasks = await this.serv.readTasks();
  // }

  searchTasks(args){
    console.log(args.detail.value);
    
  }
  getFilter(args){
   console.log(args.detail.value);
   
  }
  viewTask(task:Task){
     this.serv.selectedTask.next(task);
     this.router.navigateByUrl('/tasks-view');
  }
 
 async deleteTask(task){
    if(task.status !== 'In-progress'){
      this.serv.deleteTask(task.id).then(
        async res => {
          this.commonServ.tasks$.next(await this.serv.readTasks());
          const toast =  await this.toastController.create({
            message: 'Task Deleted Successfully',
            duration: 1500,
            position: 'bottom',
            color: 'danger'
          });
          await toast.present();
          this.tasks = await this.serv.readTasks();
        }
      )
    } else{
       const toast = await this.toastController.create({
        message: 'Task is in progress. Can not be deleted',
        duration: 1500,
        position: 'middle',
        color: 'warning'
      });
      await toast.present();
    }
   
  }
}