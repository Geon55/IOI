
import styles from './page.module.css';

export default function WeArePage() {
    return (
        <div className={styles.container}>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '4rem', textAlign: 'center' }}>WE ARE</h1>

            <section id="brand" className={styles.section}>
                <h2 className={styles.title}>브랜드 소개</h2>
                <p className={styles.text}>
                    Standardpin은 창의적인 디자인과 혁신적인 솔루션을 제공하는 디자인 스튜디오입니다.
                    우리는 고객의 아이디어를 현실로 만들기 위해 끊임없이 노력합니다.
                </p>
            </section>

            <section id="history" className={styles.section}>
                <h2 className={styles.title}>히스토리</h2>
                <div className={styles.text}>
                    <ul>
                        <li>2025: Standardpin IOI 프로젝트 런칭</li>
                        <li>2024: 글로벌 디자인 어워드 수상</li>
                        <li>2023: 서울 스튜디오 설립</li>
                    </ul>
                </div>
            </section>

            <section id="internal" className={styles.section}>
                <h2 className={styles.title}>내부활동</h2>
                <p className={styles.text}>
                    우리는 팀워크와 지속적인 학습을 중요하게 생각합니다. 매주 디자인 세미나와 워크샵을 통해
                    팀원들의 역량을 강화하고 있습니다.
                </p>
            </section>
        </div>
    );
}
