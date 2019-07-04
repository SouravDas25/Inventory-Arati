
import { ToastController } from "ionic-angular";


export class Utility {

    public static serverAddress = "https://arati.000webhostapp.com";
    //public static serverAddress = "http://192.168.0.2/Inventory-Management/Arati-Server/public_html";

    public static Toaster = (toastCtrl : ToastController, 
    TAG : string ,
    msg : any,
    callback : any = null,
    time : number = 3000,
    position:string = "bottom") => {
        if(TAG.length > 0) msg = TAG + " : " + JSON.stringify(msg)
        let toast = toastCtrl.create({
            message: msg,
            duration: time,
            position: position,
          });
          if(callback != null){
              toast.onDidDismiss(callback);
          }
          toast.present();
        
    };

    public static newToast(toastCtrl : ToastController,
        msg : any,
        callback : any = null,
        time : number = 3000,
        position:string = "bottom") {
            Utility.Toaster(toastCtrl,"",msg,callback,time,position);
      }
    
      public static resetSettings()
      {
        return {
            baseUrl : "https://arati.000webhostapp.com",
        };
      }
}