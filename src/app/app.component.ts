import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AdMob, BannerAdOptions, BannerAdPosition, BannerAdSize } from '@capacitor-community/admob';
import { TasksService } from './services/tasks.service';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  // options:AdOptions = {
  //   adId: "YOUR ADID",
  //   adSize: AdSize.BANNER,
  //   position: AdPosition.BOTTOM_CENTER
  // }

  userName;
  public appPages = [
    {title: 'Home', url: '/home', icon: 'home'},
    { title: 'Tasks', url: '/tasks-home', icon: 'grid' },
    {title: 'Money Manager', url:'/money-manager-home', icon:'wallet'},
    {title: 'Account', url:'/account', icon:'person-circle'}
  ];
  constructor(private storage:Storage, private serv: TasksService, private comserv: CommonService) {
    const options: BannerAdOptions = {
      adId: 'ca-app-pub-1870200283695730/5723058484',
      adSize: BannerAdSize.BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: true
      // npa: true
    };
    AdMob.showBanner(options).then(
      res => {
       console.log(res);
       
      }
    )
  }
  async ngOnInit(){
   await this.storage.create();
   let tasks = await this.serv.readTasks();
   this.comserv.tasks$.next(tasks);
   this.storage.get('user').then(
    res => {
      // console.log(res);
      
    }
   )
   this.storage.get('userData').then(
    res => {
      this.userName = res.name;
    }
   )
   this.comserv.userData.subscribe(
    res => {
     this.userName = res.name;
    }
   )
  //  this.serv.getUserData(email.email);
  }

}
