import Link from 'next/link';
import styles from './PostItem.module.css';

interface Props {
    id: string;
    date: string;
    title: string;
    description?: string;
}

export default function PostItem({ id, date, title, description }: Props) {
    return (
        <article className={styles.item}>
            <span className={styles.date}>{date}</span>
            <h2 className={styles.title}>
                <Link href={`/posts/${id}`}>{title}</Link>
            </h2>
            {description && <p className={styles.description}>{description}</p>}
        </article>
    );
}
