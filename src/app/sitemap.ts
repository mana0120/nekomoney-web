import { MetadataRoute } from 'next';
import { getGlossaryData } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://nekomoney-web.vercel.app';
    const entries = getGlossaryData();

    // 用語ページのURLリスト
    const wordUrls = entries.map((entry) => ({
        url: `${baseUrl}/word/${encodeURIComponent(entry.word)}`,
        lastModified: new Date(entry.date),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    // 固定ページのURLリスト
    const staticUrls = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        },
    ];

    return [...staticUrls, ...wordUrls];
}
