import Link from 'next/link';
import styles from './PostItem.module.css';

interface Props {
    id: string; // complete path e.g. "dev/hello-world"
    category: string;
    tags?: string[];
    field?: string;
    topic?: string[];
    date: string;
    title: string;
    description?: string;
    thumbnail?: string;
}

export default function PostItem({ id, category, tags, field, topic, date, title, description, thumbnail }: Props) {
    return (
        <article className={styles.item}>
            <div className={styles.metaSection}>
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#0070f3', background: '#e1f5fe', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                    {category}
                </span>
                {field && (
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#f50057', border: '1px solid #f50057', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
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
                        {topic && topic.length > 0 && (
                            <div style={{ display: 'flex', gap: '0.4rem' }}>
                                {topic.map(t => (
                                    <Link key={t} href={`/topics/${t}`} style={{ fontSize: '0.75rem', color: '#f50057', fontWeight: 500, textDecoration: 'none' }}>
                                        · {t}
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
