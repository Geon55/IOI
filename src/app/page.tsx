"use client";

import { motion, Variants } from 'framer-motion';
import Image from "next/image";
import Link from 'next/link';
import { Download } from 'lucide-react';
import styles from './page.module.css';
import Logo from '@/components/ui/Logo';

const statCategories = [
  { name: '조형물', count: 95 },
  { name: '환경 디자인', count: 92 },
  { name: '인테리어', count: 24 },
  { name: '전시 디자인', count: 21 },
  { name: '학술연구', count: 11 },
  { name: '사인 디자인', count: 10 },
  { name: '지원사업', count: 7 },
  { name: '행사·이벤트', count: 8 },
];

const historyData = [
  {
    year: '2025',
    items: [
      { category: '조형물', desc: '강화군 평화전망대 평화의 섬 기원 조형물 실시 및 시공' },
      { category: '', desc: '의령군 솟대 방벽 부조 조형물' },
      { category: '', desc: '의령군 남산둘레길 부조 조형물' },
      { category: '', desc: '영양군 새단장 부조 조형물' },
    ]
  },
  {
    year: '2024',
    items: [
      { category: '환경디자인', desc: '함양 상림 산삼주제공원 스토리텔링' },
      { category: '', desc: '진주 진양호 야간관광명소화 사업' },
      { category: '', desc: '순천 동천 일원 유휴공간 야간경관 특화' },
    ]
  },
  {
    year: '2023',
    items: [
      { category: '전시·인테리어', desc: '자연생태관 내부 전시 리뉴얼' },
      { category: '', desc: '지역 홍보관 디자인' },
    ]
  }
];

const processData = [
  {
    id: 1, step: '01. 본질 파악하기',
    desc: `'예쁜 디자인'보다\n브랜드의 본질을 먼저 봅니다.`,
    img1: 'https://images.unsplash.com/photo-1545639360-32389d46944e?q=80&w=400&fit=crop',
    img2: 'https://images.unsplash.com/photo-1517436073-3b1b193424cb?q=80&w=400&fit=crop'
  },
  {
    id: 2, step: '02. 경험 구조화하기',
    desc: `디자인은 단순히 형태를 만드는 것이 아니라\n사람의 경험을 구조화하는 일입니다.`,
    img1: 'https://images.unsplash.com/photo-1628744876497-eb30460be9f6?q=80&w=400&fit=crop',
    img2: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=400&fit=crop'
  },
  {
    id: 3, step: '03. 담아내고 실행하기',
    desc: `불필요한 장식을 배제하고 핵심만을 담은\n지속 가능한 브랜드 경험을 만듭니다.`,
    img1: 'https://images.unsplash.com/photo-1575995941656-787be7257006?q=80&w=400&fit=crop',
    img2: 'https://images.unsplash.com/photo-1595842851892-0b1548232961?q=80&w=400&fit=crop'
  }
];

const clientList = [
  '의령군', '영양군', '함양군', '울진군', '완도군', '영암군',
  '옹진군', '금산군', '영동군', '고흥군', '강화군', 'Jindo',
  '인천광역시', '춘천시', '순천시', '고양시', '대전광역시',
  '진주시', '대구광역시', '강동구', '광진구', '미추홀구',
  '동구', '중구', '남동구', '인천관광공사', '충남경제진흥원',
  '인천시설공단', '한국환경공단', 'KOEM', '전통시장육성재단', '인천테크노파크'
];

