
import Image from 'next/image';
import styles from './page.module.css';

export default function WeArePage() {
    return (
        <div className={styles.container}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroOverlay}></div>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        IDENTITY <br />
                        <span className={styles.heroSubtitle}>OF IDEA</span>
                    </h1>
                    <div className={styles.heroDescBox}>
                        <p className={styles.heroDesc}>
                            <strong>아이오아이(IOI)</strong>는 <strong>Identity Of Idea</strong>의 약자로<br />
                            이름 그대로 고객의 <strong>생각, 가치관</strong> 등을 바탕으로 <strong>아이디어를 확장</strong>하고<br />
                            <strong>아이덴티티를 구축</strong>하는, <strong>마음을 만드는 기업</strong>입니다.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className={styles.valuesSection}>
                <div className={styles.valueColumn}>
                    <h3 className={styles.valueTitle}>우리는</h3>
                    <p className={styles.valueText}>
                        어떻게 하면 우리가 더 행복하게 일할 수 있을까?
                        우리는 좋은 클라이언트를 만나기 위해 능동적으로
                        소통하고 즐겁게 일할 수 있는 환경을 만듭니다.
                    </p>
                </div>
                <div className={styles.valueColumn}>
                    <h3 className={styles.valueTitle}>어떻게</h3>
                    <p className={styles.valueText}>
                        아이디어 회의를 통해 누구나 자유롭게 의견을 나누고,
                        수직적인 구조가 아닌 수평적인 문화를 지향합니다.
                        구성원 모두가 능동적으로 참여하여 최선의 결과를 만들어냅니다.
                    </p>
                </div>
                <div className={styles.valueColumn}>
                    <h3 className={styles.valueTitle}>디자인을</h3>
                    <p className={styles.valueText}>
                        어떻게 하면 더 좋은 디자인이 나올 수 있을까?
                        끊임없이 고민하고 연구합니다. 단순히 보여지는 것을 넘어,
                        클라이언트의 니즈를 정확히 파악하고 그 이상의 가치를 제공합니다.
                    </p>
                </div>
            </section>

            {/* Stats Section */}
            <section className={styles.statsSection}>
                <h2 className={styles.statsMainTitle}>
                    TOTAL DESIGN 전문회사로<br />
                    지난 13년 동안 연구하고 성장하였습니다
                </h2>

                <div className={styles.statsGridMain}>
                    <div className={styles.statMainItem}>
                        <span className={styles.statLabel}>총 제작 프로젝트</span>
                        <strong className={styles.statValueBig}>260<small>건</small></strong>
                        <span className={styles.statSubText}>(1)</span>
                    </div>
                    <div className={styles.statSubGroup}>
                        <div className={styles.statSubItem}>
                            <span className={styles.statLabel}>진행 프로젝트</span>
                            <strong className={styles.statValueMedium}>139<small>건</small></strong>
                            <span className={styles.statSubText}>(2)</span>
                        </div>
                        <div className={styles.statSubItem}>
                            <span className={styles.statLabel}>프로젝트 완료</span>
                            <strong className={styles.statValueMedium}>121<small>건</small></strong>
                            <span className={styles.statSubText}>(5)</span>
                        </div>
                    </div>
                </div>

                <div className={styles.statsGridSub}>
                    <div className={styles.statDetailItem}><strong>조형물</strong> | 53</div>
                    <div className={styles.statDetailItem}><strong>환경디자인</strong> | 25</div>
                    <div className={styles.statDetailItem}><strong>실내건축</strong> | 34</div>
                    <div className={styles.statDetailItem}><strong>전시디자인</strong> | 21</div>
                    <div className={styles.statDetailItem}><strong>학술연구</strong> | 11</div>
                    <div className={styles.statDetailItem}><strong>사인디자인</strong> | 14</div>
                    <div className={styles.statDetailItem}><strong>지원사업</strong> | 12</div>
                    <div className={styles.statDetailItem}><strong>행사·이벤트</strong> | 45</div>
                </div>
            </section>

            {/* History Section */}
            <section className={styles.historySection} id="history">
                <h2 className={styles.sectionTitle}>HISTORY OF 아이오아이</h2>
                <div className={styles.yearList}>
                    <span className={`${styles.yearItem} ${styles.currentYear}`}>2025</span>
                    <span className={styles.yearItem}>2024</span>
                    <span className={styles.yearItem}>2023</span>
                    <span className={styles.yearItem}>2022</span>
                    <span className={styles.yearItem}>2021</span>
                    <span className={styles.yearItem}>2020</span>
                    <span className={styles.yearItem}>2019</span>
                    <span className={styles.yearItem}>2018</span>
                    <span className={styles.yearItem}>2017</span>
                    <span className={styles.yearItem}>2016</span>
                    <span className={styles.yearItem}>2015</span>
                    <span className={styles.yearItem}>14-13</span>
                </div>
            </section>

            {/* Life Section */}
            <section className={styles.lifeSection} id="internal">
                <h2 className={styles.sectionTitle}>아이오아이 LIFE</h2>
                <div className={styles.lifeGrid}>
                    {/* Placeholders for Life images using colored blocks */}
                    <div className={styles.lifeItem} style={{ backgroundColor: '#333' }}></div>
                    <div className={styles.lifeItem} style={{ backgroundColor: '#444' }}></div>
                    <div className={styles.lifeItem} style={{ backgroundColor: '#555' }}></div>
                    <div className={styles.lifeItem} style={{ backgroundColor: '#666' }}></div>
                    <div className={styles.lifeItem} style={{ backgroundColor: '#777' }}></div>
                </div>
            </section>
        </div>
    );
}
