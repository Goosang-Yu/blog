import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';
import GithubSlugger from 'github-slugger';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface PostData {
    id: string; // "folder/slug"
    slug: string;
    category: string;
    tags?: string[];
    field?: string;
    topic?: string[];
    date: string;
    title: string;
    description?: string;
    thumbnail?: string;
    lang?: string; // "ko" or "en"
    translationId?: string; // Links translations
    contentHtml?: string;
    headings?: { text: string; id: string; depth: number }[];
    [key: string]: any;
}

// Helper to extract the first image URL from markdown
function extractFirstImage(content: string): string | undefined {
    // Match markdown image syntax ![alt](url)
    const mdMatch = content.match(/!\[.*?\]\((.*?)\)/);
    if (mdMatch) return mdMatch[1];

    // Match HTML img tag <img src="url" ...>
    const htmlMatch = content.match(/<img.*?src=["'](.*?)["'].*?>/);
    if (htmlMatch) return htmlMatch[1];

    return undefined;
}

// Helper to recursively get all files
function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file.endsWith('.md')) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });

    return arrayOfFiles;
}

export function getSortedPostsData(): PostData[] {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const allFiles = getAllFiles(postsDirectory);

    const allPostsData = allFiles.map((fullPath) => {
        const relativePath = path.relative(postsDirectory, fullPath);
        const id = relativePath.replace(/\.md$/, '').replace(/\\/g, '/');
        const [folder, ...slugParts] = id.split('/');
        const slug = slugParts.join('/');

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);

        return {
            id,
            slug,
            category: matterResult.data.category || folder || 'uncategorized',
            tags: matterResult.data.tags || [],
            field: matterResult.data.field || "",
            topic: matterResult.data.topic || [],
            thumbnail: matterResult.data.thumbnail || extractFirstImage(matterResult.content),
            lang: matterResult.data.lang || 'ko',
            translationId: matterResult.data.translationId || id.split('/').pop(),
            ...(matterResult.data as { date: string; title: string }),
        };
    });

    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getAllPostIds() {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const allFiles = getAllFiles(postsDirectory);

    return allFiles.map((fullPath) => {
        const relativePath = path.relative(postsDirectory, fullPath);
        const id = relativePath.replace(/\.md$/, '').replace(/\\/g, '/');
        const slugArray = id.split('/');

        return {
            params: {
                slug: slugArray,
            },
        };
    });
}

export async function getPostData(slug: string[]): Promise<PostData> {
    const relPath = slug.join('/');
    const fullPath = path.join(postsDirectory, `${relPath}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    // Extract headings
    const slugger = new GithubSlugger();
    const headings: { text: string; id: string; depth: number }[] = [];
    const lines = matterResult.content.split(/\r?\n/);
    lines.forEach(line => {
        const match = line.match(/^(#{1,6})\s+(.*)$/);
        if (match) {
            const depth = match[1].length;
            const text = match[2];
            const id = slugger.slug(text);
            headings.push({ text, id, depth });
        }
    });

    const processedContent = await remark()
        .use(remarkMath)
        .use(remarkRehype)
        .use(rehypeSlug)
        .use(rehypeKatex)
        .use(rehypeStringify)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    const folder = slug[0];
    const slugStr = slug.slice(1).join('/');

    return {
        id: relPath,
        slug: slugStr,
        category: matterResult.data.category || folder,
        tags: matterResult.data.tags || [],
        field: matterResult.data.field || "",
        topic: matterResult.data.topic || [],
        thumbnail: matterResult.data.thumbnail || extractFirstImage(matterResult.content),
        lang: matterResult.data.lang || 'ko',
        translationId: matterResult.data.translationId || slug.join('-'),
        contentHtml,
        headings,
        ...(matterResult.data as { date: string; title: string }),
    };
}

export function getAllCategories(): string[] {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }
    const files = fs.readdirSync(postsDirectory);
    return files.filter(file => fs.statSync(path.join(postsDirectory, file)).isDirectory());
}

export function getPostsByCategory(category: string): PostData[] {
    const allPosts = getSortedPostsData();
    return allPosts.filter(post => post.category === category);
}

export function getAllTags(): string[] {
    const allPosts = getSortedPostsData();
    const tags = new Set<string>();
    allPosts.forEach(post => {
        if (post.tags) {
            post.tags.forEach((tag: string) => tags.add(tag));
        }
    });
    return Array.from(tags);
}

export function getPostsByTag(tag: string): PostData[] {
    const allPosts = getSortedPostsData();
    return allPosts.filter(post => post.tags && post.tags.includes(tag));
}

export function getAllFields(): string[] {
    const allPosts = getSortedPostsData();
    const fields = new Set<string>();
    allPosts.forEach(post => {
        if (post.field) {
            fields.add(post.field);
        }
    });
    return Array.from(fields);
}

export function getPostsByField(field: string): PostData[] {
    const allPosts = getSortedPostsData();
    return allPosts.filter(post => post.field === field);
}

export function getAllTopics(): string[] {
    const allPosts = getSortedPostsData();
    const topics = new Set<string>();
    allPosts.forEach(post => {
        if (post.topic) {
            post.topic.forEach((topic: string) => topics.add(topic));
        }
    });
    return Array.from(topics);
}

export function getPostsByTopic(topic: string): PostData[] {
    const allPosts = getSortedPostsData();
    return allPosts.filter(post => post.topic && post.topic.includes(topic));
}

export function getPostsForSearch(): PostData[] {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const allFiles = getAllFiles(postsDirectory);

    const allPostsData = allFiles.map((fullPath) => {
        const relativePath = path.relative(postsDirectory, fullPath);
        const id = relativePath.replace(/\.md$/, '').replace(/\\/g, '/');
        const [folder, ...slugParts] = id.split('/');
        const slug = slugParts.join('/');

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);

        return {
            id,
            slug,
            category: matterResult.data.category || folder || 'uncategorized',
            tags: matterResult.data.tags || [],
            field: matterResult.data.field || "",
            topic: matterResult.data.topic || [],
            contentHtml: matterResult.content, // Pass raw markdown for search
            ...(matterResult.data as { date: string; title: string }),
        };
    });

    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}
