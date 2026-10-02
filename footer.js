// ============================================================
// footer.js：「フッター」に関する動作の教材データ
// ------------------------------------------------------------
// ・ここには教材（動作の見本）だけを書きます。サイト自身の描画は script.js。
// ・動作を追加する手順
//     1) 下の FOOTER_GIFS に、GIFのリンクを1行足す
//     2) 下の FOOTER_ACTIONS に、動作を1件足す（形は header.js の見本と同じ）
// ・今ある動作は、下の FOOTER_ACTIONS を参照
// ============================================================

// ===== GIFリンク置き場（どの動作のGIFかをコメントで書く）=====
const FOOTER_GIFS = {
    top: 'gif/footer-top.gif',  // ページの先頭へなめらかに戻る
    topbtn: 'gif/footer-topbtn.gif',     // スクロールで現れるトップへ戻るボタン
    year: 'gif/footer-year.gif',         // コピーライトの年を自動表示
    sticky: 'gif/footer-sticky.gif',     // フッターを常に下に置く
    bottom: 'gif/footer-bottom.gif',     // 一番下に着いたらメッセージ
    mail: 'gif/footer-mail.gif',         // メールアドレスの入力チェック
    copyurl: 'gif/footer-copyurl.gif',   // ページのURLをコピー
    links: 'gif/footer-links.gif',       // リンク集の開閉
    updated: 'gif/footer-updated.gif',   // 最終更新日を自動表示
    fontsize: 'gif/footer-fontsize.gif', // 文字サイズの変更
    read: 'gif/footer-read.gif',         // 読了バッジ
    share: 'gif/footer-share.gif',            // SNSで共有するボタン
    print: 'gif/footer-print.gif',            // 印刷ボタン
    cookie: 'gif/footer-cookie.gif',          // Cookie同意バナー
    visitor: 'gif/footer-visitor.gif',        // 訪問回数の表示
    datetime: 'gif/footer-datetime.gif',      // 現在の日時を表示（毎秒更新）
    scrollpercent: 'gif/footer-scrollpercent.gif',// スクロールの進み具合（％）
    contrast: 'gif/footer-contrast.gif',      // 見やすい配色に切り替える
    helpful: 'gif/footer-helpful.gif',        // 「役に立ちましたか？」ボタン
    extlink: 'gif/footer-extlink.gif'         // 外部リンクに印をつける
};

