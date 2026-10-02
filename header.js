// ============================================================
// header.js：「ヘッダー」に関する動作の教材データ
// ------------------------------------------------------------
// ・ここには教材（動作の見本）だけを書きます。サイト自身の描画は script.js。
// ・動作を追加する手順
//     1) 下の HEADER_GIFS に、GIFのリンクを1行足す
//     2) 下の HEADER_ACTIONS に、動作を1件足す（形は下の見本のとおり）
// ・削除は、その2か所から該当の行を消すだけ。
// ・今ある動作は、下の HEADER_ACTIONS を参照
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
    smooth: 'gif/header-smooth.gif',     // メニューでなめらかにジャンプ
    sidebar: 'gif/header-sidebar.gif',        // サイドメニュー（横からスライド）
    outside: 'gif/header-outside.gif',        // メニューの外を押して閉じる
    hover: 'gif/header-hover.gif',            // ホバーで開くメニュー
    spy: 'gif/header-spy.gif',                // スクロール位置に合わせてメニューを強調
    blur: 'gif/header-blur.gif',              // スクロールで背景が透明から不透明に
    breadcrumb: 'gif/header-breadcrumb.gif',  // パンくずリストを自動で作る
    accent: 'gif/header-accent.gif'           // テーマカラーの切り替え
};

