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

// プロジェクト内のデータを参照 (Vercel等のサーバーサイドで読み込むため)
const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'glossary.jsonl');

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

        // JSONLの末尾により新しい単語が追加されるため、反転してから日付で安定ソートする
        entries.reverse();
        return entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    } catch (error) {
        console.error("[ERROR] Could not read glossary data:", error);
        return [];
    }
}
