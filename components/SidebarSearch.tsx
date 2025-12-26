'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './Sidebar.module.css';

export default function SidebarSearch() {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <form onSubmit={handleSearch} className={styles.searchForm}>
            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={styles.searchInput}
            />
        </form>
    );
}
