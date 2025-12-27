# Goosang-Yu Blog Creation Journey 🚀

This project is a premium blog built through collaboration between **Next.js** and **Antigravity (AI Coding Assistant)**. This guide explains how this blog was planned, built, and provides a step-by-step process for reproduction.

## 🛠 Tech Stack
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules (Vanilla CSS logic)
- **Content**: Markdown (Gray-matter, Remark, Rehype)
- **Deployment**: Vercel
- **Internationalization**: Custom Context-based Language Switcher (KO/EN)

---

## 🎨 Creation Journey & Prompts

This blog evolved continuously through pair programming with AI, going beyond simple code generation. Here are the core concepts and prompts used during the major stages.

### 1. Initial Architecture
Requested the AI to design the foundation of the blog.
> **Prompt Concept**: "Create a blog project using Next.js 15 App Router and TypeScript with multi-language support (KO/EN). Posts should be rendered by reading Markdown files from the `/posts` folder, and category/tag filtering should be possible."

### 2. UI/UX Refinement (The "Antigravity" Touch)
Given specific instructions for a premium design beyond basic functionality.
- **Glassmorphism & Layout**: "Apply a glassmorphism effect to the sidebar and fix it to the top on mobile. The overall theme needs a sophisticated blend of dark and light modes."
- **Interactive Elements**: "Implement the language switcher not as a simple button, but as a premium toggle or dropdown with smooth sliding/animations."
- **Filter Optimization**: "Instead of clicking individual years in the post list, add a feature to filter by range using 'Start Year' and 'End Year' inputs."

### 3. Metadata & Cleanup
Reduced unnecessary complexity and focused on the core experience.
- **Topic Removal**: "Delete the 'Topic' field across the entire system, removing it from all post frontmatter and the filter UI. Instead, make the tag (`tags`) system more robust."

---

## 🏗 Manual Steps (Not Automated)

Manual steps that were either not automated by AI or required direct user control.

1.  **Project Initialization**:
    ```bash
    npx create-next-app@latest ./ --typescript --tailwind --eslint
    ```
    (Note: In actual implementation, custom styling was done using CSS Modules rather than Tailwind.)
2.  **Deployment Setup on Vercel**:
    - Connected the GitHub repository to Vercel.
    - Verified build settings to prevent potential caching issues during deployment.
3.  **Environment Variables**:
    - Manually entered required environment variables (like `NEXT_PUBLIC_...`) and API keys in the Vercel dashboard before deploying.
4.  **Content Management**:
    - Wrote actual Markdown files under the `/posts` folder and uploaded images to `/public/images/posts`.

---

## 🏁 How to Use & Reproduce

Follow these steps if you want to make this blog your own.

1.  **Clone & Install**:
    ```bash
    git clone [your-repo-url]
    npm install
    ```
2.  **Content Customization**:
    - Edit the Markdown files in the `/posts` folder to add your own content.
3.  **Local Development**:
    ```bash
    npm run dev
    ```
4.  **Deployment**:
    - Push to GitHub, then create and connect a Vercel project.

---

## ✨ Key Features Summary
- ✅ **Year Range Filter**: Browse posts by specific time periods.
- ✅ **Tag Explorer**: Dedicated page to aggregate and search all tags.
- ✅ **Clean UI**: Removed category badges for a clean, text-focused readability.
- ✅ **Global Footer**: Integrated global footer with copyright and multi-language support.

---
*Created with 💙 by Antigravity AI & Goosang-Yu*

