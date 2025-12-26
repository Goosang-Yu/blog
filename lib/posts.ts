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
    id: string; // "category/slug"
    slug: string;
    category: string;
    tags?: string[];
    date: string;
    title: string;
    description?: string;
    contentHtml?: string;
    headings?: { text: string; id: string; depth: number }[];
    [key: string]: any;
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
        // Get relative path from postsDirectory to get id/slug structure
        // e.g. "dev/hello-world.md"
        const relativePath = path.relative(postsDirectory, fullPath);

        // id = "dev/hello-world"
        const id = relativePath.replace(/\.md$/, '').replace(/\\/g, '/');

        // category = "dev", slug = "hello-world"
        const [category, ...slugParts] = id.split('/');
        const slug = slugParts.join('/');

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);

        return {
            id,
            slug,
            category: category || 'uncategorized',
            tags: matterResult.data.tags || [],
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

    const category = slug[0];
    const slugStr = slug.slice(1).join('/');

    return {
        id: relPath,
        slug: slugStr,
        category,
        contentHtml,
        headings,
        tags: matterResult.data.tags || [],
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

export function getPostsForSearch(): PostData[] {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const allFiles = getAllFiles(postsDirectory);

    const allPostsData = allFiles.map((fullPath) => {
        const relativePath = path.relative(postsDirectory, fullPath);
        const id = relativePath.replace(/\.md$/, '').replace(/\\/g, '/');
        const [category, ...slugParts] = id.split('/');
        const slug = slugParts.join('/');

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);

        return {
            id,
            slug,
            category: category || 'uncategorized',
            contentHtml: matterResult.content, // Pass raw markdown for search
            tags: matterResult.data.tags || [],
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
