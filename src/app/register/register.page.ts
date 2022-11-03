import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { Storage } from '@ionic/storage';
import { FirebaseErrorsService } from '../services/firebase-errors.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm:FormGroup;
  loadingButton: boolean;
  constructor(private cserv:CommonService,private fb: FormBuilder, private storage: Storage, private route:Router,  private err:FirebaseErrorsService) { }

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        confpassword:['', Validators.required],
        mobile:[''],
      }
    )
  }

  async onRegister(form: FormGroup){
    if(form.valid){
      this.loadingButton = true;
      await this.cserv.signup(form)
      .then(res => {
        if(this.cserv.isLoggedIn){
          this.loadingButton = false;
          this.route.navigate(['/home']);
        }else{
          // this.snackBar.open('Please enter all the details', '', { duration: 1500, panelClass:'snackbar-error' });
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
