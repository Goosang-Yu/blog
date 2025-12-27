import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const lang = searchParams.get('lang') || 'ko';

    const fileName = lang === 'en' ? 'about-en.md' : 'about-ko.md';
    const filePath = path.join(process.cwd(), 'posts', 'about', fileName);

    try {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const matterResult = matter(fileContents);

        const processedContent = await remark()
            .use(remarkRehype)
            .use(rehypeStringify)
            .process(matterResult.content);

        const contentHtml = processedContent.toString();

        return NextResponse.json({ contentHtml });
    } catch (error) {
        console.error('Error reading about file:', error);
        return NextResponse.json({ contentHtml: '<p>Content not available</p>' }, { status: 500 });
    }
}
