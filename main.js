const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const ipcMain = require('electron').ipcMain

let main_win

function createWindow() {
	//BrowserWindow has a lot of options, look at electron documentation for all possibilities
    main_win = new BrowserWindow({width: 1000, height: 1000, backgroundColor: 'black', frame: false, fullscreen:true})
    main_win.loadURL(url.format({
		//change the part in quotes for whatever file the window will be tied to
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }))
	//the three windows below are all child windows which means they are tied to the parent (main) window
	//child windows can take different properties than parent windows
    let nowShowing = new BrowserWindow({parent: main_win, show: false, fullscreen: true, frame: false})
    nowShowing.loadURL(url.format({
        pathname: path.join(__dirname, 'nowShowing.html'),
        protocol: 'file:',
        slashes: true
    }))
    let meet = new BrowserWindow({parent: main_win, show: false, fullscreen: true, frame: false})
    meet.loadURL(url.format({
        pathname: path.join(__dirname, 'meet.html'),
        protocol: 'file:',
        slashes: true
    }))
	let map = new BrowserWindow({parent: main_win, show: false, fullscreen: true, frame: false})
    map.loadURL(url.format({
        pathname: path.join(__dirname, 'brintonMap/index.html'),
        protocol: 'file:',
        slashes: true
    }))

    //main_win.webContents.openDevTools()
    //nowShowing.webContents.openDevTools()
    //meet.webContents.openDevTools()
	//map.webContents.openDevTools()


    main_win.on('closed', () => {
        main_win = null
    })

	//used for sending messages back and forth between parent and chid windows
    ipcMain.on('closeShowing', function() {
        nowShowing.hide()
    })

    ipcMain.on('openShowing', function() {
        nowShowing.show()
    })

    ipcMain.on('closeMeet', function() {
        meet.hide()
    })

    ipcMain.on('openMeet', function() {
        meet.show()
    })

	ipcMain.on('closeMap', function() {
        map.hide()
		//used to send messages to windows
		map.webContents.send('resetBtns')
    })

	ipcMain.on('openMap', function() {
        map.show()
    })

	ipcMain.on('reset', function() {
		main_win.webContents.send('reset')
	})
}



app.on('ready', createWindow)
