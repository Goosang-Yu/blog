'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import styles from './LanguageSwitcher.module.css';

export default function LanguageSwitcher() {
    const { lang, setLang } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={styles.container} ref={dropdownRef}>
            <button
                className={styles.trigger}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Select Language"
            >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
                <span className={styles.activeLang}>{lang.toUpperCase()}</span>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}>
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </button>

            {isOpen && (
                <div className={styles.dropdown}>
                    <button
                        className={`${styles.option} ${lang === 'ko' ? styles.optionActive : ''}`}
                        onClick={() => { setLang('ko'); setIsOpen(false); }}
                    >
                        한국어 (KO)
                    </button>
                    <button
                        className={`${styles.option} ${lang === 'en' ? styles.optionActive : ''}`}
                        onClick={() => { setLang('en'); setIsOpen(false); }}
                    >
                        English (EN)
                    </button>
                </div>
            )}
        </div>
    );
}
