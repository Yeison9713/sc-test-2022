ECHO OFF
D:
CD\web\MAIN-ELECT\build

START  node setup.js new

CD..

START  npm run dist
