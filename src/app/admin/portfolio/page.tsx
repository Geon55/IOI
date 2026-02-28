"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Portfolio = {
    id: number;
    title: string;
    eng_title: string;
    category: string;
    client: string;
    location: string;
    date: string;
    main_image: string;
    created_at: string;
};

export default function AdminPortfolioPage() {
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchPortfolios();
    }, []);

    const fetchPortfolios = async () => {
        setIsLoading(true);
        // Temporary fallback mock data since we might not have the table yet
        const { data, error } = await supabase
            .from('portfolio')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching portfolios:', error);
            // Fallback UI or handle error
        } else {
            setPortfolios(data || []);
        }
        setIsLoading(false);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('정말 삭제하시겠습니까?')) return;

        const { error } = await supabase.from('portfolio').delete().eq('id', id);
        if (error) {
            alert('삭제 중 오류가 발생했습니다.');
            console.error(error);
        } else {
            setPortfolios(portfolios.filter(p => p.id !== id));
            alert('삭제되었습니다.');
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>포트폴리오 관리</h1>
                <Link
                    href="/admin/portfolio/create"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#3b82f6', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.375rem', textDecoration: 'none', fontWeight: '500' }}
                >
                    <Plus size={18} /> 새 포트폴리오 등록
                </Link>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                        <tr>
                            <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600', color: '#6b7280' }}>ID</th>
                            <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600', color: '#6b7280' }}>이미지</th>
                            <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600', color: '#6b7280' }}>카테고리</th>
                            <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600', color: '#6b7280' }}>제목</th>
                            <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600', color: '#6b7280', textAlign: 'right' }}>관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>데이터를 불러오는 중입니다...</td>
                            </tr>
                        ) : portfolios.length === 0 ? (
                            <tr>
                                <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>등록된 포트폴리오가 없습니다.</td>
                            </tr>
                        ) : (
                            portfolios.map((portfolio) => (
                                <tr key={portfolio.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                    <td style={{ padding: '0.75rem 1.5rem', color: '#111827' }}>{portfolio.id}</td>
                                    <td style={{ padding: '0.75rem 1.5rem' }}>
                                        {portfolio.main_image && (
                                            <div style={{ position: 'relative', width: '60px', height: '40px', borderRadius: '0.25rem', overflow: 'hidden' }}>
                                                <Image src={portfolio.main_image} alt={portfolio.title} fill style={{ objectFit: 'cover' }} />
                                            </div>
                                        )}
                                    </td>
                                    <td style={{ padding: '0.75rem 1.5rem', color: '#4b5563' }}>{portfolio.category}</td>
                                    <td style={{ padding: '0.75rem 1.5rem', color: '#111827', fontWeight: '500' }}>{portfolio.title}</td>
                                    <td style={{ padding: '0.75rem 1.5rem', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                            <Link href={`/admin/portfolio/update/${portfolio.id}`} style={{ padding: '0.25rem', color: '#4b5563', textDecoration: 'none' }} title="수정">
                                                <Edit2 size={18} />
                                            </Link>
                                            <button style={{ padding: '0.25rem', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }} title="삭제" onClick={() => handleDelete(portfolio.id)}>
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
