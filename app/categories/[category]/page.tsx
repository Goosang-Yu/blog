import { getPostsByCategory, getAllCategories } from '@/lib/posts';
import PostItem from '@/components/PostItem';

export async function generateStaticParams() {
    const categories = getAllCategories();
    return categories.map((category) => ({
        category: category,
    }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;
    const posts = getPostsByCategory(category);

    return (
        <section>
            <h1>Category: {category}</h1>
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
