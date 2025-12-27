import { getPostsByField, getAllFields, getAllTopics, getPostsByCategory } from '@/lib/posts';
import PostExplorer from '@/components/PostExplorer';

export async function generateStaticParams() {
    const fields = getAllFields();
    return fields.map((field) => ({
        category: field, // Param name remains 'category' for routing
    }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;

    // We want to scope the explorer to this category or field
    const allPostsOfThisCategory = getPostsByCategory(category);
    const allPostsOfThisField = getPostsByField(category);
    const combinedPosts = Array.from(new Map([...allPostsOfThisCategory, ...allPostsOfThisField].map(p => [p.id, p])).values());

    const tags = Array.from(new Set(combinedPosts.flatMap(p => p.tags || [])));
    const topics = Array.from(new Set(combinedPosts.flatMap(p => p.topic || [])));

    return (
        <section>
            <h1>Explore: {category}</h1>
            <p style={{ color: '#666', marginBottom: '2rem' }}>
                {category} 분야의 모든 글을 탐색합니다.
            </p>

            <PostExplorer
                allPosts={combinedPosts}
                categories={[category]}
                fields={[category]}
                tags={tags}
                topics={topics}
                initialCategory={category}
                layout="horizontal"
            />
        </section>
    );
}
