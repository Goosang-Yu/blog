export const translations = {
    ko: {
        nav: {
            home: '홈',
            about: '소개',
            categories: '카테고리',
        },
        explorer: {
            searchPlaceholder: '게시글 검색...',
            filters: {
                category: '카테고리',
                field: '분야',
                topic: '주제',
                year: '연도'
            },
            noResults: '검색 결과가 없습니다.',
            all: '전체'
        },
        home: {
            recentPosts: '최근 게시글',
            recentComments: '최근 댓글',
            noComments: '등록된 댓글이 없습니다.',
            readOnGithub: 'GitHub에서 보기'
        },
        about: {
            title: '정보',
            contact: '문의하기',
            getInTouch: '연락처'
        }
    },
    en: {
        nav: {
            home: 'Home',
            about: 'About',
            categories: 'Categories',
        },
        explorer: {
            searchPlaceholder: 'Search posts...',
            filters: {
                category: 'Category',
                field: 'Field',
                topic: 'Topic',
                year: 'Year'
            },
            noResults: 'No posts found.',
            all: 'All'
        },
        home: {
            recentPosts: 'Recent Posts',
            recentComments: 'Recent Comments',
            noComments: 'No comments yet.',
            readOnGithub: 'Read on GitHub'
        },
        about: {
            title: 'About',
            contact: 'Contact',
            getInTouch: 'Get in Touch'
        }
    }
};

export type TranslationType = typeof translations.ko;
