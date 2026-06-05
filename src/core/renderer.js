import { I18n } from './i18n.js';

export class Renderer {
    /**
     * Load an HTML file into a container
     * @param {string} selector - CSS selector for the container
     * @param {string} path - Path to the HTML file
     * @param {Function} callback - Optional function to run after load
     */
    static async load(selector, path, callback) {
        const container = document.querySelector(selector);
        if (!container) {
            console.warn(`Container not found: ${selector}`);
            return;
        }

        try {
            const response = await fetch(path);
            if (!response.ok) throw new Error(`Failed to load: ${path}`);
            
            const html = await response.text();
            container.innerHTML = html;
            
            // Translate the newly loaded content
            I18n.translatePage();
            
            if (callback) callback();
        } catch (error) {
            console.error(`Error loading section [${selector}] from [${path}]:`, error);
        }
    }

    /**
     * Batch load multiple sections
     * @param {Array} sections - Array of { selector, path, callback } objects
     */
    static async loadAll(sections) {
        const promises = sections.map(s => this.load(s.selector, s.path, s.callback));
        return Promise.all(promises);
    }
}
