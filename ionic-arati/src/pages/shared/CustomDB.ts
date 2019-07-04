import { Storage } from '@ionic/storage';
import { Utility } from './Utility';
import { ToastController } from 'ionic-angular';
import { Product } from './Product';
import { Bills } from './Bills';


export class SqlDeclaration {

    static resetDatabase(storage: Storage,toastCtrl: ToastController) {
        storage.remove('products');
        storage.remove('bills');
        storage.remove('settings');
    }

    static async initDatabase(storage: Storage, toastCtrl: ToastController, reset: boolean = false) {
        if (reset == true) {
            SqlDeclaration.resetDatabase(storage, toastCtrl);
            Utility.newToast(toastCtrl, "Database Reseted.");
        }
        let flag = false;
        storage.get('products').then((val) => {
            if (!val) { 
                storage.set("products", Product.resetLocalDB() );
                flag = true;
            }
        });
        storage.get('bills').then((val) => {
            if (!val) { 
                storage.set("bills", Bills.resetLocalDB() );
                flag = true;
            }
        });
        storage.get('settings').then((val) => {
            if (!val) { 
                storage.set("settings", Utility.resetSettings() );
                flag = true;
            }
        });
        if(flag)Utility.newToast(toastCtrl, "Database Initialized. ");
    }

}