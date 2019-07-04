import { Storage } from '@ionic/storage';
import { HttpClient } from "@angular/common/http";
import { Utility } from "./Utility";
import { ToastController } from 'ionic-angular';




export class Bills {

    public static baseUrl = Utility.serverAddress + "/api/bills";

    constructor(public http: HttpClient){

    }

    current_data :any;


    public hasPage() {
        if(this.current_data.next_page_url !== null) return true;
        return false;
    }

    public firstPage(handler,errorHandler){
        let url = Bills.baseUrl;
        let THIS = this;
        this.http.get(url)
        .subscribe((data:any)=>{
            THIS.current_data = data;
            handler(data.data);
        },(err)=>{
            errorHandler(err);
        });
    }

    public nextPage(handler,errorHandler){
        let url = this.current_data.next_page_url;
        let THIS = this;
        this.http.get(url)
        .subscribe((data:any)=>{
            THIS.current_data = data;
            handler(data.data);
        },(err)=>{
            //console.log(err);
            errorHandler(err);
            //alert("Error Occured");
        });
    }

    public static resetLocalDB() {
        let bills = {
            data: [],
        }
        return bills;
    }

    public static localInsert(storage: Storage, data: any) {
        storage.get('bills').then((val) => {
            val.data.push(data)
            storage.set('bills', val);
        });
    }

    public static async upload(http: HttpClient, storage: Storage, toast: ToastController) {
        let url = Bills.baseUrl + '/store';
        storage.get('bills').then((val) => {
            //console.log(val);
            if (val && val.data.length > 0) {
                var obj = val.data.shift();
                var sendObj = {
                    id: obj.id,
                    name: obj.name,
                    bill_no: obj.bill_no,
                    amount: obj.amount,
                    issue_date: obj.issue_date,
                    payments: obj.payments,
                };
                http.post(url, { data : JSON.stringify(sendObj) })
                    .subscribe((res: any) => {
                        let count = res.count;
                        //alert(JSON.stringify(val));
                        if (count == 1) {
                            storage.set("bills", val);
                            Utility.newToast(toast, "All Changes Commited To Server.");
                        }
                    }, (err) => {
                        alert(JSON.stringify(err));
                    });
            }
        });
    }

    public static delete(http: HttpClient, id: number) {
        let url = Bills.baseUrl + '/delete';
        http.post(url, { id: id })
            .subscribe((res: any) => {
                let count = res.count;
                if (count > 0)
                    alert("deleted Successfully.");
            }, (err) => {
                alert(JSON.stringify(err));
            });
    }
}