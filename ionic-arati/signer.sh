
echo `ionic cordova build android --release`

echo `jarsigner -verbose -keystore "D:\Cloud\OneDrive\Programming\android-key\key-android.jks"   "D:\Cloud\OneDrive\Programming\Projects\Mobile-Inventory-Management\ionic-arati\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk" android_key`

echo `adb install -r "D:\Cloud\OneDrive\Programming\Projects\Mobile-Inventory-Management\ionic-arati\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk" `

read 
read -p "Enter Any Key ... "


