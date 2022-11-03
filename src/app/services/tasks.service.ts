import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';
import { ReplaySubject } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private url = 'https://signupflow-9beee-default-rtdb.firebaseio.com/tasks/';

  selectedTask:ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(private firebaseDb: AngularFireDatabase, private storage: Storage) { }

  async createNewTask(taskData: Task) {
    // let uid = Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
    let key = 'goalKeeperTasks'+taskData.id;
   
    return await this.storage.set(key, taskData);
    // let email = taskData.userId.replace('.', '');
    // await this.firebaseDb.database.refFromURL(this.url + email).child(taskData.id).set(taskData)
    //   .then(res => {
    //     console.log(res);
    //   })
  }

  public async readTasks(): Promise<Task[]>{

    let tasks: Array<Task> = [];
    await this.storage.forEach((v, key, i)=>{
      if(key.startsWith("goalKeeperTasks")){
       tasks.push(v);
      }
    });

    return tasks;
  }

  public async deleteTask(id): Promise<any>{
    let key  = 'goalKeeperTasks'+id;
    return await this.storage.remove(key);
  }
  
  public async updateTask(task):Promise<any>{
    let key  = 'goalKeeperTasks'+task.id;
    return await this.storage.set(key, task);
  }

}
