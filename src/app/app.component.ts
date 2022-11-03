import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { TasksService } from './services/tasks.service';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
 

  userName;
  public appPages = [
    {title: 'Home', url: '/home', icon: 'home'},
    { title: 'Tasks', url: '/tasks-home', icon: 'grid' },
    {title: 'Money Manager', url:'/money-manager-home', icon:'wallet'},
    {title: 'Account', url:'/account', icon:'person-circle'}
  ];
  constructor(private storage:Storage, private serv: TasksService, private comserv: CommonService) {
   
    
  }
  async ngOnInit(){
   await this.storage.create();
   let tasks = await this.serv.readTasks();
   this.comserv.tasks$.next(tasks);
   this.storage.get('userData').then(
    res => {
      if(res){
        this.userName = res.name;
      }
      
    }
   )
   this.comserv.userData.subscribe(
    res => {
      if(res){
        this.userName = res.name;
      }
    }
   )
  
  }

}
