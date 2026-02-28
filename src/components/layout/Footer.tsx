import Link from 'next/link';
import { Download } from 'lucide-react';
import styles from './Footer.module.css';
import Logo from '@/components/ui/Logo';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.leftSection}>
                    {/* Logo */}
                    <div className={styles.logoWrapper}>
                        <Logo width={180} height={45} />
                    </div>

                    {/* Company Info */}
                    <div className={styles.infoRow}>
                        <span>
                            대표이사 : 김지현
                        </span>
                        <span className={styles.divider}>|</span>
                        <span>대표전화 : 070-4351-7184</span>
                        <span className={styles.divider}>|</span>
                        <span>사업자등록번호 : 121-870-1699</span>
                    </div>

                    <div className={styles.infoRow}>
                        <span>콘텐츠 제휴/공급문의 : contents@ioi_design.life</span>
                    </div>

                    <div className={styles.infoRow}>
                        <span>본사 : 인천시 부평구 부평대로 293, 1109호 (청천동,부평테크시티)</span>
                    </div>

                    <div className={styles.copyright}>
                        © 2025 (주)아이오아이. All rights reserved
                    </div>
                </div>

                <div className={styles.rightSection}>
                    <div className={styles.navColumn}>
                        <span className={styles.navTitle}>WORK</span>
                        <Link href="#" className={styles.navLink} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            회사소개서 <Download size={14} />
                        </Link>
                    </div>

                    <div className={styles.navColumn}>
                        <Link href="/portfolio" className={styles.navTitle}>PORTFOLIO</Link>
                    </div>

                    <div className={styles.navColumn}>
                        <Link href="/contact" className={styles.navTitle}>CONTACT</Link>
                    </div>

                    <div className={styles.navColumn}>
                        <span className={styles.navTitle}>SNS</span>
                        <Link href="#" className={styles.navLink}>스토어</Link>
                        <Link href="#" className={styles.navLink}>YOUTUBE</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
