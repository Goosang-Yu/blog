import { getPostsByTopic, getAllTopics } from '@/lib/posts';
import PostItem from '@/components/PostItem';

export async function generateStaticParams() {
    const topics = getAllTopics();
    return topics.map((topic) => ({
        tag: topic, // Keep 'tag' as param name for route consistency unless I move the folder
    }));
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
    const { tag } = await params;
    const posts = getPostsByTopic(tag);

    return (
        <section>
            <h1>Topic: #{tag}</h1>
            <div>
                {posts.map(({ id, category, tags, field, date, title, description, topic, thumbnail }) => (
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
                        topic={topic}
                    />
                ))}
            </div>
        </section>
    );
}
