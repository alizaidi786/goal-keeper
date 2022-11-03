import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ManagerServiceService } from 'src/app/services/manager-service.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  categories = [];
  constructor(private alertController: AlertController, private managerserv: ManagerServiceService) { }

  async ngOnInit() {
    await this.managerserv.getCategories().then(
      res => {
        if(res){
          this.categories = res;
        }else{
          this.categories = ["Foods and Drinks", "Offline Shopping","Online Shopping", "Fuel", "Card Payments"];
        }
        
      }
    )
  }

  async presentAlert(){
    const alert = await this.alertController.create({
      header: 'Add New Category',
      buttons: [{text: 'Add', handler: async (data) => {
        if(data.category){
          this.categories.push(data.category);
          await this.managerserv.addCategory(this.categories);
          await this.managerserv.getCategories().then(
            res => { this.categories = res }
          )
        }
      }}],
      inputs: [
        {
          type: 'text',
          name: 'category',
          placeholder: 'Enter Category'
        }
      ],
    });
  
    await alert.present();
    }

    async deleteCategory(cat){
      this.categories = this.categories.filter(
        value => value != cat
      )
      await this.managerserv.addCategory(this.categories);
    }

}
