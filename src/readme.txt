android:

console: https://play.google.com/apps/publish/
https://ionicframework.com/docs/publishing/play-store
keystore: citomovil
ionic cordova build android --prod --release -- -- --packageType=bundle
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore cito-release-key.keystore app-release-unsigned.apk citomovil
~/Library/Android/sdk/build-tools/27.0.2/zipalign -v 4 app-release-unsigned.apk citomovilv01.apk
~/Library/Android/sdk/build-tools/27.0.2/apksigner verify citomovilv01.apk

