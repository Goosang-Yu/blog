'use client';

import Link from 'next/link';
import { PostData } from '@/lib/posts';
import { useLanguage } from './LanguageContext';
import styles from './RelatedPosts.module.css';

interface RelatedPostsProps {
    posts: PostData[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
    const { lang } = useLanguage();

    if (posts.length === 0) return null;

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>
                {lang === 'ko' ? '관련 글' : 'Related Posts'}
            </h2>
            <div className={styles.grid}>
                {posts.map((post) => (
                    <Link
                        key={post.id}
                        href={`/posts/${post.id}`}
                        className={styles.card}
                    >
                        {post.thumbnail && (
                            <div className={styles.thumbnail}>
                                <img src={post.thumbnail} alt={post.title} />
                            </div>
                        )}
                        <div className={styles.content}>
                            <h3 className={styles.postTitle}>{post.title}</h3>
                            {post.description && (
                                <p className={styles.description}>{post.description}</p>
                            )}
                            <div className={styles.meta}>
                                <span className={styles.category}>{post.category}</span>
                                {post.readingTime && (
                                    <span className={styles.readingTime}>☕ {post.readingTime}min</span>
                                )}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
