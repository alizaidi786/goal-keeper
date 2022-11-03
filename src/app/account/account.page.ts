import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  userData;
  constructor(private storage: Storage,private route:Router) { }

  ngOnInit() {
    this.storage.get('userData').then(
      res => {
       this.userData = res;
      }
    )
  }
  async logOut(){
   await this.storage.remove('userData');
   await this.storage.remove('user');
   this.route.navigate(['/login']);
  }

}
