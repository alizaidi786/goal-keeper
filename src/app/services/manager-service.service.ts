import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { spendTrans } from '../models/spendTransaction.model';
import { walletTrans } from '../models/walletTransaction.model';

@Injectable({
  providedIn: 'root'
})

export class ManagerServiceService {
  private walletAmountKey  = 'walletAmount';
  private spendCategoryKey = 'spendCategory';
  private walletTransKey = 'walletTrans';
  private spendTransKey = 'spendTrans';
  constructor( private storage: Storage) { }

  async addBalance(amount){
    let balance = await this.getBalance();
    if(balance){
      let newBalance = balance + amount;
      await this.storage.set(this.walletAmountKey, newBalance)
    } else{
      await this.storage.set(this.walletAmountKey, amount)
    }
  }

  async resetBalance(){
    await this.storage.set(this.walletAmountKey, 0);
  }

  async getBalance(){
    return await this.storage.get(this.walletAmountKey)
  }

  async addCategory(data){
    await this.storage.set(this.spendCategoryKey, data);
  }

  async getCategories(){
    return await this.storage.get(this.spendCategoryKey);
  }

  async addWalletTransaction(data:walletTrans){
    console.log(data);
    
    let key = this.walletTransKey+data.id;
    await this.storage.set(key, data);
  }
  async getWalletTransactions(){
    let walletTrans: Array<walletTrans> = [];
    await this.storage.forEach((v, key, i)=>{
      if(key.startsWith(this.walletTransKey)){
        walletTrans.push(v);
      }
    });

    return walletTrans;
  }

  async addSpendTransaction(data:spendTrans){
    let key = this.spendTransKey+data.id;
    await this.storage.set(key, data);
  }
  async getSpendTransactions(){
    let spendTrans: Array<spendTrans> = [];
    await this.storage.forEach((v, key, i)=>{
      if(key.startsWith(this.spendTransKey)){
        spendTrans.push(v);
      }
    });

    return spendTrans;
  }

}
