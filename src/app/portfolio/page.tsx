"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { supabase } from '@/lib/supabase';

const categories = ['ALL', '환경디자인', '조형물', '브랜딩', '전시·인테리어', '이벤트·행사', '학술 연구'];

type Portfolio = {
    id: number;
    title: string;
    category: string;
    main_image: string;
    aspect_ratio: string;
};

export default function PortfolioPage() {
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState('ALL');
    const [portfolioItems, setPortfolioItems] = useState<Portfolio[]>([]);
    const [categoryContent, setCategoryContent] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchPortfolios();
    }, []);

    useEffect(() => {
        if (activeCategory !== 'ALL') {
            fetchCategoryContent(activeCategory);
        } else {
            setCategoryContent(null);
        }
    }, [activeCategory]);

    const handleSearch = () => {
        if (searchTerm.trim() === '나는 관리자야') {
            const pwd = window.prompt("관리자 비밀번호를 입력하세요.");
            if (pwd === "1234") {
                router.push("/admin");
            } else if (pwd !== null) {
                alert("비밀번호가 틀렸습니다.");
            }
        }
    };

    const fetchCategoryContent = async (categoryName: string) => {
        // Map Korean category name to section_id
        const map: Record<string, string> = {
            '조형물': 'category_sculpture',
            '환경디자인': 'category_environment',
            '브랜딩': 'category_branding',
            '전시·인테리어': 'category_exhibition',
            '이벤트·행사': 'category_event',
            '학술 연구': 'category_research'
        };
        const sectionId = map[categoryName];
        if (!sectionId) return;

        const { data, error } = await supabase
            .from('site_content')
            .select('*')
            .eq('section_id', sectionId)
            .single();

        if (data && !error) {
            setCategoryContent(data);
        } else {
            setCategoryContent(null);
        }
    };

    const fetchPortfolios = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('portfolio')
            .select('id, title, category, main_image, aspect_ratio')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching portfolios:', error);
        } else {
            setPortfolioItems(data || []);
        }
        setIsLoading(false);
    };

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
                        <form
                            className={styles.searchBar}
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSearch();
                            }}
                        >
                            <button type="submit" className={styles.searchIcon} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                <Search size={18} />
                            </button>
                            <input
                                type="text"
                                placeholder="필요하신 서비스명 검색하세요."
                                className={styles.searchInput}
                                style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', marginLeft: '0.5rem' }}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </form>
                    </div>

                    {/* Category Details Banner (Dynamic from site_content) */}
                    {activeCategory !== 'ALL' && (
                        <div style={{ marginBottom: '3rem', opacity: isLoading ? 0.5 : 1, transition: 'opacity 0.3s' }}>
                            {categoryContent?.image_url && (
                                <div style={{ position: 'relative', width: '100%', height: '300px', marginBottom: '2rem', borderRadius: '0.5rem', overflow: 'hidden' }}>
                                    <Image src={categoryContent.image_url} alt={categoryContent.title || activeCategory} fill style={{ objectFit: 'cover' }} />
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.8), transparent)' }}></div>
                                </div>
                            )}

                            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', color: '#fff' }}>
                                {categoryContent?.title || activeCategory}
                            </h2>

                            {categoryContent?.description && (
                                <p style={{ fontSize: '1.1rem', color: '#aaa', lineHeight: 1.6, maxWidth: '800px', whiteSpace: 'pre-wrap' }}>
                                    {categoryContent.description}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Image Grid */}
                    {isLoading ? (
                        <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>데이터를 불러오는 중입니다...</div>
                    ) : (
                        <div className={styles.galleryGrid}>
                            {filteredItems.map((item) => (
                                <Link href={`/portfolio/${item.id}`} key={item.id} className={styles.galleryItem}>
                                    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'block' }}>
                                        <img
                                            src={item.main_image || 'https://images.unsplash.com/photo-1545639360-32389d46944e?q=80&w=400&fit=crop'}
                                            alt={item.title}
                                            className={styles.galleryImage}
                                        />
                                    </div>
                                    <div className={styles.itemLabel}>{item.title}</div>
                                </Link>
                            ))}
                            {filteredItems.length === 0 && (
                                <div style={{ gridColumn: '1 / -1', padding: '2rem', textAlign: 'center', color: '#666' }}>등록된 포트폴리오가 없습니다.</div>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
