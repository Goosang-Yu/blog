'use client';

import Giscus from '@giscus/react';

export default function GiscusComments() {
    return (
        <div style={{ marginTop: '4rem', borderTop: '1px solid #eaeaea', paddingTop: '2rem' }}>
            <Giscus
                id="comments"
                repo="Goosang-Yu/Goosang-Yu.github.io" // Replace with your actual repo
                repoId="R_..." // Replace with your repoId
                category="Announcements"
                categoryId="DIC_..." // Replace with your categoryId
                mapping="pathname"
                term="Welcome to my blog!"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="bottom"
                theme="light"
                lang="ko"
                loading="lazy"
            />
        </div>
    );
}
