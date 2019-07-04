import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { AddProductPage } from '../add-product/add-product';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/Product';
/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  items: Array<{ id, name, sizes, notes }>;

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    public httpClient: HttpClient,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
    //this.loadProducts();

  }

  public upload() {
    // Handle the online event
    Product.upload(this.httpClient, this.storage,this.toastCtrl);
  }

  doRefresh(refresher) {
    this.loadProducts(refresher);
  }


  public loadProducts(refresher = null) {
    if (!refresher) {
      let loading = this.loadingCtrl.create({
        spinner: 'crescent',
      });
      loading.present();
      Product.all(this.httpClient)
        .subscribe((data: Array<any>) => {
          this.items = data;
          loading.dismiss();
        }, (e) => {
          loading.dismiss();
          //alert(JSON.stringify(e));
          alert("Cannot Connect To Server");
        });
    }
    else {
      Product.all(this.httpClient)
        .subscribe((data: Array<any>) => {
          this.items = data;
          refresher.complete();
        }, (e) => {
          refresher.complete();
          //alert(JSON.stringify(e));
          alert("Cannot Connect To Server");
        });
    }

  }

  ionViewDidEnter() {
    this.upload();
    setTimeout(()=>this.loadProducts(),250);
    //this.loadProducts();
  }

  itemSelected(item: any) {
    this.navCtrl.push(AddProductPage, {
      data: item,
      type: "edit"
    });
    //Utility.newToast(this.toastCtrl,item)
  }

  public openAddNewPage() {
    this.navCtrl.push(AddProductPage, {
      type: "add"
    });
  }

}

