import Link from 'next/link';
import styles from './Sidebar.module.css';
import SidebarSearch from './SidebarSearch';
import SocialLinks from './SocialLinks';

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
            <SidebarSearch />
            <nav className={styles.nav}>
                <Link href="/" className={styles.navItem}>Home</Link>
                <Link href="/about" className={styles.navItem}>About</Link>
                <Link href="/contact" className={styles.navItem}>Contact</Link>
            </nav>
            <div className={styles.nav} style={{ marginTop: '2rem' }}>
                <span className={styles.description} style={{ fontSize: '0.8rem', fontWeight: 700 }}>CATEGORIES</span>
                <Link href="/categories/dev" className={styles.navItem}>Dev</Link>
                <Link href="/categories/math" className={styles.navItem}>Math</Link>
            </div>
            <SocialLinks />
        </aside>
    );
}
