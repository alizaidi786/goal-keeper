import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { CommonHttpService } from './common-http.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Task } from './models/task.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Storage } from '@ionic/storage-angular';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CommonService{

  private url = 'https://signupflow-9beee-default-rtdb.firebaseio.com/users/';
  loggedIn: Subject<boolean> = new Subject<boolean>();
  isLoggedIn = false;
  emailLogged;
  userData: Subject<any> = new Subject<any>();

  public tasks$ = new ReplaySubject<Task[]>(1);
  
  constructor(private loadingCtrl: LoadingController, private storage:Storage,private http:HttpClient, private commonHttp: CommonHttpService, private toastController: ToastController, public firebaseAuth: AngularFireAuth, private firebaseDb: AngularFireDatabase) { }

  getQuote():Observable<any>{
    const qoute = new Observable(
      observer => {
        this.commonHttp.getQuote().subscribe(
          res => {
            observer.next(res);
          }
        )
      }
    )
    return qoute;
  }

  async presentToast(message, color){
    const toast = await this.toastController.create({
      message: message,
      duration: 2500,
      position: 'bottom',
      color: color
    })
    await toast.present();
  }

  async signin(email:string, password:string){
    this.emailLogged = email;
    await this.firebaseAuth.signInWithEmailAndPassword(email,password)
    .then(res=> {
      this.isLoggedIn = true;
      this.getUserData(email);
      this.loggedIn.next(true);
      this.storage.set('user',JSON.stringify(res.user));
    })
}

getUserData(value){
  let email = value.replace('.','');
     this.firebaseDb.database.refFromURL(this.url).child(email).once("value", (snap)=> {
       if(snap.val()){
        this.userData.next(snap.val());
        this.storage.set('userData', snap.val());
       }
      })
}

setUserData(form:FormGroup){
  let email = form.value.email.replace('.','');
  let userData = {
   email: form.value.email,
   mobile: form.value.mobile,
   name: form.value.name
  };
  this.firebaseDb.database.refFromURL(this.url).child(email).set(userData)
  .then(res => {
   console.log('Data Saved', res);
  })
  .catch(err => {
   console.log('Error',err);
  }
  )
 }

 logout(){
  this.firebaseAuth.signOut();
  this.storage.remove('user');
  this.storage.remove('userName');
  this.loggedIn.next(false);
  this.isLoggedIn = false;
}

async signup(form:FormGroup){
  let email = form.value.email;
  let password = form.value.password;
  await this.firebaseAuth.createUserWithEmailAndPassword(email,password)
  .then(res=> {
    this.isLoggedIn = true;
    this.loggedIn.next(true);
    this.setUserData(form);
    this.getUserData(email);
    this.storage.set('user',JSON.stringify(res.user))
  })
}

}
