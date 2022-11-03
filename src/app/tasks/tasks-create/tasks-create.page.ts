import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { CommonService } from 'src/app/common.service';
import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-tasks-create',
  templateUrl: './tasks-create.page.html',
  styleUrls: ['./tasks-create.page.scss'],
})
export class TasksCreatePage implements OnInit {
  createForm: FormGroup;
  todayDate;
  endMinDate;
  constructor(private commonServ:CommonService, private toastController: ToastController, private router:Router,private fb: FormBuilder, private datePipe: DatePipe, private taskServ: TasksService) {
   }

  ngOnInit() {
    this.todayDate = new Date();
    this.endMinDate = this.todayDate;
    this.createForm = this.fb.group(
      {
        title: ['', Validators.required],
        description: ['', Validators.required],
        startDate: ['',Validators.required],
        endDate:['',Validators.required]
      }
    )
  }

  async onCreate(form){
    if(form.valid){
       let obj = this.prepareObjectForSave(form);
       console.log(obj);
       this.taskServ.createNewTask(obj).then(
        async res => {
         this.commonServ.tasks$.next(await this.taskServ.readTasks());
          this.router.navigateByUrl('/tasks-home');
          this.commonServ.presentToast('Task Created Successfully', 'success');
        }
       )
    }
     
  }
  getStartDate(args){
    console.log(args);
    
   this.endMinDate = args;
  }

  prepareObjectForSave(form: FormGroup) {
    let uid = Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
    let user = 'ali@gmail.com'
    let obj: Task = {
      title: form.value.title,
      description: form.value.description,
      id: uid,
      status: 'New',
      startDate: form.value.startDate,
      endDate: form.value.endDate,
      userId: user,
      actualStartDate: '',
      actualFinishDate: ''
    }
    return obj;
  }
}
