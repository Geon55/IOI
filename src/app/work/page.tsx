"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import styles from './page.module.css';

// 탭 데이타 정의 (5장 스크린샷 바탕)
const TAB_DATA = [
    {
        id: 'env_sculpture',
        label: '환경 조형물',
        enTitle: 'Enviroment Sculpture',
        koTitle: '환경 조형물',
        desc: '환경 조형물은 3가지 테마로 분류하여 디자인 설계 및 제작, 설치를 진행합니다.',
        process: ['타당성 검토', '디자인 개발', '실시 설계', '조형물 제작', '현장 설치', '유지 보수'],
        images: [
            'https://images.unsplash.com/photo-1558280696-6db244c015b6?q=80&w=600&fit=crop', // 상징 조형물
            'https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=600&fit=crop', // 미술 작품
            'https://images.unsplash.com/photo-1522885147691-06d859633fb8?q=80&w=600&fit=crop'  // 사이니지
        ],
        layout: 'grid-3',
        footerCols: [
            { title: '상징 조형물', text: '지역과 기업, 지자체 및\n각종 단체의 대표성과\n상징성을 담은 조형물' },
            { title: '미술 작품', text: '문화예술진흥조례에\n따라 건축물에\n설치되는 미술장식품' },
            { title: '조형 사인물', text: '옥외광고물 설치 시\n조형성을 갖춘\n조형 사인물' }
        ]
    },
    {
        id: 'env_design',
        label: '환경 디자인',
        enTitle: 'Enviroment Design',
        koTitle: '환경 디자인',
        desc: '환경 디자인은 3가지 테마로 분류하여 디자인 설계 및 제작, 설치를 진행합니다.',
        process: ['타당성 검토', '디자인 개발', '실시 설계', '조형물 제작', '현장 설치', '유지 보수'],
        images: [
            'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&fit=crop',
            'https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=600&fit=crop',
            'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600&fit=crop'
        ],
        layout: 'grid-3',
        footerCols: [
            { title: '공공디자인', text: '거리·골목·보행환경\n공공시설물(벤치, 쉘터, 가로등 등)\n셉테드(CPTED) 안전환경디자인\n생활환경 개선(벽면, 담장, 골목경관 등)' },
            { title: '시각·정보환경디자인', text: '종합안내판, WAYFINDING\n공공사인시스템\n관광·문화정보 디자인\n공공브랜딩(BI/CI, 공간그래픽 등)' },
            { title: '공간·경험환경디자인', text: '전시연출 및 콘텐츠\n체험·교육·미디어 공간\n문화·홍보관 조성\n도시 스토리텔링 기반 연출' }
        ]
    },
    {
        id: 'branding',
        label: '브랜딩',
        enTitle: 'Branding',
        koTitle: '브랜드 디자인',
        desc: '기업 분석부터 리브랜딩까지 원스탑 서비스 제공',
        process: ['기업 리서치', '전략 수립', 'Identity 개발', '시각화', '실행 및 확장'],
        images: [
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&fit=crop', // Big left
            'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600&fit=crop', // Top right
            'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&fit=crop'  // Bottom right
        ],
        layout: 'grid-branding',
        footerCenter: '기업 리브랜딩 / 웹, 앱 제작 / 모바일 서비스 제작\nCi, Bi 제작 / 패키지, 편집 디자인 제작/ 제품 디자인 및 목업, 생산'
    },
    {
        id: 'exhibition',
        label: '전시·인테리어',
        enTitle: 'Exhibition & Experience Design',
        koTitle: '전시 인테리어 디자인',
        desc: '디자인 설계 및 실시설계, 시공까지 원스탑 서비스 제공',
        process: ['기획', '기본구상', '기본설계', '실시설계', '제작 시공', '유지 보수'],
        images: [
            'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1400&fit=crop' // Full width interior
        ],
        layout: 'grid-full'
    },
    { id: 'academic', label: '학술 연구' },
    {
        id: 'support',
        label: '지원 사업',
        enTitle: 'Public Support Program',
        koTitle: '공공기관 지원 사업',
        desc: '지역·기관·단체의 지속가능한 발전을 위해 필요한 자원·정책·서비스 제공 및 현안 해결과 성과 창출',
        process: ['기획', '기본구상', '기본설계', '실시설계', '제작 시공', '유지 보수'],
        images: [
            'https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=800&fit=crop',
            'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&fit=crop'
        ],
        layout: 'grid-2'
    },
    { id: 'event', label: '이벤트·행사' },
];

