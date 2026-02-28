"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Send } from 'lucide-react';
import styles from './Header.module.css';
import Logo from '@/components/ui/Logo';

const Header = () => {
    const pathname = usePathname();

    if (pathname.startsWith('/admin')) {
        return null;
    }

    return (
        <header className={styles.header}>
            {/* Logo */}
            <Link href="/" className={styles.logo}>
                <Logo width={180} height={45} />
            </Link>

            {/* Navigation */}
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
                        WORK
                    </Link>
                    <div className={styles.dropdown}>
                        <Link href="/work" className={styles.dropdownLink}>A / 타당성 검토</Link>
                        <Link href="/work" className={styles.dropdownLink}>B / 디자인 개발</Link>
                        <Link href="/work" className={styles.dropdownLink}>C / 제작 및 설치</Link>
                        <Link href="/work" className={styles.dropdownLink}>D / 유지 보수</Link>
                    </div>
                </div>
                <div className={styles.navGroup}>
                    <Link href="/portfolio" className={styles.navLink}>
                        PORTFOLIO
                    </Link>
                    <div className={styles.dropdown}>
                        <Link href="/portfolio" className={styles.dropdownLink}>조형물</Link>
                        <Link href="/portfolio" className={styles.dropdownLink}>환경디자인</Link>
                        <Link href="/portfolio" className={styles.dropdownLink}>브랜딩</Link>
                        <Link href="/portfolio" className={styles.dropdownLink}>전시·인테리어</Link>
                        <Link href="/portfolio" className={styles.dropdownLink}>이벨트·행사</Link>
                        <Link href="/portfolio" className={styles.dropdownLink}>학술연구</Link>
                    </div>
                </div>
                <div className={styles.navGroup}>
                    <Link href="/contact" className={styles.navLink}>
                        CONTACT
                    </Link>
                    <div className={styles.dropdown}>
                        <Link href="/contact" className={styles.dropdownLink}>고객문의</Link>
                        <Link href="/contact/map" className={styles.dropdownLink}>맵</Link>
                    </div>
                </div>
            </nav>

            <div className={styles.actions}>
                <div className={styles.navGroup}>
                    <Link href="#" className={styles.actionLink}>
                        SNS <Send size={14} style={{ display: 'inline', marginLeft: '4px', transform: 'rotate(-45deg)' }} />
                    </Link>
                    <div className={styles.dropdown} style={{ right: 0, minWidth: '120px' }}>
                        <Link href="#" className={styles.dropdownLink}>스토어</Link>
                        <Link href="#" className={styles.dropdownLink}>YOUTUBE</Link>
                    </div>
                </div>
                <button className={styles.mobileMenu}>
                    <Menu />
                </button>
            </div>
        </header>
    );
};

export default Header;
