'use client';

import { useLanguage } from '@/components/LanguageContext';
import { translations } from '@/lib/translations';
import SocialLinks from '@/components/SocialLinks';
import { useEffect, useState } from 'react';

export default function AboutPage() {
    const { lang } = useLanguage();
    const t = translations[lang];
    const [contentHtml, setContentHtml] = useState('');

    useEffect(() => {
        async function loadContent() {
            try {
                const response = await fetch(`/api/about?lang=${lang}`);
                const data = await response.json();
                setContentHtml(data.contentHtml);
            } catch (error) {
                console.error('Failed to load about content:', error);
            }
        }
        loadContent();
    }, [lang]);

    return (
        <section style={{ maxWidth: '800px', paddingBottom: '4rem' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 800 }}>{t.about.title}</h1>

            <div style={{ marginBottom: '2rem' }}>
                <p style={{ fontSize: '1.25rem', lineHeight: '1.8', color: '#333', marginBottom: '0' }}>
                    {t.about.description}
                </p>
            </div>

            {/* CV Download Button */}
            <div style={{ marginBottom: '3rem' }}>
                <a
                    href="/assets/CV_Goosang.pdf"
                    download
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.8rem',
                        padding: '0.8rem 1.6rem',
                        backgroundColor: '#0070f3',
                        color: 'white',
                        borderRadius: '10px',
                        textDecoration: 'none',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        boxShadow: '0 4px 14px 0 rgba(0,112,243,0.3)',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#005ed3';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 20px 0 rgba(0,112,243,0.4)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = '#0070f3';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 14px 0 rgba(0,112,243,0.3)';
                    }}
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    {t.about.downloadCV}
                </a>
            </div>

            {/* Contact Section */}
            <div style={{
                marginBottom: '3rem',
                padding: '2rem',
                background: '#f8f9fa',
                borderRadius: '12px'
            }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#0070f3' }}>
                    {t.about.getInTouch}
                </h2>
                <p style={{ marginBottom: '1.5rem', color: '#666', fontSize: '1.1rem' }}>
                    {t.about.contact}
                </p>
                <SocialLinks />
            </div>

            {/* Markdown Content (CV Details) */}
            <div
                className="markdown-content"
                style={{
                    fontSize: '1.1rem',
                    lineHeight: '1.8',
                    color: '#333'
                }}
                dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
        </section>
    );
}
