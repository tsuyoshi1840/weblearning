// ============================================================
// header.js：「ヘッダー」に関する動作の教材データ
// ------------------------------------------------------------
// ・ここには教材（動作の見本）だけを書きます。サイト自身の描画は script.js。
// ・動作を追加する手順
//     1) 下の HEADER_GIFS に、GIFのリンクを1行足す
//     2) 下の HEADER_ACTIONS に、動作を1件足す（形は下の見本のとおり）
// ・削除は、その2か所から該当の行を消すだけ。
// ・今ある動作：メニューの開閉 / スクロールで隠れる / ハンバーガーメニュー
// ============================================================

// ===== GIFリンク置き場（どの動作のGIFかをコメントで書く）=====
const HEADER_GIFS = {
    toggle: 'gif/header-toggle.gif',       // メニューの開閉
    scroll: 'gif/header-scroll.gif',       // スクロールで隠れるヘッダー
    hamburger: 'gif/header-hamburger.gif',  // ハンバーガーメニュー
    shadow: 'gif/header-shadow.gif',     // スクロールで影をつける
    dropdown: 'gif/header-dropdown.gif', // ドロップダウンメニュー
    logo: 'gif/header-logo.gif',         // ロゴを押してトップへ戻る
    current: 'gif/header-current.gif',   // 今いるページを強調
    shrink: 'gif/header-shrink.gif',     // スクロールで縮むヘッダー
    search: 'gif/header-search.gif',     // 検索ボックスの開閉
    theme: 'gif/header-theme.gif',       // ダークモード切り替え
    notice: 'gif/header-notice.gif',     // お知らせバーを閉じる
    progress: 'gif/header-progress.gif', // 読み進み具合バー
    smooth: 'gif/header-smooth.gif'     // メニューでなめらかにジャンプ
};

