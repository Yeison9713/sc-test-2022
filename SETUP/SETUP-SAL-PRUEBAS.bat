ECHO OFF
D:
CD\web\MAIN-ELECT\build

START  node setup.js saly

CD..

START  npm run deploy
