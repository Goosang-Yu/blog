'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useMemo } from 'react';
import PostItem from '@/components/PostItem';
import { PostData } from '@/lib/posts';
import { useLanguage } from './LanguageContext';
import { translations } from '@/lib/translations';

interface Props {
    posts: PostData[];
}

function SearchResults({ posts }: Props) {
    const { lang } = useLanguage();
    const t = translations[lang];
    const searchParams = useSearchParams();
    const query = searchParams.get('q')?.toLowerCase() || '';

    const filteredPosts = useMemo(() => {
        if (!query) return [];
        return posts.filter(post => {
            // Language filter
            if (post.lang !== lang) return false;

            const titleMatch = post.title.toLowerCase().includes(query);
            const descMatch = post.description?.toLowerCase().includes(query);
            const contentMatch = post.contentHtml?.toLowerCase().includes(query);
            const topicMatch = post.topic?.some((t: string) => t.toLowerCase().includes(query));

            return titleMatch || descMatch || contentMatch || topicMatch;
        });
    }, [query, posts, lang]);

    return (
        <div>
            <div>
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <PostItem key={post.id} {...post} />
                    ))
                ) : (
                    <p>
                        {lang === 'ko'
                            ? `"${query}"에 대한 검색 결과가 없습니다.`
                            : `No posts found matching "${query}"`}
                    </p>
                )}
            </div>
        </div>
    );
}

export default function SearchClient({ posts }: Props) {
    const { lang } = useLanguage();
    return (
        <Suspense fallback={<div>{lang === 'ko' ? '검색 중...' : 'Loading search...'}</div>}>
            <SearchResults posts={posts} />
        </Suspense>
    );
}
