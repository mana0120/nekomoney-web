'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';

export interface GlossaryEntry {
    date: string;
    source: string;
    word: string;
    yomi?: string;
    category?: string;
    text: string;
}

export default function DictionaryBrowser({ initialData }: { initialData: GlossaryEntry[] }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [selectedYomi, setSelectedYomi] = useState('');
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [displayCount, setDisplayCount] = useState(30); // 一度に表示する件数

    // フィルタリング条件が変わったら表示件数をリセットする
    useEffect(() => {
        setDisplayCount(30);
    }, [searchQuery, selectedCategory, selectedYomi]);

    // NEWバッジ用の今日の日付文字列（YYYY-MM-DD）
    const [todayStr, setTodayStr] = useState('');
    useEffect(() => {
        const today = new Date();
        const tzOffset = today.getTimezoneOffset() * 60000;
        const localISOTime = (new Date(Date.now() - tzOffset)).toISOString().split('T')[0];
        setTodayStr(localISOTime);
    }, []);

    // カテゴリ別件数を計算
    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = { ALL: initialData.length };
        initialData.forEach(item => {
            const cat = item.category || '生活・その他';
            counts[cat] = (counts[cat] || 0) + 1;
        });
        // 固定カテゴリの0件表示用
        const standardCategories = ['投資', '経済', '金融', '税金・制度', '企業', '人名', '生活・その他'];
        standardCategories.forEach(cat => {
            if (!(cat in counts)) counts[cat] = 0;
        });
        return counts;
    }, [initialData]);

    // フィルタリング処理
    const filteredData = useMemo(() => {
        let result = initialData;

        if (selectedCategory !== 'ALL') {
            result = result.filter(item => (item.category || '生活・その他') === selectedCategory);
        }

        if (selectedYomi) {
            if (selectedYomi === '英数字') {
                result = result.filter(item => /^[A-Za-z0-9]/.test(item.word || ''));
            } else {
                const rowMap: Record<string, RegExp> = {
                    'ア': /^[あ-おア-オ]/, 'カ': /^[か-ごカ-ゴ]/, 'サ': /^[さ-ぞサ-ゾ]/, 'タ': /^[た-どタ-ド]/, 'ナ': /^[な-のナ-ノ]/,
                    'ハ': /^[は-ぽハ-ポ]/, 'マ': /^[ま-もマ-モ]/, 'ヤ': /^[や-よヤ-ヨ]/, 'ラ': /^[ら-ろラ-ロ]/, 'ワ': /^[わ-んワ-ン]/
                };
                const regex = rowMap[selectedYomi];
                if (regex) {
                    result = result.filter(item => regex.test(item.yomi || ''));
                }
            }
            // 五十音選択時は名前順ソート
            result = [...result].sort((a, b) => (a.yomi || a.word).localeCompare(b.yomi || b.word, 'ja'));
        }

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(item =>
                item.word.toLowerCase().includes(q) ||
                item.text.toLowerCase().includes(q) ||
                (item.yomi && item.yomi.includes(q))
            );
        }

        return result;
    }, [initialData, selectedCategory, selectedYomi, searchQuery]);

    const categories = ['ALL', '投資', '経済', '金融', '税金・制度', '企業', '人名', '生活・その他'];
    const yomiRows = ['ア', 'カ', 'サ', 'タ', 'ナ', 'ハ', 'マ', 'ヤ', 'ラ', 'ワ', '英数字'];

    return (
        <div className="flex flex-col md:flex-row gap-8">

            {/* スマホ用トグルボタン */}
            <div className="md:hidden block mb-[-1rem]">
                <button
                    onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                    className="w-full flex items-center justify-between bg-white px-5 py-3.5 rounded-xl border border-slate-200 shadow-sm font-bold text-slate-800 transition-colors hover:bg-slate-50"
                >
                    <span className="flex items-center gap-2">🔍 検索・絞り込みオプション</span>
                    <span className="text-slate-500">{isMobileFilterOpen ? '▲ 閉じる' : '▼ 開く'}</span>
                </button>
            </div>

            {/* 絞り込みサイドバー */}
            <aside className={`w-full md:w-64 flex-shrink-0 space-y-6 ${isMobileFilterOpen ? 'block' : 'hidden md:block'}`}>

                {/* 検索窓 */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                    <h2 className="font-bold text-slate-800 mb-3 text-sm flex items-center gap-2">
                        <span>🔍</span> 用語を検索
                    </h2>
                    <input
                        type="text"
                        placeholder="キーワードや読みで検索..."
                        className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none text-sm bg-slate-50 transition-colors"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* カテゴリ */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                    <h2 className="font-bold text-slate-800 mb-3 text-sm flex items-center gap-2">
                        <span>📂</span> カテゴリ
                    </h2>
                    <ul className="space-y-1.5">
                        {categories.map(cat => (
                            categoryCounts[cat] > 0 || cat === 'ALL' ? (
                                <li key={cat}>
                                    <button
                                        onClick={() => { setSelectedCategory(cat); setSelectedYomi(''); setSearchQuery(''); }}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex justify-between items-center ${selectedCategory === cat
                                            ? 'bg-blue-50 text-blue-700 font-bold'
                                            : 'text-slate-600 hover:bg-slate-50'
                                            }`}
                                    >
                                        <span>{cat}</span>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${selectedCategory === cat ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
                                            {categoryCounts[cat] || 0}
                                        </span>
                                    </button>
                                </li>
                            ) : null
                        ))}
                    </ul>
                </div>

                {/* 五十音 */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                    <h2 className="font-bold text-slate-800 mb-3 text-sm flex items-center gap-2">
                        <span>🔤</span> 五十音・英数字で探す
                    </h2>
                    <div className="flex flex-wrap gap-1.5">
                        <button
                            onClick={() => setSelectedYomi('')}
                            className={`px-3 py-1.5 text-xs rounded-md border font-medium transition-colors w-full mb-1 ${selectedYomi === '' ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                                }`}
                        >
                            すべて
                        </button>
                        {yomiRows.map(row => (
                            <button
                                key={row}
                                onClick={() => setSelectedYomi(row)}
                                className={`w-10 h-10 flex items-center justify-center text-sm rounded-md border font-medium transition-colors ${selectedYomi === row ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                                    } ${row === '英数字' ? 'w-auto px-4 flex-1' : ''}`}
                            >
                                {row}
                            </button>
                        ))}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-4 leading-relaxed">
                        ※漢字の単語などは読み仮名が自動入力されていない場合があるため、見つからない時は検索窓をご活用ください。
                    </p>
                </div>
            </aside>

            {/* メインリスト */}
            <div className="flex-1">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
                    <h1 className="text-2xl font-bold text-slate-800">
                        {selectedCategory !== 'ALL' ? `${selectedCategory}` : 'すべての用語'}
                        {selectedYomi && <span className="text-blue-600 ml-2 text-xl hover:bg-blue-50 px-2 py-1 rounded cursor-pointer" onClick={() => setSelectedYomi('')}>({selectedYomi}行 ✕)</span>}
                    </h1>
                    <span className="text-slate-500 font-medium bg-white px-3 py-1 rounded-full border border-slate-200 text-sm shadow-sm">
                        {filteredData.length} 件
                    </span>
                </div>

                {filteredData.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-xl border border-slate-200 shadow-sm px-4">
                        <div className="text-4xl mb-4">😿</div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">対象の用語が見つかりませんでした</h3>
                        <p className="text-slate-500 text-sm">検索キーワードを変えるか、別の絞り込み条件をお試しください。</p>
                        <button
                            onClick={() => { setSearchQuery(''); setSelectedCategory('ALL'); setSelectedYomi(''); }}
                            className="mt-4 px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors"
                        >
                            条件をクリアする
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {filteredData.slice(0, displayCount).map((entry, index) => (
                            <Link
                                key={`${entry.word}-${index}`}
                                href={`/word/${encodeURIComponent(entry.word)}`}
                                className="bg-white group rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-slate-200 p-5 sm:p-6 flex flex-col h-full"
                            >
                                <div className="flex justify-between items-start mb-2 gap-4">
                                    <h2 className="text-xl sm:text-2xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors flex items-center flex-wrap gap-2">
                                        {entry.word}
                                        {todayStr && entry.date >= todayStr && (
                                            <span className="text-[10px] border border-rose-200 text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full font-medium tracking-wider relative -top-0.5">NEW</span>
                                        )}
                                    </h2>
                                    <span className="text-xs font-mono text-slate-400 shrink-0 mt-1">
                                        {entry.date}
                                    </span>
                                </div>

                                <div className="flex gap-2 mb-3">
                                    <span className="inline-block px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-md">
                                        {entry.category || '生活・その他'}
                                    </span>
                                </div>

                                <p className="text-slate-600 text-sm sm:text-base line-clamp-2 leading-relaxed mb-4">
                                    {entry.text}
                                </p>
                                <div className="mt-auto pt-2 flex items-center text-blue-600 text-sm font-bold border-t border-slate-100">
                                    <span className="mt-2">詳細を読む <span className="ml-1 group-hover:translate-x-1 transition-transform inline-block">→</span></span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* もっと見るボタン */}
                {filteredData.length > displayCount && (
                    <div className="mt-8 text-center">
                        <button
                            onClick={() => setDisplayCount(prev => prev + 30)}
                            className="inline-flex items-center justify-center px-6 py-3 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-blue-600 font-bold rounded-xl shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto min-w-[200px]"
                        >
                            もっと見る ({filteredData.length - displayCount}件) ▼
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
