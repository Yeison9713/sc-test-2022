const { BrowserWindow, Menu, app, shell, dialog, ipcMain } = require('electron');
const { autoUpdater } = require("electron-updater");
const electron = require('electron');
const argv = require('process').argv;
const jquery = require('jquery');
const mysql = require('mysql');
const username = require('username');

app.commandLine.appendSwitch('js-flags', '--max-old-space-size=8096');


let template = [{
  label: 'Edit',
  submenu: [{
    label: 'Undo',
    accelerator: 'CmdOrCtrl+Z',
    role: 'undo'
  }, {
    label: 'Redo',
    accelerator: 'Shift+CmdOrCtrl+Z',
    role: 'redo'
  }, {
    type: 'separator'
  }, {
    label: 'Cut',
    accelerator: 'CmdOrCtrl+X',
    role: 'cut'
  }, {
    label: 'Copy',
    accelerator: 'CmdOrCtrl+C',
    role: 'copy'
  }, {
    label: 'Paste',
    accelerator: 'CmdOrCtrl+V',
    role: 'paste'
  }, {
    label: 'Select All',
    accelerator: 'CmdOrCtrl+A',
    role: 'selectall'
  }]
}, {
  label: 'View',
  submenu: [{
    label: 'Reload',
    accelerator: 'CmdOrCtrl+R',
    click: (item, focusedWindow) => {
      if (focusedWindow) {
        // on reload, start fresh and close any old
        // open secondary windows
        if (focusedWindow.id === 1) {
          BrowserWindow.getAllWindows().forEach(win => {
            if (win.id > 1) win.close()
          })
        }
        focusedWindow.reload()
      }
    }
  }, {
    label: 'Toggle Full Screen',
    accelerator: (() => {
      if (process.platform === 'darwin') {
        return 'Ctrl+Command+F'
      } else {
        return 'F11'
      }
    })(),
    click: (item, focusedWindow) => {
      if (focusedWindow) {
        focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
      }
    }
  }, {
    label: 'Toggle Developer Tools',
    accelerator: (() => {
      if (process.platform === 'darwin') {
        return 'Alt+Command+I'
      } else {
        return 'Ctrl+Shift+I'
      }
    })(),
    click: (item, focusedWindow) => {
      if (focusedWindow) {
        focusedWindow.toggleDevTools()
      }
    }
  }, {
    type: 'separator'
  }, {
    label: 'App Menu Demo',
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        const options = {
          type: 'info',
          title: 'Application Menu Demo',
          buttons: ['Ok'],
          message: 'This demo is for the Menu section, showing how to create a clickable menu item in the application menu.'
        }
        dialog.showMessageBox(focusedWindow, options, function () { })
      }
    }
  }]
}, {
  label: 'Window',
  role: 'window',
  submenu: [{
    label: 'Minimize',
    accelerator: 'CmdOrCtrl+M',
    role: 'minimize'
  }, {
    label: 'Close',
    accelerator: 'CmdOrCtrl+W',
    role: 'close'
  }, {
    type: 'separator'
  }, {
    label: 'Reopen Window',
    accelerator: 'CmdOrCtrl+Shift+T',
    enabled: false,
    key: 'reopenMenuItem',
    click: () => {
      app.emit('activate')
    }
  }]
}, {
  label: 'Help',
  role: 'help',
  submenu: [{
    label: 'Learn More',
    click: () => {
      shell.openExternal('http://electron.atom.io')
    }
  }]
}]

function addUpdateMenuItems(items, position) {
  if (process.mas) return

  const version = app.getVersion()
  let updateItems = [{
    label: `Version ${version}`,
    enabled: false
  }, {
    label: 'Checking for Update',
    enabled: false,
    key: 'checkingForUpdate'
  }, {
    label: 'Check for Update',
    visible: false,
    key: 'checkForUpdate',
    click: () => {
      require('electron').autoUpdater.checkForUpdates()
    }
  }, {
    label: 'Restart and Install Update',
    enabled: true,
    visible: false,
    key: 'restartToUpdate',
    click: () => {
      require('electron').autoUpdater.quitAndInstall()
    }
  }]

  items.splice.apply(items, [position, 0].concat(updateItems))
}

function findReopenMenuItem() {
  const menu = Menu.getApplicationMenu()
  if (!menu) return

  let reopenMenuItem
  menu.items.forEach(item => {
    if (item.submenu) {
      item.submenu.items.forEach(item => {
        if (item.key === 'reopenMenuItem') {
          reopenMenuItem = item
        }
      })
    }
  })
  return reopenMenuItem
}

if (process.platform === 'darwin') {
  const name = app.getName()
  template.unshift({
    label: name,
    submenu: [{
      label: `About ${name}`,
      role: 'about'
    }, {
      type: 'separator'
    }, {
      label: 'Services',
      role: 'services',
      submenu: []
    }, {
      type: 'separator'
    }, {
      label: `Hide ${name}`,
      accelerator: 'Command+H',
      role: 'hide'
    }, {
      label: 'Hide Others',
      accelerator: 'Command+Alt+H',
      role: 'hideothers'
    }, {
      label: 'Show All',
      role: 'unhide'
    }, {
      type: 'separator'
    }, {
      label: 'Quit',
      accelerator: 'Command+Q',
      click: () => {
        app.quit()
      }
    }]
  })

  // Window menu.
  template[3].submenu.push({
    type: 'separator'
  }, {
    label: 'Bring All to Front',
    role: 'front'
  })

  addUpdateMenuItems(template[0].submenu, 1)
}

if (process.platform === 'win32') {
  const helpMenu = template[template.length - 1].submenu
  addUpdateMenuItems(helpMenu, 0)
}

app.on('ready', () => {
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
})

