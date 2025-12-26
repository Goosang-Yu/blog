'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useMemo } from 'react';
import PostItem from '@/components/PostItem';
import { PostData } from '@/lib/posts';

interface Props {
    posts: PostData[];
}

function SearchResults({ posts }: Props) {
    const searchParams = useSearchParams();
    const query = searchParams.get('q')?.toLowerCase() || '';

    const filteredPosts = useMemo(() => {
        if (!query) return [];
        return posts.filter((post) => {
            const titleMatch = post.title.toLowerCase().includes(query);
            const descMatch = post.description?.toLowerCase().includes(query);
            const contentMatch = post.contentHtml?.toLowerCase().includes(query);
            const tagMatch = post.tags?.some(tag => tag.toLowerCase().includes(query));

            return titleMatch || descMatch || contentMatch || tagMatch;
        });
    }, [posts, query]);

    if (!query) {
        return <p>Please enter a search term.</p>;
    }

    if (filteredPosts.length === 0) {
        return <p>No results found for "{query}".</p>;
    }

    return (
        <div>
            {filteredPosts.map(({ id, category, date, title, description, tags }) => (
                <PostItem
                    key={id}
                    id={id}
                    category={category}
                    date={date}
                    title={title}
                    description={description}
                    tags={tags}
                />
            ))}
        </div>
    );
}

export default function SearchClient({ posts }: Props) {
    return (
        <Suspense fallback={<div>Loading search...</div>}>
            <SearchResults posts={posts} />
        </Suspense>
    );
}
