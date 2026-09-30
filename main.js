// ============================================================
// main.js：「メイン」に関する動作の教材データ
// ------------------------------------------------------------
// ・ここには教材（動作の見本）だけを書きます。サイト自身の描画は script.js。
// ・動作を追加する手順
//     1) 下の MAIN_GIFS に、GIFのリンクを1行足す
//     2) 下の MAIN_ACTIONS に、動作を1件足す（形は header.js の見本と同じ）
// ・実際に動かせるデモを付けたいときは demo: { button: 'ボタン名', text: '出す内容' } を足す
// ・今ある動作：クリックで内容を表示
// ============================================================

// ===== GIFリンク置き場（どの動作のGIFかをコメントで書く）=====
const MAIN_GIFS = {
    panel: 'gif/main-panel.gif',  // クリックで内容を表示／非表示
    tab: 'gif/main-tab.gif',             // タブ切り替え
    accordion: 'gif/main-accordion.gif', // アコーディオン
    modal: 'gif/main-modal.gif',         // モーダルウィンドウ
    counter: 'gif/main-counter.gif',     // カウンター
    slider: 'gif/main-slider.gif',       // スライダー
    like: 'gif/main-like.gif',           // いいねボタン
    count: 'gif/main-count.gif',         // 入力文字数のカウント
    todo: 'gif/main-todo.gif',           // ToDoリスト
    filter: 'gif/main-filter.gif',       // 絞り込み検索
    fade: 'gif/main-fade.gif'           // スクロールでふわっと表示
};

