import { getSortedPostsData } from '@/lib/posts';
import PostItem from '@/components/PostItem';

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <section>
      <h1>Recent Posts</h1>
      <div>
        {allPostsData.map(({ id, date, title, description }) => (
          <PostItem
            key={id}
            id={id}
            date={date}
            title={title}
            description={description}
          />
        ))}
      </div>
    </section>
  );
}
