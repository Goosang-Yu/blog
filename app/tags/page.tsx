import { getSortedPostsData } from '@/lib/posts';
import TagsExplorer from '@/components/TagsExplorer';
import { translations } from '@/lib/translations';

export const metadata = {
    title: 'Tags Explorer | Goosang-Yu Blog',
    description: 'Explore all tags and browse related posts.',
};

export default function TagsPage() {
    const allPosts = getSortedPostsData();

    // We pass all posts to TagsExplorer so it can filter by language dynamically
    const simplifiedPosts = allPosts.map(post => ({
        id: post.id,
        tags: post.tags || [],
        lang: post.lang || 'ko'
    }));

    return (
        <div className="container">
            <TagsExplorer posts={simplifiedPosts} />
        </div>
    );
}
