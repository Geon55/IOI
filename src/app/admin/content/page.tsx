"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Save } from 'lucide-react';
import Image from 'next/image';

type SiteContent = {
    id: string;
    section_id: string;
    title: string;
    description: string;
    image_url: string;
};

// categories that we want to manage from the frontend side and their human readable labels
const categories = [
    { id: 'category_environment', label: '환경디자인' },
    { id: 'category_sculpture', label: '조형물' },
    { id: 'category_branding', label: '브랜딩' },
    { id: 'category_exhibition', label: '전시·인테리어' },
    { id: 'category_event', label: '이벤트·행사' },
    { id: 'category_research', label: '학술연구' }
];

export default function AdminContentPage() {
    const [contents, setContents] = useState<Record<string, SiteContent>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(categories[0].id);

    useEffect(() => {
        fetchContents();
    }, []);

    const fetchContents = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('site_content')
            .select('*');

        if (error) {
            console.error('Error fetching site content:', error);
        } else if (data) {
            const contentMap: Record<string, SiteContent> = {};
            data.forEach(item => {
                contentMap[item.section_id] = item;
            });
            setContents(contentMap);
        }
        setIsLoading(false);
    };

    const handleContentChange = (sectionId: string, field: keyof SiteContent, value: string) => {
        setContents(prev => ({
            ...prev,
            [sectionId]: {
                ...prev[sectionId],
                section_id: sectionId, // Ensure it exists
                [field]: value
            }
        }));
    };

    const handleSave = async (sectionId: string) => {
        const itemToSave = contents[sectionId];
        if (!itemToSave) return;

        try {
            const { error } = await supabase
                .from('site_content')
                .upsert({
                    section_id: sectionId,
                    title: itemToSave.title || '',
                    description: itemToSave.description || '',
                    image_url: itemToSave.image_url || '',
                    updated_at: new Date().toISOString()
                }, { onConflict: 'section_id' });

            if (error) throw error;
            alert('저장되었습니다.');
        } catch (error: any) {
            alert('저장 중 오류가 발생했습니다: ' + error.message);
            console.error(error);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>포트폴리오 카테고리 관리</h1>
            </div>

            <div style={{ display: 'flex', gap: '2rem' }}>
                {/* Sidebar Tabs */}
                <div style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat.id)}
                            style={{
                                padding: '1rem',
                                textAlign: 'left',
                                backgroundColor: activeTab === cat.id ? '#e0f2fe' : 'white',
                                color: activeTab === cat.id ? '#0369a1' : '#4b5563',
                                border: '1px solid',
                                borderColor: activeTab === cat.id ? '#bae6fd' : '#e5e7eb',
                                borderRadius: '0.5rem',
                                fontWeight: activeTab === cat.id ? '600' : '500',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Editor Area */}
                <div style={{ flex: 1, backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)' }}>
                    {isLoading ? (
                        <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>설정 데이터를 불러오는 중입니다...</div>
                    ) : (
                        <div>
                            <div style={{ marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827' }}>
                                    {categories.find(c => c.id === activeTab)?.label} 페이지 설정
                                </h2>
                                <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                                    포트폴리오 페이지에서 해당 카테고리를 선택했을 때 위쪽에 나타나는 제목/설명과 배너 이미지입니다.
                                </p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                        타이틀 텍스트
                                    </label>
                                    <input
                                        type="text"
                                        value={contents[activeTab]?.title || ''}
                                        onChange={(e) => handleContentChange(activeTab, 'title', e.target.value)}
                                        placeholder="예: 공간의 가치를 높이는 조형물"
                                        style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                        상세 설명 텍스트
                                    </label>
                                    <textarea
                                        value={contents[activeTab]?.description || ''}
                                        onChange={(e) => handleContentChange(activeTab, 'description', e.target.value)}
                                        placeholder="이 카테고리를 잘 설명할 수 있는 문구를 입력하세요."
                                        style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', minHeight: '100px' }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                        대표 배너 이미지 URL
                                    </label>
                                    <input
                                        type="text"
                                        value={contents[activeTab]?.image_url || ''}
                                        onChange={(e) => handleContentChange(activeTab, 'image_url', e.target.value)}
                                        placeholder="https://..."
                                        style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }}
                                    />
                                    <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                                        * 호스팅된 이미지 링크를 넣거나 비워두세요. (추후 파일 업로드로 수정 가능합니다)
                                    </p>

                                    {contents[activeTab]?.image_url && (
                                        <div style={{ marginTop: '1rem', position: 'relative', width: '100%', height: '200px', backgroundColor: '#f3f4f6', borderRadius: '0.5rem', overflow: 'hidden' }}>
                                            <Image src={contents[activeTab].image_url} alt="Banner Preview" fill style={{ objectFit: 'cover' }} />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                                <button
                                    onClick={() => handleSave(activeTab)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        backgroundColor: '#2563eb',
                                        color: 'white',
                                        padding: '0.75rem 2rem',
                                        borderRadius: '0.375rem',
                                        border: 'none',
                                        fontWeight: '500',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <Save size={18} /> 저장하기
                                </button>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
