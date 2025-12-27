import { getSortedPostsData } from '@/lib/posts';
import HomeClient from '@/components/HomeClient';

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
      next: { revalidate: 3600 },
    });

    const json = await res.json();
    const discussions = json.data?.repository?.discussions?.nodes || [];

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

  return <HomeClient initialPosts={allPostsData} recentComments={recentComments} />;
}
