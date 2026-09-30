// ============================================================
// footer.js：「フッター」に関する動作の教材データ
// ------------------------------------------------------------
// ・ここには教材（動作の見本）だけを書きます。サイト自身の描画は script.js。
// ・動作を追加する手順
//     1) 下の FOOTER_GIFS に、GIFのリンクを1行足す
//     2) 下の FOOTER_ACTIONS に、動作を1件足す（形は header.js の見本と同じ）
// ・今ある動作：ページの先頭へ戻る
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
    read: 'gif/footer-read.gif'         // 読了バッジ
};

// ===== フッターの動作一覧（1動作＝1件）=====
const FOOTER_ACTIONS = [
    {
        title: 'ページの先頭へ戻る',
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
        lead: ['ページの最後までスクロールすると、メッセージが現れます。', '「画面の高さ＋スクロール量」がページの高さに届いたら最後です。', '離れると、また隠れます。'],
        code: {
            html: `<p class="end-msg js-end-msg" hidden>最後まで読んでくれてありがとう！</p>`,
            css: `.end-msg { text-align: center; }`,
            js: `const msg = document.querySelector('.js-end-msg');
window.addEventListener('scroll', () => {
  const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5;
  msg.hidden = !atEnd;
});`
        },
        gif: FOOTER_GIFS.bottom
    },
    {
        title: 'メールアドレスの入力チェック',
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
    }
];
