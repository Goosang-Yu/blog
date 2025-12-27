'use client';

import Link from 'next/link';
import styles from './Sidebar.module.css';
import SidebarSearch from './SidebarSearch';
import SocialLinks from './SocialLinks';
import { useLanguage } from './LanguageContext';
import { translations } from '@/lib/translations';
import LanguageSwitcher from './LanguageSwitcher';

export default function Sidebar() {
    const { lang } = useLanguage();
    const t = translations[lang];

    return (
        <aside className={styles.sidebar}>
            <div className={styles.profile}>
                <div className={styles.avatar}>
                    <div className={styles.avatarPlaceholder}>G.Yu</div>
                </div>
                <h1 className={styles.title}><Link href="/">Goosang Yu</Link></h1>
                <p className={styles.description}>
                    {lang === 'ko' ? '학습 여정을 기록하는 블로그입니다.' : 'Documenting my learning journey.'}
                </p>
            </div>
            <SidebarSearch />
            <nav className={styles.nav}>
                <Link href="/" className={styles.navItem}>{t.nav.home}</Link>
                <Link href="/about" className={styles.navItem}>{t.nav.about}</Link>
            </nav>
            <div className={styles.nav} style={{ marginTop: '2rem' }}>
                <span className={styles.description} style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                    {t.nav.categories}
                </span>
                <Link href="/categories/dev" className={styles.navItem}>Dev</Link>
                <Link href="/categories/math" className={styles.navItem}>Math</Link>
                <Link href="/categories/biology" className={styles.navItem}>Biology</Link>
                <Link href="/categories/cook" className={styles.navItem}>Cook</Link>
            </div>

            <div className={styles.footer}>
                <LanguageSwitcher />
                <SocialLinks />
            </div>
        </aside>
    );
}
