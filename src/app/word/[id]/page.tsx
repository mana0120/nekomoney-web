import { getGlossaryData } from '@/lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AdBanner from '@/components/AdBanner';
import { ReactNode } from 'react';

// 本文をパースしてリンク付きのReactNode配列に変換するユーティリティ関数
function parseTextWithLinks(text: string, glossaryWords: string[]): ReactNode[] {
    if (!text || glossaryWords.length === 0) return [text];

    // 文字数が多い順にソート（部分一致を防ぐため。「金融緩和」を「金」より先にマッチさせる）
    const sortedWords = [...glossaryWords].sort((a, b) => b.length - a.length);

    // 正規表現のエスケープ処理
    const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // 全単語をORで繋いだ正規表現を構築
    const pattern = new RegExp(`(${sortedWords.map(escapeRegExp).join('|')})`, 'g');

    const result: ReactNode[] = [];
    let lastIndex = 0;

    // 最初の1回だけリンク化するためのセット
    const linkedWords = new Set<string>();

    let match;
    while ((match = pattern.exec(text)) !== null) {
        // マッチ箇所より前のテキストを追加
        if (match.index > lastIndex) {
            result.push(text.slice(lastIndex, match.index));
        }

        const matchedWord = match[0];
        // 1回だけリンク化する（何度も同じページに飛ばさない）
        if (!linkedWords.has(matchedWord)) {
            linkedWords.add(matchedWord);
            result.push(
                <Link
                    key={`link-${match.index}`}
                    href={`/word/${encodeURIComponent(matchedWord)}`}
                    className="text-blue-600 hover:text-blue-800 underline decoration-blue-200 hover:decoration-blue-400 underline-offset-4 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm transition-colors"
                    title={`${matchedWord} の解説を見る`}
                >
                    {matchedWord}
                </Link>
            );
        } else {
            // すでにリンク化した場合は普通のテキストとして扱う
            result.push(matchedWord);
        }

        lastIndex = pattern.lastIndex;
    }

    // 残りのテキストを追加
    if (lastIndex < text.length) {
        result.push(text.slice(lastIndex));
    }

    return result;
}

export async function generateStaticParams() {
    const entries = getGlossaryData();
    return entries.map((entry) => ({
        id: entry.word,
    }));
}

export default function WordPage({ params }: { params: { id: string } }) {
    const decodedWord = decodeURIComponent(params.id);
    const entries = getGlossaryData();
    const entry = entries.find(e => e.word === decodedWord);

    if (!entry) {
        notFound();
    }

    // 関連ワード（同じカテゴリから自身を除きシャッフルして最大4件取得）
    const relatedWords = entries
        .filter(e => e.category === entry.category && e.word !== entry.word)
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);

    // このページ（自分自身）以外のすべての単語リストを作成
    const otherWords = entries
        .map(e => e.word)
        .filter(word => word !== entry.word);

    // 解説文をリンク付きノードに変換
    const contentNodes = parseTextWithLinks(entry.text, otherWords);

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-6">
                <Link href="/" scroll={false} className="inline-flex items-center text-blue-600 hover:text-blue-800 gap-1.5 text-sm font-medium bg-white px-3 py-1.5 rounded-full border border-blue-100 shadow-sm transition-colors">
                    <span>←</span> トップページに戻る
                </Link>
            </div>

            <article className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-100 px-6 sm:px-8 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">{entry.word}</h1>
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-100 text-blue-700">
                            {entry.category || '生活・その他'}
                        </span>
                        {entry.source === 'news' && (
                            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-100 text-amber-700">
                                ニュース解説
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col sm:items-end mt-4 sm:mt-0 text-right">
                        <span className="text-sm font-mono text-slate-600 font-bold">{entry.date} <span className="text-xs font-normal text-slate-400 ml-1">時点の情報です</span></span>
                    </div>
                </div>

                <div className="px-6 sm:px-8 py-8 sm:py-10">
                    <div className="prose prose-slate max-w-none prose-p:leading-loose prose-p:text-slate-700 prose-p:text-base sm:prose-p:text-[17px]">
                        <p className="whitespace-pre-wrap">{contentNodes}</p>
                    </div>
                </div>
            </article>

            {/* 関連ワードセクション */}
            {relatedWords.length > 0 && (
                <div className="mt-12 mb-8">
                    <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <span className="text-2xl">📚</span> 関連する用語
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {relatedWords.map((relatedEntry, idx) => (
                            <Link
                                key={idx}
                                href={`/word/${encodeURIComponent(relatedEntry.word)}`}
                                className="bg-white group rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-slate-200 p-5 flex flex-col h-full"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                                        {relatedEntry.word}
                                    </h3>
                                </div>
                                <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
                                    {relatedEntry.text}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* 記事下 広告枠 */}
            <div className="mt-12 mb-8">
                {/* 記事下用の大きなタグをここに設定 */}
                <AdBanner placeholderText="記事下 広告スペース（大型バナー等）" className="min-h-[250px]" />
            </div>
        </div>
    );
}
