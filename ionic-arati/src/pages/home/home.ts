import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ProductPage } from '../product/product';
import { SettingsPage } from '../settings/settings';
import { BillsPage } from '../bills/bills';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(public navCtrl: NavController,
    public storage: Storage) {
  }

  openProduct(){
    this.navCtrl.setRoot(ProductPage);
  }

  openBills(){
    this.navCtrl.setRoot(BillsPage);
  }

  openSettings(){
    this.navCtrl.setRoot(SettingsPage);
  }
 

}
