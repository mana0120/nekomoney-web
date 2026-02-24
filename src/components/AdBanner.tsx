'use client';

import React, { useEffect, useState } from 'react';

interface AdBannerProps {
    /** A8.netからコピーしたタグ（HTML文字列）をそのままここに貼り付けます */
    htmlContent?: string;
    /** タグ未設定時のプレースホルダーテキスト */
    placeholderText?: string;
    className?: string;
}

/**
 * A8.net等のアフィリエイトタグ（HTML文字列）を安全に表示するためのコンポーネント
 * 
 * Next.jsのハイドレーションエラー（サーバーとクライアントでHTMLの不一致が起こるエラー）
 * を防ぐため、クライアントサイドでのみ広告をレンダリングします。
 */
export default function AdBanner({ htmlContent, placeholderText = '広告スペース', className = '' }: AdBannerProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const baseClassName = `w-full flex flex-col items-center justify-center overflow-hidden ${className}`;

    // サーバーサイドレンダリング時（またはマウント前）はプレースホルダーを表示
    if (!isMounted) {
        return (
            <div className={`${baseClassName} min-h-[100px] bg-slate-100 border border-slate-200 rounded`}>
                <span className="text-slate-400 text-sm font-medium animate-pulse">Loading ad...</span>
            </div>
        );
    }

    // 広告タグ（HTML）が設定されている場合は表示
    if (htmlContent) {
        return (
            <div
                className={`${baseClassName} ad-container`}
                dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
        );
    }

    // 広告用HTMLがまだ渡されていない時は初期のプレースホルダーを表示
    return (
        <div className={`${baseClassName} min-h-[90px] p-4 bg-slate-200 border border-slate-300 border-dashed rounded text-slate-500 text-sm shadow-inner group`}>
            <span className="font-bold text-slate-400 group-hover:text-slate-600 transition-colors">
                【{placeholderText}】
            </span>
            <span className="text-xs mt-2 text-slate-400">
                src/components/AdBanner.tsx または利用箇所にA8のタグを設定してください
            </span>
        </div>
    );
}
