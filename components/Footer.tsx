'use client';

import styles from './Footer.module.css';
import { useLanguage } from './LanguageContext';
import { translations } from '@/lib/translations';

export default function Footer() {
    const { lang } = useLanguage();
    const t = translations[lang];

    return (
        <footer className={styles.footer}>
            <p>{t.footer.copyright}</p>
        </footer>
    );
}
