"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, Plus, Image as ImageIcon, Type, Trash2, GripVertical } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import ImageCropper from '@/components/ImageCropper';

type ContentBlock = {
    id: string;
    type: 'image' | 'text';
    content: string; // url or text
    file?: File; // cropped file ready for upload
    originalFile?: File; // raw file for re-cropping
    previewUrl?: string;
    aspectRatio?: string;
};

export default function CreatePortfolioPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const [form, setForm] = useState({
        title: '',
        eng_title: '',
        category: '조형물',
        client: '',
        location: '',
        date: '',
        aspect_ratio: 'auto',
        creative_director: '',
        design: '',
        summary: '',
        more_info: '',
        making_process: ''
    });

    // --- Toolbar State ---
    const [activeFields, setActiveFields] = useState<{ [key: string]: boolean }>({
        title: true, // always show title
    });

    const toggleField = (fieldName: string) => {
        setActiveFields(prev => ({ ...prev, [fieldName]: !prev[fieldName] }));
    };

    // Main Image (Thumbnail) -> Selected from content blocks
    const [mainImage, setMainImage] = useState<File | null>(null); // cropped (3:4)
    const [imagePreview, setImagePreview] = useState<string>('');

    // Crop Modal
    const [cropModalInfo, setCropModalInfo] = useState<{
        file: File;
        aspect: number | undefined;
        target: 'main' | string;
    } | null>(null);

    // Dynamic Content Blocks
    const [blocks, setBlocks] = useState<ContentBlock[]>([]);

    // Drag and Drop State
    const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);

    const parseAspectRatio = (ratioStr: string) => {
        if (ratioStr === 'auto' || ratioStr === 'custom' || !ratioStr) return undefined;
        const parts = ratioStr.split('/');
        if (parts.length === 2) return parseFloat(parts[0]) / parseFloat(parts[1]);
        return parseFloat(ratioStr) || undefined;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // --- Content Blocks Logic ---
    const addBlock = (type: 'image' | 'text') => {
        setBlocks([...blocks, { id: Math.random().toString(36).substring(7), type, content: '', aspectRatio: type === 'image' ? 'auto' : undefined }]);
    };

    const removeBlock = (id: string) => {
        setBlocks(blocks.filter(b => b.id !== id));
    };

    const updateBlockText = (id: string, text: string) => {
        setBlocks(blocks.map(b => b.id === id ? { ...b, content: text } : b));
    };

    const updateBlockImage = (id: string, file: File) => {
        const block = blocks.find(b => b.id === id);

        // Save the raw file to the block, then open cropper
        setBlocks(blocks.map(b => b.id === id ? { ...b, originalFile: file } : b));

        setCropModalInfo({
            file,
            aspect: parseAspectRatio(block?.aspectRatio || 'auto'),
            target: id
        });
    };

    const handleReCropBlock = (id: string) => {
        const block = blocks.find(b => b.id === id);
        if (block?.originalFile) {
            setCropModalInfo({ file: block.originalFile, aspect: parseAspectRatio(block.aspectRatio || 'auto'), target: id });
        } else {
            alert('원본 사진 정보를 찾을 수 없습니다. 사진을 다시 업로드해주세요.');
        }
    };

    const handleCropComplete = (croppedFile: File) => {
        if (!cropModalInfo) return;

        if (cropModalInfo.target === 'main') {
            setMainImage(croppedFile);
            setImagePreview(URL.createObjectURL(croppedFile));
        } else {
            setBlocks(blocks.map(b => b.id === cropModalInfo.target ? { ...b, file: croppedFile, previewUrl: URL.createObjectURL(croppedFile) } : b));
        }
        setCropModalInfo(null);
    };

    const updateBlockAspectRatio = (id: string, ratio: string) => {
        setBlocks(blocks.map(b => b.id === id ? { ...b, aspectRatio: ratio } : b));
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        setDraggedItemIndex(index);
        e.dataTransfer.effectAllowed = 'move';
        // Add slight transparency to the dragged image to provide feedback
        requestAnimationFrame(() => { e.currentTarget.style.opacity = '0.4'; });
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        e.preventDefault();
        if (draggedItemIndex === null || draggedItemIndex === index) return;

        // Setup immediately for visual reordering feedback
        setBlocks(prev => {
            const newBlocks = [...prev];
            const draggedItem = newBlocks[draggedItemIndex];
            newBlocks.splice(draggedItemIndex, 1);
            newBlocks.splice(index, 0, draggedItem);
            return newBlocks;
        });
        setDraggedItemIndex(index);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        setDraggedItemIndex(null);
        e.currentTarget.style.opacity = '1';
    };

    const handleMultipleImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newBlocks = Array.from(e.target.files).map(file => ({
                id: Math.random().toString(36).substring(7),
                type: 'image' as const,
                content: '',
                aspectRatio: 'auto',
                file: file, // Save file directly so upload works if uncropped
                originalFile: file,
                previewUrl: URL.createObjectURL(file)
            }));
            setBlocks(prev => [...prev, ...newBlocks]);
            e.target.value = '';
        }
    };

    // --- Submit Logic ---
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!mainImage) {
            alert('대표 썸네일(3:4)을 지정해주세요.');
            return;
        }
        if (!form.title) {
            alert('프로젝트명(Title)을 입력해주세요.');
            return;
        }

        setIsLoading(true);

        try {
            // 1. Upload Main Image (Thumbnail)
            let mainImageUrl = '';
            if (mainImage) {
                const fileExt = mainImage.name.split('.').pop();
                const fileName = `main_${Math.random()}.${fileExt}`;
                const filePath = `portfolio/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('images')
                    .upload(filePath, mainImage);

                if (uploadError) throw uploadError;

                const { data } = supabase.storage.from('images').getPublicUrl(filePath);
                mainImageUrl = data.publicUrl;
            }

            // 2. Upload Block Images
            const processedBlocks = await Promise.all(blocks.map(async (block) => {
                if (block.type === 'image' && block.file) {
                    const fileExt = block.file.name.split('.').pop();
                    const fileName = `block_${Math.random()}.${fileExt}`;
                    const filePath = `portfolio/${fileName}`;

                    const { error: uploadError } = await supabase.storage
                        .from('images')
                        .upload(filePath, block.file);

                    if (uploadError) throw uploadError;

                    const { data } = supabase.storage.from('images').getPublicUrl(filePath);
                    return { type: 'image', content: data.publicUrl, aspectRatio: block.aspectRatio }; // store URL and ratio in DB
                }
                return { type: block.type, content: block.content }; // text stays text
            }));

            // 3. Insert into database
            // Notice: client, location, date, more_info are not in the DB schema, so we stick them in content_blocks as metadata!
            const firstImageBlock = processedBlocks.find(b => b.type === 'image');
            const heroImageUrl = firstImageBlock ? firstImageBlock.content : mainImageUrl;

            const metadataBlock = {
                type: 'metadata',
                content: JSON.stringify({
                    hero_image: heroImageUrl, // Hero uses the first uploaded block image automatically
                    client: form.client,
                    location: form.location,
                    date: form.date,
                    more_info: form.more_info,
                    making_process: form.making_process
                })
            };

            const finalBlocks = [metadataBlock, ...processedBlocks];

            const { error: dbError } = await supabase
                .from('portfolio')
                .insert([
                    {
                        title: form.title,
                        eng_title: form.eng_title,
                        category: form.category,
                        aspect_ratio: form.aspect_ratio,
                        creative_director: form.creative_director,
                        design: form.design,
                        summary: form.summary,
                        main_image: mainImageUrl,
                        content_blocks: finalBlocks
                    }
                ]);

            if (dbError) throw dbError;

            alert('성공적으로 등록되었습니다.');
            router.push('/admin/portfolio');
            router.refresh();

        } catch (error: any) {
            console.error('Error creating portfolio:', error);
            alert(`오류가 발생했습니다: ${error.message || '알 수 없는 오류'}`);
        } finally {
            setIsLoading(false);
        }
    };

    // Helper for rendering toolbar buttons
    const ToolbarButton = ({ label, field, icon }: { label: string, field: string, icon?: React.ReactNode }) => (
        <button
            type="button"
            onClick={() => toggleField(field)}
            style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.5rem 1rem', borderRadius: '2rem',
                backgroundColor: activeFields[field] ? '#2563eb' : '#f3f4f6',
                color: activeFields[field] ? 'white' : '#4b5563',
                border: 'none', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '500',
                transition: 'all 0.2s'
            }}
        >
            {icon} {label}
        </button>
    );

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <Link href="/admin/portfolio" style={{ color: '#6b7280' }}>
                    <ArrowLeft size={24} />
                </Link>
                <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>새 포트폴리오 기고</h1>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                {/* --- Toolbar --- */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', padding: '1rem', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 10 }}>
                    <ToolbarButton label="카테고리" field="category" />
                    <ToolbarButton label="클라이언트" field="client" />
                    <ToolbarButton label="진행기간/년도" field="date" />
                    <ToolbarButton label="기획/지휘" field="creative_director" />
                    <ToolbarButton label="디자인참여" field="design" />
                    <ToolbarButton label="요약문" field="summary" />
                    <ToolbarButton label="추가 텍스트" field="more_info" />
                    <ToolbarButton label="메이킹 프로세스" field="making_process" />
                    <ToolbarButton label="영문명" field="eng_title" />
                </div>

                {/* --- Top Metadata & Title Area --- */}
                <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)' }}>

                    {/* Title (Always visible, giant text) */}
                    <div style={{ marginBottom: '2rem' }}>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="제목을 입력하세요"
                            style={{
                                width: '100%', padding: '0', border: 'none', borderBottom: '1px solid #e5e7eb',
                                fontSize: '2.5rem', fontWeight: 'bold', color: '#111827', outline: 'none',
                                backgroundColor: 'transparent'
                            }}
                        />
                    </div>

                    {/* Thumbnail preview sticky info */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 1rem', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '0.5rem', marginBottom: '2rem' }}>
                        <div>
                            <span style={{ fontSize: '0.875rem', color: '#4b5563' }}>하단 본문에서 사진을 업로드 한 뒤 <b>[🌟 썸네일로 지정]</b>을 해 주세요.</span>
                            {!mainImage && <p style={{ fontSize: '0.8rem', color: '#ef4444', margin: '4px 0 0 0', fontWeight: 'bold' }}>⚠️ 저장하려면 썸네일이 필요합니다.</p>}
                        </div>
                        {imagePreview && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#10b981' }}>등록됨</span>
                                <div style={{ width: '40px', height: '53px', borderRadius: '0.25rem', overflow: 'hidden', position: 'relative', border: '2px solid #10b981' }}>
                                    <Image src={imagePreview} alt="Thumbnail" fill style={{ objectFit: 'cover' }} />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Dynamic Fields Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>

                        {activeFields.category && (
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>카테고리 *</label>
                                <select name="category" value={form.category} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', backgroundColor: 'white' }}>
                                    <option value="">선택</option>
                                    <option value="조형물">조형물</option>
                                    <option value="환경디자인">환경디자인</option>
                                    <option value="브랜딩">브랜딩</option>
                                    <option value="전시·인테리어">전시·인테리어</option>
                                    <option value="이벤트·행사">이벤트·행사</option>
                                    <option value="학술 연구">학술 연구</option>
                                </select>
                            </div>
                        )}

                        {activeFields.eng_title && (
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>영문 타이틀</label>
                                <input type="text" name="eng_title" value={form.eng_title} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }} />
                            </div>
                        )}

                        {activeFields.client && (
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>클라이언트</label>
                                <input type="text" name="client" value={form.client} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }} />
                            </div>
                        )}

                        {activeFields.date && (
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>진행 기간/년도</label>
                                <input type="text" name="date" value={form.date} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }} placeholder="2025" />
                            </div>
                        )}

                        {activeFields.creative_director && (
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>기획 및 지휘 (Creative Director)</label>
                                <input type="text" name="creative_director" value={form.creative_director} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }} placeholder="ex) H.K.Kim" />
                            </div>
                        )}

                        {activeFields.design && (
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>디자인 참여 인력 (Design)</label>
                                <input type="text" name="design" value={form.design} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }} placeholder="ex) Jinsung, Minjun, Jihyun" />
                            </div>
                        )}

                        {activeFields.summary && (
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>프로젝트 요약문 (Summary)</label>
                                <textarea name="summary" value={form.summary} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', minHeight: '100px' }} placeholder="프로젝트에 대한 전반적인 요약 설명을 적어주세요." />
                            </div>
                        )}

                        {activeFields.more_info && (
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>추가 텍스트 (More Info)</label>
                                <textarea name="more_info" value={form.more_info} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', minHeight: '100px' }} placeholder="요약문 아래에 추가적으로 들어갈 상세 정보를 적어주세요." />
                            </div>
                        )}

                        {activeFields.making_process && (
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>메이킹 프로세스 (Making Process)</label>
                                <textarea name="making_process" value={form.making_process} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', minHeight: '120px' }} placeholder="갤러리 영역 상단에 삽입될 메이킹 프로세스 텍스트를 적어주세요." />
                            </div>
                        )}
                    </div>
                </div>

                {/* 2. Content Blocks Section */}
                <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>상세 콘텐츠 추가 (이미지 & 텍스트)</h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '0.875rem', color: '#4b5563', fontWeight: 'bold' }}>이미지 일괄 비율 적용:</span>
                            <select
                                onChange={(e) => {
                                    const ratio = e.target.value;
                                    if (ratio && confirm('현재 추가된 모든 이미지 블록의 비율을 일괄 변경하시겠습니까?')) {
                                        setBlocks(prev => prev.map(b => b.type === 'image' ? { ...b, aspectRatio: ratio } : b));
                                    }
                                    e.target.value = '';
                                }}
                                style={{ padding: '0.4rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', fontSize: '0.875rem' }}
                            >
                                <option value="">선택 안 함</option>
                                <option value="auto">자동(Auto)</option>
                                <option value="1/1">1:1</option>
                                <option value="4/3">4:3</option>
                                <option value="3/4">3:4</option>
                                <option value="16/9">16:9</option>
                            </select>
                        </div>
                    </div>
                    <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                        버튼을 눌러 이미지나 텍스트 구역을 위아래로 무제한 확장할 수 있습니다. 메이킹 페이지 및 포트폴리오의 내용이 됩니다.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                        {blocks.map((block, index) => (
                            <div
                                key={block.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, index)}
                                onDragEnter={(e) => handleDragEnter(e, index)}
                                onDragOver={handleDragOver}
                                onDragEnd={handleDragEnd}
                                style={{
                                    display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1rem',
                                    border: '1px solid #e5e7eb', borderRadius: '0.5rem', backgroundColor: '#f9fafb',
                                    transition: 'transform 0.1s ease', cursor: 'grab'
                                }}
                            >
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                                    <div style={{ color: '#9ca3af', cursor: 'grab' }}><GripVertical size={18} /></div>
                                </div>

                                <div style={{ flex: 1 }}>
                                    {block.type === 'text' ? (
                                        <div>
                                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 'bold', color: '#4b5563', marginBottom: '0.5rem' }}>
                                                <Type size={16} /> 텍스트 블록
                                            </label>
                                            <textarea
                                                value={block.content}
                                                onChange={(e) => updateBlockText(block.id, e.target.value)}
                                                placeholder="내용을 입력하세요..."
                                                style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', minHeight: '100px' }}
                                            />
                                        </div>
                                    ) : (
                                        <div>
                                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 'bold', color: '#4b5563', marginBottom: '0.5rem' }}>
                                                <ImageIcon size={16} /> 이미지 블록
                                            </label>
                                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                                <div
                                                    style={{ width: '120px', height: '80px', backgroundColor: '#e5e7eb', borderRadius: '0.25rem', position: 'relative', overflow: 'hidden', cursor: block.file ? 'pointer' : 'default' }}
                                                    onClick={() => block.file && handleReCropBlock(block.id)}
                                                    title={block.file ? '클릭하여 다시 자르기' : ''}
                                                >
                                                    {block.previewUrl && (
                                                        <>
                                                            <Image src={block.previewUrl} alt="Preview" fill style={{ objectFit: 'contain' }} />
                                                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)', color: 'white', textAlign: 'center', fontSize: '0.7rem', padding: '0.1rem' }}>크롭</div>
                                                        </>
                                                    )}
                                                </div>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        if (e.target.files && e.target.files.length > 0) {
                                                            updateBlockImage(block.id, e.target.files[0]);
                                                            e.target.value = '';
                                                        }
                                                    }}
                                                    style={{ flex: 1, minWidth: '200px', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', backgroundColor: 'white' }}
                                                />
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    {block.file && (
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                if (block.originalFile) setCropModalInfo({ file: block.originalFile, aspect: 3 / 4, target: 'main' });
                                                            }}
                                                            style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', padding: '0.5rem 0.8rem', backgroundColor: '#fbbf24', color: '#000', border: 'none', borderRadius: '0.375rem', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer' }}
                                                            title="이 이미지를 목록 썸네일로 사용합니다"
                                                        >
                                                            🌟 썸네일로 지정
                                                        </button>
                                                    )}
                                                    <label style={{ fontSize: '0.875rem', color: '#4b5563' }}>비율:</label>
                                                    <select
                                                        value={['auto', '1/1', '4/3', '3/4', '16/9'].includes(block.aspectRatio || 'auto') ? (block.aspectRatio || 'auto') : 'custom'}
                                                        onChange={(e) => updateBlockAspectRatio(block.id, e.target.value === 'custom' ? '' : e.target.value)}
                                                        style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }}
                                                    >
                                                        <option value="auto">자동(Auto)</option>
                                                        <option value="1/1">1:1</option>
                                                        <option value="4/3">4:3</option>
                                                        <option value="3/4">3:4</option>
                                                        <option value="16/9">16:9</option>
                                                        <option value="custom">직접 입력</option>
                                                    </select>
                                                    {!['auto', '1/1', '4/3', '3/4', '16/9'].includes(block.aspectRatio || 'auto') && (
                                                        <input
                                                            type="text"
                                                            value={block.aspectRatio}
                                                            onChange={(e) => updateBlockAspectRatio(block.id, e.target.value)}
                                                            placeholder="ex. 2/1"
                                                            style={{ width: '80px', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <button type="button" onClick={() => removeBlock(block.id)} style={{ padding: '0.5rem', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', marginTop: '1.5rem' }}>
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}

                        {blocks.length === 0 && (
                            <div style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af', border: '1px dashed #d1d5db', borderRadius: '0.5rem' }}>
                                아래 버튼을 눌러 콘텐츠를 추가해보세요.
                            </div>
                        )}
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', backgroundColor: 'white', cursor: 'pointer', fontWeight: '500' }}>
                            <ImageIcon size={18} /> 다중 이미지 추가
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleMultipleImageAdd}
                            />
                        </label>
                        <button type="button" onClick={() => addBlock('text')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', backgroundColor: 'white', cursor: 'pointer', fontWeight: '500' }}>
                            <Type size={18} /> 텍스트 구역 추가
                        </button>
                    </div>
                </div>

                <div style={{ position: 'sticky', bottom: '2rem', display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                    <button
                        type="submit"
                        disabled={isLoading || !mainImage}
                        style={{
                            backgroundColor: isLoading || !mainImage ? '#9ca3af' : '#2563eb',
                            color: 'white',
                            padding: '1rem 3rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            cursor: isLoading || !mainImage ? 'not-allowed' : 'pointer',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                        title={!mainImage ? "썸네일을 먼저 지정해주세요" : ""}
                    >
                        {isLoading ? '저장 처리 중...' : '포트폴리오 발행하기'}
                    </button>
                </div>

            </form >

            {cropModalInfo && (
                <ImageCropper
                    imageFile={cropModalInfo.file}
                    aspect={cropModalInfo.aspect}
                    onCropCancel={() => setCropModalInfo(null)}
                    onCropComplete={handleCropComplete}
                />
            )
            }
        </div >
    );
}
