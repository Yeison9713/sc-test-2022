ECHO OFF
D:
CD\web\MAIN-ELECT\build

START  node setup.js cer

CD..

START  npm run dist
