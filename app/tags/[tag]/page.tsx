import { getPostsByTag, getAllTags, getSortedPostsData } from '@/lib/posts';
import PostExplorer from '@/components/PostExplorer';

export async function generateStaticParams() {
    const tags = getAllTags();
    return tags.map((tag) => ({
        tag: tag,
    }));
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
    const { tag } = await params;
    const decodedTag = decodeURIComponent(tag);

    // Get all posts for the explorer, so it can filter them by tag AND language
    const allPosts = getSortedPostsData();

    // We pass all posts, but PostExplorer needs to know which ones match this tag initially
    // Actually, TagPage should show posts that have THIS tag.
    const tagSourcePosts = getPostsByTag(decodedTag);

    // Extract available metadata for filters
    const categories = Array.from(new Set(tagSourcePosts.map(p => p.category))).filter(Boolean) as string[];
    const fields = Array.from(new Set(tagSourcePosts.map(p => p.field))).filter((f): f is string => Boolean(f));
    const tags = Array.from(new Set(tagSourcePosts.flatMap(p => p.tags || []))).filter(Boolean) as string[];

    return (
        <section>
            <PostExplorer
                allPosts={tagSourcePosts}
                categories={categories}
                tags={tags}
                fields={fields}
                title={`#${decodedTag}`}
                description={`Browsing posts tagged with ${decodedTag}`}
                layout="sidebar"
            />
        </section>
    );
}
