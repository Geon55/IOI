
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.section}>
                <h3>기본 기재사항</h3>
                <ul>
                    <li>(주) 스탠다드핀</li>
                    <li>대표: 홍길동</li>
                    <li>사업자등록번호: 000-00-00000</li>
                    <li>주소: 서울특별시 ...</li>
                </ul>
            </div>
            <div className={styles.section}>
                <h3>회사 소개서</h3>
                <ul>
                    <li><Link href="/we-are" className={styles.link}>브랜드 소개</Link></li>
                    <li><Link href="/history" className={styles.link}>히스토리</Link></li>
                    <li><Link href="/internal" className={styles.link}>내부활동</Link></li>
                </ul>
            </div>
            <div className={styles.section}>
                <h3>해더 네비게이션</h3>
                <ul>
                    <li><Link href="/" className={styles.link}>메인</Link></li>
                    <li><Link href="/we-are" className={styles.link}>WE ARE</Link></li>
                    <li><Link href="/work" className={styles.link}>WORK</Link></li>
                    <li><Link href="/portfolio" className={styles.link}>Portfolio</Link></li>
                    <li><Link href="/contact" className={styles.link}>Contact</Link></li>
                </ul>
            </div>
            <div className={styles.section}>
                <h3>SNS</h3>
                <ul>
                    <li><Link href="#" className={styles.link}>스토어</Link></li>
                    <li><Link href="#" className={styles.link}>YOUTUBE</Link></li>
                    <li><Link href="#" className={styles.link}>Instagram</Link></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
