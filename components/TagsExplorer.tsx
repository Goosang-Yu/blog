'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import styles from './TagsExplorer.module.css';
import { useLanguage } from './LanguageContext';
import { translations } from '@/lib/translations';

interface TagInfo {
    name: string;
    count: number;
}

interface Props {
    tags: TagInfo[];
}

export default function TagsExplorer({ tags }: Props) {
    const { lang } = useLanguage();
    const t = translations[lang];
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTags = useMemo(() => {
        const q = searchQuery.toLowerCase().trim();
        if (!q) return tags;
        return tags.filter(tag => tag.name.toLowerCase().includes(q));
    }, [tags, searchQuery]);

    return (
        <div className={styles.container}>
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder={t.explorer.tagsSearchPlaceholder}
                    className={styles.searchInput}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {filteredTags.length > 0 ? (
                <div className={styles.tagGrid}>
                    {filteredTags.map((tag) => (
                        <Link
                            key={tag.name}
                            href={`/tags/${tag.name}`}
                            className={styles.tagCard}
                        >
                            <span className={styles.tagName}>#{tag.name}</span>
                            <span className={styles.tagCount}>
                                {tag.count}{t.explorer.tagCount}
                            </span>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className={styles.emptyState}>
                    <p>{t.explorer.noResults}</p>
                </div>
            )}
        </div>
    );
}
