import { getSortedPostsData } from '@/lib/posts';
import PostItem from '@/components/PostItem';

import Link from 'next/link';

async function getRecentComments() {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  if (!GITHUB_TOKEN) {
    console.warn('GITHUB_TOKEN is missing. Recent comments will not be displayed.');
    return [];
  }

  const query = `
    query($owner: String!, $name: String!) {
      repository(owner: $owner, name: $name) {
        discussions(first: 10, orderBy: {field: UPDATED_AT, direction: DESC}) {
          nodes {
            title
            url
            comments(last: 1) {
              nodes {
                id
                bodyText
                createdAt
                url
                author {
                  login
                  avatarUrl
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          owner: 'Goosang-Yu',
          name: 'blog',
        },
      }),
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    const json = await res.json();
    const discussions = json.data?.repository?.discussions?.nodes || [];

    // Flatten and sort absolute 5 most recent comments
    const allComments = discussions
      .flatMap((d: any) => d.comments.nodes.map((c: any) => ({ ...c, discussionTitle: d.title })))
      .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);

    return allComments;
  } catch (error) {
    console.error('Error fetching Giscus comments:', error);
    return [];
  }
}

export default async function Home() {
  const allPostsData = getSortedPostsData();
  const recentComments = await getRecentComments();

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem' }}>
      <section>
        <h1>Recent Posts</h1>
        <div>
          {allPostsData.map(({ id, category, date, title, description, tags }) => (
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

      <section style={{ borderTop: '1px solid #eaeaea', paddingTop: '2rem' }}>
        <h2>Recent Comments (GitHub Discussions)</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {recentComments.length > 0 ? (
            recentComments.map((comment: any) => (
              <div key={comment.id} style={{ background: '#f9f9f9', padding: '1.2rem', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.9rem', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <img
                    src={comment.author.avatarUrl}
                    alt={comment.author.login}
                    style={{ width: 24, height: 24, borderRadius: '50%' }}
                  />
                  <strong>{comment.author.login}</strong>
                  <span style={{ color: '#666' }}>on</span>
                  <span style={{ fontWeight: 500, color: '#333' }}>{comment.discussionTitle}</span>
                  <span style={{ color: '#aaa', fontSize: '0.8rem', marginLeft: 'auto' }}>
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '0.95rem', color: '#444', lineHeight: 1.5 }}>
                  {comment.bodyText.length > 150 ? `${comment.bodyText.substring(0, 150)}...` : comment.bodyText}
                </p>
                <div style={{ marginTop: '0.5rem' }}>
                  <a
                    href={comment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '0.85rem', color: '#0070f3', textDecoration: 'none' }}
                  >
                    View on GitHub →
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: '#666', fontStyle: 'italic' }}>
              {process.env.GITHUB_TOKEN ? 'No comments found.' : 'Set GITHUB_TOKEN in env to see recent comments.'}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
