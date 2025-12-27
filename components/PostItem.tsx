import Link from 'next/link';
import styles from './PostItem.module.css';
import { getFieldColor, getCategoryColor } from '@/lib/theme';

interface Props {
    id: string; // complete path e.g. "dev/hello-world"
    category: string;
    tags?: string[];
    field?: string;
    date: string;
    title: string;
    description?: string;
    thumbnail?: string;
    readingTime?: number;
}

export default function PostItem({ id, category, tags, field, date, title, description, thumbnail, readingTime }: Props) {
    const fieldColor = field ? getFieldColor(field) : undefined;
    const categoryColor = getCategoryColor(category);

    return (
        <article className={styles.item}>
            <div className={styles.metaSection}>
                {field && (
                    <span
                        className={styles.fieldBadge}
                        style={{
                            backgroundColor: fieldColor,
                            color: 'white',
                            fontWeight: 600
                        }}
                    >
                        {field}
                    </span>
                )}
                <span className={styles.date}>{date}</span>
                {readingTime && (
                    <span className={styles.readingTime}>☕ {readingTime}min</span>
                )}
            </div>

            <div className={styles.contentWrapper}>
                <div className={styles.textContent}>
                    <h2 className={styles.title}>
                        <Link href={`/posts/${id}`}>{title}</Link>
                    </h2>
                    {description && <p className={styles.description}>{description}</p>}

                    <div style={{ marginTop: '0.8rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        {tags && tags.length > 0 && (
                            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                                {tags.map(tag => (
                                    <Link
                                        key={tag}
                                        href={`/tags/${tag}`}
                                        className={styles.tagLink}
                                    >
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