app.on('browser-window-created', () => {
  let reopenMenuItem = findReopenMenuItem()
  if (reopenMenuItem) reopenMenuItem.enabled = false
})

app.on('window-all-closed', () => {
  let reopenMenuItem = findReopenMenuItem()
  if (reopenMenuItem) reopenMenuItem.enabled = true
})


const url = require('url');
const path = require('path');
let win;

function creaVentana() {
  win = new BrowserWindow({
    title: 'Prosoft | Inicio',
    icon: 'build/pr.ico',
    autoHideMenuBar: true,
    fullscreenable: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadURL(url.format({
    pathname: path.join(`${__dirname}/index.html`),
    protocol: 'file',
    slashes: true

  }))

  win.webContents.on('did-finish-load', () => {
    win.webContents.session.clearCache(() => {
      let param;
      // console.log('argumento2 -> ' + argv[1]);
      param = app.getName();
      console.log(param)
      win.webContents.send('ping', { param: param });
      autoUpdater.autoDownload = false;
      autoUpdater.checkForUpdatesAndNotify();
    });
  });

  win.maximize()
  win.on('closed', cerrarVentana)

}

// win.once("ready-to-show", () => {
//   autoUpdater.autoDownload = false;
//   autoUpdater.checkForUpdatesAndNotify();
//   console.log('update');
// });

ipcMain.on('ping', (e, m) => {
  if (m.param == 'salir') {
    cerrarVentana()
  }
});

function cerrarVentana() {
  app.quit();
}


app.on('ready', creaVentana);

ipcMain.on('another', (e, datos) => {
  var tamano = electron.screen.getAllDisplays();
  var tamano = tamano[0].size;
  segundaventana = new BrowserWindow({
    frame: false,
    width: parseInt(tamano.width - (tamano.width * 0.02)),
    height: parseInt(tamano.height - (tamano.height * 0.1)),
    parent: win,
    webPreferences: {
      nodeIntegration: true,
    }
  });
  let ventanas = BrowserWindow.getAllWindows();
  switch (ventanas.length){
    case 2:
      segundaventana.__name = "Segunda_ventana";
      break;
    case 3:
        segundaventana.__name = "Tercera_ventana";
        break;
    case 4:
        segundaventana.__name = "Cuarta_ventana";
        break;
    case 5:
        segundaventana.__name = "Quinta_ventana";
        break;
    case 6:
        segundaventana.__name = "Sexta_ventana";
        break;
  }

  segundaventana.setBounds({ y: 40 });
  segundaventana.loadURL(path.join(__dirname, 'frameworks/paginas/SegundaVentana.html'));
  var primeraventana = segundaventana.getParentWindow();
  segundaventana.webContents.on('did-finish-load', () => {
    var dir = path.join(__dirname, datos.directorio);
    segundaventana.webContents.send('finish', [dir, primeraventana, datos]);
  })
});

ipcMain.on('ventana2', (e, m) => {
  let ventanas = BrowserWindow.getAllWindows();
  if (ventanas.filter(x => x.__name == 'Sexta_ventana').length > 0) {
    BrowserWindow.fromId(ventanas.filter(x => x.__name == 'Sexta_ventana')[0].id).webContents.send('cerrar');
    ventanas.filter(x => x.__name == 'Quinta_ventana')[0].id.webContents.send('ejecutar');
  } else {
    if (ventanas.filter(x => x.__name == 'Quinta_ventana').length > 0) {
      BrowserWindow.fromId(ventanas.filter(x => x.__name == 'Quinta_ventana')[0].id).webContents.send('cerrar');
      ventanas.filter(x => x.__name == 'Cuarta_ventana')[0].id.webContents.send('ejecutar');
    } else {
      if (ventanas.filter(x => x.__name == 'Cuarta_ventana').length > 0) {
        BrowserWindow.fromId(ventanas.filter(x => x.__name == 'Cuarta_ventana')[0].id).webContents.send('cerrar');
        BrowserWindow.fromId(ventanas.filter(x => x.__name == 'Tercera_ventana')[0].id).webContents.send('ejecutar');
      } else {
        if (ventanas.filter(x => x.__name == 'Tercera_ventana').length > 0) {
          BrowserWindow.fromId(ventanas.filter(x => x.__name == 'Tercera_ventana')[0].id).webContents.send('cerrar');
          BrowserWindow.fromId(ventanas.filter(x => x.__name == 'Segunda_ventana')[0].id).webContents.send('ejecutar');
        } else {
            console.log('aca')
            BrowserWindow.fromId(ventanas.filter(x => x.__name == 'Segunda_ventana')[0].id).webContents.send('cerrar');
            win.webContents.send("closed2");     
        }
      }
    }
  }
})

ipcMain.on('update_app', () => {
  username().then(data => {
    let rimraf = require("rimraf");
    let user = data;
    let nameelectron = app.getName().toLowerCase();
    rimraf(`C:\\Users\\${user}\\AppData\\Local\\${nameelectron}-updater`, error => {
      if (error) {
        win.webContents.send("error_downloaded", { error: error });
      } else {
        autoUpdater.downloadUpdate().then(() => {
          win.webContents.send("update_downloaded");
        });
      }
    })
  })
})

autoUpdater.on("update-available", () => {
  console.log('update available');
  win.webContents.send("update_available");
});

autoUpdater.on("update-downloaded", () => {
  win.webContents.send("update_downloaded");
});

autoUpdater.on('download-progress', (progressObj) => {
  win.webContents.send('message', progressObj.percent + '%');
})

ipcMain.on("restart_app", () => {
  setImmediate(() => {
    app.removeAllListeners("window-all-closed")
    autoUpdater.quitAndInstall(true, true);
  })
});