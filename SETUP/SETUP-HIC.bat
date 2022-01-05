ECHO OFF
D:
CD\web\MAIN-ELECT\build

START  node setup.js hic

CD..

START  npm run deploy
