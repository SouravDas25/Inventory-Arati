import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Utility } from '../shared/Utility';
import { Storage } from '@ionic/storage';
import { Product } from '../shared/Product';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'page-add-product',
    templateUrl: 'add-product.html',
})
export class AddProductPage {

    public data = { id: null, sizes: [{ size: 30, cost: 0, qty: 1 }], name: "", notes: "" };
    type: string;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private storage: Storage,
        public httpClient: HttpClient,
        public toastCtrl: ToastController) {
        this.type = navParams.get('type');
        if (this.type == "edit") {
            this.data = navParams.get('data');
        }

    }

    addSize() {
        this.data.sizes.push({
            size: this.data.sizes[0].size + this.data.sizes.length * 2,
            cost: this.data.sizes[this.data.sizes.length-1].cost,
            qty: this.data.sizes[0].qty
        });
    }

    operateQty(item, val) {
        if (item.qty + val >= 0) {
            item.qty += val;
        }
    }

    removeSize(index) {
		if(this.data.sizes.length > 1)
        this.data.sizes.splice(index, 1);
    }

    saveProduct() {
        let data = this.data;
        if (data.name.length < 1) return Utility.newToast(this.toastCtrl, "Name Of the product Is Required.");
        if (this.type == "edit") {
            this.updateProduct(data);
        }
        else this.saveNewProduct(data);
    }

    deleteItem(){
        Product.delete(this.httpClient,this.data.id);
        this.navCtrl.popToRoot();
    }

    updateProduct(data) {
        Product.localInsert(this.storage, data);
        Utility.newToast(this.toastCtrl, "Product Updated")
        this.navCtrl.popToRoot();
    }

    saveNewProduct(data) {
        Product.localInsert(this.storage, data);
        Utility.newToast(this.toastCtrl, "Product Saved");
        this.navCtrl.popToRoot();
    }

    

   

}
