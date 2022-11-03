import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { spendTrans } from 'src/app/models/spendTransaction.model';
import { walletTrans } from 'src/app/models/walletTransaction.model';
import { ManagerServiceService } from 'src/app/services/manager-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  walletBalance;
  walletTransactions: walletTrans[];
  spendTransactions:spendTrans[];
  spendForm: FormGroup;
  categories = [];
  constructor(private fb:FormBuilder, private managerserv: ManagerServiceService, private alertController: AlertController, private toastController: ToastController) { }

  async ngOnInit() {
    this.managerserv.getBalance().then(
      res => {
        if (res) {
          this.walletBalance = res;
        } else {
          this.walletBalance = 0;
        }
      }
    );
    this.managerserv.getWalletTransactions().then(
      res => {
        if (res) {
          console.log(res);
          this.walletTransactions = this.sortByDate(res);
          this.walletTransactions = this.walletTransactions.splice(0,5);
        }
      }
    );
    this.managerserv.getCategories().then(
      res => {
        if (res) {
          this.categories = res;
        }
      }
    );
    this.spendForm = this.fb.group(
      {
        amount: ['', Validators.required],
        description: [''],
        category: ['',Validators.required]
      }
    );
    this.managerserv.getSpendTransactions().then(
      res => {
        if(res){
          this.spendTransactions = this.sortByDate(res.splice(0,5));
        }
      }
    )

  }

  async onSubmit(spendForm){
    if(spendForm.valid){
    let uid = Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
    let sTrans: spendTrans = {
      id: uid,
      amount: spendForm.value.amount,
      date: new Date(),
      category: spendForm.value.category,
      description:spendForm.value.description
    }
    await this.managerserv.addSpendTransaction(sTrans).then(
      async res => {
        this.presentToast('Spend Added Successfully', 'success');
        await this.managerserv.addBalance(-sTrans.amount);
        await this.managerserv.getBalance().then(
          res => {
            if(res){
              this.walletBalance = res;
            }
          }
        )
        await this.managerserv.getSpendTransactions().then(
          res => {
            if(res){
              this.spendTransactions = this.sortByDate(res);
             this.spendTransactions = this.spendTransactions.splice(0,5);
            }
          }
        )
      }
    )
  }else{
    this.presentToast('No details', 'danger');
  }
  }

  updateCat(){
    this.managerserv.getCategories().then(
      res => {
        if (res) {
          this.categories = res;
        }
      }
    );
  }

  async resetBalance() {
    this.managerserv.resetBalance().then(
      async res => {
        let uid = Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
        let wTrans: walletTrans = {
          id: uid,
          amount: 0,
          date: new Date(),
          msg: 'reset'
        }
        await this.managerserv.addWalletTransaction(wTrans);
        this.walletBalance = 0;
        this.managerserv.getWalletTransactions().then(
          res => {
            if (res) {
              console.log(res);
              this.walletTransactions = this.sortByDate(res);
              this.walletTransactions = this.walletTransactions.splice(0,5);
            }
          }
        )
       this.presentToast('Balance Reset Successfully', 'success');
      }
    )
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Please enter the amount',
      buttons: [{
        text: 'Add', handler: async (data) => {
          if (data.amount > 0) {
            let amount = parseInt(data.amount);
            let uid = Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
            let wTrans: walletTrans = {
              id: uid,
              amount: amount,
              date: new Date(),
              msg: 'add'
            }
            console.log(wTrans);
            await this.managerserv.addBalance(amount);
            await this.managerserv.addWalletTransaction(wTrans);
            await this.managerserv.getWalletTransactions().then(
              res => {
                if (res) {
                  console.log(res);
                  this.walletTransactions = this.sortByDate(res);
                  this.walletTransactions = this.walletTransactions.splice(0,5);
                  
                }
              }
            )
            await this.managerserv.getBalance().then(
              async res => {
                this.walletBalance = res;
                this.presentToast('Amount Added Successfully', 'success');
              }
            )
          }
        }
      }],
      inputs: [
        {
          type: 'number',
          name: 'amount',
          placeholder: 'Amount',
          min: 1
        }
      ],
    });

    await alert.present();
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

  sortByDate(data){
    return data.sort(
      (objA, objB) => Number(objB.date) - Number(objA.date),
    )
  }
}
