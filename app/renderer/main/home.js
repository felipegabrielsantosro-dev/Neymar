const productButton = document.getElementById('product-button');
const clienteButton = document.getElementById('cliente-button')
const usuarioButton = document.getElementById('usuario-button')
const fornecedorButton = document.getElementById('fornecedor-button')
const saleButton = document.getElementById('fsale-button')

productButton.addEventListener('click', async () => {
    try {
        if (!window.electronAPI || typeof window.electronAPI.openPage !== 'function') {
            throw new Error('API do Electron não foi injetada pelo preload');
        }
        await window.electronAPI.openPage('listaproduto.html');
    } catch (error) {
        console.error('Erro ao abrir a janela de produtos:', error);
    }
});

clienteButton.addEventListener('click', async () => {
    try {
        if (!window.electronAPI || typeof window.electronAPI.openPage !== 'function') {
            throw new Error('API do Electron não foi injetada pelo preload');
        }
        await window.electronAPI.openPage('listacliente.html');
    } catch (error) {
        console.error('Erro ao abrir a janela de produtos:', error);
    }
});

usuarioButton.addEventListener('click', async () => {
    try {
        if (!window.electronAPI || typeof window.electronAPI.openPage !== 'function') {
            throw new Error('API do Electron não foi injetada pelo preload');
        }
        await window.electronAPI.openPage('listausuario.html');
    } catch (error) {
        console.error('Erro ao abrir a janela de produtos:', error);
    }
});

fornecedorButton.addEventListener('click', async () => {
    try {
        if (!window.electronAPI || typeof window.electronAPI.openPage !== 'function') {
            throw new Error('API do Electron não foi injetada pelo preload');
        }
        await window.electronAPI.openPage('listafornecedor.html');
    } catch (error) {
        console.error('Erro ao abrir a janela de fornecedor:', error);
    }
});

saleButton.addEventListener('click', async () => {
    try {
        if (!window.electronAPI || typeof window.electronAPI.openPage !== 'function') {
            throw new Error('API do Electron não foi injetada pelo preload');
        }
        await window.electronAPI.openPage('listafornecedor.html');
    } catch (error) {
        console.error('Erro ao abrir a janela de fornecedor:', error);
    }
});