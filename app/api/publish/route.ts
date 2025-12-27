import { NextResponse } from 'next/server';
import { Octokit } from 'octokit';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const BLOG_API_KEY = process.env.BLOG_API_KEY;
const REPO_OWNER = 'Goosang-Yu';
const REPO_NAME = 'blog';
const DRAFT_BRANCH = 'chatgpt-drafts';

export async function POST(request: Request) {
    // 1. Security Check
    const apiKey = request.headers.get('x-api-key');
    if (!BLOG_API_KEY || apiKey !== BLOG_API_KEY) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!GITHUB_TOKEN) {
        return NextResponse.json({ error: 'GitHub Token missing on server' }, { status: 500 });
    }

    try {
        const { title, content, category = 'chatgpt', tags = [] } = await request.json();

        if (!title || !content) {
            return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
        }

        const octokit = new Octokit({ auth: GITHUB_TOKEN });

        // 2. Ensure Draft Branch exists
        let baseSha = '';
        try {
            const { data: mainRef } = await octokit.rest.git.getRef({
                owner: REPO_OWNER,
                repo: REPO_NAME,
                ref: 'heads/main',
            });
            baseSha = mainRef.object.sha;

            try {
                await octokit.rest.git.getRef({
                    owner: REPO_OWNER,
                    repo: REPO_NAME,
                    ref: `heads/${DRAFT_BRANCH}`,
                });
            } catch (e: any) {
                if (e.status === 404) {
                    await octokit.rest.git.createRef({
                        owner: REPO_OWNER,
                        repo: REPO_NAME,
                        ref: `refs/heads/${DRAFT_BRANCH}`,
                        sha: baseSha,
                    });
                } else {
                    throw e;
                }
            }
        } catch (error) {
            console.error('Error managing branch:', error);
            return NextResponse.json({ error: 'Failed to manage branch' }, { status: 500 });
        }

        // 3. Format Markdown
        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
        const date = new Date().toISOString().split('T')[0];
        const fileName = `posts/${category}/${slug}.md`;

        const markdownContent = `---
title: "${title}"
date: "${date}"
description: "Automatically posted from ChatGPT"
category: "${category}"
tags: [${tags.map((t: string) => `"${t}"`).join(', ')}]
field: "${category}"
topic: [${tags.map((t: string) => `"${t}"`).join(', ')}]
---

${content}
`;

        // 4. Commit to the draft branch
        try {
            // Check if file already exists to get its SHA (for update)
            let fileSha = undefined;
            try {
                const { data: fileData }: any = await octokit.rest.repos.getContent({
                    owner: REPO_OWNER,
                    repo: REPO_NAME,
                    path: fileName,
                    ref: DRAFT_BRANCH,
                });
                fileSha = fileData.sha;
            } catch (e) { }

            await octokit.rest.repos.createOrUpdateFileContents({
                owner: REPO_OWNER,
                repo: REPO_NAME,
                path: fileName,
                message: `Add new post: ${title} (via ChatGPT)`,
                content: Buffer.from(markdownContent).toString('base64'),
                branch: DRAFT_BRANCH,
                sha: fileSha,
            });

            return NextResponse.json({
                success: true,
                message: `Post created/updated in branch ${DRAFT_BRANCH}`,
                path: fileName,
                reviewUrl: `https://github.com/${REPO_OWNER}/${REPO_NAME}/blob/${DRAFT_BRANCH}/${fileName}`,
            });
        } catch (error: any) {
            console.error('Error committing file:', error);
            return NextResponse.json({ error: 'Failed to commit file to GitHub', details: error.message }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
}
