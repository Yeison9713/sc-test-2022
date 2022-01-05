ECHO OFF
D:
CD\web\MAIN-ELECT\build

START  node setup.js cor

CD..

START  npm run deploy
