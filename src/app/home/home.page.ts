import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  qouteObj;
  newTasksCount;
  userName;
  constructor(private commonserv: CommonService, private storage:Storage) { }

  async ngOnInit() {
    
    let doc = document.getElementById('tasksCount');
    await this.commonserv.getQuote().subscribe(
       res => {
        this.qouteObj = res;
      }
    )

    await this.commonserv.userData.subscribe(
      res => {
        this.userName = res.name;
      }
    )

    await this.commonserv.tasks$.subscribe(
      res => {
        if(res){
          let data = res.filter(obj => obj.status == 'New');
          this.newTasksCount = data.length;
          this.animateValue(doc,0,this.newTasksCount,500);
        }
      }
    )
    
    this.storage.get('userData').then(
      res => {
        console.log(res);
      }
    )
  }

  copyQoute(){
    console.log('clicked');
    console.log(this.qouteObj.quote);
    
    navigator.clipboard.writeText(this.qouteObj.quote);
    this.commonserv.presentToast('Quote Copied Successfully', 'warning')
  }

  animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }



}
