import fs from 'fs';
import path from 'path';

export interface GlossaryEntry {
    date: string;
    source: string;
    word: string;
    yomi?: string;
    category?: string;
    text: string;
}

// Gドライブのローカルパスを直接指定 (Next.jsのサーバーサイド処理で読み込みます)
const DATA_FILE_PATH = 'G:\\マイドライブ\\Antigravity\\NekowakaMoney\\src\\data\\web_archives\\glossary.jsonl';

export function getGlossaryData(): GlossaryEntry[] {
    try {
        if (!fs.existsSync(DATA_FILE_PATH)) {
            console.warn(`[WARN] Data file not found at: ${DATA_FILE_PATH}`);
            return [];
        }

        // JSONLファイルを読み込む
        const fileContent = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
        const lines = fileContent.split('\n').filter(line => line.trim() !== '');

        const entries: GlossaryEntry[] = lines.map(line => {
            try {
                return JSON.parse(line) as GlossaryEntry;
            } catch (e) {
                console.error("[ERROR] Failed to parse JSONL line:", line);
                return null;
            }
        }).filter((entry): entry is GlossaryEntry => entry !== null);

        // 新しい順（日付の降順）でソート
        return entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    } catch (error) {
        console.error("[ERROR] Could not read glossary data:", error);
        return [];
    }
}
