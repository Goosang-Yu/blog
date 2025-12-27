// Category color theme mapping
export const categoryColors: { [key: string]: string } = {
    biology: '#10b981',
    생물학: '#10b981',
    math: '#f59e0b',
    수학: '#f59e0b',
    dev: '#0070f3',
    개발: '#0070f3',
    cook: '#ef4444',
    요리: '#ef4444',
};

// Field color mapping
export const fieldColors: { [key: string]: string } = {
    theory: '#8b5cf6',
    이론: '#8b5cf6',
    background: '#10b981',
    배경지식: '#10b981',
    logging: '#06b6d4',
    로그: '#06b6d4',
    recipe: '#ef4444',
    레시피: '#ef4444',
};

// Category emoji mapping
export const categoryEmojis: { [key: string]: string } = {
    biology: '🧬',
    생물학: '🧬',
    math: '📐',
    수학: '📐',
    dev: '💻',
    개발: '💻',
    cook: '🍳',
    요리: '🍳',
};

export function getCategoryColor(category: string): string {
    return categoryColors[category.toLowerCase()] || '#6b7280'; // default gray
}

export function getFieldColor(field: string): string {
    return fieldColors[field.toLowerCase()] || '#6b7280'; // default gray
}

export function getCategoryEmoji(category: string): string {
    return categoryEmojis[category.toLowerCase()] || '📄';
}
