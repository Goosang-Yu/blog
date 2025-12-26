'use client';

import { useEffect, useState } from 'react';
import styles from './TableOfContents.module.css';

interface Heading {
    text: string;
    id: string;
    depth: number;
}

interface Props {
    headings: Heading[];
}

export default function TableOfContents({ headings }: Props) {
    const [activeId, setActiveId] = useState('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '0px 0px -40% 0px' }
        );

        headings.forEach((heading) => {
            const element = document.getElementById(heading.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [headings]);

    if (!headings || headings.length === 0) {
        return null;
    }

    return (
        <nav className={styles.toc}>
            <p className={styles.title}>On this page</p>
            <ul className={styles.list}>
                {headings.map((heading) => (
                    <li
                        key={heading.id}
                        className={`${styles.item} ${heading.depth > 2 ? styles.nested : ''}`}
                    >
                        <a
                            href={`#${heading.id}`}
                            className={`${styles.link} ${activeId === heading.id ? styles.active : ''}`}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(heading.id)?.scrollIntoView({
                                    behavior: 'smooth',
                                });
                                setActiveId(heading.id);
                            }}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
