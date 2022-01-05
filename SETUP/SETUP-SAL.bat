ECHO OFF
D:
CD\web\MAIN-ELECT\build

START  node setup.js sal

CD..

START  npm run deploy
