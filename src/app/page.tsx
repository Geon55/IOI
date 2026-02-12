"use client";

import { motion, Variants } from 'framer-motion';
import Image from "next/image";
import Link from 'next/link';
import { Download } from 'lucide-react';
import styles from './page.module.css';

const clientList = [
  '의령군', '영양군', '함양군', '울진군', '완도군', '영암군',
  '옹진군', '금산군', '영동군', '고흥군', '강화군', 'Jindo',
  '인천광역시', '춘천시', '순천시', '고양시', '대전광역시',
  '진주시', '대구광역시', '강동구', '광진구', '미추홀구',
  '동구', '중구', '남동구', '인천관광공사', '충남경제진흥원',
  '인천시설공단', '한국환경공단', 'KOEM', '전통시장육성재단', '인천테크노파크',
  '국립춘천병원', '서울교통공사', '인천광역시립박물관', '부평구문화재단', '금호행복시장'
];

const certList = [
  { id: 1, name: '직접생산확인\n증명서' },
  { id: 2, name: '중소기업\n확인서' },
  { id: 3, name: '기업부설연구소\n인정서' },
  { id: 4, name: '공공디자인 전문회사\n신고필증' },
  { id: 5, name: '산업디자인 전문회사\n신고필증' },
];

const processData = [
  {
    id: 1,
    step: '01. 본질 파악하기',
    desc: `'예쁜 디자인'보다\n브랜드의 본질을 먼저 봅니다.`,
    img1: 'https://images.unsplash.com/photo-1545639360-32389d46944e?q=80&w=400&fit=crop',
    img2: 'https://images.unsplash.com/photo-1517436073-3b1b193424cb?q=80&w=400&fit=crop'
  },
  {
    id: 2,
    step: '02. 경험 구조화하기',
    desc: `디자인은 단순히 형태를 만드는 것이 아니라\n사람의 경험을 구조화하는 일입니다.`,
    img1: 'https://images.unsplash.com/photo-1628744876497-eb30460be9f6?q=80&w=400&fit=crop',
    img2: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=400&fit=crop'
  },
  {
    id: 3,
    step: '03. 담아내고 실행하기',
    desc: `불필요한 장식을 배제하고 핵심만을 담은\n지속 가능한 브랜드 경험을 만듭니다.`,
    img1: 'https://images.unsplash.com/photo-1575995941656-787be7257006?q=80&w=400&fit=crop',
    img2: 'https://images.unsplash.com/photo-1595842851892-0b1548232961?q=80&w=400&fit=crop'
  }
];

// Animation Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const heroTitleVar: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function Home() {
  return (
    <div className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <motion.div
          className={styles.heroContent}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div className={styles.badge} variants={fadeInUp}>Main Page</motion.div>
          <motion.h1 className={styles.heroTitle} variants={heroTitleVar}>
            우리는<br />
            아이오아이<br />
            입니다.
          </motion.h1>
        </motion.div>

        <motion.div
          className={styles.heroStats}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <div>
            <span style={{ color: '#888' }}>EXPERIENCE</span> <span className={styles.statDivider}>|</span> <span className={styles.statValue}>2014.10.11 - NOW</span>
          </div>
          <div>
            <span style={{ color: '#888' }}>TODAY</span> <span className={styles.statValue}>168</span> <span className={styles.statDivider}>|</span> <span style={{ color: '#888' }}>TOTAL</span> <span className={styles.statValue}>1,480,234</span>
          </div>
        </motion.div>
      </section>

      {/* Process Section */}
      <section className={styles.section} style={{ backgroundColor: '#1E1E1E' }}>
        <motion.div
          className={styles.processGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <h2 className={styles.sectionTitle}>
              <span style={{ fontWeight: 300, display: 'block' }}>우리는</span>
              <strong style={{ fontWeight: 700, display: 'block', color: '#fff' }}>이렇게 일을</strong>
              <span style={{ fontWeight: 300, display: 'block' }}>진행합니다.</span>
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

      {/* Clients Section */}
      <section className={styles.section} style={{ backgroundColor: '#1a1a1a' }}>
        <motion.div
          className={styles.clientsContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <h2 className={styles.clientsTitleMain}>Clients</h2>
            <h3 className={styles.clientsTitleSub}>함께한 소중한 고객</h3>
            <p className={styles.clientsDesc}>
              우리는 질문합니다.<br />
              "어떤 이미지가 필요할까?" 가 아닌<br />
              <strong style={{ color: '#fff', fontWeight: 'bold' }}>"무엇이 이 브랜드의 미래를 만드는가?"</strong><br />
              아이오아이는 브랜드의 '생각'을 발견<br />
              하고 그 생각을 '경험'으로 확장시킵니다.
            </p>
          </motion.div>

          <motion.div className={styles.clientsGrid} variants={fadeInUp}>
            {clientList.map((name, i) => (
              <div key={i} className={styles.clientLogo}>
                <span style={{ fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '-0.05em', whiteSpace: 'nowrap' }}>{name}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Company Intro Section */}
      <section className={styles.section}>
        <motion.div
          className={styles.introSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
            variants={fadeInUp}
          >
            <h2 className={styles.introTitle}>
              아이오아이<br />
              회사소개서
            </h2>
            <strong className={styles.introSubtitle}>
              ‘다움’을 만드는 기업
            </strong>
            <p className={styles.introDesc}>
              우리는 질문합니다.<br />
              "어떤 것이 필요할까?" 가 아닌<br />
              "무엇이 이 브랜드의 미래를 만드는가?"<br />
              IOI는 브랜드의 '생각'을 발견하고<br />
              그 생각을 '경험'으로 확장시킵니다.
            </p>
          </motion.div>

          <motion.div
            className={styles.introCard}
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className={styles.introCardText}>
              아이오아이
            </div>
            <div className={styles.introCardSub}>
              IDENTITY OF IDEA
            </div>
            <Link href="#" className={styles.introLink}>
              Download <Download size={16} />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Certifications Section */}
      <section className={styles.section} style={{ backgroundColor: '#111' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.h2
            className={styles.sectionTitle}
            style={{ fontSize: '1.5rem', marginBottom: '2rem', color: '#fff', fontWeight: 'bold' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            아이오아이 보유자격·확인증
          </motion.h2>

          <motion.div
            className={styles.certGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {certList.map((cert) => (
              <motion.div key={cert.id} className={styles.certItem} variants={fadeInUp}>
                <div className={styles.certImage}>CERT {cert.id}</div>
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
