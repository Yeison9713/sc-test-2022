ECHO OFF
D:
CD\web\MAIN-ELECT\build

START  node setup.js odo

CD..

START  npm run deploy
