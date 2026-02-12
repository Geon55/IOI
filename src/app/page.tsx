
import Image from "next/image";
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.sectionTitle}>Main Visual</h1>
          <p>Standardpin IOI Project</p>
        </div>
      </section>

      {/* Company Intro S */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>회사 소개 S</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Our Vision</h3>
            <p>Innovative design solutions.</p>
          </div>
          <div className={styles.card}>
            <h3>Our Mission</h3>
            <p>Creating sustainable environments.</p>
          </div>
        </div>
      </section>

      {/* HOW TO W */}
      <section className={`${styles.section} ${styles.bgGray}`}>
        <h2 className={styles.sectionTitle}>HOW TO W</h2>
        <div className={styles.grid}>
          <div className={styles.card}>Step 1: Consultation</div>
          <div className={styles.card}>Step 2: Planning</div>
          <div className={styles.card}>Step 3: Execution</div>
          <div className={styles.card}>Step 4: Review</div>
        </div>
      </section>

      {/* CLIENTS */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>CLIENTS</h2>
        <div className={styles.grid}>
          <div className={styles.card}>Client A</div>
          <div className={styles.card}>Client B</div>
          <div className={styles.card}>Client C</div>
          <div className={styles.card}>Client D</div>
        </div>
      </section>

      {/* PTFLO (Portfolio Preview) */}
      <section className={`${styles.section} ${styles.bgGray}`}>
        <h2 className={styles.sectionTitle}>PTFLO</h2>
        <div className={styles.grid}>
          <div className={styles.card}>Project 1</div>
          <div className={styles.card}>Project 2</div>
          <div className={styles.card}>Project 3</div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link href="/portfolio" className={styles.contactButton} style={{ color: 'black', borderColor: 'black' }}>View All Works</Link>
        </div>
      </section>

      {/* Contact Section */}
      <section className={styles.contactSection}>
        <h2 className={styles.sectionTitle} style={{ color: 'white' }}>Contact</h2>
        <p>Ready to start your project?</p>
        <Link href="/contact" className={styles.contactButton}>Get in Touch</Link>
      </section>
    </div>
  );
}
