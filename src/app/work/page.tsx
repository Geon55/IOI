
import styles from './page.module.css';

export default function WorkPage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.stepTitle} style={{ textAlign: 'center', marginBottom: '4rem' }}>WORK PROCESS</h1>

            <section id="a" className={styles.step}>
                <div className={styles.stepNumber}>01</div>
                <div className={styles.stepContent}>
                    <h2 className={styles.stepTitle}>단계설명 A</h2>
                    <p className={styles.stepDesc}>기획 단계에서 고객의 요구사항을 명확히 분석합니다. 창의적인 아이디어를 도출합니다.</p>
                </div>
            </section>

            <section id="b" className={styles.step}>
                <div className={styles.stepNumber}>02</div>
                <div className={styles.stepContent}>
                    <h2 className={styles.stepTitle}>단계설명 B</h2>
                    <p className={styles.stepDesc}>디자인 컨셉을 시각화하고 프로토타이핑을 진행합니다. 구체적인 실행 계획을 수립합니다.</p>
                </div>
            </section>

            <section id="c" className={styles.step}>
                <div className={styles.stepNumber}>03</div>
                <div className={styles.stepContent}>
                    <h2 className={styles.stepTitle}>단계설명 C</h2>
                    <p className={styles.stepDesc}>개발 및 구현을 통해 아이디어를 현실로 만듭니다. 반복적인 테스트로 완성도를 높입니다.</p>
                </div>
            </section>

            <section id="d" className={styles.step}>
                <div className={styles.stepNumber}>04</div>
                <div className={styles.stepContent}>
                    <h2 className={styles.stepTitle}>단계설명 D</h2>
                    <p className={styles.stepDesc}>최종 결과물을 검수하고 배포합니다. 지속적인 유지보수와 업데이트를 제공합니다.</p>
                </div>
            </section>
        </div>
    );
}
