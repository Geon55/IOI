
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';
import styles from './page.module.css';

const categories = ['ALL', '조형물', '환경디자인', '브랜딩', '전시·인테리어', '이벤트·행사', '학술 연구'];

const portfolioItems = [
    // 1st Row
    { id: 1, src: 'https://images.unsplash.com/photo-1545639360-32389d46944e?q=80&w=400&fit=crop', category: '조형물', title: 'Public Sculpture 1' },
    { id: 2, src: 'https://images.unsplash.com/photo-1519782806259-7f5bda395a12?q=80&w=400&fit=crop', category: '환경디자인', title: 'Eco Design 1' },
    { id: 3, src: 'https://images.unsplash.com/photo-1557088921-17796d884742?q=80&w=400&fit=crop', category: '브랜딩', title: 'Brand Identity 1' },
    { id: 4, src: 'https://images.unsplash.com/photo-1628744876497-eb30460be9f6?q=80&w=400&fit=crop', category: '전시·인테리어', title: 'Exhibition 1' },
    // 2nd Row
    { id: 5, src: 'https://images.unsplash.com/photo-1595842851892-0b1548232961?q=80&w=400&fit=crop', category: '이벤트·행사', title: 'Event 1' },
    { id: 6, src: 'https://images.unsplash.com/photo-1473216892809-ff513271cc29?q=80&w=400&fit=crop', category: '학술 연구', title: 'Research 1' },
    { id: 7, src: 'https://images.unsplash.com/photo-1579202673506-ca3ce28f52f3?q=80&w=400&fit=crop', category: '조형물', title: 'Public Sculpture 2' },
    { id: 8, src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=400&fit=crop', category: '환경디자인', title: 'Eco Design 2' },
    // 3rd Row
    { id: 9, src: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=400&fit=crop', category: '브랜딩', title: 'Brand Identity 2' },
    { id: 10, src: 'https://images.unsplash.com/photo-1616763435427-4a1599547d7c?q=80&w=400&fit=crop', category: '전시·인테리어', title: 'Interior 1' },
    { id: 11, src: 'https://images.unsplash.com/photo-1544465544-1571a6305286?q=80&w=400&fit=crop', category: '이벤트·행사', title: 'Event 2' },
    { id: 12, src: 'https://images.unsplash.com/photo-1517436073-3b1b193424cb?q=80&w=400&fit=crop', category: '학술 연구', title: 'Research 2' },
    // 4th Row
    { id: 13, src: 'https://images.unsplash.com/photo-1575995941656-787be7257006?q=80&w=400&fit=crop', category: '조형물', title: 'Public Sculpture 3' },
    { id: 14, src: 'https://images.unsplash.com/photo-1520696989437-010adbd25712?q=80&w=400&fit=crop', category: '환경디자인', title: 'Eco Design 3' },
    { id: 15, src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=400&fit=crop', category: '브랜딩', title: 'Brand Identity 3' },
    { id: 16, src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=400&fit=crop', category: '학술 연구', title: 'Research 3' },
];

export default function PortfolioPage() {
    const [activeCategory, setActiveCategory] = useState('ALL');

    const filteredItems = activeCategory === 'ALL'
        ? portfolioItems
        : portfolioItems.filter(item => item.category === activeCategory);

    return (
        <div className={styles.container}>
            <div className={styles.inner}>
                {/* Sidebar */}
                <aside className={styles.sidebar}>
                    <div className={styles.categoryList}>
                        <div className={styles.badge} style={{ marginBottom: '0' }}>Portfolio</div>
                        {categories.map((cat, i) => (
                            <button
                                key={i}
                                className={cat === activeCategory ? styles.categoryBtnActive : styles.categoryBtn}
                                style={{
                                    fontSize: cat === activeCategory ? '4rem' : undefined,
                                    fontWeight: '800',
                                    border: 'none',
                                    background: 'none',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    padding: '0',
                                    whiteSpace: 'nowrap',
                                }}
                                onClick={() => setActiveCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </aside>

                {/* Main Content */}
                <main className={styles.mainContent}>
                    {/* Search Bar */}
                    <div className={styles.searchBarWrapper}>
                        <div className={styles.searchBar}>
                            <button disabled className={styles.searchIcon} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                <Search size={18} />
                            </button>
                            <input
                                type="text"
                                placeholder="필요하신 서비스명 검색하세요."
                                className={styles.searchInput}
                                style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', marginLeft: '0.5rem' }}
                            />
                        </div>
                    </div>

                    {/* Image Grid */}
                    <div className={styles.galleryGrid}>
                        {filteredItems.map((item) => (
                            <Link href={`/portfolio/${item.id}`} key={item.id} className={styles.galleryItem}>
                                <Image
                                    src={item.src}
                                    alt={item.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                />
                                <div className={styles.itemLabel}>{item.title}</div>
                            </Link>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}
