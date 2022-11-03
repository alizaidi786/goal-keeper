import { Component, OnInit } from '@angular/core';
import { spendTrans } from 'src/app/models/spendTransaction.model';
import { walletTrans } from 'src/app/models/walletTransaction.model';
import { ManagerServiceService } from 'src/app/services/manager-service.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  spendTransactions:spendTrans[] = [];
  walletTransactions:walletTrans[] = [];
  showSpendHistory:boolean = true;
  constructor(private  managerserv: ManagerServiceService) { }

  ngOnInit() {
    this.managerserv.getWalletTransactions().then(
      res => {
        if (res) {
          this.walletTransactions = this.sortByDate(res);
        }
      }
    );
    this.managerserv.getSpendTransactions().then(
      res => {
        if(res){
          this.spendTransactions = this.sortByDate(res);
        }
      }
    )
  }

  sortByDate(data){
    return data.sort(
      (objA, objB) => Number(objB.date) - Number(objA.date),
    )
  }

  showSpend(){
    this.showSpendHistory = true;
  }
  showWallet(){
    this.showSpendHistory = false;
  }

}
