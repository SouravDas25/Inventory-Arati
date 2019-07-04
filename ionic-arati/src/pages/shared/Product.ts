import { Storage } from "@ionic/storage";
import { File } from "@ionic-native/file";
import { ToastController } from "ionic-angular";
import { Utility } from "./Utility";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";


export class Product {

    public static baseUrl = Utility.serverAddress + "/api/products";


    constructor(
        public id: number,
        public name: string,
        public notes: string,
        public sizes: Object) {

    }

    public static resetLocalDB() {
        let products = {
            data: [],
        }
        return products
    }

    public static delete(http: HttpClient, id: number) {
        let url = Product.baseUrl + '/delete';
        http.post(url, { id : id })
            .subscribe((res: any) => {
                let count = res.count;
                if(count > 0)
                alert("deleted Successfully.");
            }, (err) => {
                alert(JSON.stringify(err));
            });
    }

    public static all(http: HttpClient): Observable<any> {
        let url = Product.baseUrl;
        return http.get(url);
    }

    public static async upload(http: HttpClient, storage: Storage,toast : ToastController) {
        let url = Product.baseUrl + '/store';
        storage.get('products').then((val) => {
            if (val && val.data.length > 0) {
                http.post(url, { data: val })
                    .subscribe((res: any) => {
                        let count = res.count;
                        //alert(JSON.stringify(val));
                        if (count == val.data.length) {
                            storage.set("products", Product.resetLocalDB());
                            Utility.newToast(toast,"All Changes Commited To Server.");
                        }

                    }, (err) => {
                        alert(JSON.stringify(err));
                    });
            }
        });
    }

    /*static find(array: Array<{ id }>, id: number): number {
        for (let i = 0; i < array.length; i++) {
            if (array[i].id == id) {
                return i;
            }
        }
    }*/

    /*public static update(storage: Storage, id: number, data: any) {
        storage.get('products').then((val) => {
            let index: number = Product.find(val.data, id);
            val.data[index] = data;
            storage.set('products', val);
        });
    }*/

    public static localInsert(storage: Storage, data: any) {
        storage.get('products').then((val) => {
            val.data.push(data)
            storage.set('products', val);
        });
    }

    public static async SaveFile(file: File, storage: Storage, toast: ToastController) {
        let fpath = "";
        await storage.get('products').then(async (val) => {
            let dir = file.externalDataDirectory;
            let filename = "productDB.db.txt";
            fpath = dir + filename;
            await file.createFile(dir, filename, true).catch((e) => {
                //Utility.newToast(toast,e);
            });
            await file.writeExistingFile(dir, filename, JSON.stringify(val))
                .then(() => {
                    Utility.newToast(toast, 'File Written ' + fpath);
                }).catch((e) => {
                    Utility.newToast(toast, e);
                });
        });
        return fpath;
    }
}