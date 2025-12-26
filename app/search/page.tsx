import { getPostsForSearch } from '@/lib/posts';
import SearchClient from '@/components/SearchClient';

export default function SearchPage() {
    const posts = getPostsForSearch();

    return (
        <section>
            <h1>Search Results</h1>
            <SearchClient posts={posts} />
        </section>
    );
}
