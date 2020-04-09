const electron = require("electron");
const uuid = require("uuid").v4;
const {
    app, 
    BrowserWindow, 
    Menu, 
    ipcMain} = electron;

let todayWindow;
let createWindow;
let listWindow;
let aboutWindow;
let allAppointment = [];

app.allowRendererProcessReuse = false;

app.on("ready", ()=>{ 
    todayWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        title: "Ini Aplikasi"
    });

    todayWindow. loadURL(`file://${__dirname}/today.html`);
    todayWindow.on("closed", () => {

        app.quit();
        todayWindow = null;
    })

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
}); 

const listWindowCreator = () => {
    listWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        title: "Lists"
    });

    listWindow.setMenu(null);
    listWindow.loadURL(`file://${__dirname}/list.html`);
    listWindow.on("closed", () => (listWindow = null));
};

const createWindowCreator = () => {
    createWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        title: "Create"
    });

    createWindow.setMenu(null);
    createWindow.loadURL(`file://${__dirname}/create.html`);
    createWindow.on("closed", () => (createWindow = null));
};

const aboutWindowCreator = () => {
    aboutWindow = new BrowserWindow({
       webPreferences: {
           nodeIntegration: true
       },
       width: 600,
       height: 400,
       title: "About"
    });

    aboutWindow.setMenu(null);
    aboutWindow.loadURL(`file://${__dirname}/about.html`);
    aboutWindow.on("closed", () => (aboutWindow = null));
}

ipcMain.on("appointment:create", (event, appointment)=>{
    appointment["id"]=uuid();
    appointment["done"]=0;
    allAppointment.push(appointment);
    createWindow.close();
    console.log(allAppointment);
});

ipcMain.on("appointment:request:list", event => {
    listWindow.webContents.send('appointment:response:list', allAppointment);
});

ipcMain.on("appointment:request:today", event => {
    console.log("here2");
});

ipcMain.on("appointment:done", (event, id) => {
    console.log("here3");
});



const menuTemplate=[
    {
        label: "File",
        submenu: [{
            label: "Create",
            click(){
                createWindowCreator();
            }
        },
        {
            label: "List",
            click(){
                listWindowCreator();
            }    
        },
        {
            label: "Quit",
            accelerator:process.platform === "darwin" ? "Command+Q" : "Ctrl+Q",
            click(){
                app.quit();
            }   
        }
            
        ]
    },
    {
        label: "View",
        submenu:[{role: "reload"}, {role:"toggledevtools"}]

    },
    {
        label: "About",
        submenu:[
            {
                label: "About Us",
                click(){
                    aboutWindowCreator();
                }
            }
        ]
    }

]