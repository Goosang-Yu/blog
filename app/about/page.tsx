'use client';

import { useLanguage } from '@/components/LanguageContext';
import { translations } from '@/lib/translations';

export default function About() {
    const { lang } = useLanguage();
    const t = translations[lang];

    if (lang === 'ko') {
        return (
            <article>
                <h1>소개</h1>
                <p>
                    안녕하세요! 저는 웹 애플리케이션을 개발하고 새로운 기술을 탐구하는 것에 열정을 가진 개발자입니다.
                    이 블로그는 저의 학습 여정을 기록하고, 통찰을 공유하며, 제가 마주한 도전 과제들을 되돌아보는 공간입니다.
                </p>
                <h2>기술 스택</h2>
                <ul>
                    <li>Next.js</li>
                    <li>TypeScript</li>
                    <li>React</li>
                </ul>
                <h2>{t.about.contact}</h2>
                <p>
                    새로운 프로젝트, 창의적인 아이디어, 또는 여러분의 비전에 참여할 기회에 대해 언제든 열려 있습니다.
                </p>
                <h2>{t.about.getInTouch}</h2>
                <ul>
                    <li><strong>이메일:</strong> <a href="mailto:gsyu93@gmail.com" target="_blank" rel="noopener noreferrer">gsyu93@gmail.com</a></li>
                    <li><strong>GitHub:</strong> <a href="https://github.com/Goosang-Yu" target="_blank" rel="noopener noreferrer">github.com/Goosang-Yu</a></li>
                    <li><strong>X (Twitter):</strong> <a href="https://x.com/Goosang_Yu" target="_blank" rel="noopener noreferrer">@Goosang_Yu</a></li>
                </ul>
            </article>
        );
    }

    return (
        <article>
            <h1>About Me</h1>
            <p>
                Hello! I am a developer passionate about building web applications and exploring new technologies.
                This blog is a space where I document my learning journey, share insights, and reflect on the challenges I encounter.
            </p>
            <h2>Tech Stack</h2>
            <ul>
                <li>Next.js</li>
                <li>TypeScript</li>
                <li>React</li>
            </ul>
            <h2>{t.about.contact}</h2>
            <p>
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
            <h2>{t.about.getInTouch}</h2>
            <ul>
                <li><strong>Email:</strong> <a href="mailto:gsyu93@gmail.com" target="_blank" rel="noopener noreferrer">gsyu93@gmail.com</a></li>
                <li><strong>GitHub:</strong> <a href="https://github.com/Goosang-Yu" target="_blank" rel="noopener noreferrer">github.com/Goosang-Yu</a></li>
                <li><strong>X (Twitter):</strong> <a href="https://x.com/Goosang_Yu" target="_blank" rel="noopener noreferrer">@Goosang_Yu</a></li>
            </ul>
        </article>
    );
}
