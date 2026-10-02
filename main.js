// ============================================================
// main.js：「メイン」に関する動作の教材データ
// ------------------------------------------------------------
// ・ここには教材（動作の見本）だけを書きます。サイト自身の描画は script.js。
// ・動作を追加する手順
//     1) 下の MAIN_GIFS に、GIFのリンクを1行足す
//     2) 下の MAIN_ACTIONS に、動作を1件足す（形は header.js の見本と同じ）
// ・実際に動かせるデモを付けたいときは demo: { button: 'ボタン名', text: '出す内容' } を足す
// ・今ある動作は、下の MAIN_ACTIONS を参照
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
    fade: 'gif/main-fade.gif',           // スクロールでふわっと表示
    readmore: 'gif/main-readmore.gif',        // もっと見る（続きを読む）
    tooltip: 'gif/main-tooltip.gif',          // ツールチップ（補足の吹き出し）
    details: 'gif/main-details.gif',          // details タグだけで開閉（JSなし）
    allopen: 'gif/main-allopen.gif',          // すべて開く／すべて閉じる
    flip: 'gif/main-flip.gif',                // カードを裏返す
    switch: 'gif/main-switch.gif',            // トグルスイッチ（ON／OFF）
    radio: 'gif/main-radio.gif',              // ラジオボタンで表示を切り替え
    view: 'gif/main-view.gif',                // リスト表示／グリッド表示の切り替え
    timer: 'gif/main-timer.gif',              // ストップウォッチ
    rating: 'gif/main-rating.gif',            // 星評価
    progress: 'gif/main-progress.gif',        // 進捗バー（ボタンで進む）
    dice: 'gif/main-dice.gif',                // サイコロ
    password: 'gif/main-password.gif',        // パスワードの表示／非表示
    validate: 'gif/main-validate.gif',        // 必須入力のチェック
    autosize: 'gif/main-autosize.gif',        // 入力に合わせて欄が広がる
    sum: 'gif/main-sum.gif',                  // 合計の自動計算
    strength: 'gif/main-strength.gif',        // パスワードの強さ表示
    countup: 'gif/main-countup.gif',          // スクロールで数字がカウントアップ
    parallax: 'gif/main-parallax.gif'         // パララックス（背景がゆっくり動く）
};

