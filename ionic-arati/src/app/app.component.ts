import { Component,ViewChild } from '@angular/core';
import { Nav, Platform,MenuController, ToastController  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { ProductPage } from '../pages/product/product';
import { SettingsPage } from '../pages/settings/settings';
import { SqlDeclaration } from '../pages/shared/CustomDB';
import { BillsPage } from '../pages/bills/bills';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = HomePage;  

  public pages = [
    { title: 'Home', component: HomePage,icon : "home" },
    { title: 'Products', component: ProductPage,icon : "pricetag" },
    { title: 'Bills', component: BillsPage,icon : "document" },
    { title: 'Settings', component: SettingsPage,icon : "settings" },
  ];

  constructor(platform: Platform, statusBar: StatusBar,
     splashScreen: SplashScreen,
    public menuCtrl : MenuController,
    public toast : ToastController,
    public storage : Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      SqlDeclaration.initDatabase(storage,toast);
    });

    
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.menuCtrl.close();
  }

  
}
