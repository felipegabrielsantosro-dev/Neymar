import { ipcMain, BrowserWindow } from 'electron';
import Template from '../mixin/Template.js';
import Customer from '../controller/Customer.js';
import Product from '../controller/Product.js';
import Supplier from '../controller/Supplier.js';
import Users from '../controller/Users.js';
import Print from '../mixin/Print.js';


function getWin(event) {
    return BrowserWindow.fromWebContents(event.sender);
}
// Avisa todas as janelas para recarregar
function broadcastReload(channel) {
    for (const win of BrowserWindow.getAllWindows()) {
        win.webContents.send(channel);
    }
}

ipcMain.handle('print:html', async (_e, html) => {
    await Print.create()
        .stringHtml(html)
        .print();
});

//  WINDOW
ipcMain.handle('window:open', (_e, name, opts = {}) => {
    const win = Template.create(name, opts);
    Template.loadView(win, name);
});
ipcMain.handle('window:openModal', (e, name, opts = {}) => {
    const parent = getWin(e);
    if (!parent) return;
    const win = Template.create(name, {
        width: 560,
        height: 420,
        resizable: false,
        minimizable: false,
        maximizable: false,
        parent: parent,
        modal: true,
        ...opts,
    });
    Template.loadView(win, name);
});
ipcMain.handle('window:close', (e) => {
    getWin(e)?.close();
});
//  TEMP STORE — dados temporários entre janelas
let tempData = {};
ipcMain.handle('temp:set', (_e, key, data) => {
    tempData[key] = data;
});
ipcMain.handle('temp:get', (_e, key) => {
    const data = tempData[key] || null;
    delete tempData[key];
    return data;
});
//  CUSTOMER
ipcMain.handle('customer:insert', async (_e, data) => {
    const result = await Customer.insert(data);
    if (result.status) broadcastReload('customer:reload');
    return result;
});
ipcMain.handle('customer:find', async (_e, where = {}) => {
    return await Customer.find(where);
});
ipcMain.handle('customer:findById', async (_e, id) => {
    return await Customer.findById(id);
});
ipcMain.handle('customer:update', async (_e, id, data) => {
    const result = await Customer.update(id, data);
    if (result.status) broadcastReload('customer:reload');
    return result;
});
ipcMain.handle('customer:delete', async (_e, id) => {
    const result = await Customer.delete(id);
    if (result.status) broadcastReload('customer:reload');
    return result;
});

ipcMain.handle('product:find', async (_e, where = {}) => {
    return await Product.find(where);
});
ipcMain.handle('product:findById', async (_e, id) => {
    return await Product.findById(id);
});

ipcMain.handle('product:insert', async (_e, data) => {
    const result = await Product.insert(data);
    if (result.status) broadcastReload('product:reload');
    return result;
});
ipcMain.handle('product:update', async (_e, id, data) => {
    const result = await Product.update(id, data);
    if (result.status) broadcastReload('product:reload');
    return result;
});
ipcMain.handle('product:delete', async (_e, id) => {
    const result = await Product.delete(id);
    if (result.status) broadcastReload('product:reload');
    return result;
});
ipcMain.handle('product:search', async (_e, term) => {
    return await Product.search(term);
});
ipcMain.handle('product:searchByCustomer', async (_e, customerId) => {
    return await Product.searchByCustomer(customerId);
});
ipcMain.handle('product:searchByCustomerAndTerm', async (_e, customerId, term) => {
    return await Product.searchByCustomerAndTerm(customerId, term);
});
ipcMain.handle('product:searchByTerm', async (_e, term) => {
    return await Product.searchByTerm(term);
});
ipcMain.handle('user:searchByCustomerAndTerm', async (_e, customerId, term) => {
    return await User.searchByCustomerAndTerm(customerId, term);
});
ipcMain.handle('user:searchByTerm', async (_e, term) => {
    return await User.searchByTerm(term);
});
ipcMain.handle('user:insert', async (_e, data) => {
    const result = await User.insert(data);
    if (result.status) broadcastReload('users:reload');
    return result;
});
ipcMain.handle('user:search', async (_e, data) => {
    const result = await User.search(data);
    if (result.status) broadcastReload('users:reload');
    return result;
});
ipcMain.handle('user:update', async (_e, id, data) => {
    const result = await User.update(id, data);
    if (result.status) broadcastReload('users:reload');
    return result;
});
ipcMain.handle('user:delete', async (_e, data) => {
    const result = await User.delete(data);
    if (result.status) broadcastReload('users:reload');
    return result;
});
ipcMain.handle('user:find', async (_e, where = {}) => {
    return await User.find(where);
});
ipcMain.handle('user:findById', async (_e, id) => {
    return await User.findById(id);
});
ipcMain.handle('supplier:insert', async (_e, data) => {
    return await Supplier.insert(data);
});

export default ipcMain; 