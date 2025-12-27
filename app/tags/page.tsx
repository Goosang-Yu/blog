import { getSortedPostsData } from '@/lib/posts';
import TagsExplorer from '@/components/TagsExplorer';
import { translations } from '@/lib/translations';

export default async function TagsPage() {
    const allPosts = getSortedPostsData();

    // Count tags
    const tagCounts = new Map<string, number>();
    allPosts.forEach(post => {
        post.tags?.forEach(tag => {
            tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
        });
    });

    const tags = Array.from(tagCounts.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

    return (
        <section>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 800 }}>Tags</h1>
            <p style={{ color: '#666', marginBottom: '3rem', fontSize: '1.1rem' }}>
                Browse all topics and tags across the blog.
            </p>

            <TagsExplorer tags={tags} />
        </section>
    );
}
