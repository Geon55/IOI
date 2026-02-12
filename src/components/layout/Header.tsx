
import Link from 'next/link';
import { Menu } from 'lucide-react';
import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.navGroup}>
                <Link href="/" className={styles.logo}>
                    HEADER
                </Link>
            </div>
            <nav className={styles.nav}>
                <Link href="/" className={styles.navLink}>
                    메인
                </Link>
                <div className={styles.navGroup}>
                    <Link href="/we-are" className={styles.navLink}>
                        WE ARE
                    </Link>
                    <div className={styles.dropdown}>
                        <Link href="/we-are#brand" className={styles.dropdownLink}>브랜드 소개</Link>
                        <Link href="/we-are#history" className={styles.dropdownLink}>히스토리</Link>
                        <Link href="/we-are#internal" className={styles.dropdownLink}>내부활동</Link>
                    </div>
                </div>
                <div className={styles.navGroup}>
                    <Link href="/work" className={styles.navLink}>
                        WORK
                    </Link>
                    <div className={styles.dropdown}>
                        <Link href="/work#a" className={styles.dropdownLink}>A / 단계설명</Link>
                        <Link href="/work#b" className={styles.dropdownLink}>B / 단계설명</Link>
                        <Link href="/work#c" className={styles.dropdownLink}>C / 단계설명</Link>
                        <Link href="/work#d" className={styles.dropdownLink}>D / 단계설명</Link>
                    </div>
                </div>
                <Link href="/portfolio" className={styles.navLink}>
                    Portfolio
                </Link>
                <div className={styles.navGroup}>
                    <Link href="/contact" className={styles.navLink}>
                        Contact
                    </Link>
                    <div className={styles.dropdown}>
                        <Link href="/contact#inquiry" className={styles.dropdownLink}>고객문의</Link>
                        <Link href="/contact#map" className={styles.dropdownLink}>맵</Link>
                    </div>
                </div>
            </nav>

            <div className={styles.actions}>
                <Link href="#" className={styles.actionLink}>
                    스토어
                </Link>
                <Link href="#" className={styles.actionLink}>
                    YOUTUBE
                </Link>
                <button className={styles.mobileMenu}>
                    <Menu />
                </button>
            </div>
        </header>
    );
};

export default Header;
