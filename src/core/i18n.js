import { translations } from '../data/translations.js';

export class I18n {
    static currentLang = localStorage.getItem('lang') || 'vi';

    /**
     * Get a translated string by path (e.g., 'nav.home')
     */
    static t(path) {
        if (!path) return '';

        // Handle case where path is an object: { vi: '...', en: '...' }
        if (typeof path === 'object' && path !== null) {
            return path[this.currentLang] || path['en'] || path['vi'] || '';
        }

        // Handle case where path is a string key: 'nav.home'
        if (typeof path === 'string') {
            const keys = path.split('.');
            let result = translations[this.currentLang];
            
            for (const key of keys) {
                if (result && result[key]) {
                    result = result[key];
                } else {
                    return path; // Fallback to path if not found
                }
            }
            return result;
        }

        return path;
    }

    /**
     * Set the current language
     */
    static setLanguage(lang) {
        if (translations[lang]) {
            this.currentLang = lang;
            localStorage.setItem('lang', lang);
            document.documentElement.lang = lang;
            this.translatePage();
        }
    }

    /**
     * Translate all elements with [data-i18n] attribute
     */
    static translatePage() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const path = el.getAttribute('data-i18n');
            el.textContent = this.t(path);
        });

        // Update active states for language switchers
        document.querySelectorAll('.lang-btn').forEach(btn => {
            const lang = btn.getAttribute('data-lang');
            if (lang === this.currentLang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    /**
     * Initialize i18n
     */
    static init() {
        document.documentElement.lang = this.currentLang;
        this.translatePage();
    }
}
