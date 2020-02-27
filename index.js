const electron = require("electron");

const {
    app, 
    BrowserWindow, 
    MEnu, 
    ipcMain} = electron;

let todayWindow;
let createWindow;
let listWindow;

app.on("ready", ()=>{ 
    todayWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        title: "Ini Aplikasi"
    });

    todayWindow. loadURL(`file://${__dirname}/today.html`);
    todayWindow.on("closed", () => {

        app.Quit();
        todayWindow = null;
    })
}); 

const createWindowCreator = () => {
    createWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        title: "Lists"
    });

    listWindow.setMenu(null);
    listWindow.loadURL(`file://${__dirname}/list.html`);
    listWindow.on("closed", () => (listWindow = null))
};

// const menuTemplate=[
//     {
//         label: "File",
//         submenu: [{
//                 label: "Random Submenu",
//                 click(){
//                     createWindowCreator();
//                 }
//         },
//         {

//         }
//         ]
//     }
// ]