// ===== メインの動作一覧（1動作＝1件）=====
const MAIN_ACTIONS = [
    {
        title: 'クリックで内容を表示',
        lead: [
            'ボタンを押すと、隠れていた内容が表示されます。もう一度押すと隠れます。',
            'FAQのような「たたむ・ひらく」表示に使われます。',
            'hidden 属性を切り替えるだけなので、CSSなしでも動きます。'
        ],
        code: {
            html: `<section class="panel">
  <button class="js-panel-btn">詳細を見る</button>
  <div class="panel-body js-panel-body" hidden>内容</div>
</section>`,
            css: `.panel-body { padding: 1rem; }`,
            js: `const btn = document.querySelector('.js-panel-btn');
const body = document.querySelector('.js-panel-body');
btn.addEventListener('click', () => {
  body.hidden = !body.hidden;
});`
        },
        demo: { button: '詳細を見る', text: 'これが「押されたら非表示→表示」の動きです！' },
        gif: MAIN_GIFS.panel
    },
    {
        title: 'タブ切り替え',
        lead: ['タブを押すと、対応する内容だけが表示されます。', 'ボタンと内容に同じ data-tab を付けて対応させます。', '選ばれたタブには is-active を付けて目立たせます。'],
        code: {
            html: `<button class="tab-btn js-tab-btn" data-tab="a">A</button>
<button class="tab-btn js-tab-btn" data-tab="b">B</button>
<div class="js-tab-body" data-tab="a">Aの内容</div>
<div class="js-tab-body" data-tab="b" hidden>Bの内容</div>`,
            css: `.tab-btn.is-active { background: #7ecfb3; }`,
            js: `const btns = document.querySelectorAll('.js-tab-btn');
const bodies = document.querySelectorAll('.js-tab-body');
btns.forEach((btn) => {
  btn.addEventListener('click', () => {
    btns.forEach((b) => b.classList.toggle('is-active', b === btn));
    bodies.forEach((p) => { p.hidden = p.dataset.tab !== btn.dataset.tab; });
  });
});`
        },
        gif: MAIN_GIFS.tab
    },
    {
        title: 'アコーディオン（1つだけ開く）',
        lead: ['質問を押すと答えが開き、ほかの答えは閉じます。', 'FAQページの定番の作りです。', '一度すべて閉じてから、押したものだけ開きます。'],
        code: {
            html: `<div class="acc-item js-acc-item">
  <button class="js-acc-btn">質問1</button>
  <div class="js-acc-body" hidden>答え1</div>
</div>
<!-- 同じ形を並べる -->`,
            css: `.acc-item { border-bottom: 1px solid #ddd; }`,
            js: `const items = document.querySelectorAll('.js-acc-item');
items.forEach((item) => {
  item.querySelector('.js-acc-btn').addEventListener('click', () => {
    const body = item.querySelector('.js-acc-body');
    const willOpen = body.hidden;
    items.forEach((i) => { i.querySelector('.js-acc-body').hidden = true; });
    body.hidden = !willOpen;
  });
});`
        },
        gif: MAIN_GIFS.accordion
    },
    {
        title: 'モーダルウィンドウ',
        lead: ['ボタンで、画面の上に小さなウィンドウを開きます。', '閉じるボタンか、Escキーで閉じられます。', '背景は position: fixed で画面全体に広げます。'],
        code: {
            html: `<button class="js-modal-open">開く</button>
<div class="modal js-modal" hidden>
  <div class="modal-box">
    <p>モーダルの中身</p>
    <button class="js-modal-close">閉じる</button>
  </div>
</div>`,
            css: `.modal { position: fixed; inset: 0; background: rgba(0,0,0,.5); display: grid; place-items: center; }
.modal[hidden] { display: none; }
.modal-box { background: #fff; padding: 1.5rem; border-radius: 12px; }`,
            js: `const modal = document.querySelector('.js-modal');
document.querySelector('.js-modal-open').addEventListener('click', () => { modal.hidden = false; });
document.querySelector('.js-modal-close').addEventListener('click', () => { modal.hidden = true; });
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') modal.hidden = true; });`
        },
        gif: MAIN_GIFS.modal
    },
    {
        title: 'カウンター（＋／－）',
        lead: ['＋を押すと増え、－を押すと減る数字です。', '変数に数を持たせて、表示を書き換えます。', 'JSの「状態を持つ」基本を学べます。'],
        code: {
            html: `<button class="js-minus">－</button>
<span class="count js-count">0</span>
<button class="js-plus">＋</button>`,
            css: `.count { font-size: 2rem; margin: 0 1rem; }`,
            js: `const out = document.querySelector('.js-count');
let n = 0;
document.querySelector('.js-plus').addEventListener('click', () => { out.textContent = ++n; });
document.querySelector('.js-minus').addEventListener('click', () => { out.textContent = --n; });`
        },
        gif: MAIN_GIFS.counter
    },
    {
        title: 'スライダー（前へ／次へ）',
        lead: ['ボタンで、表示する内容を順番に切り替えます。', '最後の次は最初に戻る、ループになっています。', '余りを求める % で、ループを作っています。'],
        code: {
            html: `<p class="slide js-slide">スライド1</p>
<button class="js-prev">←</button>
<button class="js-next">→</button>`,
            css: `.slide { font-size: 1.5rem; }`,
            js: `const slides = ['スライド1', 'スライド2', 'スライド3'];
const view = document.querySelector('.js-slide');
let i = 0;
const show = () => { view.textContent = slides[i]; };
document.querySelector('.js-next').addEventListener('click', () => { i = (i + 1) % slides.length; show(); });
document.querySelector('.js-prev').addEventListener('click', () => { i = (i - 1 + slides.length) % slides.length; show(); });`
        },
        gif: MAIN_GIFS.slider
    },
    {
        title: 'いいねボタン',
        lead: ['押すとハートが塗られ、数が1増えます。', 'もう一度押すと取り消されて、数が戻ります。', 'toggle の戻り値で、今の状態が分かります。'],
        code: {
            html: `<button class="like-btn js-like">♡ 0</button>`,
            css: `.like-btn.is-liked { background: #ff6b81; }`,
            js: `const btn = document.querySelector('.js-like');
let n = 0;
btn.addEventListener('click', () => {
  const liked = btn.classList.toggle('is-liked');
  n += liked ? 1 : -1;
  btn.textContent = (liked ? '♥ ' : '♡ ') + n;
});`
        },
        gif: MAIN_GIFS.like
    },
    {
        title: '入力文字数のカウント',
        lead: ['入力するたびに、今の文字数が表示されます。', 'SNSやフォームでよく見る動きです。', 'input イベントで、入力のたびに処理します。'],
        code: {
            html: `<textarea class="js-input" maxlength="100"></textarea>
<p><span class="js-len">0</span> / 100</p>`,
            css: `textarea { width: 100%; }`,
            js: `const input = document.querySelector('.js-input');
const len = document.querySelector('.js-len');
input.addEventListener('input', () => {
  len.textContent = input.value.length;
});`
        },
        gif: MAIN_GIFS.count
    },
    {
        title: 'ToDoリスト',
        lead: ['入力して追加ボタンを押すと、リストに項目が増えます。', '項目を押すと削除されます。', 'createElement で、要素をJSから作っています。'],
        code: {
            html: `<input class="js-todo-input">
<button class="js-todo-add">追加</button>
<ul class="js-todo-list"></ul>`,
            css: `.todo-item { cursor: pointer; }`,
            js: `const input = document.querySelector('.js-todo-input');
const list = document.querySelector('.js-todo-list');
document.querySelector('.js-todo-add').addEventListener('click', () => {
  if (!input.value.trim()) return;
  const li = document.createElement('li');
  li.className = 'todo-item';
  li.textContent = input.value;
  li.addEventListener('click', () => li.remove());
  list.appendChild(li);
  input.value = '';
});`
        },
        gif: MAIN_GIFS.todo
    },
    {
        title: '絞り込み検索',
        lead: ['入力した文字を含む項目だけが表示されます。', '文字を消すと、すべて元に戻ります。', '大文字・小文字をそろえて比べています。'],
        code: {
            html: `<input class="js-filter" placeholder="検索">
<ul>
  <li class="item js-item">HTML</li>
  <li class="item js-item">CSS</li>
  <li class="item js-item">JavaScript</li>
</ul>`,
            css: `.item { padding: .3rem 0; }`,
            js: `const items = document.querySelectorAll('.js-item');
document.querySelector('.js-filter').addEventListener('input', (e) => {
  const word = e.target.value.toLowerCase();
  items.forEach((li) => {
    li.hidden = !li.textContent.toLowerCase().includes(word);
  });
});`
        },
        gif: MAIN_GIFS.filter
    },
    {
        title: 'スクロールでふわっと表示',
        lead: ['画面に入ったタイミングで、内容がふわっと現れます。', '画面に入ったかの判定は、IntersectionObserver が担当します。', '動きそのものは、CSSの transition です。'],
        code: {
            html: `<section class="fade js-fade">…</section>`,
            css: `.fade { opacity: 0; transform: translateY(20px); transition: .6s; }
.fade.is-show { opacity: 1; transform: none; }`,
            js: `const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) e.target.classList.add('is-show');
  });
});
document.querySelectorAll('.js-fade').forEach((el) => io.observe(el));`
        },
        gif: MAIN_GIFS.fade
    }
];
