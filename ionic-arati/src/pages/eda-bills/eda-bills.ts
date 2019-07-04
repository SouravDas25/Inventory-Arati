import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Utility } from '../shared/Utility';
import { Bills } from '../shared/Bills';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the EdaBillsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-eda-bills',
  templateUrl: 'eda-bills.html',
})
export class EdaBillsPage {

  public data = {
    id: null,
    amount: 0,
    name: "",
    paid: 0,
    bill_no : "",
    issue_date: new Date().toISOString(),
    payments: [{ date: new Date().toISOString(), amount: 0, notes: "" }]
  };
  
  type: string;

  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public httpClient: HttpClient,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public navParams: NavParams) {
    this.type = navParams.get('type');
    if (this.type == "edit") {
      this.data = navParams.get('data');
      this.data.issue_date = new Date(this.data.issue_date).toISOString();
      console.log(this.data);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EdaBillsPage');
  }

  addPayment() {
    this.data.payments.push({ date: new Date().toISOString(), amount: 0, notes: "" });
  }

  removePayment(index) {
    this.data.payments.splice(index, 1);
  }

  saveBill() {
    let data = this.data;
    if (data.name.length < 1) return Utility.newToast(this.toastCtrl, "Name Of the Bill Owner Is Required.");
    if (this.type == "edit") {
      this.updateBill(data);
    }
    else this.saveNewBill(data);
  }

  addNote(index: number) {
    let alert = this.alertCtrl.create({
      title: 'Notes',
      inputs: [
        {
          name: 'note',
          placeholder: 'Notes',
          type: "text",
          value: this.data.payments[index].notes
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Done',
          role: 'done',
          handler: data => {
            this.data.payments[index].notes = data.note;
          }
        }
      ]
    });
    alert.present();
  }

  updateBill(data) {
    Bills.localInsert(this.storage, data);
    Utility.newToast(this.toastCtrl, "Bill Updated")
    this.navCtrl.popToRoot();
  }

  saveNewBill(data) {
    Bills.localInsert(this.storage, data);
    Utility.newToast(this.toastCtrl, "Bill Saved");
    this.navCtrl.popToRoot();
  }

  deleteItem() {
    Bills.delete(this.httpClient, this.data.id);
    this.navCtrl.popToRoot();
  }

}
