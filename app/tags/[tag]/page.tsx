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
                {posts.map(({ id, category, tags, field, date, title, description, thumbnail }) => (
                    <PostItem
                        key={id}
                        id={id}
                        category={category}
                        tags={tags}
                        field={field}
                        date={date}
                        title={title}
                        description={description}
                        thumbnail={thumbnail}
                    />
                ))}
            </div>
        </section>
    );
}