// ===== フッターの動作一覧（1動作＝1件）=====
// genre：ジャンル / recommend: true で「おすすめ」に表示（省略可）。形は header.js の見本を参照
const FOOTER_ACTIONS = [
    {
        title: 'ページの先頭へ戻る',
        genre: 'ナビゲーション',
        recommend: true,   // 「おすすめ」に表示（不要なら、この行を消す）
        lead: [
            'ページの一番下のボタンで、なめらかに先頭へ戻ります。',
            '長いページでよく使われる、定番の動作です。',
            'window.scrollTo に behavior: "smooth" を指定するのがポイントです。'
        ],
        code: {
            html: `<footer class="footer">
  <button class="js-top-btn">ページ上部へ</button>
</footer>`,
            css: `.footer { text-align: center; }`,
            js: `document.querySelector('.js-top-btn')
  .addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });`
        },
        gif: FOOTER_GIFS.top
    },
    {
        title: 'スクロールで現れるトップへ戻るボタン',
        genre: 'ナビゲーション',
        lead: ['少しスクロールすると、右下に「↑」ボタンが現れます。', '押すと、ページの先頭へなめらかに戻ります。', '位置は position: fixed で画面に固定します。'],
        code: {
            html: `<button class="to-top js-to-top" hidden>↑</button>`,
            css: `.to-top { position: fixed; right: 1rem; bottom: 1rem; }
.to-top[hidden] { display: none; }`,
            js: `const btn = document.querySelector('.js-to-top');
window.addEventListener('scroll', () => { btn.hidden = window.scrollY < 300; });
btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));`
        },
        gif: FOOTER_GIFS.topbtn
    },
    {
        title: 'コピーライトの年を自動表示',
        genre: '自動表示',
        recommend: true,   // 「おすすめ」に表示（不要なら、この行を消す）
        lead: ['「©」の後ろの年が、今年に自動で変わります。', '毎年の書き換えを忘れずに済みます。', 'new Date() で、今の日付を取得します。'],
        code: {
            html: `<footer class="footer">© <span class="js-year"></span> My Site</footer>`,
            css: `.footer { text-align: center; }`,
            js: `document.querySelector('.js-year').textContent = new Date().getFullYear();`
        },
        gif: FOOTER_GIFS.year
    },
    {
        title: 'フッターを常に下に置く',
        genre: '見た目・レイアウト',
        lead: ['内容が少ないページでも、フッターが画面の下に付きます。', 'JSは使わず、CSSだけで実現します。', 'main に flex: 1 を指定して、余白を埋めさせます。'],
        code: {
            html: `<div class="page">
  <main class="main">…</main>
  <footer class="footer">…</footer>
</div>`,
            css: `.page { min-height: 100vh; display: flex; flex-direction: column; }
.main { flex: 1; }`,
            js: `// JSは不要です（CSSだけで動きます）`
        },
        gif: FOOTER_GIFS.sticky
    },
    {
        title: '一番下に着いたらメッセージ',
        genre: 'スクロール連動',
        lead: ['ページの最後までスクロールすると、メッセージが現れます。', '「画面の高さ＋スクロール量」がページの高さに届いたら最後です。', '離れると、また隠れます。'],
        code: {
            html: `<p class="end-msg js-end-msg" hidden>最後まで読んでくれてありがとう！</p>`,
            css: `.end-msg { text-align: center; }`,
            js: `const msg = document.querySelector('.js-end-msg');
window.addEventListener('scroll', () => {
  const bottom = window.innerHeight + window.scrollY;
  const atEnd = bottom >= document.documentElement.scrollHeight - 5;
  msg.hidden = !atEnd;
});`
        },
        gif: FOOTER_GIFS.bottom
    },
    {
        title: 'メールアドレスの入力チェック',
        genre: '入力・フォーム',
        lead: ['メールアドレスを入れて登録を押すと、形式をチェックします。', 'まちがいなら、その場でメッセージを出します。', '形の判定には、正規表現を使っています。'],
        code: {
            html: `<input class="js-mail" type="email">
<button class="js-mail-send">登録</button>
<p class="mail-msg js-mail-msg"></p>`,
            css: `.mail-msg { color: #d33; }`,
            js: `const input = document.querySelector('.js-mail');
const msg = document.querySelector('.js-mail-msg');
document.querySelector('.js-mail-send').addEventListener('click', () => {
  const ok = /^[^ @]+@[^ @]+[.][^ @]+$/.test(input.value);
  msg.textContent = ok ? '登録しました！' : 'メールアドレスを確認してください';
});`
        },
        gif: FOOTER_GIFS.mail
    },
    {
        title: 'ページのURLをコピー',
        genre: 'コピー・共有',
        lead: ['ボタンを押すと、今見ているページのURLをコピーできます。', 'コピー後は、ボタンの文字で結果を伝えます。', 'location.href が、今のURLです。'],
        code: {
            html: `<button class="js-copy-url">このページのURLをコピー</button>`,
            css: `.footer button { margin: .5rem; }`,
            js: `const btn = document.querySelector('.js-copy-url');
btn.addEventListener('click', async () => {
  await navigator.clipboard.writeText(location.href);
  btn.textContent = 'コピーしました ✓';
});`
        },
        gif: FOOTER_GIFS.copyurl
    },
    {
        title: 'リンク集の開閉',
        genre: '開閉',
        lead: ['「リンク集」を押すと、フッターの中にリンクが開きます。', 'ふだんは畳んでおくと、フッターがすっきりします。', '開閉に合わせて、矢印の向きも変えています。'],
        code: {
            html: `<button class="js-links-btn">リンク集 ▼</button>
<ul class="js-links-list" hidden>
  <li><a href="#">リンク1</a></li>
</ul>`,
            css: `.footer ul { list-style: none; padding: 0; }`,
            js: `const btn = document.querySelector('.js-links-btn');
const list = document.querySelector('.js-links-list');
btn.addEventListener('click', () => {
  list.hidden = !list.hidden;
  btn.textContent = list.hidden ? 'リンク集 ▼' : 'リンク集 ▲';
});`
        },
        gif: FOOTER_GIFS.links
    },
    {
        title: '最終更新日を自動表示',
        genre: '自動表示',
        lead: ['ページの最終更新日が、自動で表示されます。', '手で日付を書き換える必要がありません。', 'document.lastModified が、ファイルの更新時刻です。'],
        code: {
            html: `<p class="updated">最終更新：<span class="js-updated"></span></p>`,
            css: `.updated { font-size: .85rem; }`,
            js: `const date = new Date(document.lastModified);
document.querySelector('.js-updated').textContent = date.toLocaleDateString('ja-JP');`
        },
        gif: FOOTER_GIFS.updated
    },
    {
        title: '文字サイズの変更',
        genre: '見た目・レイアウト',
        lead: ['小・中・大のボタンで、ページの文字サイズが変わります。', 'ボタンの data-size に、割合を持たせています。', 'ページ全体の文字サイズは、一番外側のタグで決めます。'],
        code: {
            html: `<html lang="ja" class="js-root">
  …
  <button class="js-font" data-size="90">小</button>
  <button class="js-font" data-size="100">中</button>
  <button class="js-font" data-size="120">大</button>`,
            css: `.js-root { font-size: 100%; }`,
            js: `const root = document.querySelector('.js-root');
document.querySelectorAll('.js-font').forEach((btn) => {
  btn.addEventListener('click', () => {
    root.style.fontSize = btn.dataset.size + '%';
  });
});`
        },
        gif: FOOTER_GIFS.fontsize
    },
    {
        title: '読了バッジ',
        genre: 'スクロール連動',
        lead: ['ページの一番下まで読むと、「読了」バッジが現れます。', '一度出たら、そのまま残ります。', '役目を終えたら、removeEventListener で見張りを止めます。'],
        code: {
            html: `<p class="read-badge js-read" hidden>✅ 読了！</p>`,
            css: `.read-badge { text-align: center; font-weight: bold; }`,
            js: `const badge = document.querySelector('.js-read');
const check = () => {
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5) {
    badge.hidden = false;
    window.removeEventListener('scroll', check);
  }
};
window.addEventListener('scroll', check);`
        },
        gif: FOOTER_GIFS.read
    },
    {
        title: 'SNSで共有するボタン',
        genre: 'コピー・共有',
        lead: ['ボタンを押すと、今のページをXで共有する画面が開きます。', 'URLとタイトルは、encodeURIComponent で安全な文字に変換して渡します。', '共有先ごとに、URLの決まった書き方があります。'],
        code: {
            html: `<button class="js-share-x">Xで共有</button>`,
            css: `.footer button { margin: .5rem; }`,
            js: `document.querySelector('.js-share-x').addEventListener('click', () => {
  const url = 'https://x.com/intent/post'
    + '?url=' + encodeURIComponent(location.href)
    + '&text=' + encodeURIComponent(document.title);
  window.open(url, '_blank', 'noopener');
});`
        },
        gif: FOOTER_GIFS.share
    },
    {
        title: '印刷ボタン',
        genre: 'コピー・共有',
        lead: ['ボタンを押すと、ブラウザの印刷画面が開きます。', 'window.print() を呼ぶだけで動きます。', '印刷のときだけボタンを隠すには、CSSの @media print を使います。'],
        code: {
            html: `<button class="print-btn js-print">このページを印刷</button>`,
            css: `@media print {
  .print-btn { display: none; }
}`,
            js: `document.querySelector('.js-print').addEventListener('click', () => {
  window.print();
});`
        },
        gif: FOOTER_GIFS.print
    },
    {
        title: 'Cookie同意バナー',
        genre: '開閉',
        lead: ['初めて来た人にだけ、画面の下にバナーが出ます。', '「同意する」を押すと、その記録をブラウザに残して、次からは出ません。', '記録には localStorage（ブラウザの保存領域）を使っています。'],
        code: {
            html: `<div class="cookie js-cookie" hidden>
  このサイトでは Cookie を使用します。
  <button class="js-cookie-ok">同意する</button>
</div>`,
            css: `.cookie {
  position: fixed; left: 0; right: 0; bottom: 0;
  background: #333; color: #fff; padding: 1rem;
}
.cookie[hidden] { display: none; }`,
            js: `const banner = document.querySelector('.js-cookie');

if (localStorage.getItem('cookie-ok') !== 'yes') banner.hidden = false;

document.querySelector('.js-cookie-ok').addEventListener('click', () => {
  localStorage.setItem('cookie-ok', 'yes');
  banner.hidden = true;
});`
        },
        gif: FOOTER_GIFS.cookie
    },
    {
        title: '訪問回数の表示',
        genre: '自動表示',
        lead: ['このブラウザで、何回目の訪問かを表示します。', '回数は localStorage に保存して、開くたびに1ずつ増やします。', '保存できない環境では動かないので、try で守ると安心です。'],
        code: {
            html: `<p class="visit">あなたは <span class="js-visit">1</span> 回目の訪問です</p>`,
            css: `.visit { font-size: .85rem; }`,
            js: `const out = document.querySelector('.js-visit');

try {
  const n = Number(localStorage.getItem('visit-count') || 0) + 1;
  localStorage.setItem('visit-count', n);
  out.textContent = n;
} catch (e) {
  out.textContent = '?'; // 保存が使えない環境
}`
        },
        gif: FOOTER_GIFS.visitor
    },
    {
        title: '現在の日時を表示（毎秒更新）',
        genre: '自動表示',
        lead: ['現在の日付と時刻を表示して、1秒ごとに更新します。', 'setInterval で、同じ処理を繰り返しています。', 'toLocaleString("ja-JP") で、日本の形式の表記になります。'],
        code: {
            html: `<p class="clock js-clock"></p>`,
            css: `.clock { font-variant-numeric: tabular-nums; }`,
            js: `const clock = document.querySelector('.js-clock');
const tick = () => {
  clock.textContent = new Date().toLocaleString('ja-JP');
};

tick();                   // 開いた瞬間にも表示
setInterval(tick, 1000);  // 以降は1秒ごと`
        },
        gif: FOOTER_GIFS.datetime
    },
    {
        title: 'スクロールの進み具合（％）',
        genre: 'スクロール連動',
        lead: ['ページのどこまで読んだかを、「42%」のように数字で表示します。', '「スクロール量 ÷ スクロールできる長さ」で割合を出します。', 'ページが短いときは、0で割らないよう確認しています。'],
        code: {
            html: `<span class="percent js-percent">0%</span>`,
            css: `.percent { position: fixed; left: 1rem; bottom: 1rem; }`,
            js: `const out = document.querySelector('.js-percent');

const update = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const p = max > 0 ? Math.round(window.scrollY / max * 100) : 0;
  out.textContent = p + '%';
};

window.addEventListener('scroll', update);
update();`
        },
        gif: FOOTER_GIFS.scrollpercent
    },
    {
        title: '見やすい配色に切り替える',
        genre: '見た目・レイアウト',
        lead: ['ボタンで、白と黒のはっきりした配色に切り替えます。', 'Classを付け外しして、CSSの色を一括で変えています。', '見えにくさに配慮した機能は、誰にとっても使いやすくなります。'],
        code: {
            html: `<html lang="ja" class="js-root">
  …
  <button class="js-contrast">見やすい配色</button>`,
            css: `.is-contrast body { background: #000; color: #fff; }
.is-contrast a { color: #ff0; }`,
            js: `const root = document.querySelector('.js-root');

document.querySelector('.js-contrast').addEventListener('click', () => {
  root.classList.toggle('is-contrast');
});`
        },
        gif: FOOTER_GIFS.contrast
    },
    {
        title: '「役に立ちましたか？」ボタン',
        genre: '入力・フォーム',
        lead: ['「はい」「いいえ」を押すと、お礼のメッセージに変わります。', '押したあとは、ボタンごと置き換えて、二重に押せないようにします。', '集計するには、サーバーに送る仕組みが別に必要です。'],
        code: {
            html: `<div class="helpful js-helpful">
  <p>このページは役に立ちましたか？</p>
  <button class="js-helpful-btn">はい</button>
  <button class="js-helpful-btn">いいえ</button>
</div>`,
            css: `.helpful { text-align: center; }`,
            js: `const box = document.querySelector('.js-helpful');

document.querySelectorAll('.js-helpful-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    box.textContent = 'ご回答ありがとうございました！';
  });
});`
        },
        gif: FOOTER_GIFS.helpful
    },
    {
        title: '外部リンクに印をつける',
        genre: '自動表示',
        lead: ['自分のサイト以外へのリンクに、自動で「↗」の印を付けます。', 'リンク先のドメイン（hostname）が、今のサイトと違うかを比べています。', '外へ出ると分かるので、親切な作りになります。'],
        code: {
            html: `<a class="js-link" href="/about">サイト内</a>
<a class="js-link" href="https://example.com">外部サイト</a>`,
            css: `.is-external::after { content: " ↗"; }`,
            js: `document.querySelectorAll('.js-link').forEach((a) => {
  if (a.hostname !== location.hostname) {
    a.classList.add('is-external');
    a.target = '_blank';
    a.rel = 'noopener';
  }
});`
        },
        gif: FOOTER_GIFS.extlink
    }
];
