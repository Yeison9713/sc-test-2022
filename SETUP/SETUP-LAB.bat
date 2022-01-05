ECHO OFF
D:
CD\web\MAIN-ELECT\build

START  node setup.js lab

CD..

START  npm run deploy
