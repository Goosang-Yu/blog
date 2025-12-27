'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from './LanguageContext';
import { PostData } from '@/lib/posts';

interface Props {
    allPosts: PostData[];
    currentPost: PostData;
}

export default function PostLanguageSync({ allPosts, currentPost }: Props) {
    const { lang } = useLanguage();
    const router = useRouter();
    const isFirstRender = useRef(true);

    useEffect(() => {
        // Skip on mount to avoid loop
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        // If context lang is different from current post lang, try to redirect
        if (currentPost.lang && currentPost.lang !== lang) {
            const targetPost = allPosts.find(
                (p) => p.translationId === currentPost.translationId && p.lang === lang
            );

            if (targetPost) {
                router.push(`/posts/${targetPost.id}`);
            }
        }
    }, [lang, currentPost.lang, currentPost.translationId, allPosts, router]);

    return null;
}
