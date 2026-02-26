import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '運営者情報 | ネコでもわかる金融・経済用語辞典',
    description: '当サイトの運営者情報および免責事項についてご案内します。',
};

export default function AboutPage() {
    return (
        <div className="max-w-3xl mx-auto py-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-8 border-b pb-4">運営者情報</h1>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-8">

                <section>
                    <h2 className="text-xl font-bold text-slate-800 mb-4 border-l-4 border-blue-600 pl-3">当サイトについて</h2>
                    <p className="text-slate-600 leading-relaxed">
                        「ネコでもわかる金融・経済用語辞典」は、毎日のニュースに登場する難解な経済・ビジネス用語を、可能な限り分かりやすい言葉で解説することを目的とした用語解説サイトです。
                        主に若手社会人や就職活動中の学生の方々に向けて、経済ニュースの読み解きや業界研究の一助となるようなコンテンツ作りを目指しています。
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 mb-4 border-l-4 border-blue-600 pl-3">運営情報</h2>
                    <ul className="text-slate-600 space-y-2 list-none">
                        <li><strong>運営者：</strong> ネコでもわかる運営局</li>
                        <li><strong>お問い合わせ：</strong> <a href="/contact" className="text-blue-600 hover:underline">ご意見・リクエストBOXより</a></li>
                        <li><strong>公式X（旧Twitter）：</strong> <a href="https://x.com/nekowakamoney" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">@nekowakamoney</a></li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 mb-4 border-l-4 border-blue-600 pl-3">免責事項</h2>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        当サイトに掲載されている金融・経済・投資などの用語解説や関連情報は、一般的な知識の提供を目的としており、特定の投資商品の勧誘や売買の推奨を目的としたものではありません。
                    </p>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        当サイトの情報を用いて行う一切の行為、および被った損害・損失に対して、当サイトの運営者は一切の責任を負いかねます。各種制度のご利用や投資に関する最終的な決定は、必ずご自身の判断と自己責任で行っていただきますようお願いいたします。
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                        当サイトの情報の正確性には万全を期しておりますが、法令や解釈の変更等により、情報が古くなる場合や誤りが含まれる可能性もございます。あらかじめご了承ください。
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 mb-4 border-l-4 border-blue-600 pl-3">著作権について</h2>
                    <p className="text-slate-600 leading-relaxed">
                        当サイトに存在する、文章・画像等の著作物の情報を無断転載することを禁じます。
                    </p>
                </section>

            </div>
        </div>
    );
}
