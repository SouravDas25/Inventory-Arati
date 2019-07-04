import { Bills } from './../shared/Bills';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { EdaBillsPage } from '../eda-bills/eda-bills';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the BillsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-bills',
  templateUrl: 'bills.html',
})
export class BillsPage {

  public items : Array<{name,paid,amount,text_color,total_amount,total_due,bills}>;

  public billHelper : Bills;

  constructor(
    public navCtrl: NavController,
    public httpClient: HttpClient,
    public toastCtrl: ToastController,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    public navParams: NavParams) {
      this.billHelper = new Bills(this.httpClient);
  }

  doRefresh(refresher) {
    this.loadBills(refresher);
    refresher.complete();
  }

  public upload() {
    // Handle the online event
    Bills.upload(this.httpClient, this.storage,this.toastCtrl);
    
  }

  ionViewDidEnter() {
    this.upload();
    setTimeout(()=>this.loadBills(),500);
  }

  loadBills(refresher=null){

    let loading;
    if (!refresher) {
      loading = this.loadingCtrl.create({
        spinner: 'crescent',
      });
      loading.present();
    }

    this.billHelper
    .firstPage((data)=>{
      this.items = data;

      if (!refresher) loading.dismiss();
      else  refresher.complete();

    },(err)=>{

      if (!refresher) loading.dismiss();
      else  refresher.complete();

      console.log(err);
      alert("Cannot Connect To Server");
    })
  }

  itemSelected(item: any) {
    this.navCtrl.push(EdaBillsPage, {
      data: item,
      type: "edit"
    });
    //Utility.newToast(this.toastCtrl,item)
  }

  public openAddNewPage() {
    this.navCtrl.push(EdaBillsPage, {
      type: "add"
    });
  }

  doInfinite(infiniteScroll){
    if(this.billHelper.hasPage()){
      this.billHelper.nextPage( (data) => {
        console.log("data found");
        this.items = this.items.concat(data);
        infiniteScroll.complete();
      },(err) => {
        console.log(err);
        infiniteScroll.complete();
      })
    }
    else {
      console.log("No More Pages");
      infiniteScroll.complete();
    }
    
    //console.log(infiniteScroll);
  }

}
