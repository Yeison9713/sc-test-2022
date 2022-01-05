ECHO OFF
D:
CD\web\MAIN-ELECT\build

START  node setup.js nom

CD..

START  npm run dist
