ECHO OFF
D:
CD\web\MAIN-ELECT\build

START  node setup.js tax

CD..

START  npm run deploy
