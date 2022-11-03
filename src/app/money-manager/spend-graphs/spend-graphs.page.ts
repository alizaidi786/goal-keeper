import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { spendTrans } from 'src/app/models/spendTransaction.model';
import { ManagerServiceService } from 'src/app/services/manager-service.service';
import { GoalConstants } from 'src/app/models/constants.model';

@Component({
  selector: 'app-spend-graphs',
  templateUrl: './spend-graphs.page.html',
  styleUrls: ['./spend-graphs.page.scss'],
})
export class SpendGraphsPage implements OnInit {
  @ViewChild('barChart') barChart;
  @ViewChild('pieChart') pieChart;
  @ViewChild('doughChart') doughChart;
  @ViewChild('polarChart') polarChart;
  bars: any;
  spendTrans: spendTrans[] = [];
  categories: any = [];
  chartData:any = [];
  amounts: any = [];
  availableCat = [];
  highestSpendCat;
  backgroundColors = GoalConstants.backgroundColors;
  constructor(private managerserv: ManagerServiceService) {
    Chart.register(...registerables);
  }
  // ionViewDidEnter() {
  //   // console.log("ionViewDidEnter")
  //   this.createBarChart();
  // }
  async ngOnInit() {
   
    await this.managerserv.getCategories().then(
      res => {
        if (res) {
          this.categories = res;
        }
      }
    )
    await this.managerserv.getSpendTransactions().then(
      res => {
        if (res) {
          this.spendTrans = res;
          this.categories.forEach(
            cat => {
              let object = {
                amount : 0,
                category : ''
              };
              this.spendTrans.forEach(
                data => {
                  if(data.category == cat){
                    object = {
                      amount : object.amount + data.amount,
                      category : data.category
                    }
                  }
                }
              )
              if(object.category){
                this.chartData.push(object);
                this.amounts.push(object.amount);
                this.availableCat.push(object.category);
              }
            }
          )

          const max = this.chartData.reduce(function(prev, current) {
            return (prev.amount > current.amount) ? prev : current
        })
        console.log(max);
        
          this.highestSpendCat = max.category;
        }
      }
    )
    this.createBarChart();
    this.showPie();
  }

  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        datasets: [{
          label: 'Amount in Rupees',
          data: this.chartData,
          backgroundColor: this.backgroundColors, // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {

        parsing: {
          xAxisKey: 'category',
          yAxisKey: 'amount'
        }
      }
    });
  }

  showPie(){
    new Chart(this.pieChart.nativeElement, {
      type: 'pie',
      options: {
      
      },
      data: {
        labels: this.availableCat,
        datasets: [{
          label: 'Amount in Rupees',
          data: this.amounts,
          backgroundColor: this.backgroundColors,
          hoverOffset: 4
        }]
      }
    })
  }

  showDough(){

  }

  showpolar(){
    
  }

}
