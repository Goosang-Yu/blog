export const translations = {
    ko: {
        nav: {
            home: '홈',
            about: '소개',
            categories: '카테고리',
            tags: '태그',
        },
        explorer: {
            searchPlaceholder: '게시글 검색...',
            filters: {
                category: '카테고리',
                field: '분야',
                year: '연도',
                startYear: '시작 연도',
                endYear: '끝 연도'
            },
            noResults: '검색 결과가 없습니다.',
            all: '전체',
            tagsTitle: '태그 탐색',
            tagsSearchPlaceholder: '태그 검색...',
            tagCount: '개의 포스트'
        },
        home: {
            recentPosts: '최근 게시글',
            recentComments: '최근 댓글',
            noComments: '등록된 댓글이 없습니다.',
            readOnGithub: 'GitHub에서 보기'
        },
        about: {
            title: '소개',
            description: '안녕하세요, 유구상(Goosang Yu)입니다. 유전자 교정, 고효율 유전자 스크리닝, 멀티오믹스, 그리고 기계학습을 활용한 생물정보학 연구를 수행하고 있습니다.',
            downloadCV: 'CV 다운로드',
            getInTouch: '연락처',
            contact: '문의하기'
        },
        footer: {
            copyright: '© 2025 Goosang. All rights reserved.'
        }
    },
    en: {
        nav: {
            home: 'Home',
            about: 'About',
            categories: 'Categories',
            tags: 'Tags',
        },
        explorer: {
            searchPlaceholder: 'Search posts...',
            filters: {
                category: 'Category',
                field: 'Field',
                year: 'Year',
                startYear: 'Start Year',
                endYear: 'End Year'
            },
            noResults: 'No posts found.',
            all: 'All',
            tagsTitle: 'Explore Tags',
            tagsSearchPlaceholder: 'Search tags...',
            tagCount: 'posts'
        },
        home: {
            recentPosts: 'Recent Posts',
            recentComments: 'Recent Comments',
            noComments: 'No comments yet.',
            readOnGithub: 'Read on GitHub'
        },
        about: {
            title: 'About',
            description: 'Hi, I am Goosang Yu, a Ph.D. researcher focusing on genome editing, high-throughput screening, multi-omics, and machine learning-driven bioinformatics.',
            downloadCV: 'Download CV',
            getInTouch: 'Get in Touch',
            contact: 'Contact'
        },
        footer: {
            copyright: '© 2025 Goosang. All rights reserved.'
        }
    }
};

export type TranslationType = typeof translations.ko;
