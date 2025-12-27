'use client';

import { PostData } from '@/lib/posts';
import PostItem from './PostItem';
import { useLanguage } from './LanguageContext';
import { translations } from '@/lib/translations';

interface HomeClientProps {
    initialPosts: PostData[];
    recentComments: any[];
}

export default function HomeClient({ initialPosts, recentComments }: HomeClientProps) {
    const { lang } = useLanguage();
    const t = translations[lang];

    const filteredPosts = initialPosts.filter(post => post.lang === lang).slice(0, 5);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem' }}>
            <section>
                <h1>{t.home.recentPosts}</h1>
                <div>
                    {filteredPosts.map((post) => (
                        <PostItem
                            key={post.id}
                            {...post}
                            date={new Date(post.date).toLocaleDateString(lang === 'ko' ? 'ko-KR' : 'en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        />
                    ))}
                </div>
            </section>

            <section style={{ borderTop: '1px solid #eaeaea', paddingTop: '2rem' }}>
                <h2>{t.home.recentComments}</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {recentComments.length > 0 ? (
                        recentComments.map((comment: any) => (
                            <div key={comment.id} style={{ background: '#f9f9f9', padding: '1.2rem', borderRadius: '8px' }}>
                                <div style={{ fontSize: '0.9rem', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                    <img
                                        src={comment.author.avatarUrl}
                                        alt={comment.author.login}
                                        style={{ width: 24, height: 24, borderRadius: '50%' }}
                                    />
                                    <strong>{comment.author.login}</strong>
                                    <span style={{ color: '#666' }}>{lang === 'ko' ? '님' : 'on'}</span>
                                    <span style={{ fontWeight: 500 }}>{comment.discussionTitle}</span>
                                    <span style={{ color: '#aaa', fontSize: '0.8rem', marginLeft: 'auto' }}>
                                        {new Date(comment.createdAt).toLocaleDateString(lang === 'ko' ? 'ko-KR' : 'en-US')}
                                    </span>
                                </div>
                                <p style={{ margin: 0, fontSize: '0.95rem', color: '#444' }}>{comment.bodyText}</p>
                                <div style={{ marginTop: '0.5rem' }}>
                                    <a href={comment.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', color: '#0070f3', textDecoration: 'none' }}>
                                        {t.home.readOnGithub} →
                                    </a>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p style={{ color: '#666' }}>{t.home.noComments}</p>
                    )}
                </div>
            </section>
        </div>
    );
}
