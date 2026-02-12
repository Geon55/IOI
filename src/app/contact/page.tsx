
import styles from './page.module.css';

export default function ContactPage() {
    return (
        <div className={styles.container}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center' }}>CONTACT</h1>

            <div id="map" className={styles.mapContainer}>
                Map Area (Google Maps or Kakao Maps Placeholder)
            </div>

            <div id="inquiry" className={styles.formSection}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>고객문의</h2>
                <form className={styles.form}>
                    <div>
                        <label className={styles.label}>Name</label>
                        <input type="text" className={styles.input} placeholder="Your Name" />
                    </div>
                    <div>
                        <label className={styles.label}>Email</label>
                        <input type="email" className={styles.input} placeholder="your@email.com" />
                    </div>
                    <div>
                        <label className={styles.label}>Message</label>
                        <textarea className={styles.textarea} placeholder="How can we help you?"></textarea>
                    </div>
                    <button type="submit" className={styles.button}>Send Message</button>
                </form>
            </div>
        </div>
    );
}
