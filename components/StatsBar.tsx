'use client';

import styles from './StatsBar.module.css';
import { useLanguage } from './LanguageContext';

interface StatsBarProps {
    totalPosts: number;
    totalCategories: number;
    lastUpdated: string;
}

export default function StatsBar({ totalPosts, totalCategories, lastUpdated }: StatsBarProps) {
    const { lang } = useLanguage();

    return (
        <div className={styles.container}>
            <div className={styles.stat}>
                <div className={styles.icon}>📝</div>
                <div className={styles.content}>
                    <div className={styles.value}>{totalPosts}</div>
                    <div className={styles.label}>{lang === 'ko' ? '포스트' : 'Posts'}</div>
                </div>
            </div>

            <div className={styles.stat}>
                <div className={styles.icon}>📚</div>
                <div className={styles.content}>
                    <div className={styles.value}>{totalCategories}</div>
                    <div className={styles.label}>{lang === 'ko' ? '카테고리' : 'Categories'}</div>
                </div>
            </div>

            <div className={styles.stat}>
                <div className={styles.icon}>🔄</div>
                <div className={styles.content}>
                    <div className={styles.value}>{lastUpdated}</div>
                    <div className={styles.label}>{lang === 'ko' ? '최근 업데이트' : 'Last Updated'}</div>
                </div>
            </div>
        </div>
    );
}