export default function WorkPage() {
    // 기본 선택 탭: 환경 조형물
    const [activeTab, setActiveTab] = useState(TAB_DATA[0].id);

    const activeData = TAB_DATA.find(t => t.id === activeTab);

    return (
        <div className={styles.container}>
            {/* 1. Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <motion.div
                        className={styles.badge}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Work
                    </motion.div>
                    <motion.h1
                        className={styles.heroTitle}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        WORK AREA
                    </motion.h1>
                    <motion.h2
                        className={styles.heroSubTitle}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        사업분야
                    </motion.h2>
                </div>
            </section>

            {/* 2. Tab Navigation */}
            <section className={styles.tabSection}>
                <div className={styles.tabContainer}>
                    {TAB_DATA.map((tab) => (
                        <button
                            key={tab.id}
                            className={`${styles.tabBtn} ${activeTab === tab.id ? styles.tabActive : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </section>

            {/* 3. Tab Content Area */}
            <section className={styles.contentSection}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className={styles.contentInner}
                    >
                        {activeData && activeData.enTitle ? (
                            <div className={styles.workDetail}>
                                {/* Header (Titles) */}
                                <div className={styles.detailHeader}>
                                    <h3 className={styles.detailTitle}>
                                        <span className={styles.enTitle}>{activeData.enTitle}</span>
                                        <span className={styles.divider}>|</span>
                                        <span className={styles.koTitle}>{activeData.koTitle}</span>
                                    </h3>
                                    <p className={styles.detailDesc}>{activeData.desc}</p>
                                </div>

                                {/* Process Steps */}
                                {activeData.process && (
                                    <div className={styles.processWrap}>
                                        {activeData.process.map((step, idx) => (
                                            <React.Fragment key={idx}>
                                                <div className={styles.processStep}>
                                                    <span className={styles.processText}>{step}</span>
                                                </div>
                                                {idx < activeData.process.length - 1 && (
                                                    <div className={styles.processArrow}>
                                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                )}

                                {/* Image Grids based on layout */}
                                <div className={`${styles.imageGrid} ${styles[activeData.layout || '']}`}>
                                    {activeData.layout === 'grid-branding' && activeData.images && (
                                        <>
                                            <div className={styles.brandImgMain}>
                                                <Image src={activeData.images[0]} alt="Brand Main" fill style={{ objectFit: 'cover' }} />
                                            </div>
                                            <div className={styles.brandImgSubWrap}>
                                                <div className={styles.brandImgSub}>
                                                    <Image src={activeData.images[1]} alt="Brand Sub 1" fill style={{ objectFit: 'cover' }} />
                                                </div>
                                                <div className={styles.brandImgSub}>
                                                    <Image src={activeData.images[2]} alt="Brand Sub 2" fill style={{ objectFit: 'cover' }} />
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {activeData.layout !== 'grid-branding' && activeData.images && (
                                        activeData.images.map((img, idx) => (
                                            <div key={idx} className={styles.standardImg}>
                                                <Image src={img} alt={`${activeData.koTitle} ${idx}`} fill style={{ objectFit: 'cover' }} />
                                            </div>
                                        ))
                                    )}
                                </div>

                                {/* Footers */}
                                {activeData.footerCols && (
                                    <div className={styles.footerGrid}>
                                        {activeData.footerCols.map((col, idx) => (
                                            <div key={idx} className={styles.footerCol}>
                                                <h4 className={styles.footerColTitle}>{col.title}</h4>
                                                <p className={styles.footerColText}>
                                                    {col.text.split('\n').map((line, i) => (
                                                        <React.Fragment key={i}>
                                                            {line}<br />
                                                        </React.Fragment>
                                                    ))}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {activeData.footerCenter && (
                                    <div className={styles.footerCenter}>
                                        <p>
                                            {activeData.footerCenter.split('\n').map((line, i) => (
                                                <React.Fragment key={i}>
                                                    {line}<br />
                                                </React.Fragment>
                                            ))}
                                        </p>
                                    </div>
                                )}

                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '10rem 0', color: '#666' }}>
                                {activeData?.label} 컨텐츠 준비 중입니다.
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </section>
        </div>
    );
}
