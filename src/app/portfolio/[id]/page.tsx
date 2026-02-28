"use client";
import React, { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import styles from './page.module.css';
import { supabase } from '@/lib/supabase';

// Helper component for Other Projects
const AnotherProjects = () => {
    const [others, setOthers] = useState<any[]>([]);
    useEffect(() => {
        const fetchOthers = async () => {
            const { data } = await supabase.from('portfolio').select('id, title, main_image').limit(3).order('created_at', { ascending: false });
            if (data) setOthers(data);
        };
        fetchOthers();
    }, []);

    if (others.length === 0) return null;
    return (
        <div className={styles.anotherSection}>
            <h3 className={styles.anotherTitle}>Another Project</h3>
            <div className={styles.anotherGrid}>
                {others.map(item => (
                    <Link href={`/portfolio/${item.id}`} key={item.id} className={styles.anotherItem}>
                        <div className={styles.anotherImageWrapper}>
                            {item.main_image ? (
                                <img src={item.main_image} alt={item.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
                            ) : (
                                <div style={{ width: '100%', aspectRatio: '4/3', backgroundColor: '#333' }} />
                            )}
                        </div>
                        <div className={styles.anotherLabel}>{item.title}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default function PortfolioDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [project, setProject] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('portfolio')
                .select('*')
                .eq('id', id)
                .single();

            if (!error && data) {
                setProject({ ...data, more_info: '' });
            }
            setIsLoading(false);
        };
        fetchProjectDetails();
    }, [id]);

    if (isLoading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#333', color: '#fff' }}>데이터를 불러오는 중입니다...</div>;

    if (!project) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#333', color: '#fff' }}>
                <p style={{ marginBottom: '1rem' }}>포트폴리오를 찾을 수 없습니다.</p>
                <Link href="/portfolio" className={styles.backButton}><ArrowLeft size={16} /> Back to List</Link>
            </div>
        );
    }

    let contentBlocks = Array.isArray(project.content_blocks) ? project.content_blocks : [];

    // Extract metadata block if it exists
    const metadataBlockIndex = contentBlocks.findIndex((b: any) => b.type === 'metadata');
    if (metadataBlockIndex !== -1) {
        try {
            const extraData = JSON.parse(contentBlocks[metadataBlockIndex].content);
            if (extraData.client) project.client = extraData.client;
            if (extraData.location) project.location = extraData.location;
            if (extraData.date) project.date = extraData.date;
            if (extraData.more_info) project.more_info = extraData.more_info;
            if (extraData.hero_image) project.hero_image = extraData.hero_image;
            if (extraData.making_process) project.making_process = extraData.making_process;
        } catch (e) {
            console.error('Failed to parse metadata block');
        }
        // Remove metadata block so it doesn't render normally
        contentBlocks = contentBlocks.filter((_: any, idx: number) => idx !== metadataBlockIndex);
    }

    return (
        <div className={styles.container}>
            {/* Header / Back Button Spacer */}
            <div className={styles.headerSpacer}></div>

            {/* Hero Image */}
            <div className={styles.heroSection}>
                {(project.hero_image || project.main_image) ? (
                    <img src={project.hero_image || project.main_image} alt={project.title} style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '90vh', objectFit: 'contain', backgroundColor: '#222' }} />
                ) : (
                    <div style={{ width: '100%', height: '80vh', backgroundColor: '#444' }} />
                )}

                {/* Overlay details */}
                <div className={styles.heroOverlay}>
                    <div className={styles.badge}>Portfolio / Detail</div>
                    <div className={styles.heroTitle}>{project.title}</div>
                </div>
            </div>

            {/* Info Section */}
            <div className={styles.infoSection}>
                <div className={styles.infoGrid}>
                    <div className={styles.infoLeft}>
                        <h1 className={styles.projectTitle}>
                            {project.title}
                            {project.eng_title && <span className={styles.engTitle}>{project.eng_title}</span>}
                        </h1>
                        <div className={styles.metaInfo}>
                            {project.client && (
                                <div className={styles.metaItem}><span className={styles.metaLabel}>Client:</span> <span className={styles.metaValue}>{project.client}</span></div>
                            )}
                            {project.date && (
                                <div className={styles.metaItem}><span className={styles.metaLabel}>Date:</span> <span className={styles.metaValue}>{project.date}</span></div>
                            )}
                            {project.creative_director && (
                                <div className={styles.metaItem}><span className={styles.metaLabel}>Creative Director:</span> <span className={styles.metaValue}>{project.creative_director}</span></div>
                            )}
                            {project.design && (
                                <div className={styles.metaItem}><span className={styles.metaLabel}>Design:</span> <span className={styles.metaValue}>{project.design}</span></div>
                            )}
                        </div>
                    </div>
                    <div className={styles.infoRight}>
                        <div className={styles.summaryRow}>
                            <span className={styles.summaryLabel}>Summary</span>
                            <div className={styles.summaryText}>
                                {project.summary ? (
                                    project.summary.split('\n').map((line: string, i: number) => <p key={i}>{line}</p>)
                                ) : (
                                    <p>상세 요약이 없습니다.</p>
                                )}
                            </div>
                        </div>

                        {project.more_info && (
                            <div className={styles.summaryRow} style={{ marginTop: '3rem' }}>
                                <span className={styles.summaryLabel}>More Info</span>
                                <div className={styles.summaryText}>
                                    {project.more_info.split('\n').map((line: string, i: number) => <p key={i}>{line}</p>)}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Making Process Section */}
            {project.making_process && (
                <div className={styles.makingProcessSection}>
                    <h2 className={styles.makingProcessTitle}>Making Process</h2>
                    <div className={styles.makingProcessText}>
                        {project.making_process.split('\n').map((line: string, i: number) => <p key={i}>{line}</p>)}
                    </div>
                </div>
            )}

            {/* Content Blocks (Images & Text) */}
            <div className={styles.blocksSection}>
                {(() => {
                    const rendered: React.ReactNode[] = [];
                    let imageGroup: any[] = [];

                    const flushImages = () => {
                        if (imageGroup.length > 0) {
                            rendered.push(
                                <div className={styles.collageGroup} key={`group-${rendered.length}`}>
                                    {imageGroup.map((blk, i) => {
                                        let flexG = 1;
                                        if (blk.aspectRatio && blk.aspectRatio !== 'auto') {
                                            const parts = blk.aspectRatio.split('/');
                                            if (parts.length === 2) {
                                                flexG = parseFloat(parts[0]) / parseFloat(parts[1]);
                                            } else {
                                                flexG = parseFloat(blk.aspectRatio) || 1;
                                            }
                                        }
                                        return (
                                            <div key={i} className={styles.collageItem} style={{
                                                flexGrow: flexG * 100,
                                                flexBasis: `${flexG * 250}px`,
                                                aspectRatio: blk.aspectRatio && blk.aspectRatio !== 'auto' ? blk.aspectRatio : '1 / 1'
                                            }}>
                                                <img
                                                    src={blk.content}
                                                    alt={`collage-${i}`}
                                                    className={styles.collageImg}
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                            imageGroup = [];
                        }
                    };

                    contentBlocks.forEach((block: any, idx: number) => {
                        if (block.type === 'image') {
                            imageGroup.push(block);
                        } else if (block.type === 'text') {
                            flushImages();
                            rendered.push(
                                <div key={idx} className={styles.blockTextWrapper}>
                                    <div className={styles.blockTextContent}>
                                        {block.content.split('\n').map((line: string, i: number) => <p key={i}>{line}</p>)}
                                    </div>
                                </div>
                            );
                        }
                    });
                    flushImages();
                    return rendered;
                })()}
            </div>

            <AnotherProjects />

            <div style={{ textAlign: 'center', padding: '4rem 0', backgroundColor: '#333' }}>
                <Link href="/portfolio" className={styles.backButton}><ArrowLeft size={16} /> Back to List</Link>
            </div>
        </div>
    );
}