// ===== ヘッダーの動作一覧（1動作＝1件）=====
// title：動作名 / lead：解説（3行） / code：html・css・js / gif：上のGIFリンク
const HEADER_ACTIONS = [
    {
        title: 'メニューの開閉',
        lead: [
            'ボタンを押すと、ヘッダーのメニューが隠れたり表示されたりします。',
            '仕組みは「Classを付け外しして、CSSで見た目を変える」だけです。',
            'JSは js- で始まるClassを目印に、対象の要素を取得します。'
        ],
        code: {
            html: `<header class="header js-header">
  <button class="js-menu-toggle">メニュー</button>
  <nav class="header-nav">…</nav>
</header>`,
            css: `.header-nav { display: flex; }
.header.is-min .header-nav { display: none; }`,
            js: `const btn = document.querySelector('.js-menu-toggle');
const header = document.querySelector('.js-header');
btn.addEventListener('click', () => {
  header.classList.toggle('is-min');
});`
        },
        gif: HEADER_GIFS.toggle
    },
    {
        title: 'スクロールで隠れるヘッダー',
        lead: [
            '下にスクロールするとヘッダーが隠れ、上に戻すと再び表示されます。',
            '前回のスクロール位置と今の位置を比べて、動いた向きを判断します。',
            '隠す動きは transform と transition で、なめらかにしています。'
        ],
        code: {
            html: `<header class="header js-header">
  …
</header>`,
            css: `.header {
  position: sticky;
  top: 0;
  transition: transform 0.3s;
}
.header.is-hidden { transform: translateY(-100%); }`,
            js: `const header = document.querySelector('.js-header');
let lastY = window.scrollY;

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  // 下へ動いていて、少しスクロールしたら隠す
  header.classList.toggle('is-hidden', y > lastY && y > 80);
  lastY = y;
});`
        },
        gif: HEADER_GIFS.scroll
    },
    {
        title: 'ハンバーガーメニュー',
        lead: [
            '☰ボタンを押すとメニューが開き、✕に変わります。もう一度押すと閉じます。',
            'スマホでよく見る定番のメニューで、基本は「Classの付け外し」です。',
            'aria-expanded を更新すると、読み上げソフトにも開閉状態が伝わります。'
        ],
        code: {
            html: `<header class="header">
  <button class="hamburger js-hamburger" aria-expanded="false">☰</button>
  <nav class="sp-nav js-sp-nav">…</nav>
</header>`,
            css: `.sp-nav { display: none; }
.sp-nav.is-open { display: block; }`,
            js: `const btn = document.querySelector('.js-hamburger');
const nav = document.querySelector('.js-sp-nav');

btn.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  btn.setAttribute('aria-expanded', String(isOpen));
  btn.textContent = isOpen ? '✕' : '☰';
});`
        },
        gif: HEADER_GIFS.hamburger
    },
    {
        title: 'スクロールで影をつける',
        lead: ['少しスクロールすると、ヘッダーに影がつきます。', '「今スクロール中」だと分かる、定番の演出です。', 'スクロール量を見て、Classを付け外しするだけです。'],
        code: {
            html: `<header class="header js-header">…</header>`,
            css: `.header.is-scrolled { box-shadow: 0 2px 8px rgba(0,0,0,.15); }`,
            js: `const header = document.querySelector('.js-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('is-scrolled', window.scrollY > 10);
});`
        },
        gif: HEADER_GIFS.shadow
    },
    {
        title: 'ドロップダウンメニュー',
        lead: ['ボタンを押すと、その下にサブメニューが開きます。', 'もう一度押すと閉じます。', 'hidden を切り替えるだけで作れます。'],
        code: {
            html: `<div class="dropdown">
  <button class="js-drop-btn">メニュー ▼</button>
  <ul class="drop-list js-drop-list" hidden>…</ul>
</div>`,
            css: `.dropdown { position: relative; }
.drop-list { position: absolute; top: 100%; }`,
            js: `const btn = document.querySelector('.js-drop-btn');
const list = document.querySelector('.js-drop-list');
btn.addEventListener('click', () => {
  list.hidden = !list.hidden;
});`
        },
        gif: HEADER_GIFS.dropdown
    },
    {
        title: 'ロゴを押してトップへ戻る',
        lead: ['ロゴを押すと、ページの先頭へなめらかに戻ります。', 'どのサイトにもある、基本の動きです。', 'リンクの通常動作は preventDefault で止めています。'],
        code: {
            html: `<a class="header-logo js-logo" href="#">ロゴ</a>`,
            css: `.header-logo { cursor: pointer; }`,
            js: `document.querySelector('.js-logo').addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});`
        },
        gif: HEADER_GIFS.logo
    },
    {
        title: '今いるページを強調する',
        lead: ['今開いているページのメニューだけ、太字などで目立たせます。', 'ページのファイル名と、リンク先を見比べて判定します。', '見た目の変更は Class に任せています。'],
        code: {
            html: `<a class="nav-link js-nav-link" href="index.html">TOP</a>`,
            css: `.nav-link.is-current { font-weight: bold; }`,
            js: `const here = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.js-nav-link').forEach((a) => {
  a.classList.toggle('is-current', a.getAttribute('href') === here);
});`
        },
        gif: HEADER_GIFS.current
    },
    {
        title: 'スクロールで縮むヘッダー',
        lead: ['スクロールすると、ヘッダーの余白が小さくなり画面を広く使えます。', '上に戻ると元の大きさに戻ります。', 'transition を付けると、なめらかに変化します。'],
        code: {
            html: `<header class="header js-header">…</header>`,
            css: `.header { padding: 1.5rem; transition: padding .3s; }
.header.is-small { padding: .4rem; }`,
            js: `const header = document.querySelector('.js-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('is-small', window.scrollY > 50);
});`
        },
        gif: HEADER_GIFS.shrink
    },
    {
        title: '検索ボックスの開閉',
        lead: ['虫めがねを押すと、検索ボックスが現れます。', '開いたときは、すぐ入力できるよう focus を当てます。', '普段は隠しておくと、ヘッダーがすっきりします。'],
        code: {
            html: `<button class="js-search-btn">🔍</button>
<input class="search-input js-search-input" type="search" hidden>`,
            css: `.search-input { width: 12rem; }`,
            js: `const btn = document.querySelector('.js-search-btn');
const input = document.querySelector('.js-search-input');
btn.addEventListener('click', () => {
  input.hidden = !input.hidden;
  if (!input.hidden) input.focus();
});`
        },
        gif: HEADER_GIFS.search
    },
    {
        title: 'ダークモード切り替え',
        lead: ['ボタンで、サイト全体の色をライト／ダークに切り替えます。', '色は CSS の変数で持ち、data-theme の値で入れ替えます。', 'JSは data-theme を書き換えるだけです。'],
        code: {
            html: `<html lang="ja" class="js-root">
  …
  <button class="js-theme-btn">🌓</button>`,
            css: `:root { --bg: #fff; --text: #333; }
:root[data-theme="dark"] { --bg: #222; --text: #eee; }
body { background: var(--bg); color: var(--text); }`,
            js: `const root = document.querySelector('.js-root');
document.querySelector('.js-theme-btn').addEventListener('click', () => {
  const dark = root.dataset.theme === 'dark';
  root.dataset.theme = dark ? 'light' : 'dark';
});`
        },
        gif: HEADER_GIFS.theme
    },
    {
        title: 'お知らせバーを閉じる',
        lead: ['ヘッダーの上のお知らせバーを、×ボタンで閉じます。', '閉じたあとは hidden で非表示になります。', 'キャンペーン告知などでよく使われます。'],
        code: {
            html: `<div class="notice js-notice">
  お知らせです <button class="js-notice-close">×</button>
</div>`,
            css: `.notice { background: #ffe9a8; padding: .5rem; }`,
            js: `document.querySelector('.js-notice-close').addEventListener('click', () => {
  document.querySelector('.js-notice').hidden = true;
});`
        },
        gif: HEADER_GIFS.notice
    },
    {
        title: '読み進み具合バー',
        lead: ['ページ上部に、どこまで読んだかを示すバーが伸びます。', '「スクロール量 ÷ ページの長さ」で割合を出します。', '割合をそのまま width にして表示します。'],
        code: {
            html: `<div class="progress js-progress"></div>`,
            css: `.progress { position: fixed; top: 0; left: 0; height: 4px; width: 0; background: #ff9a76; }`,
            js: `const bar = document.querySelector('.js-progress');
window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.width = (window.scrollY / max * 100) + '%';
});`
        },
        gif: HEADER_GIFS.progress
    },
    {
        title: 'メニューでなめらかにジャンプ',
        lead: ['メニューを押すと、目的の場所へなめらかに移動します。', 'リンク先は href の # から取り出します。', 'scrollIntoView に behavior: "smooth" を渡します。'],
        code: {
            html: `<a class="js-smooth" href="#about">About</a>
…
<section id="about">…</section>`,
            css: `html { scroll-padding-top: 4rem; } /* ヘッダーに隠れない余白 */`,
            js: `document.querySelectorAll('.js-smooth').forEach((a) => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});`
        },
        gif: HEADER_GIFS.smooth
    }
];
