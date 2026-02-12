
"use client";
import React, { useState } from 'react';
import styles from './page.module.css';

const services = [
    '조형물', '환경 디자인', '공공 디자인', '학술 연구', '지원 사업', '사인물',
    '전 시', '인테리어', '브랜딩', 'UX · UI', '영상 디자인', '이벤트 행사'
];

export default function ContactPage() {
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [form, setForm] = useState({
        company: '',
        manager: '',
        contact: '',
        email: '',
        content: ''
    });

    const toggleService = (service: string) => {
        if (selectedServices.includes(service)) {
            setSelectedServices(selectedServices.filter(s => s !== service));
        } else {
            setSelectedServices([...selectedServices, service]);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would send this data to Supabase or an API
        console.log({ selectedServices, ...form });
        alert('문의가 접수되었습니다. 곧 연락드리겠습니다.');
    };

    return (
        <div className={styles.container}>
            <div className={styles.inner}>
                {/* Hero Section */}
                <section className={styles.hero}>
                    <div className={styles.badge}>Contact</div>
                    <h1 className={styles.titleMain}>Hello.</h1>
                    <h2 className={styles.titleSub}>무엇을<br />도와드릴까요?</h2>
                    <p className={styles.description}>원하시는 서비스를 선택해주세요.(다중 선택 가능, 선택지 외 서비스 문의는 내용에 기입해주세요.)</p>

                    {/* Service Selection Buttons */}
                    <div className={styles.serviceButtons}>
                        {services.map((service, index) => (
                            <button
                                key={index}
                                className={`${styles.serviceBtn} ${selectedServices.includes(service) ? styles.serviceBtnActive : ''}`}
                                onClick={() => toggleService(service)}
                                style={selectedServices.includes(service) ? { background: '#d1d1d1', color: '#000', fontWeight: 'bold' } : {}}
                            >
                                {service}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Contact Form */}
                <div className={styles.formContainer}>
                    <h3 className={styles.formTitle}>소중한 시간과 기회를 만들어 주셔서 감사합니다.</h3>

                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGrid}>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>기업명</label>
                                <input
                                    type="text"
                                    name="company"
                                    value={form.company}
                                    onChange={handleInputChange}
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>담당자명</label>
                                <input
                                    type="text"
                                    name="manager"
                                    value={form.manager}
                                    onChange={handleInputChange}
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>연락처</label>
                                <input
                                    type="tel"
                                    name="contact"
                                    value={form.contact}
                                    onChange={handleInputChange}
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>이메일</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleInputChange}
                                    className={styles.input}
                                />
                            </div>

                            {/* Full Width Items */}
                            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <label className={styles.label}>문의내용</label>
                                    <div style={{ textAlign: 'right' }}>
                                        <label className={styles.label} style={{ marginRight: '2rem' }}>첨부파일</label>
                                        <span className={styles.fileUploadDesc}>50MB이하로 보내주세요.</span>
                                    </div>
                                </div>
                                <textarea
                                    name="content"
                                    value={form.content}
                                    onChange={handleInputChange}
                                    className={styles.textArea}
                                />
                            </div>

                        </div>

                        {/* Bottom Actions */}
                        <div className={styles.bottomRow}>
                            <a href="#" className={styles.privacyLink}>개인정보처리방침 동의 안내</a>

                            <div className={styles.submitArea}>
                                <label className={styles.checkboxLabel}>
                                    개인정보처리방침 동의
                                    <input type="checkbox" required style={{ width: '20px', height: '20px', border: '1px solid #555', borderRadius: '4px', background: 'transparent' }} />
                                </label>
                                <button type="submit" className={styles.submitBtn}>SEND</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}
