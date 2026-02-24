import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';

export const metadata: Metadata = {
    title: '猫でもわかるマネー用語辞典',
    description: '毎日のニュースから学べる金融・経済・ビジネス用語辞典',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ja">
            <body className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
                <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                    <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                        <Link href="/" className="text-xl font-bold gap-2 text-slate-800 hover:text-blue-600 transition-colors flex items-center">
                            <span className="text-2xl">🐱</span>
                            猫でもわかるマネー用語辞典
                        </Link>
                    </div>
                </header>

                {/* 広告枠 (ヘッダー下) */}
                <div className="container mx-auto px-4 py-4 mt-4">
                    {/* ここにA8のタグ文字列を htmlContent="<a href=...>...</a>" のように渡すことで動作します */}
                    <AdBanner placeholderText="Google AdSense / A8.net ヘッダー下" />
                </div>

                <main className="flex-1 container mx-auto px-4 py-8">
                    {children}
                </main>

                <footer className="bg-slate-800 text-slate-400 py-8 text-center text-sm">
                    <div className="container mx-auto px-4 max-w-4xl space-y-4">
                        <p className="text-xs text-slate-500 leading-relaxed">
                            【免責事項】当サイトに掲載されている金融・経済・投資などの用語解説や関連情報は、一般的な知識の提供を目的としており、特定の投資商品の勧誘や売買の推奨を目的としたものではありません。投資に関する最終的な決定は、ご自身の判断と自己責任で行っていただきますようお願いいたします。情報の内容については正確性を期しておりますが、それを保証するものではありません。
                        </p>
                        <p>© {new Date().getFullYear()} Nekomoney. All rights reserved.</p>
                    </div>
                </footer>
            </body>
        </html>
    );
}
