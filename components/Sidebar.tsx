import Link from 'next/link';
import styles from './Sidebar.module.css';

export default function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.profile}>
                <div className={styles.avatar}>
                    <div className={styles.avatarPlaceholder}>B</div>
                </div>
                <h1 className={styles.title}><Link href="/">My Blog</Link></h1>
                <p className={styles.description}>Documenting my learning journey.</p>
            </div>
            <nav className={styles.nav}>
                <Link href="/" className={styles.navItem}>Home</Link>
                <Link href="/" className={styles.navItem}>About</Link>
                <Link href="/" className={styles.navItem}>Contact</Link>
            </nav>
        </aside>
    );
}
