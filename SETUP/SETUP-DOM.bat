ECHO OFF
D:
CD\web\MAIN-ELECT\build

START  node setup.js dom

CD..

START  npm run deploy
