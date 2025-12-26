import { getAllPostIds, getPostData } from '@/lib/posts';

export async function generateStaticParams() {
    const paths = getAllPostIds();
    // paths is array of { params: { slug: string[] } }
    return paths.map((path) => path.params);
}

export default async function Post({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params;
    const postData = await getPostData(slug);

    return (
        <article>
            <h1>{postData.title}</h1>
            <div style={{ color: '#666', marginBottom: '0.5rem' }}>{postData.date}</div>
            <div style={{ display: 'inline-block', background: '#eee', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', marginBottom: '2rem' }}>
                {postData.category}
            </div>
            <div
                className="markdown-content"
                dangerouslySetInnerHTML={{ __html: postData.contentHtml || '' }}
            />
        </article>
    );
}
