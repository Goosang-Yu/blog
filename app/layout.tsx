import type { Metadata } from 'next';
import './globals.css';
import 'katex/dist/katex.min.css';
import Sidebar from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'My Tech Blog',
  description: 'A blog about technology and learning.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="layout">
          <Sidebar />
          <main className="content">{children}</main>
        </div>
      </body>
    </html>
  );
}
