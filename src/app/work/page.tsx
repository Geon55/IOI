
"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

const tabs = [
    '환경 조형물', '환경 디자인', '브랜딩', '전시·인테리어', '학술 연구', '지원 사업', '이벤트·행사'
];

export default function WorkPage() {
    const [activeTab, setActiveTab] = useState('환경 조형물');

    return (
        <div className={styles.container}>
            {/* Hero Section */}
            <div className={styles.hero}>
                <div style={{ fontSize: '0.9rem', marginBottom: '1rem', background: '#00ff00', color: '#000', padding: '0.2rem 0.8rem', display: 'inline-block', fontWeight: 'bold' }}>Work</div>
                <h1 className={styles.titleMain}>WORK AREA</h1>
                <div className={styles.titleSub} style={{ WebkitTextStroke: '1px #555', color: 'transparent', fontSize: '4rem', fontWeight: '800' }}>사업분야</div>
            </div>

            {/* Tabs */}
            <div className={styles.tabsContainer}>
                <div className={styles.tabs}>
                    {tabs.map((tab, i) => (
                        <button
                            key={i}
                            className={`${styles.tabBtn} ${activeTab === tab ? styles.tabBtnActive : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Section */}
            <div className={styles.contentSection}>
                {/* Environment Sculpture Section */}
                {activeTab === '환경 조형물' && (
                    <>
                        <h2 className={styles.contentTitle}>Enviroment Sculpture | 환경 조형물</h2>
                        <p className={styles.contentDesc}>
                            환경 조형물은 3가지 테마로 분류하여 디자인 설계 및 제작, 설치를 진행합니다.
                        </p>

                        <div className={styles.processSteps}>
                            <div className={styles.stepBox}>타당성 검토</div>
                            <span className={styles.stepArrow}>→</span>
                            <div className={styles.stepBox}>디자인 개발</div>
                            <span className={styles.stepArrow}>→</span>
                            <div className={styles.stepBox}>실시 설계</div>
                            <span className={styles.stepArrow}>→</span>
                            <div className={styles.stepBox}>조형물 제작</div>
                            <span className={styles.stepArrow}>→</span>
                            <div className={styles.stepBox}>현장 설치</div>
                            <span className={styles.stepArrow}>→</span>
                            <div className={styles.stepBox}>유지 보수</div>
                        </div>

                        <div className={styles.grid}>
                            {/* Column 1: 상징 조형물 */}
                            <div className={styles.gridItem}>
                                <div className={styles.imageArea}>
                                    <Image src="https://images.unsplash.com/photo-1558280696-6db244c015b6?q=80&w=600&fit=crop" alt="Symbolic Sculpture" fill style={{ objectFit: 'cover' }} />
                                </div>
                                <div>
                                    <h3 className={styles.itemTitle}>상징 조형물</h3>
                                    <ul className={styles.itemList}>
                                        <li>지역과 기업, 지자체 및</li>
                                        <li>각종 단체의 대표성과</li>
                                        <li>상징성을 담은 조형물</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Column 2: 미술 작품 */}
                            <div className={styles.gridItem}>
                                <div className={styles.imageArea}>
                                    <Image src="https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=600&fit=crop" alt="Art Works" fill style={{ objectFit: 'cover' }} />
                                </div>
                                <div>
                                    <h3 className={styles.itemTitle}>미술 작품</h3>
                                    <ul className={styles.itemList}>
                                        <li>문화예술진흥조례에</li>
                                        <li>따라 건축물에</li>
                                        <li>설치되는 미술장식품</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Column 3: 조형 사인물 */}
                            <div className={styles.gridItem}>
                                <div className={styles.imageArea}>
                                    <Image src="https://images.unsplash.com/photo-1522885147691-06d859633fb8?q=80&w=600&fit=crop" alt="Sculptural Signage" fill style={{ objectFit: 'cover' }} />
                                </div>
                                <div>
                                    <h3 className={styles.itemTitle}>조형 사인물</h3>
                                    <ul className={styles.itemList}>
                                        <li>옥외광고물 설치 시</li>
                                        <li>조형성을 갖춘</li>
                                        <li>조형 사인물</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === '환경 디자인' && (
                    <>
                        <h2 className={styles.contentTitle}>Enviroment Design | 환경 디자인</h2>
                        <p className={styles.contentDesc}>
                            환경 디자인은 3가지 테마로 분류하여 디자인 설계 및 제작, 설치를 진행합니다.
                        </p>

                        <div className={styles.processSteps}>
                            <div className={styles.stepBox}>타당성 검토</div>
                            <span className={styles.stepArrow}>→</span>
                            <div className={styles.stepBox}>디자인 개발</div>
                            <span className={styles.stepArrow}>→</span>
                            <div className={styles.stepBox}>실시 설계</div>
                            <span className={styles.stepArrow}>→</span>
                            <div className={styles.stepBox}>조형물 제작</div>
                            <span className={styles.stepArrow}>→</span>
                            <div className={styles.stepBox}>현장 설치</div>
                            <span className={styles.stepArrow}>→</span>
                            <div className={styles.stepBox}>유지 보수</div>
                        </div>

                        <div className={styles.grid}>
                            <div className={styles.gridItem}>
                                <div className={styles.imageArea} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '2fr 1fr', gap: '4px' }}>
                                    <div style={{ gridColumn: '1 / span 2', position: 'relative', background: '#333' }}>
                                        <Image src="https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=400&fit=crop" alt="Public Design 1" fill style={{ objectFit: 'cover' }} />
                                    </div>
                                    <div style={{ position: 'relative', background: '#333' }}>
                                        <Image src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=400&fit=crop" alt="Public Design 2" fill style={{ objectFit: 'cover' }} />
                                    </div>
                                    <div style={{ position: 'relative', background: '#333' }}>
                                        <Image src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=400&fit=crop" alt="Public Design 3" fill style={{ objectFit: 'cover' }} />
                                    </div>
                                </div>
                                <div>
                                    <h3 className={styles.itemTitle}>공공디자인</h3>
                                    <ul className={styles.itemList}>
                                        <li>거리·골목·보행환경</li>
                                        <li>공공시설물(벤치, 쉘터, 가로등 등)</li>
                                        <li>셉티드(CPTED) 안전환경디자인</li>
                                        <li>생활환경 개선(벽면, 담장, 골목경관 등)</li>
                                    </ul>
                                </div>
                            </div>

                            <div className={styles.gridItem}>
                                <div className={styles.imageArea} style={{ position: 'relative' }}>
                                    <Image src="https://images.unsplash.com/photo-1563206767-5b1d9728d70e?q=80&w=400&fit=crop" alt="Visual Design" fill style={{ objectFit: 'cover' }} />
                                </div>
                                <div>
                                    <h3 className={styles.itemTitle}>시각·정보환경디자인</h3>
                                    <ul className={styles.itemList}>
                                        <li>종합안내판, WAYFINDING</li>
                                        <li>공공사인시스템</li>
                                        <li>관광·문화정보 디자인</li>
                                        <li>공공브랜딩(BI/CI, 공간그래픽 등)</li>
                                    </ul>
                                </div>
                            </div>

                            <div className={styles.gridItem}>
                                <div className={styles.imageArea} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '4px' }}>
                                    <div style={{ gridColumn: '1 / span 2', gridRow: '1 / span 2', position: 'relative', background: '#333' }}>
                                        <Image src="https://images.unsplash.com/photo-1518998053901-5348d396916b?q=80&w=400&fit=crop" alt="Spatial Design Main" fill style={{ objectFit: 'cover' }} />
                                    </div>
                                    <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '40%', height: '40%', background: '#000', border: '2px solid #fff', borderRadius: '4px', overflow: 'hidden' }}>
                                        <Image src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=200&fit=crop" alt="Spatial Design Sub" fill style={{ objectFit: 'cover' }} />
                                    </div>
                                </div>
                                <div>
                                    <h3 className={styles.itemTitle}>공간·경험환경디자인</h3>
                                    <ul className={styles.itemList}>
                                        <li>전시연출 및 콘텐츠</li>
                                        <li>체험·교육·미디어 공간</li>
                                        <li>문화·홍보관 조성</li>
                                        <li>도시 스토리텔링 기반 연출</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Branding Section */}
                {activeTab === '브랜딩' && (
                    <div className={styles.brandingSection}>
                        <h2 className={styles.contentTitle}>Branding | 브랜드 디자인</h2>
                        <p className={styles.contentDesc}>
                            기업 분석부터 리브랜딩까지 원스탑 서비스 제공
                        </p>

                        <div className={styles.processSteps} style={{ marginBottom: '4rem' }}>
                            <div className={styles.stepBox} style={{ backgroundColor: '#333', border: 'none' }}>기업 리서치</div>
                            <span className={styles.stepArrow}>→</span>
                            <div className={styles.stepBox} style={{ backgroundColor: '#333', border: 'none' }}>전략 수립</div>
                            <span className={styles.stepArrow}>→</span>
                            <div className={styles.stepBox} style={{ backgroundColor: '#333', border: 'none' }}>Identity 개발</div>
                            <span className={styles.stepArrow}>→</span>
                            <div className={styles.stepBox} style={{ backgroundColor: '#333', border: 'none' }}>시각화</div>
                            <span className={styles.stepArrow}>→</span>
                            <div className={styles.stepBox} style={{ backgroundColor: '#333', border: 'none' }}>실행 및 확장</div>
                        </div>

                        <div className={styles.brandingGrid}>
                            {/* Left Column: Big Bag Image */}
                            <div className={styles.brandingBigImage}>
                                <Image
                                    src="https://images.unsplash.com/photo-1622560417282-5631758c0676?q=80&w=800&fit=crop"
                                    alt="Branding Bag"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>

                            {/* Right Column: Stacked Images */}
                            <div className={styles.brandingSideCol}>
                                <div className={styles.brandingSideImage}>
                                    {/* Logo Placeholder */}
                                    <div style={{ color: '#005f73', fontWeight: 'bold', fontSize: '1.5rem', textAlign: 'center' }}>
                                        <span style={{ color: '#ca6702', display: 'block', fontSize: '0.8rem', marginBottom: '0.2rem' }}>YONGDAP NADLEE MARKET</span>
                                        <span style={{ fontSize: '2rem' }}>용답</span><br />나들시장
                                    </div>
                                </div>
                                <div className={styles.brandingSideImage}>
                                    {/* Characters Placeholder */}
                                    <Image
                                        src="https://images.unsplash.com/photo-1560963689-02e820147bc3?q=80&w=400&fit=crop"
                                        alt="Character Design"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                        </div>

                        <p className={styles.brandingDesc}>
                            기업 리브랜딩 / 웹, 앱 제작 / 모바일 서비스 제작<br />
                            Ci, Bi 제작 / 패키지, 편집 디자인 제작/ 제품 디자인 및 목업, 생산
                        </p>
                    </div>
                )}

                {/* Exhibition & Interior Design Section */}
                {activeTab === '전시·인테리어' && (
                    <div className={styles.exhibitionSection}>
                        <h2 className={styles.contentTitle}>Exhibition & Experience Design | 전시 인테리어 디자인</h2>
                        <p className={styles.contentDesc}>
                            디자인 설계 및 실시설계, 시공까지 원스탑 서비스 제공
                        </p>

                        <div className={styles.processSteps}>
                            <div className={styles.stepBox}>기획</div>
                            <span className={styles.stepArrow}>→</span>
                            <div className={styles.stepBox}>기본구상</div>
                            <span className={styles.stepArrow}>→</span>
                            <div className={styles.stepBox}>기본설계</div>
                            <span className={styles.stepArrow}>→</span>
                            <div className={styles.stepBox}>실시설계</div>
                            <span className={styles.stepArrow}>→</span>
                            <div className={styles.stepBox}>제작 시공</div>
                            <span className={styles.stepArrow}>→</span>
                            <div className={styles.stepBox}>유지 보수</div>
                        </div>

                        <div className={styles.exhibitionImageContainer}>
                            <Image
                                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop"
                                alt="Exhibition Design"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                )}

                {/* Support Project Section */}
                {activeTab === '지원 사업' && (
                    <div className={styles.supportSection}>
                        <h2 className={styles.contentTitle}>Public Support Program | 공공기관 지원 사업</h2>
                        <p className={styles.contentDesc}>
                            지역·기관·단체의 지속가능한 발전을 위해 필요한 자원·정책·서비스 제공 및 현안 해결과 성과 창출
                        </p>

                        <div className={styles.processSteps}>
                            <div className={styles.stepBox}>기획</div>
                            <span className={styles.stepArrow}>→</span>
                            <div className={styles.stepBox}>기본구상</div>
                            <span className={styles.stepArrow}>→</span>
                            <div className={styles.stepBox}>기본설계</div>
                            <span className={styles.stepArrow}>→</span>
                            <div className={styles.stepBox}>실시설계</div>
                            <span className={styles.stepArrow}>→</span>
                            <div className={styles.stepBox}>제작 시공</div>
                            <span className={styles.stepArrow}>→</span>
                            <div className={styles.stepBox}>유지 보수</div>
                        </div>

                        <div className={styles.supportGrid}>
                            <div className={styles.supportImageItem}>
                                <Image
                                    src="https://images.unsplash.com/photo-1535591273668-578e31be46af?q=80&w=800&fit=crop"
                                    alt="Public Support 1"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.supportImageItem}>
                                <Image
                                    src="https://images.unsplash.com/photo-1560179707-f14e90ef3cdd?q=80&w=800&fit=crop"
                                    alt="Public Support 2"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Event & Festival Section */}
                {activeTab === '이벤트·행사' && (
                    <div className={styles.eventSection}>
                        <h2 className={styles.contentTitle}>Event & Festival | 이벤트·행사</h2>
                        <p className={styles.contentDesc}>
                            이벤트 기획 및 행사 무대 설치 및 제작
                        </p>

                        <div className={styles.processSteps}>
                            <div className={styles.stepBox}>기획</div>
                            <span className={styles.stepArrow}>→</span>
                            <div className={styles.stepBox}>기본구상</div>
                            <span className={styles.stepArrow}>→</span>
                            <div className={styles.stepBox}>기본설계</div>
                            <span className={styles.stepArrow}>→</span>
                            <div className={styles.stepBox}>실시설계</div>
                            <span className={styles.stepArrow}>→</span>
                            <div className={styles.stepBox}>제작 시공</div>
                            <span className={styles.stepArrow}>→</span>
                            <div className={styles.stepBox}>유지 보수</div>
                        </div>

                        <div className={styles.eventGrid}>
                            <div className={styles.eventLeftCol}>
                                <div className={styles.eventImageItem}>
                                    <Image
                                        src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&fit=crop"
                                        alt="Event Stage"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className={styles.eventImageItem}>
                                    <Image
                                        src="https://images.unsplash.com/photo-1544161515-4ab6ce6db48c?q=80&w=800&fit=crop"
                                        alt="Event Awards"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className={styles.eventRightCol}>
                                <div className={styles.eventImageFull}>
                                    <Image
                                        src="https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=800&fit=crop"
                                        alt="Outdoor Festival"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
