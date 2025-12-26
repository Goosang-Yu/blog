import { getSortedPostsData } from '@/lib/posts';
import PostItem from '@/components/PostItem';

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
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
  );
}
