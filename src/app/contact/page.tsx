"use client";
import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import styles from './page.module.css';

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

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
    const [attachedFile, setAttachedFile] = useState<File | null>(null);

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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setAttachedFile(e.target.files[0]);
        } else {
            setAttachedFile(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('services', selectedServices.join(', '));
            formData.append('company', form.company);
            formData.append('manager', form.manager);
            formData.append('contact', form.contact);
            formData.append('email', form.email);
            formData.append('content', form.content);
            if (attachedFile) {
                formData.append('file', attachedFile);
            }

            const response = await fetch('/api/contact', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            alert('문의가 접수되었습니다. 곧 연락드리겠습니다.');

            // 초기화
            setForm({ company: '', manager: '', contact: '', email: '', content: '' });
            setSelectedServices([]);
            setAttachedFile(null);

        } catch (error) {
            console.error('Error sending message:', error);
            alert('메시지 전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.inner}>
                {/* 1. Hero Section */}
                <section className={styles.hero}>
                    <div className={styles.heroContent}>
                        <motion.div className={styles.badge} variants={fadeInUp} initial="hidden" animate="visible">
                            Contact
                        </motion.div>

                        <motion.div className={styles.titleMain} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}>
                            <span className={styles.helloText}>Hello.</span>
                            <span className={styles.titleSub}>무엇을</span>
                            도와드릴까요?

                        </motion.div>
                    </div>
                </section>

                {/* Service Selection Section */}
                <section style={{ marginBottom: '6rem' }}>
                    <p className={styles.description}>원하시는 서비스를 선택해주세요.(다중 선택 가능, 선택지 외 서비스 문의는 내용에 기입해주세요.)</p>
                    <div className={styles.serviceButtons}>
                        {services.map((service, index) => (
                            <button
                                key={index}
                                className={`${styles.serviceBtn} ${selectedServices.includes(service) ? styles.serviceBtnActive : ''}`}
                                onClick={() => toggleService(service)}
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
                                    <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ position: 'relative' }}>
                                            <input
                                                type="file"
                                                id="fileUpload"
                                                onChange={handleFileChange}
                                                style={{ display: 'none' }}
                                            />
                                            <label htmlFor="fileUpload" className={styles.label} style={{ cursor: 'pointer', margin: 0, textDecoration: 'underline' }}>
                                                첨부파일 {attachedFile ? `[ ${attachedFile.name} ]` : ''}
                                            </label>
                                        </div>
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
