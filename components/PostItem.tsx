import Link from 'next/link';
import styles from './PostItem.module.css';

interface Props {
    id: string; // complete path e.g. "dev/hello-world"
    category: string;
    tags?: string[];
    field?: string;
    date: string;
    title: string;
    description?: string;
    thumbnail?: string;
}

export default function PostItem({ id, category, tags, field, date, title, description, thumbnail }: Props) {
    return (
        <article className={styles.item}>
            <div className={styles.metaSection}>
                {field && (
                    <span className={styles.fieldBadge}>
                        {field}
                    </span>
                )}
                <span className={styles.date}>{date}</span>
            </div>

            <div className={styles.contentWrapper}>
                <div className={styles.textContent}>
                    <h2 className={styles.title}>
                        <Link href={`/posts/${id}`}>{title}</Link>
                    </h2>
                    {description && <p className={styles.description}>{description}</p>}

                    <div style={{ marginTop: '0.8rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        {tags && tags.length > 0 && (
                            <div style={{ display: 'flex', gap: '0.4rem' }}>
                                {tags.map(tag => (
                                    <Link key={tag} href={`/tags/${tag}`} style={{ fontSize: '0.75rem', color: '#666', textDecoration: 'none' }}>
                                        #{tag}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {thumbnail && (
                    <div className={styles.thumbnailWrapper}>
                        <Link href={`/posts/${id}`}>
                            <img src={thumbnail} alt={title} className={styles.thumbnail} />
                        </Link>
                    </div>
                )}
            </div>
        </article>
    );
}
