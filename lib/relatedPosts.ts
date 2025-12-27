import { PostData } from './posts';

// Calculate relevance score between two posts
export function calculateRelevance(currentPost: PostData, otherPost: PostData): number {
    let score = 0;

    // Same series gets highest priority (+10)
    if (currentPost.series && currentPost.series === otherPost.series) {
        score += 10;
    }

    // Common tags (+3 per tag)
    if (currentPost.tags && otherPost.tags) {
        const commonTags = currentPost.tags.filter(tag =>
            otherPost.tags?.includes(tag)
        );
        score += commonTags.length * 3;
    }

    // Same category (+2)
    if (currentPost.category === otherPost.category) {
        score += 2;
    }

    // Same field (+1)
    if (currentPost.field && currentPost.field === otherPost.field) {
        score += 1;
    }

    return score;
}

// Get related posts for a given post
export function getRelatedPosts(
    currentPost: PostData,
    allPosts: PostData[],
    limit: number = 3
): PostData[] {
    return allPosts
        .filter(post =>
            post.id !== currentPost.id && // Exclude current post
            post.lang === currentPost.lang  // Same language only
        )
        .map(post => ({
            ...post,
            relevanceScore: calculateRelevance(currentPost, post)
        }))
        .filter(post => post.relevanceScore > 0) // Only show if relevant
        .sort((a, b) => b.relevanceScore - a.relevanceScore)
        .slice(0, limit);
}
