import { getAllPostIds, getPostData } from '@/lib/posts';

export async function generateStaticParams() {
    const paths = getAllPostIds();
    return paths.map((path) => path.params);
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const postData = await getPostData(slug);

    return (
        <article>
            <h1>{postData.title}</h1>
            <div style={{ color: '#666', marginBottom: '2rem' }}>{postData.date}</div>
            <div
                className="markdown-content"
                dangerouslySetInnerHTML={{ __html: postData.contentHtml || '' }}
            />
        </article>
    );
}
