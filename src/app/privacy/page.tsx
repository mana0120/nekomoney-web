import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'プライバシーポリシー | ネコでもわかる金融・経済用語辞典',
    description: '当サイトのプライバシーポリシー（個人情報保護方針）についてご案内します。',
};

export default function PrivacyPolicyPage() {
    return (
        <div className="max-w-3xl mx-auto py-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-8 border-b pb-4">プライバシーポリシー</h1>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-8">

                <section>
                    <h2 className="text-xl font-bold text-slate-800 mb-4 border-l-4 border-blue-600 pl-3">個人情報の利用目的</h2>
                    <p className="text-slate-600 leading-relaxed">
                        当サイトでは、お問い合わせやご要望などをいただく際に、名前（ハンドルネーム）やメールアドレス等の個人情報をご登録いただく場合がございます。これらの個人情報は、質問に対する回答や必要な情報を電子メールなどでご連絡する場合に利用させていただくものであり、個人情報をご提供いただく際の目的以外では利用いたしません。
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 mb-4 border-l-4 border-blue-600 pl-3">広告の配信について</h2>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        当サイトは、第三者配信の広告サービス（Google AdSense 等）を利用する予定、あるいは利用しています。このような広告配信事業者は、ユーザーの興味に応じた商品やサービスの広告を表示するため、当サイトや他サイトへのアクセスに関する情報 『Cookie』(氏名、住所、メール アドレス、電話番号は含まれません) を使用することがあります。
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                        また、Google AdSenseに関して、このプロセスの詳細やこのような情報が広告配信事業者に使用されないようにする方法については、<a href="https://policies.google.com/technologies/ads?gl=jp" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">こちら</a>をご覧ください。
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 mb-4 border-l-4 border-blue-600 pl-3">アクセス解析ツールについて</h2>
                    <p className="text-slate-600 leading-relaxed">
                        当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 mb-4 border-l-4 border-blue-600 pl-3">免責事項</h2>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        当サイトからのリンクやバナーなどで移動したサイトで提供される情報、サービス等について一切の責任を負いません。
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                        また当サイトのコンテンツ・情報について、できる限り正確な情報を提供するように努めておりますが、正確性や安全性を保証するものではありません。情報が古くなっていることもございます。当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 mb-4 border-l-4 border-blue-600 pl-3">プライバシーポリシーの変更について</h2>
                    <p className="text-slate-600 leading-relaxed">
                        当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本ポリシーの内容を適宜見直しその改善に努めます。修正された最新のプライバシーポリシーは常に本ページにて開示されます。
                    </p>
                </section>

            </div>
        </div>
    );
}
