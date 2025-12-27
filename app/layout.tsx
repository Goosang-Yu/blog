import type { Metadata } from 'next';
import './globals.css';
import 'katex/dist/katex.min.css';
import Sidebar from '@/components/Sidebar';
import { LanguageProvider } from '@/components/LanguageContext';

export const metadata: Metadata = {
  title: 'Goosang\'s Blog',
  description: 'A blog about technology and learning.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <LanguageProvider>
          <div className="layout">
            <Sidebar />
            <main className="content">{children}</main>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
