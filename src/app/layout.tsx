import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import Script from 'next/script';
import AdBanner from '@/components/AdBanner';

export const metadata: Metadata = {
    title: 'ネコでもわかる金融・経済用語辞典',
    description: '毎日のニュースから学べる金融・経済・ビジネス用語辞典',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ja">
            <head>
                {/* Google Analytics (GA4) */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-MHYD4JGE5Y"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'G-MHYD4JGE5Y');
                    `}
                </Script>
            </head>
            <body className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
                <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                    <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                        <Link href="/" className="text-[15px] sm:text-xl font-bold gap-1 sm:gap-2 text-slate-800 hover:text-blue-600 transition-colors flex items-center tracking-tight sm:tracking-normal leading-none shrink-0">
                            <span className="text-xl sm:text-2xl pb-0.5">🐱</span>
                            ネコでもわかる金融・経済用語辞典
                        </Link>
                        <div className="flex items-center gap-3">
                            <Link
                                href="/contact"
                                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                                aria-label="ご意見・リクエスト"
                            >
                                <span className="hidden sm:inline">📮 リクエスト</span>
                                <span className="sm:hidden">📮</span>
                            </Link>
                            <a
                                href="https://x.com/nekowakamoney"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold text-white bg-slate-800 hover:bg-slate-700 rounded-full transition-colors shadow-sm"
                                aria-label="X (Twitter) 公式アカウント"
                            >
                                <span className="text-base leading-none">𝕏</span>
                                <span className="hidden sm:inline">公式アカウント</span>
                            </a>
                        </div>
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
                        <div className="flex flex-wrap justify-center gap-4 text-sm mt-4">
                            <Link href="/about" className="hover:text-blue-400 transition-colors">運営者情報</Link>
                            <Link href="/privacy" className="hover:text-blue-400 transition-colors">プライバシーポリシー</Link>
                            <Link href="/contact" className="hover:text-blue-400 transition-colors">ご意見・リクエスト</Link>
                        </div>
                        <p className="pt-4 border-t border-slate-700/50">© {new Date().getFullYear()} Nekomoney. All rights reserved.</p>
                    </div>
                </footer>
            </body>
        </html>
    );
}
