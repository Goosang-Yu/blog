import { getAllPostIds, getPostData, getSortedPostsData } from '@/lib/posts';
import TableOfContents from '@/components/TableOfContents';
import GiscusComments from '@/components/GiscusComments';
import PostLanguageSync from '@/components/PostLanguageSync';
import ReadingProgress from '@/components/ReadingProgress';
import RelatedPosts from '@/components/RelatedPosts';
import { getRelatedPosts } from '@/lib/relatedPosts';

export async function generateStaticParams() {
    const paths = getAllPostIds();
    // paths is array of { params: { slug: string[] } }
    return paths.map((path) => path.params);
}

export default async function Post({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params;
    const postData = await getPostData(slug);
    const allPosts = getSortedPostsData();
    const relatedPosts = getRelatedPosts(postData, allPosts, 3);

    return (
        <>
            <ReadingProgress />
            <PostLanguageSync allPosts={allPosts} currentPost={postData} />
            <article style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <h1>{postData.title}</h1>
                    <div style={{ color: '#666', marginBottom: '0.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <span>{postData.date}</span>
                        {postData.readingTime && (
                            <span style={{ fontSize: '0.9rem', color: '#868e96' }}>☕ {postData.readingTime}min read</span>
                        )}
                    </div>
                    <div style={{ display: 'inline-block', background: '#eee', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', marginBottom: '2rem' }}>
                        {postData.category}
                    </div>
                    <div
                        className="markdown-content"
                        dangerouslySetInnerHTML={{ __html: postData.contentHtml || '' }}
                    />
                    <RelatedPosts posts={relatedPosts} />
                    <GiscusComments />
                </div>
                <TableOfContents headings={postData.headings || []} />
            </article>
        </>
    );
}
