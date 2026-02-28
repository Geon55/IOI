"use client";

import { useRef } from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import { X } from 'lucide-react';
import styles from './page.module.css';

const statCategories = [
    { name: '조형물', count: '95' },
    { name: '환경 디자인', count: '92' },
    { name: '인테리어', count: '24' },
    { name: '전시 디자인', count: '21' },
    { name: '학술연구', count: '11' },
    { name: '사인 디자인', count: '10' },
    { name: '지원사업', count: '07' },
    { name: '행사·이벤트', count: '08' },
];

const historyData = [
    {
        year: '2025',
        details: [
            { category: '조형물', items: ['민주지산 탐방로 조성사업 조형물 및 안내사인', '강동구 천호 옹벽 조형물', '낙동강 생물자원관 야외 조형물', '김포 애기봉 조형물', '대왕 소나무 조형물', '대이작도 명소화 경관개선 조형물', '가평 라파스템 지주입간판', '의령 도깨비 황금동굴 조형물'] },
            { category: '환경디자인', items: ['인천 부평 인터렉션 스마트 폴 라이트', '구리 수리단길 디자인 구상', '고창 해양환경공단 구시포 경관지킴이 조경타워', '김포 수변길 4코스 경관 개선', '벽년시장 환경 조성', '목동깨비시장 야간 조명거리 조성', '평택 안중시장 환경개선', '강남 영동 시장 환경개선', '인천 현대시장 환경개선', '장안문 거북시장 환경개선'] },
            { category: '전시·인테리어', items: ['의령 도깨비 황금', '목동 깨비시장 P', '오수견 리모델링', '황금동굴 미디어'] }
        ]
    }
];

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export default function WeArePage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 85%", "center center"]
    });

    // identityX: starts from the left and moves to 0
    const identityX = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);
    const identityOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

    // ofIdX: starts from the right and moves to 0
    const ofIdX = useTransform(scrollYProgress, [0, 1], ["30%", "0%"]);
    const ofIdOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

    const introOpacity = useTransform(scrollYProgress, [0.4, 1], [0, 1]);
    const introY = useTransform(scrollYProgress, [0.4, 1], [30, 0]);

    return (
        <div className={styles.container}>
            {/* 1. Hero Image Section */}
            <section className={styles.topHeroSection}>
                <div className={styles.heroBg}>
                    <img
                        src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=2000&fit=crop"
                        alt="Background"
                        className={styles.bgImage}
                    />
                </div>
                <div className={styles.heroOverlay}></div>

                <div className={styles.badgeRow}>
                    <div className={styles.badge}>
                        WE ARE
                    </div>
                </div>
            </section>

            {/* 2. Text Animation Section */}
            <section className={styles.textAnimationSection} ref={containerRef}>
                <div className={styles.heroContent}>
                    <motion.div
                        className={`${styles.heroRow} ${styles.top}`}
                        style={{ x: identityX, opacity: identityOpacity }}
                    >
                        <span className={styles.bigText}>IDENTITY</span>
                        <div className={styles.horizontalLine} />
                    </motion.div>

                    <motion.div
                        className={styles.introRow}
                        style={{ opacity: introOpacity, y: introY }}
                    >
                        <div className={styles.heroIntroBox}>
                            <p className={styles.heroIntroText}>
                                아이오아이(IOI)는 <strong>아이덴티티 오브 아이디어 (Identity of Idea)</strong>의 약자로<br />
                                이름 그대로 고객의 생각·가치·비전을 바탕으로 <strong>아이디어를 확장</strong>하고<br />
                                아이덴티티를 구축하는 <strong>'다움'을 만드는 기업</strong>입니다.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        className={`${styles.heroRow} ${styles.bottom}`}
                        style={{ x: ofIdX, opacity: ofIdOpacity }}
                    >
                        <div className={styles.horizontalLine} />
                        <span className={styles.bigText}>OF IDEA</span>
                    </motion.div>
                </div>
            </section>

            {/* 2. Values Section */}
            <section className={styles.valuesSection}>
                <motion.div
                    className={styles.valuesGrid}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={staggerContainer}
                >
                    <motion.div className={styles.valueCol} variants={fadeInUp}>
                        <h3 className={styles.valueTitle}>우리는</h3>
                        <p className={styles.valueText}>
                            '예쁜 디자인'보다 브랜드의 본질을 먼저 봅니다. 고객의 생각·가치·비전을 토대로 문제를 정의하고 브랜드가 가야 할 방향을 구조화하며 그 길 위에 필요한 경험을 설계합니다.
                        </p>
                    </motion.div>
                    <motion.div className={styles.valueCol} variants={fadeInUp}>
                        <h3 className={styles.valueTitle}>이렇게</h3>
                        <p className={styles.valueText}>
                            디자인은 형태를 만드는 일이 아니라 사람의 경험을 구조화하는 일이라고 생각합니다. 그래서 우리는 마케팅·경영전략·스토리텔링·환경심리 등 인문학적 SW를 바탕으로 브랜드의 본질을 해석하고 의미를 공간·이미지·경험 전반에 자연스럽게 녹여냅니다.
                        </p>
                    </motion.div>
                    <motion.div className={styles.valueCol} variants={fadeInUp}>
                        <h3 className={styles.valueTitle}>디자인을</h3>
                        <p className={styles.valueText}>
                            IOI는 하나의 시각 언어로만 일하지 않습니다. 분석, 기획, 컨셉 개발, 완결된 결과물까지 브랜드의 전 여정(Brand Journey)을 디자인합니다. 이 과정에서 우리는 불필요한 장식을 배제하고 핵심만 남기는 강력한 지속 가능한 브랜드 경험을 만듭니다.
                        </p>
                    </motion.div>
                </motion.div>
            </section>

            {/* 3. Stats Section */}
            <section className={styles.statsSection}>
                <div className={styles.statsInner}>
                    <motion.h2
                        className={styles.statsHeadline}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        TOTAL DESIGN 전문회사로<br />
                        지난 13년 동안 연구하고 성장해왔습니다.
                    </motion.h2>

                    <motion.div
                        className={styles.statsMainNumbers}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.div className={styles.statMainItem} variants={fadeInUp}>
                            <div className={styles.statLabel}>IOI 계약 프로젝트</div>
                            <div className={styles.statNumberBlock}>
                                <div className={styles.statNum}>260<span>건</span></div>
                                <div className={styles.subNum}>1</div>
                            </div>
                        </motion.div>
                        <motion.div className={styles.statMainItem} variants={fadeInUp}>
                            <div className={styles.statLabel}>협업 프로젝트</div>
                            <div className={`${styles.statNum} ${styles.statNumOutline}`}>139<span>건</span></div>
                        </motion.div>
                        <motion.div className={styles.statMainItem} variants={fadeInUp}>
                            <div className={styles.statLabel}>프로젝트 문의</div>
                            <div className={`${styles.statNum} ${styles.statNumOutline}`}>1215<span>건</span></div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className={styles.statsCategoryGrid}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        {statCategories.map((cat, i) => (
                            <div key={i} className={styles.statCatItem}>
                                <span className={styles.statCatName}>{cat.name}</span>
                                <span className={styles.statCatDivider}>|</span>
                                <span className={styles.statCatCount}>{cat.count}건</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* 4. History Section */}
            <section className={styles.historySection}>
                <motion.h2
                    className={styles.historyTitle}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    HISTORY OF 아이오아이
                </motion.h2>

                <div className={styles.historyLayout}>
                    <div className={styles.historyYearsBg}>
                        <span className={`${styles.yearTextBg} ${styles.yearTextActive}`}>2025</span>
                        <span className={styles.yearTextBg}>2024</span>
                        <span className={styles.yearTextBg}>2023</span>
                        <span className={styles.yearTextBg}>2022</span>
                        <span className={styles.yearTextBg}>2021</span>
                    </div>

                    <motion.div
                        className={styles.historyDetailBox}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <X className={styles.closeBtn} size={24} />

                        <div className={styles.boxGrid}>
                            {historyData[0].details.map((detail, idx) => (
                                <div key={idx} className={styles.boxCol}>
                                    <h4>{detail.category}</h4>
                                    <ul className={styles.boxList}>
                                        {detail.items.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div className={styles.boxPagination}>
                            <div className={styles.pageDotActive} style={{ width: '40px', height: '2px' }}></div>
                            <div className={styles.pageDot} style={{ width: '40px', height: '2px' }}></div>
                            <div className={styles.pageDot} style={{ width: '40px', height: '2px' }}></div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
