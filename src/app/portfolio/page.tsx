
'use client';

import { useState } from 'react';
import styles from './page.module.css';

const categories = ['ALL', '환경', '브랜딩', '조형물', '학술연구'];

const items = [
    { id: 1, title: 'Project One', category: '환경' },
    { id: 2, title: 'Project Two', category: '브랜딩' },
    { id: 3, title: 'Project Three', category: '조형물' },
    { id: 4, title: 'Project Four', category: '학술연구' },
    { id: 5, title: 'Project Five', category: '환경' },
    { id: 6, title: 'Project Six', category: '브랜딩' },
];

export default function PortfolioPage() {
    const [activeCategory, setActiveCategory] = useState('ALL');

    const filteredItems = activeCategory === 'ALL'
        ? items
        : items.filter(item => item.category === activeCategory);

    return (
        <div className={styles.container}>
            <h1 className={styles.title} style={{ textAlign: 'center', fontSize: '3rem', margin: '4rem 0' }}>PORTFOLIO</h1>

            <div className={styles.filters}>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterBtnActive : ''}`}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className={styles.grid}>
                {filteredItems.map((item) => (
                    <div key={item.id} className={styles.item}>
                        <div className={styles.image}>IMG</div>
                        <div className={styles.info}>
                            <h3 className={styles.title}>{item.title}</h3>
                            <span className={styles.category}>{item.category}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
