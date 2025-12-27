'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ko' | 'en';

interface LanguageContextType {
    lang: Language;
    toggleLang: () => void;
    setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLangState] = useState<Language>('ko');

    useEffect(() => {
        const savedLang = localStorage.getItem('lang') as Language;
        if (savedLang && (savedLang === 'ko' || savedLang === 'en')) {
            setLangState(savedLang);
        }
    }, []);

    const setLang = (newLang: Language) => {
        setLangState(newLang);
        localStorage.setItem('lang', newLang);
        // We might want to set cookie if we do SSR based on lang, 
        // but for now localStorage is fine for Client side state
        document.documentElement.lang = newLang;
    };

    const toggleLang = () => {
        setLang(lang === 'ko' ? 'en' : 'ko');
    };

    return (
        <LanguageContext.Provider value={{ lang, toggleLang, setLang }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
