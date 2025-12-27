---
title: "The making of this blog"
date: "2025-12-26"
description: "Sharing the journey and trial-and-error in building a premium blog with AI pairing."
category: "dev"
tags: ["nextjs", "creation-story", "ai-pairing"]
field: "logging"
lang: "en"
translationId: "hello-world"
---

This is the very first post on my new blog, documenting how this digital space came to life. This blog was built through a close collaboration between Next.js 15 and an AI assistant.

## 🚀 The Creation Journey

The project started with a simple idea: "Build a space that is minimal yet powerful."

1.  **Laying the Foundation**: Initialized the project with Next.js App Router and set up a system that translates Markdown files into dynamic content.
2.  **Multilingual System**: Instead of relying on heavy libraries, I custom-designed a bilingual (KO/EN) system using React Context, tailored specifically for this blog's needs.
3.  **UI/UX Advancement**: Applied Glassmorphism effects to the sidebar, optimized layouts for mobile, and introduced a refined color palette with blue accents.
4.  **Filter Innovation**: Moved away from simple year-based clicking to a sophisticated 'Year Range' filter, allowing users to define their own search duration.

## 🚧 Trial, Error, and Resolutions

Behind every polished feature, there were moments of trial and error.

-   **Mobile Alignment**: When the sidebar moved to the top on mobile, elements like categories and language switchers wouldn't align vertically. After fine-tuning CSS Flexbox and media queries, I achieved pixel-perfect alignment across all resolutions.
-   **Simplifying Metadata**: Initially, there were too many classification fields like 'Topic' and 'Field'. This led to management overhead. By removing 'Topic' and strengthening the 'Tag' system, I created a much more intuitive browsing experience.
-   **Search vs. Filters**: I focused heavily on optimization using `useMemo` to ensure that search and multi-filtering work seamlessly without performance drops.

## ✨ Current Characteristics

-   **Minimal & Premium**: A design philosophy that strips away distractions to focus on text readability and clean aesthetics.
-   **Fast Performance**: Leveraging Static Site Generation (SSG) for near-instant page loads.
-   **User-Centric Navigation**: Tools like the Tags Explorer and granular filters make it easy to find specific information even as the post count grows.

## 🔮 Future Improvements

This blog will continue to evolve.

-   **Smooth Animations**: Plan to integrate tools like Framer Motion for more elegant page transitions.
-   **Advanced Search**: Aiming for more accurate results by analyzing post content beyond just titles and descriptions.
-   **Refined Dark Mode**: Building upon the current system to create an even more eye-comforting dark theme.

Thank you for being part of this journey. I look forward to sharing more knowledge and experiences in this space!
