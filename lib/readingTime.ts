// Calculate reading time based on word count
export function calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
}

// Format reading time with emoji
export function formatReadingTime(minutes: number, lang: 'ko' | 'en' = 'ko'): string {
    if (lang === 'ko') {
        return `☕ ${minutes}분`;
    }
    return `☕ ${minutes} min`;
}
