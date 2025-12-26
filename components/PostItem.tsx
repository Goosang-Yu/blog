import Link from 'next/link';
import styles from './PostItem.module.css';

interface Props {
    id: string; // complete path e.g. "dev/hello-world"
    category: string;
    date: string;
    title: string;
    description?: string;
    tags?: string[];
}

export default function PostItem({ id, category, date, title, description, tags }: Props) {
    return (
        <article className={styles.item}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#0070f3' }}>
                    {category}
                </span>
                <span className={styles.date}>{date}</span>
            </div>
            <h2 className={styles.title}>
                <Link href={`/posts/${id}`}>{title}</Link>
            </h2>
            {description && <p className={styles.description}>{description}</p>}
            {tags && tags.length > 0 && (
                <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                    {tags.map(tag => (
                        <Link key={tag} href={`/tags/${tag}`} style={{ fontSize: '0.8rem', color: '#666', background: '#f0f0f0', padding: '0.1rem 0.4rem', borderRadius: '4px', textDecoration: 'none' }}>
                            #{tag}
                        </Link>
                    ))}
                </div>
            )}
        </article>
    );
}
