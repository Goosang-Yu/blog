'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';
import { translations } from '@/lib/translations';
import styles from './TagsExplorer.module.css';

interface PostInfo {
    id: string;
    tags: string[];
    lang: string;
}

interface TagsExplorerProps {
    posts: PostInfo[];
}

export default function TagsExplorer({ posts }: TagsExplorerProps) {
    const { lang } = useLanguage();
    const t = translations[lang];
    const [searchQuery, setSearchQuery] = useState('');

    // 1. Filter posts by language
    // 2. Calculate tag counts from filtered posts
    const tags = useMemo(() => {
        const filteredByLang = posts.filter(post => post.lang === lang);
        const tagCounts: { [key: string]: number } = {};

        filteredByLang.forEach(post => {
            post.tags.forEach(tag => {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
        });

        return Object.entries(tagCounts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count);
    }, [posts, lang]);

    // Filter tags by search query
    const filteredTags = useMemo(() => {
        return tags.filter(tag =>
            tag.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [tags, searchQuery]);

    // Calculate font size based on count
    const getTagSize = (count: number) => {
        const maxCount = Math.max(...tags.map(t => t.count));
        const minSize = 0.85;
        const maxSize = 1.6;
        const size = minSize + ((count / maxCount) * (maxSize - minSize));
        return `${size}rem`;
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>{t.explorer.tagsTitle}</h1>
                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder={t.explorer.tagsSearchPlaceholder}
                        className={styles.searchInput}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </header>

            {filteredTags.length > 0 ? (
                <div className={styles.tagGrid}>
                    {filteredTags.map((tag) => (
                        <Link
                            href={`/tags/${tag.name}`}
                            key={tag.name}
                            className={styles.tagCard}
                            style={{ fontSize: getTagSize(tag.count) }}
                        >
                            <span className={styles.tagName}>#{tag.name}</span>
                            <span className={styles.tagCount}>
                                {tag.count} {t.explorer.tagCount}
                            </span>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className={styles.noResults}>
                    <p>No tags found matching your search.</p>
                </div>
            )}
        </div>
    );
}
