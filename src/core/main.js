/**
 * Portfolio Main Entry Point
 */
import { Renderer } from './renderer.js';
import { I18n } from './i18n.js';
import { initSkills } from '../features/skills.js';

// Configuration for sections to load
const APP_SECTIONS = [
    { selector: '#header', path: './src/layouts/header.html', callback: bindEvents },
    { selector: '#footer', path: './src/layouts/footer.html' },
    { selector: '#hero', path: './src/sections/hero.html' },
    { selector: '#about', path: './src/sections/about.html' },
    { selector: '#skills', path: './src/sections/skills.html', callback: initSkills },
];

async function init() {
    console.log('Portfolio initializing...');
    
    // Initialize internationalization (Default: VI)
    I18n.init();
    
    // Load all defined sections
    await Renderer.loadAll(APP_SECTIONS);
    
    // Initialize global interactions
    initInteractions();
}

function bindEvents() {
    // Language switching
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            I18n.setLanguage(lang);
        });
    });
}

function initInteractions() {
    // Add any global JS logic here
    console.log('Interactions initialized');
}

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', init);
