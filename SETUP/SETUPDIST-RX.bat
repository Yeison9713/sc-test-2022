ECHO OFF
D:
CD\web\MAIN-ELECT\build

START  node setup.js rx

CD..

START  npm run dist
