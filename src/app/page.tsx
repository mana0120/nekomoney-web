import { getGlossaryData } from '@/lib/data';
import DictionaryBrowser from '@/components/DictionaryBrowser';

export default function Home() {
    const glossaryList = getGlossaryData();

    return (
        <div className="max-w-5xl mx-auto">
            <DictionaryBrowser initialData={glossaryList} />
        </div>
    );
}
