import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { CommonService } from '../common.service';
import { FirebaseErrorsService } from '../services/firebase-errors.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  database:Storage;
  loadingButton: boolean;
  constructor( private cserv:CommonService,private fb: FormBuilder, private storage: Storage, private route:Router,  private err:FirebaseErrorsService) { }
 
  async ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['',Validators.required]
    })
    const db  = await this.storage.create();
    this.database = db;
    this.database.set('name', 'Ali');
  }

  async onLogin(form){
   if(form.valid){
    this.loadingButton = true;
  await this.cserv.signin(form.value.email, form.value.password)
  .then(res => {
    if(this.cserv.isLoggedIn){
      this.loadingButton = false;
      this.route.navigate(['/home']);
    }
  })
  .catch((error) => {
    this.cserv.presentToast(this.err.errorMsgs[error.code],'danger');
    this.loadingButton = false;
  })
  }else{
    this.cserv.presentToast('Please enter all the details', 'danger');
  }
  }

}