// ===== メインの動作一覧（1動作＝1件）=====
// genre：ジャンル / recommend: true で「おすすめ」に表示（省略可）。形は header.js の見本を参照
const MAIN_ACTIONS = [
    {
        title: 'クリックで内容を表示',
        genre: '開閉',
        recommend: true,   // 「おすすめ」に表示（不要なら、この行を消す）
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
        genre: '切り替え',
        recommend: true,   // 「おすすめ」に表示（不要なら、この行を消す）
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
        genre: '開閉',
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
        genre: '開閉',
        recommend: true,   // 「おすすめ」に表示（不要なら、この行を消す）
        lead: ['ボタンで、画面の上に小さなウィンドウを開きます。', '閉じるボタンか、Escキーで閉じられます。', '背景は position: fixed で画面全体に広げます。'],
        code: {
            html: `<button class="js-modal-open">開く</button>
<div class="modal js-modal" hidden>
  <div class="modal-box">
    <p>モーダルの中身</p>
    <button class="js-modal-close">閉じる</button>
  </div>
</div>`,
            css: `.modal {
  position: fixed; inset: 0; background: rgba(0,0,0,.5);
  display: grid; place-items: center;
}
.modal[hidden] { display: none; }
.modal-box { background: #fff; padding: 1.5rem; border-radius: 12px; }`,
            js: `const modal = document.querySelector('.js-modal');
document.querySelector('.js-modal-open').addEventListener('click', () => {
  modal.hidden = false;
});
document.querySelector('.js-modal-close').addEventListener('click', () => {
  modal.hidden = true;
});
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') modal.hidden = true;
});`
        },
        gif: MAIN_GIFS.modal
    },
    {
        title: 'カウンター（＋／－）',
        genre: '数・状態',
        lead: ['＋を押すと増え、－を押すと減る数字です。', '変数に数を持たせて、表示を書き換えます。', 'JSの「状態を持つ」基本を学べます。'],
        code: {
            html: `<button class="js-minus">－</button>
<span class="count js-count">0</span>
<button class="js-plus">＋</button>`,
            css: `.count { font-size: 2rem; margin: 0 1rem; }`,
            js: `const out = document.querySelector('.js-count');
let n = 0;
document.querySelector('.js-plus').addEventListener('click', () => {
  out.textContent = ++n;
});
document.querySelector('.js-minus').addEventListener('click', () => {
  out.textContent = --n;
});`
        },
        gif: MAIN_GIFS.counter
    },
    {
        title: 'スライダー（前へ／次へ）',
        genre: '切り替え',
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
document.querySelector('.js-next').addEventListener('click', () => {
  i = (i + 1) % slides.length;
  show();
});
document.querySelector('.js-prev').addEventListener('click', () => {
  i = (i - 1 + slides.length) % slides.length;
  show();
});`
        },
        gif: MAIN_GIFS.slider
    },
    {
        title: 'いいねボタン',
        genre: '数・状態',
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
        genre: '入力・フォーム',
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
        genre: '入力・フォーム',
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
        genre: '入力・フォーム',
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
        genre: 'スクロール連動',
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
    },
    {
        title: 'もっと見る（続きを読む）',
        genre: '開閉',
        lead: ['長い文章の続きを、ボタンで開いたり閉じたりします。', 'ボタンの文字も、開閉に合わせて「もっと見る」「閉じる」に変わります。', '最初は短く見せておくと、ページがすっきりします。'],
        code: {
            html: `<p>最初に見える文章です。</p>
<p class="more-body js-more-body" hidden>続きの文章です。</p>
<button class="js-more-btn">もっと見る</button>`,
            css: `.more-body { color: #555; }`,
            js: `const body = document.querySelector('.js-more-body');
const btn = document.querySelector('.js-more-btn');

btn.addEventListener('click', () => {
  body.hidden = !body.hidden;
  btn.textContent = body.hidden ? 'もっと見る' : '閉じる';
});`
        },
        gif: MAIN_GIFS.readmore
    },
    {
        title: 'ツールチップ（補足の吹き出し）',
        genre: '開閉',
        lead: ['マウスを重ねたり、キーボードで選んだりすると、補足が吹き出しで出ます。', '吹き出しは、普段は hidden で隠しておきます。', 'focus でも表示すると、キーボード操作の人にも伝わります。'],
        code: {
            html: `<span class="tip js-tip">
  <button class="js-tip-btn">?</button>
  <span class="tip-text js-tip-text" hidden>補足の説明です</span>
</span>`,
            css: `.tip { position: relative; }
.tip-text {
  position: absolute; top: 100%; left: 0;
  white-space: nowrap;
  background: #333; color: #fff;
  padding: .3rem .6rem; border-radius: 6px;
}`,
            js: `const area = document.querySelector('.js-tip');
const text = document.querySelector('.js-tip-text');
const show = () => { text.hidden = false; };
const hide = () => { text.hidden = true; };

area.addEventListener('mouseenter', show);
area.addEventListener('mouseleave', hide);
area.addEventListener('focusin', show);   // キーボードで選んだとき
area.addEventListener('focusout', hide);`
        },
        gif: MAIN_GIFS.tooltip
    },
    {
        title: 'details タグだけで開閉（JSなし）',
        genre: '開閉',
        lead: ['HTMLの details と summary を使うと、JSなしで開閉できます。', 'summary が見出しになり、押すと中身が開きます。', 'まずはこの方法で足りるか考えると、コードがシンプルになります。'],
        code: {
            html: `<details class="faq">
  <summary>質問1</summary>
  <p>答え1</p>
</details>`,
            css: `.faq { border-bottom: 1px solid #ddd; padding: .5rem 0; }
.faq summary { cursor: pointer; }`,
            js: `// JSは不要です（HTMLの details だけで動きます）`
        },
        gif: MAIN_GIFS.details
    },
    {
        title: 'すべて開く／すべて閉じる',
        genre: '開閉',
        lead: ['複数の項目を、1つのボタンでまとめて開いたり閉じたりします。', 'querySelectorAll で全部の項目を取り出して、順に処理します。', 'details の open を切り替えるだけなので、短いコードで書けます。'],
        code: {
            html: `<button class="js-all-open">すべて開く</button>
<button class="js-all-close">すべて閉じる</button>

<details class="all-item js-all-item"><summary>項目1</summary>内容1</details>
<details class="all-item js-all-item"><summary>項目2</summary>内容2</details>`,
            css: `.all-item { margin: .3rem 0; }`,
            js: `const items = document.querySelectorAll('.js-all-item');

document.querySelector('.js-all-open').addEventListener('click', () => {
  items.forEach((d) => { d.open = true; });
});
document.querySelector('.js-all-close').addEventListener('click', () => {
  items.forEach((d) => { d.open = false; });
});`
        },
        gif: MAIN_GIFS.allopen
    },
    {
        title: 'カードを裏返す',
        genre: '切り替え',
        lead: ['カードを押すと、表と裏がくるっと切り替わります。', '裏返す動きは、CSSの transform: rotateY で作ります。', 'JSは is-flipped のClassを付け外しするだけです。'],
        code: {
            html: `<div class="flip js-flip">
  <div class="flip-face flip-front">表</div>
  <div class="flip-face flip-back">裏</div>
</div>`,
            css: `.flip { position: relative; width: 10rem; height: 6rem; cursor: pointer;
        transition: transform .5s; transform-style: preserve-3d; }
.flip-face { position: absolute; inset: 0; display: grid; place-items: center;
             backface-visibility: hidden; border-radius: 12px; }
.flip-front { background: #ffe3d3; }
.flip-back { background: #dff5ec; transform: rotateY(180deg); }
.flip.is-flipped { transform: rotateY(180deg); }`,
            js: `const card = document.querySelector('.js-flip');
card.addEventListener('click', () => {
  card.classList.toggle('is-flipped');
});`
        },
        gif: MAIN_GIFS.flip
    },
    {
        title: 'トグルスイッチ（ON／OFF）',
        genre: '切り替え',
        lead: ['スイッチを押すと、ONとOFFが切り替わります。', 'aria-checked を更新すると、読み上げソフトにも状態が伝わります。', '通知のON/OFFなど、設定画面でよく使われます。'],
        code: {
            html: `<button class="switch js-switch" role="switch" aria-checked="false">OFF</button>`,
            css: `.switch { background: #ccc; color: #fff; border-radius: 999px; padding: .3rem 1rem; }
.switch.is-on { background: #7ecfb3; }`,
            js: `const sw = document.querySelector('.js-switch');
sw.addEventListener('click', () => {
  const on = sw.classList.toggle('is-on');
  sw.setAttribute('aria-checked', String(on));
  sw.textContent = on ? 'ON' : 'OFF';
});`
        },
        gif: MAIN_GIFS.switch
    },
    {
        title: 'ラジオボタンで表示を切り替え',
        genre: '切り替え',
        lead: ['選んだ選択肢に合わせて、表示する内容が変わります。', 'change イベントで、選ばれた値（value）を受け取ります。', '料金プランの比較などで使われる形です。'],
        code: {
            html: `<label><input type="radio" name="plan" value="a" class="js-plan" checked> プランA</label>
<label><input type="radio" name="plan" value="b" class="js-plan"> プランB</label>
<p class="js-plan-out">プランAは月500円です</p>`,
            css: `label { margin-right: 1rem; }`,
            js: `const texts = {
  a: 'プランAは月500円です',
  b: 'プランBは月1,000円です'
};
const out = document.querySelector('.js-plan-out');

document.querySelectorAll('.js-plan').forEach((r) => {
  r.addEventListener('change', () => {
    out.textContent = texts[r.value];
  });
});`
        },
        gif: MAIN_GIFS.radio
    },
    {
        title: 'リスト表示／グリッド表示の切り替え',
        genre: '切り替え',
        lead: ['ボタンで、項目の並び方を縦のリストと、横並びのグリッドに切り替えます。', '切り替えは、親要素のClassを付け替えるだけです。', 'CSSの display: grid の力で、並び方がまとめて変わります。'],
        code: {
            html: `<button class="js-view" data-view="list">リスト</button>
<button class="js-view" data-view="grid">グリッド</button>
<div class="items js-items">
  <div>1</div><div>2</div><div>3</div><div>4</div>
</div>`,
            css: `.items.is-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: .5rem;
}`,
            js: `const items = document.querySelector('.js-items');

document.querySelectorAll('.js-view').forEach((btn) => {
  btn.addEventListener('click', () => {
    items.classList.toggle('is-grid', btn.dataset.view === 'grid');
  });
});`
        },
        gif: MAIN_GIFS.view
    },
    {
        title: 'ストップウォッチ',
        genre: '数・状態',
        lead: ['スタートで計測が始まり、ストップで止まります。', 'setInterval で、0.1秒ごとに表示を更新しています。', '止めるときは clearInterval を忘れずに呼びます。'],
        code: {
            html: `<p class="time js-time">0.0</p>
<button class="js-start">スタート</button>
<button class="js-stop">ストップ</button>`,
            css: `.time { font-size: 2rem; }`,
            js: `const out = document.querySelector('.js-time');
let timer = null;
let start = 0;

document.querySelector('.js-start').addEventListener('click', () => {
  if (timer) return; // 二重に始めない
  start = Date.now();
  timer = setInterval(() => {
    out.textContent = ((Date.now() - start) / 1000).toFixed(1);
  }, 100);
});
document.querySelector('.js-stop').addEventListener('click', () => {
  clearInterval(timer);
  timer = null;
});`
        },
        gif: MAIN_GIFS.timer
    },
    {
        title: '星評価',
        genre: '数・状態',
        lead: ['星を押すと、その数だけ星が色づきます。', 'ボタンに data-value（1〜5）を持たせて、押した数を受け取ります。', '押した数以下の星すべてに、Classを付けて色を変えます。'],
        code: {
            html: `<div class="rating">
  <button class="star js-star" data-value="1">★</button>
  <button class="star js-star" data-value="2">★</button>
  <button class="star js-star" data-value="3">★</button>
  <button class="star js-star" data-value="4">★</button>
  <button class="star js-star" data-value="5">★</button>
</div>`,
            css: `.star { background: none; color: #ccc; font-size: 1.5rem; }
.star.is-on { color: #f5b301; }`,
            js: `const stars = document.querySelectorAll('.js-star');

stars.forEach((s) => {
  s.addEventListener('click', () => {
    const n = Number(s.dataset.value);
    stars.forEach((x) => {
      x.classList.toggle('is-on', Number(x.dataset.value) <= n);
    });
  });
});`
        },
        gif: MAIN_GIFS.rating
    },
    {
        title: '進捗バー（ボタンで進む）',
        genre: '数・状態',
        lead: ['ボタンを押すたびに、バーが10%ずつ伸びます。', '数字の割合を、style.width に入れて長さを変えています。', '100%に達したら、それ以上は増えないようにしています。'],
        code: {
            html: `<div class="bar"><div class="bar-fill js-bar"></div></div>
<button class="js-bar-btn">進める</button>`,
            css: `.bar { background: #eee; border-radius: 999px; overflow: hidden; }
.bar-fill { width: 0; height: .8rem; background: #7ecfb3; transition: width .3s; }`,
            js: `const bar = document.querySelector('.js-bar');
let value = 0;

document.querySelector('.js-bar-btn').addEventListener('click', () => {
  value = Math.min(value + 10, 100);
  bar.style.width = value + '%';
});`
        },
        gif: MAIN_GIFS.progress
    },
    {
        title: 'サイコロ',
        genre: '数・状態',
        lead: ['ボタンを押すと、1〜6の数字がランダムに出ます。', 'Math.random() は0以上1未満の数を返すので、6倍して切り捨てます。', 'ゲームや抽選など、「ランダム」を使う基本の形です。'],
        code: {
            html: `<p class="dice js-dice">🎲</p>
<button class="js-roll">振る</button>`,
            css: `.dice { font-size: 3rem; }`,
            js: `const dice = document.querySelector('.js-dice');

document.querySelector('.js-roll').addEventListener('click', () => {
  const n = Math.floor(Math.random() * 6) + 1; // 1〜6
  dice.textContent = n;
});`
        },
        gif: MAIN_GIFS.dice
    },
    {
        title: 'パスワードの表示／非表示',
        genre: '入力・フォーム',
        lead: ['ボタンで、パスワードを「・・・」と文字で見える状態に切り替えます。', 'input の type を password と text で入れ替えています。', '入力ミスに気づきやすくなるので、スマホで特に便利です。'],
        code: {
            html: `<input class="js-pw" type="password">
<button class="js-pw-toggle">表示</button>`,
            css: `input { padding: .4rem; }`,
            js: `const pw = document.querySelector('.js-pw');
const btn = document.querySelector('.js-pw-toggle');

btn.addEventListener('click', () => {
  const show = pw.type === 'password';
  pw.type = show ? 'text' : 'password';
  btn.textContent = show ? '隠す' : '表示';
});`
        },
        gif: MAIN_GIFS.password
    },
    {
        title: '必須入力のチェック',
        genre: '入力・フォーム',
        lead: ['送信を押したとき、名前が空ならエラーを表示します。', '空白だけの入力も、trim() で取り除いて「空」と判断します。', 'エラーが出たら、入力欄に戻れるよう focus を当てています。'],
        code: {
            html: `<input class="js-name" placeholder="名前">
<button class="js-send">送信</button>
<p class="error js-error" hidden>名前を入力してください</p>`,
            css: `.error { color: #d33; }`,
            js: `const nameBox = document.querySelector('.js-name');
const error = document.querySelector('.js-error');

document.querySelector('.js-send').addEventListener('click', () => {
  const empty = nameBox.value.trim() === '';
  error.hidden = !empty;
  if (empty) nameBox.focus();
});`
        },
        gif: MAIN_GIFS.validate
    },
    {
        title: '入力に合わせて欄が広がる',
        genre: '入力・フォーム',
        lead: ['文章を入力すると、入力欄の高さが自動で伸びます。', 'scrollHeight（中身の高さ）を、そのまま height に入れています。', '先に height を auto に戻すと、縮むときも正しく動きます。'],
        code: {
            html: `<textarea class="memo js-memo" rows="2"></textarea>`,
            css: `.memo { width: 100%; overflow: hidden; resize: none; }`,
            js: `const memo = document.querySelector('.js-memo');

memo.addEventListener('input', () => {
  memo.style.height = 'auto';                    // いったん戻す
  memo.style.height = memo.scrollHeight + 'px';  // 中身の高さに合わせる
});`
        },
        gif: MAIN_GIFS.autosize
    },
    {
        title: '合計の自動計算',
        genre: '入力・フォーム',
        lead: ['数量を変えると、合計金額がその場で計算されます。', '単価は data-price に持たせて、数量と掛け算します。', 'input イベントで、入力のたびに再計算しています。'],
        code: {
            html: `<input class="js-qty" type="number" value="1" min="0" data-price="500"> × 500円
<input class="js-qty" type="number" value="1" min="0" data-price="800"> × 800円
<p>合計：<span class="total js-total">1300</span>円</p>`,
            css: `.total { font-weight: bold; }`,
            js: `const qtys = document.querySelectorAll('.js-qty');
const total = document.querySelector('.js-total');

const calc = () => {
  let sum = 0;
  qtys.forEach((q) => { sum += Number(q.value) * Number(q.dataset.price); });
  total.textContent = sum;
};

qtys.forEach((q) => q.addEventListener('input', calc));
calc();`
        },
        gif: MAIN_GIFS.sum
    },
    {
        title: 'パスワードの強さ表示',
        genre: '入力・フォーム',
        lead: ['入力した文字数や文字の種類で、強さを「弱い／普通／強い」と表示します。', '数字・英字・記号が混ざるほど、点数が上がります。', '本番では、サーバー側でもチェックすることを忘れずに。'],
        code: {
            html: `<input class="js-strength-input" type="password">
<p class="strength-out js-strength-out">強さ：-</p>`,
            css: `.strength-out { font-weight: bold; }`,
            js: `const input = document.querySelector('.js-strength-input');
const out = document.querySelector('.js-strength-out');

input.addEventListener('input', () => {
  const v = input.value;
  if (!v) { out.textContent = '強さ：-'; return; }

  let score = 0;
  if (v.length >= 8) score++;
  if (/[0-9]/.test(v)) score++;
  if (/[a-zA-Z]/.test(v)) score++;
  if (/[^0-9a-zA-Z]/.test(v)) score++;

  out.textContent = '強さ：' + (score <= 1 ? '弱い' : score <= 3 ? '普通' : '強い');
});`
        },
        gif: MAIN_GIFS.strength
    },
    {
        title: 'スクロールで数字がカウントアップ',
        genre: 'スクロール連動',
        lead: ['数字が画面に入ったとき、0から目標の数まで増えていきます。', '画面に入ったかは、IntersectionObserver で判定します。', 'requestAnimationFrame を使うと、なめらかに動きます。'],
        code: {
            html: `<p class="count-num js-countup" data-target="1200">0</p>`,
            css: `.count-num { font-size: 2rem; font-weight: bold; }`,
            js: `const el = document.querySelector('.js-countup');
const target = Number(el.dataset.target);

const run = () => {
  const start = performance.now();
  const step = (now) => {
    const t = Math.min((now - start) / 1000, 1); // 1秒かけて 0 → 1
    el.textContent = Math.floor(target * t);
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

const io = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) { run(); io.disconnect(); }
});
io.observe(el);`
        },
        gif: MAIN_GIFS.countup
    },
    {
        title: 'パララックス（背景がゆっくり動く）',
        genre: 'スクロール連動',
        lead: ['スクロールすると、背景だけが、文字より遅く動いて見えます。', 'スクロール量の0.3倍だけ、背景をずらしています。', '動きが苦手な人のために、「動きを減らす」設定の人には無効にします。'],
        code: {
            html: `<div class="hero js-hero"><h2>見出し</h2></div>`,
            css: `.hero { height: 16rem; background: #dff5ec center / cover; }`,
            js: `const hero = document.querySelector('.js-hero');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduce) {
  window.addEventListener('scroll', () => {
    hero.style.backgroundPositionY = (window.scrollY * 0.3) + 'px';
  });
}`
        },
        gif: MAIN_GIFS.parallax
    }
];
