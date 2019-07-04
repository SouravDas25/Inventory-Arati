import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from  '@angular/common/http';

import { HomePage } from '../pages/home/home';
import { ProductPage } from '../pages/product/product';
import { AddProductPage } from '../pages/add-product/add-product';
import { SettingsPage } from '../pages/settings/settings';
import { BillsPage } from '../pages/bills/bills';
import { EdaBillsPage } from '../pages/eda-bills/eda-bills';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { FormsModule } from '@angular/forms';
import { File } from '@ionic-native/file';
import { Network } from '@ionic-native/network';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProductPage,
    AddProductPage,
    SettingsPage,
    BillsPage,
    EdaBillsPage,
  ], 
  imports: [
    BrowserModule,
    FormsModule, 
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: [ 'sqlite','indexeddb','websql']
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProductPage,
    AddProductPage,
    SettingsPage,
    BillsPage,
    EdaBillsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    File,
    Network,
  ]
})
export class AppModule {}
