'use client';

import { useEffect, useState } from 'react';
import styles from './ReadingProgress.module.css';

export default function ReadingProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            setProgress(Math.min(scrollPercent, 100));
        };

        window.addEventListener('scroll', updateProgress);
        updateProgress(); // Initial calculation

        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.bar} style={{ width: `${progress}%` }} />
        </div>
    );
}