const certList = [
  { id: 1, name: '직접생산확인\n증명서' },
  { id: 2, name: '중소기업\n확인서' },
  { id: 3, name: '기업부설연구소\n인정서' },
  { id: 4, name: '공공디자인 전문회사\n신고필증' },
  { id: 5, name: '산업디자인 전문회사\n신고필증' },
];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export default function Home() {
  return (
    <div className={styles.main}>

      {/* 1. New Hero Section (PDF Page 2: Main Page) */}
      <section className={styles.heroSection}>
        <div className={styles.heroBg}>
          <Image
            src="https://images.unsplash.com/photo-1545639360-32389d46944e?q=80&w=2000&fit=crop"
            alt="Main Workshop Background"
            fill
            style={{ objectFit: 'cover', filter: 'grayscale(100%) brightness(0.4)' }}
            priority
          />
          <div className={styles.heroOverlay}></div>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.mainPageBadge}>Main Page</div>

          <motion.div
            className={styles.heroMainTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className={styles.light}>우리는</span>
            <strong className={styles.bold}>아이오아이</strong>
            <span className={styles.light}>입니다.</span>
          </motion.div>

          <motion.div
            className={styles.heroStatsBottom}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className={styles.heroStatItem}>
              <span>EXPERIENCE</span>
              <span className={styles.divider}>|</span>
              <span className={styles.value}>410,227,200 <span style={{ fontSize: '0.8em', fontWeight: 'normal' }}>.sec</span></span>
            </div>
            <div className={styles.heroStatItem}>
              <span>TODAY <span className={styles.value}>1440</span></span>
              <span className={styles.divider}>|</span>
              <span>TOTAL <span className={styles.value}>1,400,224</span></span>
            </div>
          </motion.div>

          {/* Optional: Add side pagination if needed, or remove if not in design */}
        </div>
      </section>
      {/* 2. Process Section (Added back per screenshot) */}
      <section className={styles.section} style={{ backgroundColor: '#181818', padding: '10rem 5vw' }}>
        <motion.div className={styles.processGrid} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
          <motion.div variants={fadeInUp}>
            <h2 className={styles.sectionTitle} style={{ marginBottom: '4rem', color: '#fff', fontSize: '3rem', fontWeight: 800 }}>
              <span style={{ fontWeight: 300, display: 'block', color: '#888' }}>우리는</span>
              이렇게 일을<br />
              <span style={{ fontWeight: 300, display: 'block', color: '#888' }}>진행합니다.</span>
            </h2>
          </motion.div>

          <div className={styles.processList}>
            {processData.map((item) => (
              <motion.div key={item.id} className={styles.processItem} variants={fadeInUp}>
                <div className={styles.imageStack}>
                  <div className={styles.processImage}>
                    <Image src={item.img1} alt={`Process ${item.id}-1`} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div className={styles.processImage}>
                    <Image src={item.img2} alt={`Process ${item.id}-2`} fill style={{ objectFit: 'cover' }} />
                  </div>
                </div>
                <div className={styles.processContent}>
                  <div className={styles.processStep}>{item.step}</div>
                  <div className={styles.processDesc}>
                    {item.desc.split('\n').map((line, i) => (
                      <span key={i}>{line}<br /></span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 3. Clients Section (Side-by-side Layout) */}
      <section className={styles.section} style={{ backgroundColor: '#181818', padding: '10rem 0' }}>
        <motion.div className={styles.clientsContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
          <motion.div variants={fadeInUp} className={styles.clientsSide}>
            <h2 className={styles.clientsTitleMain}>Clients</h2>
            <h3 className={styles.clientsTitleSub}>함께한 소중한 고객</h3>

            <p className={styles.clientsDesc}>
              우리는 질문합니다.<br />
              "어떤 이미지가 필요할까?" 가 아닌<br />
              <strong style={{ color: '#fff', fontWeight: 'bold' }}>"무엇이 이 브랜드의 미래를 만드는가?"</strong><br /><br />
              아이오아이는 브랜드의 '생각'을 발견<br />
              하고 그 생각을 '경험'으로 확장시킵니다.
            </p>
          </motion.div>

          <motion.div className={styles.clientsGrid} variants={fadeInUp}>
            {clientList.map((name, i) => (
              <div key={i} className={styles.clientLogoItem}>
                <div className={styles.clientLogoMark}>
                  <Image
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(name.replace('광역시', '').replace('특별시', '').substring(0, 2))}&background=222&color=666&rounded=true&font-size=0.35&bold=true`}
                    alt={`${name} 로고`}
                    fill
                    style={{ objectFit: 'contain', opacity: 0.8 }}
                  />
                </div>
                <span className={styles.clientLogoText}>{name}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* 4. Company Intro Section (Side-by-side Layout) */}
      <section className={styles.section} style={{ backgroundColor: '#181818' }}>
        <motion.div className={styles.introSection} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer}>
          <motion.div variants={fadeInUp}>
            <h2 className={styles.introTitle}>
              아이오아이<br />
              회사소개서
            </h2>
            <strong className={styles.introSubtitle}>
              ‘다움’을 만드는 기업
            </strong>
            <p className={styles.introDesc}>
              우리는 질문합니다.<br />
              "어떤 이미지가 필요할까?" 가 아닌<br />
              "무엇이 이 브랜드의 미래를 만드는가?"<br />
              아이오아이는 브랜드의 '생각'을 발견하고<br />
              그 생각을 '경험'으로 확장시킵니다.
            </p>
          </motion.div>

          <motion.div className={styles.introCard} variants={fadeInUp} whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
            <div style={{ paddingBottom: '2rem' }}>
              <Logo width={220} height={60} variant="white" />
            </div>
            <Link href="#" className={styles.introLink}>
              Download <Download size={16} />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* 5. Certifications Section */}
      <section className={styles.section} style={{ backgroundColor: '#111', borderBottom: 'none' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 8vw' }}>
          <motion.h2 className={styles.certTitleMain} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            아이오아이 보유자격·확인증
          </motion.h2>

          <motion.div className={styles.certGrid} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
            {certList.map((cert) => (
              <motion.div key={cert.id} className={styles.certItem} variants={fadeInUp}>
                <div className={styles.certImage}>
                  <Image
                    src={`https://images.unsplash.com/photo-1589330694653-ded6df03f754?q=80&w=300&fit=crop`}
                    alt={cert.name}
                    fill
                    style={{ objectFit: 'cover', opacity: 0.2 }}
                  />
                  <span>CERT</span>
                </div>
                <div className={styles.certName}>
                  {cert.name.split('\n').map((line, i) => <div key={i}>{line}</div>)}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
