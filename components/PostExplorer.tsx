'use client';

import { useState, useMemo } from 'react';
import { PostData } from '@/lib/posts';
import PostItem from './PostItem';
import styles from './PostExplorer.module.css';
import { useLanguage } from './LanguageContext';
import { translations } from '@/lib/translations';

interface Props {
    allPosts: PostData[];
    categories: string[];
    tags: string[];
    fields: string[];
    initialCategory?: string;
    layout?: 'horizontal' | 'sidebar';
    title?: string;
    description?: string;
}

export default function PostExplorer({
    allPosts,
    categories,
    tags,
    fields,
    initialCategory,
    layout = 'horizontal',
    title,
    description
}: Props) {
    const { lang } = useLanguage();
    const t = translations[lang];

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory || null);
    const [selectedField, setSelectedField] = useState<string | null>(null);
    const [startYear, setStartYear] = useState('');
    const [endYear, setEndYear] = useState('');
    const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

    const filteredPosts = useMemo(() => {
        return allPosts
            .filter((post) => {
                // Language filter
                if (post.lang !== lang) return false;

                // Search filter - cross everything
                const q = searchQuery.toLowerCase();
                const matchesSearch =
                    q === '' ||
                    post.title.toLowerCase().includes(q) ||
                    (post.description && post.description.toLowerCase().includes(q)) ||
                    (post.category && post.category.toLowerCase().includes(q)) ||
                    (post.field && post.field.toLowerCase().includes(q)) ||
                    (post.tags && post.tags.some(t => t.toLowerCase().includes(q)));

                // Filter by Category
                const matchesCategory = !selectedCategory || post.category === selectedCategory;

                // Filter by Field
                const matchesField = !selectedField || post.field === selectedField;



                // Year filter
                const postYear = new Date(post.date).getFullYear();
                const sYear = startYear ? parseInt(startYear) : null;
                const eYear = endYear ? parseInt(endYear) : null;

                const matchesYear =
                    (!sYear || isNaN(sYear) || postYear >= sYear) &&
                    (!eYear || isNaN(eYear) || postYear <= eYear);

                return matchesSearch && matchesCategory && matchesField && matchesYear;
            })
            .sort((a, b) => {
                const dateA = new Date(a.date).getTime();
                const dateB = new Date(b.date).getTime();
                return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
            });
    }, [allPosts, searchQuery, selectedCategory, selectedField, startYear, endYear, sortBy, lang]);



    const availableCategories = useMemo(() => {
        const c = new Set<string>();
        allPosts.filter(p => p.lang === lang).forEach(p => p.category && c.add(p.category));
        return Array.from(c).sort();
    }, [allPosts, lang]);

    const availableFields = useMemo(() => {
        const f = new Set<string>();
        allPosts.filter(p => p.lang === lang).forEach(p => p.field && f.add(p.field));
        return Array.from(f).sort();
    }, [allPosts, lang]);



    const filterSection = (
        <div className={styles.filterSection}>
            {!initialCategory && (
                <div className={styles.filterGroup}>
                    <span className={styles.filterLabel}>{t.explorer.filters.category}</span>
                    <button
                        className={`${styles.chip} ${!selectedCategory ? styles.chipActive : ''}`}
                        onClick={() => setSelectedCategory(null)}
                    >
                        {t.explorer.all}
                    </button>
                    {availableCategories.map((c) => (
                        <button
                            key={c}
                            className={`${styles.chip} ${selectedCategory === c ? styles.chipActive : ''}`}
                            onClick={() => setSelectedCategory(c)}
                        >
                            {c}
                        </button>
                    ))}
                </div>
            )}

            <div className={styles.filterGroup}>
                <span className={styles.filterLabel}>{t.explorer.filters.field}</span>
                <button
                    className={`${styles.chip} ${!selectedField ? styles.chipActive : ''}`}
                    onClick={() => setSelectedField(null)}
                >
                    {t.explorer.all}
                </button>
                {availableFields.map((f) => (
                    <button
                        key={f}
                        className={`${styles.chip} ${selectedField === f ? styles.chipActive : ''}`}
                        onClick={() => setSelectedField(f)}
                    >
                        {f}
                    </button>
                ))}
            </div>



            <div className={styles.filterGroup}>
                <span className={styles.filterLabel}>{t.explorer.filters.year}</span>
                <div className={styles.yearRangeContainer}>
                    <input
                        type="number"
                        placeholder={t.explorer.filters.startYear}
                        className={styles.yearInput}
                        value={startYear}
                        onChange={(e) => setStartYear(e.target.value)}
                    />
                    <span className={styles.rangeDivider}>~</span>
                    <input
                        type="number"
                        placeholder={t.explorer.filters.endYear}
                        className={styles.yearInput}
                        value={endYear}
                        onChange={(e) => setEndYear(e.target.value)}
                    />
                    <button
                        className={styles.resetButton}
                        onClick={() => { setStartYear(''); setEndYear(''); }}
                    >
                        {t.explorer.all}
                    </button>
                </div>
            </div>
        </div>
    );

    const searchBar = (
        <div className={styles.searchContainer}>
            <input
                type="text"
                placeholder={t.explorer.searchPlaceholder}
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    );

    const resultsSection = (
        <div className={styles.results}>
            {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                    <PostItem
                        key={post.id}
                        id={post.id}
                        category={post.category}
                        tags={post.tags}
                        field={post.field}
                        date={post.date}
                        title={post.title}
                        description={post.description}
                        thumbnail={post.thumbnail}
                        readingTime={post.readingTime}
                    />
                ))
            ) : (
                <div className={styles.noResults}>
                    <p>{t.explorer.noResults}</p>
                </div>
            )}
        </div>
    );

    const controlsSection = (
        <div className={styles.controls}>
            <div className={styles.postCount}>
                Total <strong>{filteredPosts.length}</strong> posts
            </div>
            <select
                className={styles.sortSelect}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
            >
                <option value="newest">{lang === 'ko' ? '최신순' : 'Newest First'}</option>
                <option value="oldest">{lang === 'ko' ? '오래된순' : 'Oldest First'}</option>
            </select>
        </div>
    );

    if (layout === 'sidebar') {
        return (
            <div className={`${styles.explorer} ${styles.sidebarLayout}`}>
                <aside className={styles.sidebar}>
                    {filterSection}
                </aside>

                <div className={styles.mainContent}>
                    {title && <h1 className={styles.mainTitle}>{title}</h1>}
                    {description && <p className={styles.mainDescription}>{description}</p>}

                    {searchBar}
                    {controlsSection}
                    {resultsSection}
                </div>
            </div>
        );
    }

    return (
        <div className={styles.explorer}>
            {searchBar}
            {filterSection}
            {controlsSection}
            {resultsSection}
        </div>
    );
}
