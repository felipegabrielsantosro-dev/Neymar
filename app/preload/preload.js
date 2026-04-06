const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    openPage: (pageName) => ipcRenderer.invoke('window:open-page', pageName),
    goHome: () => ipcRenderer.invoke('window:open-page', 'index.html'),
    saveProduct: (data) => ipcRenderer.invoke('product:save', data),
    saveCliente: (data) => ipcRenderer.invoke('cliente:save', data),
    saveUsuario: (data) => ipcRenderer.invoke('usuario:save', data),
    saveFornecedor: (data) => ipcRenderer.invoke('fornecedor:save', data),
    searchProducts: (data) => ipcRenderer.invoke('product:search', data),
    searchCliente: (data) => ipcRenderer.invoke('cliente:search', data),
    searchUsuario: (data) => ipcRenderer.invoke('usuario:search', data),
    searchFornecedor: (data) => ipcRenderer.invoke('fornecedor:search', data),
});