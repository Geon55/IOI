
"use client";
import React, { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import styles from './page.module.css';

// Mock Data for detailed view - In a real app, this would be fetched from an API or database
const projectDetails = {
    id: 1,
    title: '울진 대왕소나무 쉼터 조성',
    engTitle: 'Uljin King Pine Shelter',
    category: 'Environment Design',
    client: 'Uljin-gun',
    location: 'Gyeongsangbuk-do, Korea',
    date: '2024.10.11 - 2024.12.10',
    description: `
        울진 금강소나무 숲길의 상징적인 대왕소나무를 조망할 수 있는 쉼터 공간을 조성하였습니다.
        자연 경관을 해치지 않으면서 방문객들이 편안하게 휴식하고 소나무의 웅장함을 감상할 수 있도록
        친환경적인 소재와 디자인을 적용했습니다.
        
        주요 특징으로는 소나무의 솔방울을 형상화한 조형 벤치와 자연스러운 곡선의 데크 로드가 있으며,
        주변 식생과의 조화를 최우선으로 고려하여 설계되었습니다.
    `,
    mainImage: 'https://images.unsplash.com/photo-1545639360-32389d46944e?q=80&w=1200&fit=crop', // Replace with high-res
    gallery: [
        'https://images.unsplash.com/photo-1519782806259-7f5bda395a12?q=80&w=800&fit=crop',
        'https://images.unsplash.com/photo-1628744876497-eb30460be9f6?q=80&w=800&fit=crop',
        'https://images.unsplash.com/photo-1595842851892-0b1548232961?q=80&w=800&fit=crop',
    ],
    processImages: [
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&fit=crop', // factory/process
        'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=600&fit=crop'
    ]
};

const anotherProjects = [
    { id: 2, src: 'https://images.unsplash.com/photo-1544465544-1571a6305286?q=80&w=400&fit=crop', title: 'Garden Project' },
    { id: 3, src: 'https://images.unsplash.com/photo-1557088921-17796d884742?q=80&w=400&fit=crop', title: 'Brand Identity' },
    { id: 4, src: 'https://images.unsplash.com/photo-1616763435427-4a1599547d7c?q=80&w=400&fit=crop', title: 'Interior Design' },
];

export default function PortfolioDetailPage({ params }: { params: Promise<{ id: string }> }) {
    // In Next.js 15, params is a Promise. We need to unwrap it.
    // However, since we are using "use client", we can use React.use() to unwrap the promise
    // strictly speaking, useParams hook is often better for client components,
    // but the props structure suggests Server Component usage.
    // Since we marked "use client", let's use the provided hook or just await it if it was a server component.
    // For standard Next.js 15 client component with dynamic route:

    // Simplification for this demo:
    // We will assume id accesses project details.
    // Using a simple hook-like access for params if using `use` from React (Scanvenger hunt: `React.use` is available in latest React/Next versions)

    const { id } = use(params);

    // In a real scenario, use `id` to fetch specific data. layout
    // For now, we utilize the static `projectDetails` object for ALL IDs to match the reference design.

    return (
        <div className={styles.container}>
            {/* Header / Back Button */}
            <div className={styles.headerSpacer}></div>

            {/* Hero Image */}
            <div className={styles.heroSection}>
                <Image
                    src={projectDetails.mainImage}
                    alt={projectDetails.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                />
            </div>

            {/* Info Section */}
            <div className={styles.infoSection}>
                <div className={styles.infoGrid}>
                    <div className={styles.infoLeft}>
                        <h1 className={styles.projectTitle}>
                            {projectDetails.title}
                            <span className={styles.engTitle}>{projectDetails.engTitle}</span>
                        </h1>
                        <div className={styles.metaInfo}>
                            <div className={styles.metaItem}>
                                <span className={styles.metaLabel}>Client</span>
                                <span className={styles.metaValue}>{projectDetails.client}</span>
                            </div>
                            <div className={styles.metaItem}>
                                <span className={styles.metaLabel}>Location</span>
                                <span className={styles.metaValue}>{projectDetails.location}</span>
                            </div>
                            <div className={styles.metaItem}>
                                <span className={styles.metaLabel}>Date</span>
                                <span className={styles.metaValue}>{projectDetails.date}</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.infoRight}>
                        <div className={styles.description}>
                            {projectDetails.description.split('\n').map((line, i) => (
                                <p key={i}>{line}</p>
                            ))}
                        </div>
                        <div className={styles.shareButtons}>
                            <button className={styles.shareBtn}>Share Project ↗</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gallery Section */}
            <div className={styles.gallerySection}>
                {/* Large Featured Image */}
                <div className={styles.featuredImage}>
                    <Image
                        src={projectDetails.gallery[0]}
                        alt="Gallery 1"
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                    <div className={styles.imageOverlayText}>울진 대왕소나무</div>
                </div>

                {/* Grid Images */}
                <div className={styles.galleryGrid}>
                    <div className={styles.gridImageItem}>
                        <Image
                            src={projectDetails.gallery[1]}
                            alt="Gallery 2"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <div className={styles.gridImageItem}>
                        <Image
                            src={projectDetails.gallery[2]}
                            alt="Gallery 3"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                </div>
            </div>

            {/* Concept / Process Text */}
            <div className={styles.conceptSection}>
                <h2 className={styles.conceptTitle}>Making Process</h2>
                <p className={styles.conceptDesc}>
                    현장의 특성을 고려하여 자재 선정부터 시공까지 꼼꼼하게 진행합니다.
                    자연 환경 속에서의 작업인 만큼 안전과 환경 보호를 최우선으로 하였습니다.
                </p>
            </div>

            {/* Process Images */}
            <div className={styles.processSection}>
                {projectDetails.processImages.map((src, i) => (
                    <div key={i} className={styles.processImage}>
                        <Image src={src} alt={`Process ${i}`} fill style={{ objectFit: 'cover' }} />
                    </div>
                ))}
            </div>

            {/* Blueprints / Technical Drawings Placeholder */}
            <div className={styles.blueprintSection}>
                <div className={styles.blueprintPlaceholder} />
                <div className={styles.blueprintPlaceholder} />
            </div>


            {/* Another Project */}
            <div className={styles.anotherSection}>
                <h3 className={styles.anotherTitle}>Another Project</h3>
                <div className={styles.anotherGrid}>
                    {anotherProjects.map((proj) => (
                        <Link href={`/portfolio/${proj.id}`} key={proj.id} className={styles.anotherItem}>
                            <div className={styles.anotherImageWrapper}>
                                <Image src={proj.src} alt={proj.title} fill style={{ objectFit: 'cover' }} />
                            </div>
                            <div className={styles.anotherLabel}>{proj.title}</div>
                        </Link>
                    ))}
                </div>
            </div>

            <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                <Link href="/portfolio" className={styles.backButton}>
                    <ArrowLeft size={16} /> Back to List
                </Link>
            </div>
        </div>
    );
}
