ECHO OFF
D:
CD\web\MAIN-ELECT\build

START  node setup.js man

CD..

START  npm run deploy
