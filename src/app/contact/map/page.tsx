"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

export default function MapPage() {
    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#1a1a1a',
            paddingTop: '80px',
            fontFamily: 'inherit'
        }}>
            {/* Back button */}
            <div style={{
                maxWidth: '1100px',
                margin: '0 auto',
                padding: '1.5rem 2rem 1rem'
            }}>
                <Link
                    href="/contact"
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                        color: '#888', textDecoration: 'none', fontSize: '0.875rem',
                        transition: 'color 0.2s'
                    }}
                >
                    <ArrowLeft size={16} />
                    CONTACT으로 돌아가기
                </Link>
            </div>

            {/* Maps Embed */}
            <div style={{
                width: '100%',
                height: '420px',
                position: 'relative',
                borderTop: '1px solid #333',
                borderBottom: '1px solid #333'
            }}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.0!2d126.7211004!3d37.5178061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b7fa000000001%3A0x1!2z67Cp7Y-s7Yq464-Z7Yq4!5e0!3m2!1sko!2skr!4v1700000000000!5m2!1sko!2skr"
                    width="100%"
                    height="100%"
                    style={{ border: 'none', display: 'block' }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>

            {/* Building photo + Info */}
            <div style={{
                maxWidth: '1100px',
                margin: '0 auto',
                padding: '3rem 2rem',
                display: 'flex',
                gap: '4rem',
                alignItems: 'flex-start'
            }}>
                {/* Building photo */}
                <div style={{
                    flex: '0 0 420px',
                    height: '280px',
                    position: 'relative',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    backgroundColor: '#e5e7eb'
                }}>
                    <Image
                        src="/building.png"
                        alt="부평테크시티 외관"
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </div>

                {/* Info */}
                <div style={{ flex: 1, paddingTop: '1rem' }}>
                    <table style={{
                        borderCollapse: 'collapse',
                        width: '100%',
                        fontSize: '0.95rem',
                        color: '#ccc'
                    }}>
                        <tbody>
                            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                                <td style={{
                                    padding: '1.2rem 2rem 1.2rem 0',
                                    fontWeight: 'bold',
                                    color: '#fff',
                                    whiteSpace: 'nowrap',
                                    verticalAlign: 'top',
                                    fontSize: '0.9rem'
                                }}>본사 주소</td>
                                <td style={{ padding: '1.2rem 0', color: '#aaa', lineHeight: 1.6 }}>
                                    인천시 부평구 부평대로 293, 1109호<br />
                                    <span style={{ color: '#666', fontSize: '0.85rem' }}>(청천동, 부평테크시티)</span>
                                </td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                                <td style={{
                                    padding: '1.2rem 2rem 1.2rem 0',
                                    fontWeight: 'bold',
                                    color: '#fff',
                                    whiteSpace: 'nowrap',
                                    fontSize: '0.9rem'
                                }}>TEL</td>
                                <td style={{ padding: '1.2rem 0', color: '#aaa' }}>
                                    070-4351-7184
                                </td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #333' }}>
                                <td style={{
                                    padding: '1.2rem 2rem 1.2rem 0',
                                    fontWeight: 'bold',
                                    color: '#fff',
                                    whiteSpace: 'nowrap',
                                    fontSize: '0.9rem'
                                }}>EMAIL</td>
                                <td style={{ padding: '1.2rem 0', color: '#aaa' }}>
                                    contents@ioi_design.life
                                </td>
                            </tr>
                            <tr>
                                <td style={{
                                    padding: '1.2rem 2rem 1.2rem 0',
                                    fontWeight: 'bold',
                                    color: '#fff',
                                    whiteSpace: 'nowrap',
                                    fontSize: '0.9rem'
                                }}>대표이사</td>
                                <td style={{ padding: '1.2rem 0', color: '#aaa' }}>
                                    김지현
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
}
