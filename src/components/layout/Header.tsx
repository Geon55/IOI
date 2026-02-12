
import Link from 'next/link';
import Image from 'next/image';
import { Menu, Send } from 'lucide-react';
import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            {/* SVG Logo */}
            <Link href="/" className={styles.logo}>
                <Image
                    src="/logo.png"
                    alt="IOI Logo"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: 'auto', height: '45px' }}
                />
            </Link>

            <nav className={styles.nav}>
                <div className={styles.navGroup}>
                    <Link href="/we-are" className={styles.navLink}>
                        WE ARE
                    </Link>
                    <div className={styles.dropdown}>
                        <Link href="/we-are" className={styles.dropdownLink}>브랜드 소개</Link>
                        <Link href="/we-are#history" className={styles.dropdownLink}>히스토리</Link>
                        <Link href="/we-are#internal" className={styles.dropdownLink}>내부활동</Link>
                    </div>
                </div>
                <div className={styles.navGroup}>
                    <Link href="/work" className={styles.navLink}>
                        WORK AREA
                    </Link>
                    <div className={styles.dropdown}>
                        <Link href="/work" className={styles.dropdownLink}>환경 조형물</Link>
                        <Link href="/work" className={styles.dropdownLink}>환경 디자인</Link>
                        <Link href="/work" className={styles.dropdownLink}>브랜딩</Link>
                        <Link href="/work" className={styles.dropdownLink}>전시·인테리어</Link>
                        <Link href="/work" className={styles.dropdownLink}>학술 연구</Link>
                        <Link href="/work" className={styles.dropdownLink}>지원 사업</Link>
                        <Link href="/work" className={styles.dropdownLink}>이벤트·행사</Link>
                    </div>
                </div>
                <Link href="/portfolio" className={styles.navLink}>
                    PORTFOLIO
                </Link>
                <Link href="/contact" className={styles.navLink}>
                    CONTACT
                </Link>
            </nav>

            <div className={styles.actions}>
                <Link href="#" className={styles.actionLink}>
                    SNS <Send size={14} style={{ display: 'inline', marginLeft: '4px', transform: 'rotate(-45deg)' }} />
                </Link>
                <button className={styles.mobileMenu}>
                    <Menu />
                </button>
            </div>
        </header>
    );
};

export default Header;
