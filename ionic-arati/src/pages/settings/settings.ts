
import { Component } from '@angular/core';
import { NavController, Platform, ToastController } from 'ionic-angular';

import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { SqlDeclaration } from '../shared/CustomDB';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  
  data = {baseUrl : ""};

  constructor(
    public platform: Platform,
    private storage: Storage,
    public file: File,
    public httpClient: HttpClient,
    public navCtrl: NavController,
    public toastCtrl: ToastController) {
      this.storage.get('settings').then((val)=>{
        this.data = val;
      }).catch(e=>console.log(e));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  resetDatabase()
  {
    SqlDeclaration.resetDatabase(this.storage,this.toastCtrl);
    alert("Storage Cleared.");
  }

}
