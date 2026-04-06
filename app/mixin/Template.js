import { BrowserWindow } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Padrão de páginas (app/renderer/main)
const PAGES_DIR = path.resolve(__dirname, '..', 'renderer', 'main');

function normalizeName(name) {
    if (!name) return 'index.html';
    let view = String(name).trim();

    // Suporte para caminho antigo "pages/home" => home.html
    if (view.startsWith('pages/')) {
        view = view.replace(/^pages\//, '');
    }

    if (!view.endsWith('.html')) {
        view += '.html';
    }

    return view;
}

function getViewPath(name) {
    const view = normalizeName(name);
    return path.resolve(PAGES_DIR, view);
}

export default {
    create(name = 'main', opts = {}) {
        const options = {
            width: 1280,
            height: 800,
            title: String(name || 'Montanha'),
            webPreferences: {
                preload: path.resolve(__dirname, '..', 'preload', 'preload.js'),
                contextIsolation: true,
                nodeIntegration: false,
            },
            ...opts,
        };

        return new BrowserWindow(options);
    },

    loadView(win, name = 'index') {
        if (!win || win.isDestroyed && win.isDestroyed()) {
            throw new Error('Janela inválida ou destruída.');
        }

        const viewPath = getViewPath(name);
        return win.loadFile(viewPath);
    },
};
