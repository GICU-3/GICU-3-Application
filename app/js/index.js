const { app, BrowserWindow } = require('electron')
const path = require('path')

/**
 * The createWindow function creates a new window with the specified width and height.
 * 
 * @return A browserwindow object
 * @docauthor Trelent
 */
function createWindow() {
    const win = new BrowserWindow({
        width: 1024,
        height: 600,
        frame: false, // To make it resizeble/draggeble
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false
        },
        resizable: false
    })

    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()
    if (storageAvailable('localStorage')) { //check if localStorage is working
        console.log("localStorage is available");
    } else {
        console.log("localStorage is NOT available");
    }
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

/**
 * The storageAvailable function determines whether the browser supports local storage.
 * 
 * @param type Determine the type of storage to check for
 * @return True if the browser supports local storage and there is at least 1kb of space available, or false otherwise
 * @docauthor Trelent
 */
function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}