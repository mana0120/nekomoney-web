import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'ご意見・リクエスト | ネコでもわかる金融・経済用語辞典',
    description: 'ネコでもわかる金融・経済用語辞典へのご意見、用語追加のリクエストはこちらから受け付けています。',
};

export default function ContactPage() {
    return (
        <div className="max-w-3xl mx-auto py-8">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-800 mb-4">📮 ご意見・リクエストBOX</h1>
                <p className="text-slate-600">
                    用語の追加リクエストや、機能のご要望、サイトへのご意見などを以下のフォームからお気軽にお送りください！
                </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative" style={{ minHeight: '800px' }}>
                {/* 
                    Googleフォームの仕様上、スマホなどでもはみ出さないように 
                    幅を100%に設定し、高さを少し余裕を持たせています。
                */}
                <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLScDV8YxHhgKyGr0ouY_3NhV1BxQcNO1JND8fobYjceENsFeCg/viewform?embedded=true"
                    className="absolute top-0 left-0 w-full h-full border-0"
                    title="ご意見・リクエストフォーム"
                >
                    読み込んでいます…
                </iframe>
            </div>

            <div className="text-center mt-8">
                <a href="/" className="inline-block px-6 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors">
                    トップページにゃもどる
                </a>
            </div>
        </div>
    );
}