// ===== ヘッダーの動作一覧（1動作＝1件）=====
// title：動作名 / genre：ジャンル（索引の見出しになる） / recommend：true で「おすすめ」に表示（省略可） / lead：解説（3行） / code：html・css・js / gif：上のGIFリンク
// ※同じジャンルの動作は、自動で隣り合って表示されます（ジャンルの並びは、最初に登場した順）
const HEADER_ACTIONS = [
    {
        title: 'メニューの開閉',
        genre: '開閉',
        recommend: true,   // 「おすすめ」に表示（不要なら、この行を消す）
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
        genre: 'スクロール連動',
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
        genre: '開閉',
        recommend: true,   // 「おすすめ」に表示（不要なら、この行を消す）
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
        genre: 'スクロール連動',
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
        genre: '開閉',
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
        genre: 'ナビゲーション',
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
        genre: 'ナビゲーション',
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
        genre: 'スクロール連動',
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
        genre: '開閉',
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
        genre: '見た目・レイアウト',
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
        genre: '開閉',
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
        genre: 'スクロール連動',
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
        genre: 'ナビゲーション',
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
    },
    {
        title: 'サイドメニュー（横からスライド）',
        genre: '開閉',
        lead: ['ボタンを押すと、メニューが画面の横からスライドして現れます。', '閉じるボタンか、暗い背景を押すと元に戻ります。', 'translateX の移動を transition でなめらかにしています。'],
        code: {
            html: `<button class="js-side-open">☰ メニュー</button>
<div class="side-bg js-side-bg" hidden></div>
<nav class="side-menu js-side-menu">
  <button class="js-side-close">✕ 閉じる</button>
  <a href="#">リンク1</a>
</nav>`,
            css: `.side-menu {
  position: fixed; top: 0; left: 0;
  height: 100%; width: 16rem; background: #fff;
  transform: translateX(-100%);
  transition: transform .3s;
}
.side-menu.is-open { transform: translateX(0); }
.side-bg { position: fixed; inset: 0; background: rgba(0,0,0,.4); }`,
            js: `const menu = document.querySelector('.js-side-menu');
const bg = document.querySelector('.js-side-bg');
const open = () => { menu.classList.add('is-open'); bg.hidden = false; };
const close = () => { menu.classList.remove('is-open'); bg.hidden = true; };

document.querySelector('.js-side-open').addEventListener('click', open);
document.querySelector('.js-side-close').addEventListener('click', close);
bg.addEventListener('click', close);`
        },
        gif: HEADER_GIFS.sidebar
    },
    {
        title: 'メニューの外を押して閉じる',
        genre: '開閉',
        lead: ['メニューを開いたあと、メニューの外を押すと自動で閉じます。', '押した場所がメニューの中かどうかを、contains で調べます。', 'ドロップダウンやポップアップで、よく使われる動きです。'],
        code: {
            html: `<div class="dropdown js-drop">
  <button class="js-drop-btn">メニュー ▼</button>
  <ul class="drop-list js-drop-list" hidden>…</ul>
</div>`,
            css: `.dropdown { position: relative; }
.drop-list { position: absolute; top: 100%; }`,
            js: `const drop = document.querySelector('.js-drop');
const list = document.querySelector('.js-drop-list');

document.querySelector('.js-drop-btn').addEventListener('click', () => {
  list.hidden = !list.hidden;
});
document.addEventListener('click', (e) => {
  // 押した場所が drop の外なら閉じる
  if (!drop.contains(e.target)) list.hidden = true;
});`
        },
        gif: HEADER_GIFS.outside
    },
    {
        title: 'ホバーで開くメニュー',
        genre: '開閉',
        lead: ['マウスを重ねるとメニューが開き、離すと閉じます。', 'mouseenter と mouseleave の2つのイベントを使います。', 'スマホにはマウスがないので、本番ではタップで開く方法も用意しておきましょう。'],
        code: {
            html: `<div class="hover-menu js-hover">
  <span>メニュー ▼</span>
  <ul class="hover-list js-hover-list" hidden>…</ul>
</div>`,
            css: `.hover-menu { position: relative; display: inline-block; }
.hover-list { position: absolute; top: 100%; }`,
            js: `const area = document.querySelector('.js-hover');
const list = document.querySelector('.js-hover-list');

area.addEventListener('mouseenter', () => { list.hidden = false; });
area.addEventListener('mouseleave', () => { list.hidden = true; });`
        },
        gif: HEADER_GIFS.hover
    },
    {
        title: 'スクロール位置に合わせてメニューを強調',
        genre: 'スクロール連動',
        lead: ['今見ている場所のメニューが、自動で目立ちます。', '各セクションが画面に入ったかを、IntersectionObserver で見張ります。', '目次付きの長いページで、現在位置が分かりやすくなります。'],
        code: {
            html: `<a class="spy-link js-spy-link" href="#a">A</a>
<a class="spy-link js-spy-link" href="#b">B</a>

<section class="js-spy-section" id="a">…</section>
<section class="js-spy-section" id="b">…</section>`,
            css: `.spy-link.is-active { font-weight: bold; color: #e8590c; }`,
            js: `const links = document.querySelectorAll('.js-spy-link');

const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    links.forEach((a) => {
      a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id);
    });
  });
}, { rootMargin: '-40% 0px -50% 0px' }); // 画面の真ん中あたりに来たら反応

document.querySelectorAll('.js-spy-section').forEach((s) => io.observe(s));`
        },
        gif: HEADER_GIFS.spy
    },
    {
        title: 'スクロールで背景が透明から不透明に',
        genre: 'スクロール連動',
        lead: ['ページの一番上では、ヘッダーの背景が透明です。', '少しスクロールすると、背景が白くなって文字が読みやすくなります。', 'background の色を transition で変えて、なめらかにしています。'],
        code: {
            html: `<header class="header js-header">…</header>`,
            css: `.header { background: transparent; transition: background .3s; }
.header.is-solid { background: #fff; }`,
            js: `const header = document.querySelector('.js-header');
const update = () => {
  header.classList.toggle('is-solid', window.scrollY > 40);
};
window.addEventListener('scroll', update);
update(); // 読み込み直後にも一度実行`
        },
        gif: HEADER_GIFS.blur
    },
    {
        title: 'パンくずリストを自動で作る',
        genre: 'ナビゲーション',
        lead: ['今いる場所を、「ホーム ＞ 教材 ＞ ○○」の形で自動表示します。', 'URLのパスを「/」で区切って、順にリンクにしています。', 'ページを足しても、パンくずを書き直さずに済みます。'],
        code: {
            html: `<nav class="breadcrumb js-breadcrumb"></nav>`,
            css: `.breadcrumb a::after { content: " ＞ "; }
.breadcrumb a:last-child::after { content: ""; }`,
            js: `const nav = document.querySelector('.js-breadcrumb');
const parts = location.pathname.split('/').filter(Boolean); // 例：["kyozai", "scroll"]

const items = [['ホーム', '/']];
let path = '/';
parts.forEach((p) => {
  path += p + '/';
  items.push([decodeURIComponent(p), path]);
});

items.forEach(([name, href]) => {
  const a = document.createElement('a');
  a.textContent = name; // textContent なら、安全に「文字」として表示される
  a.href = href;
  nav.appendChild(a);
});`
        },
        gif: HEADER_GIFS.breadcrumb
    },
    {
        title: 'テーマカラーの切り替え',
        genre: '見た目・レイアウト',
        lead: ['ボタンで、サイトの強調色（アクセントカラー）を変えます。', '色は CSS の変数に入れておき、JSでは変数の値だけを書き換えます。', '1か所を変えるだけで、ボタンやリンクの色が一斉に変わります。'],
        code: {
            html: `<html lang="ja" class="js-root">
  …
  <button class="js-color" data-color="#ff9a76">オレンジ</button>
  <button class="js-color" data-color="#7ecfb3">ミント</button>
  <button class="js-color" data-color="#7aa7ff">ブルー</button>`,
            css: `:root { --accent: #ff9a76; }
.btn { background: var(--accent); }
.link { color: var(--accent); }`,
            js: `const root = document.querySelector('.js-root');

document.querySelectorAll('.js-color').forEach((btn) => {
  btn.addEventListener('click', () => {
    root.style.setProperty('--accent', btn.dataset.color);
  });
});`
        },
        gif: HEADER_GIFS.accent
    }
];
