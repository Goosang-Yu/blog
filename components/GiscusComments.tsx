'use client';

import Giscus from '@giscus/react';

export default function GiscusComments() {
    return (
        <div style={{ marginTop: '4rem', borderTop: '1px solid #eaeaea', paddingTop: '2rem' }}>
            <Giscus
                id="comments"
                repo="Goosang-Yu/blog"
                repoId="R_kgDOQvTMoA"
                category="Comments"
                categoryId="DIC_kwDOQvTMoM4C0RSa"
                mapping="pathname"
                term="Welcome to my blog!"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme="preferred_color_scheme"
                lang="en"
                loading="lazy"
            />
        </div>
    );
}
