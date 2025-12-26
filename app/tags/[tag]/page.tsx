import { getPostsByTag, getAllTags } from '@/lib/posts';
import PostItem from '@/components/PostItem';

export async function generateStaticParams() {
    const tags = getAllTags();
    return tags.map((tag) => ({
        tag: tag,
    }));
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
    const { tag } = await params;
    const posts = getPostsByTag(tag);

    return (
        <section>
            <h1>Tag: #{tag}</h1>
            <div>
                {posts.map(({ id, category, date, title, description, tags }) => (
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
        </section>
    );
}
