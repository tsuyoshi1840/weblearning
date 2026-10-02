// ============================================================
// script.js：サイト自身の動作（基本さわらない）
// ------------------------------------------------------------
// ・ヘッダー／メイン／フッターの描画、メニュー、ページ切り替え、GIF読み込みを担当
// ・教材の中身は header.js / main.js / footer.js に書く（ここには書かない）
// ・ルール：JSで取得する対象は「js-」付きのClassだけ（タグ名では取得しない）
// ・★編集するのは「サイト案内文」と「PAGES（メニュー）」だけ
// ============================================================

// ===== サイト案内文（使い方・記述ルール）=====
const GUIDE_TOP = `
    <p>HTML / CSS / JavaScript を「動き」から学ぶ入門ガイドです。</p>
    <ol>
        <li>上のメニューから学びたい動作を選ぶ</li>
        <li>選んだ内容だけが表示されます（解説・コード）</li>
        <li>「見本を表示」を押すと、動作のGIFが読み込まれます</li>
        <li>気に入った動作は「☆ お気に入り」で保存できます（保存先は、今使っているブラウザの中だけ）</li>
    </ol>
    <p>メニューが邪魔なときは、右上のボタンで隠せます。</p>

    <h3>🧰 はじめる前に準備するもの（例）</h3>
    <ul>
        <li>パソコンとブラウザ（Chrome など）</li>
        <li>テキストエディタ（VS Code がおすすめ）</li>
        <li>作業用フォルダを1つ作る（ここにファイルを入れます）</li>
    </ul>

    <h3>🗺️ 学ぶ順番の例</h3>
    <ol>
        <li><a href="#header-lesson">ヘッダー動作</a>：メニューの開閉、スクロール、ハンバーガー</li>
        <li><a href="#main-lesson">メイン動作</a>：クリックで表示・非表示を切り替える</li>
        <li><a href="#footer-lesson">フッター動作</a>：ページの先頭へ戻る</li>
    </ol>

    <h3>💡 学び方のコツ</h3>
    <p>読むだけで終わらせず、コードを1行ずつコピーして動かし、数字や色を変えて確かめてみましょう。壊れても大丈夫です。元に戻せばOKです。</p>`;

const GUIDE_RULES = `
    <ul>
        <li><strong>HTML：</strong>header / nav / main / footer / button など、意味に合ったタグを使う</li>
        <li><strong>JS：</strong>操作対象は js- 付きのClassで範囲指定。<strong>あえてタグ名での取得・変更は行いません</strong></li>
        <li><strong>CSS：</strong>基本の見た目はタグ指定、部品ごとの見た目や状態変化はClass指定</li>
    </ul>`;

// ===== メニュー（1項目＝1ページ）=====
// actions を持つページは、その動作を並べて表示する。body を持つページは案内文を表示する。
// favorites: true のページは、保存したお気に入りの動作を集めて表示する。
const PAGES = [
    { id: 'top',           label: '使い方',       badge: 'TOP',  title: 'このサイトの使い方',   body: GUIDE_TOP },
    { id: 'header-lesson', label: 'ヘッダー動作', badge: '1',    title: 'ヘッダーの動作',       actions: HEADER_ACTIONS },
    { id: 'main-lesson',   label: 'メイン動作',   badge: '2',    title: 'メインの動作',         actions: MAIN_ACTIONS },
    { id: 'footer-lesson', label: 'フッター動作', badge: '3',    title: 'フッターの動作',       actions: FOOTER_ACTIONS },
    { id: 'favorites',     label: '★ お気に入り', badge: '★',    title: 'あなたのお気に入り',   favorites: true },
    { id: 'rules',         label: '記述ルール',   badge: 'RULE', title: 'このサイトの記述ルール', body: GUIDE_RULES }
];

// ===== 共通：コード表示用に特殊文字を無害化 =====
function esc(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ===== 共通：クリップボードにコピー（成功したら true）=====
async function copyText(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (e) {
        // 古いブラウザ・非対応環境用の予備手段
        const area = document.createElement('textarea');
        area.value = text;
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.querySelector('.js-main').appendChild(area);
        area.select();
        let ok = false;
        try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
        area.remove();
        return ok;
    }
}

// ===== ヘッダー（サイト自身）=====
function renderHeader() {
    const links = PAGES
        .map((p) => `<a class="nav-link js-nav-link" href="#${p.id}" data-id="${p.id}">${p.label}</a>`)
        .join('');
    document.querySelector('.js-header').innerHTML = `
        <div class="header-bar">
            <a class="header-logo" href="#${PAGES[0].id}">🌱 うぇぶら～にんぐ</a>
            <button class="js-menu-toggle" aria-expanded="true">メニューを隠す</button>
        </div>
        <nav class="header-nav">${links}</nav>`;

    // メニューの最小化／表示
    const header = document.querySelector('.js-header');
    const btn = document.querySelector('.js-menu-toggle');
    btn.addEventListener('click', () => {
        const isMin = header.classList.toggle('is-min');
        btn.textContent = isMin ? 'メニューを表示' : 'メニューを隠す';
        btn.setAttribute('aria-expanded', String(!isMin));
    });
}

// 選択中のメニューを強調
function setActiveMenu(id) {
    document.querySelectorAll('.js-nav-link').forEach((a) => {
        a.classList.toggle('is-active', a.dataset.id === id);
    });
}

// ===== メイン（サイト自身）=====
// 動作ごとの共有用ID（GIFのファイル名から作る：gif/header-scroll.gif → "scroll"）
// ※ページ内で重複しないよう、GIFのファイル名は動作ごとに変えること
function getActionId(a) {
    const name = a.gif.split('/').pop().replace('.gif', '');
    return name.includes('-') ? name.slice(name.indexOf('-') + 1) : name;
}

// ===== お気に入り（このブラウザの中だけに保存。サーバーには送らない）=====
// 保存形式：["header-lesson/scroll", "main-lesson/tab", ...]（ページID/動作ID）
const FAV_KEY = 'webranning-favorites';

function loadFavs() {
    try {
        const v = JSON.parse(localStorage.getItem(FAV_KEY));
        return Array.isArray(v) ? v : [];
    } catch (e) {
        return []; // 保存が使えない環境でも、サイトは動く
    }
}
function saveFavs(list) {
    try { localStorage.setItem(FAV_KEY, JSON.stringify(list)); }
    catch (e) { /* 保存できない環境では何もしない */ }
}
function isFav(pageId, actionId) {
    return loadFavs().includes(pageId + '/' + actionId);
}
// ボタンの見た目を、お気に入りの状態に合わせる
function paintFavBtn(btn, on) {
    btn.classList.toggle('is-fav', on);
    btn.setAttribute('aria-pressed', String(on));
    btn.textContent = on ? '★ お気に入り済み' : '☆ お気に入り';
}

// URLの「#ページ/動作」を分解する（動作は省略可）
function parseHash() {
    const [pageId, actionId] = location.hash.slice(1).split('/');
    return { pageId: pageId || '', actionId: actionId || '' };
}

// 指定した動作までスクロールして、一瞬ハイライトする（URLは変えない）
function scrollToAction(id, smooth) {
    const el = [...document.querySelectorAll('.js-action')].find((e) => e.dataset.action === id);
    if (!el) return false;
    el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
    el.classList.remove('is-target');
    void el.offsetWidth; // アニメーションをやり直すための再描画
    el.classList.add('is-target');
    return true;
}

// 動作をジャンルごとにまとめる（ジャンルの並びは、最初に登場した順。同じジャンルは隣り合う）
// ※genre が未記入の動作は「その他」に入る
function groupByGenre(actions) {
    const groups = [];
    actions.forEach((a) => {
        const name = a.genre || 'その他';
        let g = groups.find((x) => x.genre === name);
        if (!g) { g = { genre: name, items: [] }; groups.push(g); }
        g.items.push(a);
    });
    return groups;
}

// ページ上部の「動作の索引」を作る（ジャンルの見出し付き）
function buildIndex(total, groups) {
    const rows = groups.map((g) => {
        const btns = g.items
            .map((a) => `<button class="index-btn js-index-btn" data-action="${getActionId(a)}">${esc(a.title)}</button>`)
            .join('');
        return `
            <div class="index-group">
                <span class="index-genre">${esc(g.genre)}</span>
                <div class="index-list">${btns}</div>
            </div>`;
    }).join('');
    return `
        <div class="index">
            <h3>この中の動作（${total}件）</h3>
            ${rows}
        </div>`;
}

// 動作1件分のHTMLを作る
function buildAction(a, pageId) {
    const actionId = getActionId(a);
    const fav = isFav(pageId, actionId);
    const codes = [['HTML', a.code.html], ['CSS', a.code.css], ['JavaScript', a.code.js]]
        .map(([name, src]) => `
            <div>
                <div class="code-head">
                    <h3>${name}</h3>
                    <button class="copy-btn js-copy-btn">コピー</button>
                </div>
                <pre><code class="js-code">${esc(src)}</code></pre>
            </div>`)
        .join('');
    const demo = a.demo ? `
        <div class="demo">
            <p><strong>👇 実際に動かしてみよう</strong></p>
            <button class="js-panel-btn">${a.demo.button}</button>
            <div class="panel-body js-panel-body" hidden>${a.demo.text}</div>
        </div>` : '';
    return `
        <section class="action js-action" data-action="${actionId}">
            <div class="action-head">
                <h3 class="action-title">${a.title}</h3>
                <div class="action-tools">
                    <button class="copy-btn fav-btn js-fav-btn${fav ? ' is-fav' : ''}" data-page="${pageId}" data-action="${actionId}" aria-pressed="${fav}">${fav ? '★ お気に入り済み' : '☆ お気に入り'}</button>
                    <button class="copy-btn js-share-btn" data-page="${pageId}" data-action="${actionId}">🔗 リンクをコピー</button>
                </div>
            </div>
            <p>${a.lead.join('<br>')}</p>
            <div class="code-group">${codes}</div>
            ${demo}
            <div class="sample">
                <button class="js-sample-btn" data-src="${a.gif}" data-title="${a.title}">見本を表示</button>
                <div class="sample-box js-sample-box"></div>
            </div>
        </section>`;
}

// お気に入りページの本文：保存した動作を、元のメニューごとに集めて表示する
function buildFavorites() {
    const favs = loadFavs();
    const groups = [];
    PAGES.filter((p) => p.actions).forEach((p) => {
        const items = p.actions.filter((a) => favs.includes(p.id + '/' + getActionId(a)));
        if (items.length) groups.push({ genre: p.title, pageId: p.id, items });
    });
    const note = '<p class="sample-msg">※お気に入りは、このブラウザの中だけに保存されます。別の端末や別のブラウザには引き継がれません。</p>';
    if (!groups.length) {
        return '<p>まだお気に入りがありません。各動作の「☆ お気に入り」を押すと、ここに集まります。</p>' + note;
    }
    const total = groups.reduce((n, g) => n + g.items.length, 0);
    const sections = groups.map((g) => `
        <h3 class="genre-title">${esc(g.genre)}</h3>
        ${g.items.map((a) => buildAction(a, g.pageId)).join('')}`).join('');
    return buildIndex(total, groups) + sections + note;
}

// ページの本文を作る（案内文／お気に入り／動作の一覧）
function buildPageBody(page) {
    if (page.favorites) return buildFavorites();
    if (!page.actions) return page.body;
    const groups = groupByGenre(page.actions);
    const sections = groups.map((g) => `
        <h3 class="genre-title">${esc(g.genre)}</h3>
        ${g.items.map((a) => buildAction(a, page.id)).join('')}`).join('');
    // 索引の先頭に「おすすめ」を足す（recommend: true の動作。本文には重複して出さない）
    const rec = page.actions.filter((a) => a.recommend);
    const indexGroups = rec.length ? [{ genre: '⭐ おすすめ', items: rec }, ...groups] : groups;
    return buildIndex(page.actions.length, indexGroups) + sections;
}

// 選ばれたページだけを main に書き込む。実際に表示したidを返す
function renderMain(id, actionId) {
    const page = PAGES.find((p) => p.id === id) || PAGES[0];
    const inner = buildPageBody(page);
    const topClass = page.id === PAGES[0].id ? ' is-top' : '';
    document.querySelector('.js-main').innerHTML = `
        <article class="card${topClass}">
            <span class="badge">${page.badge}</span>
            <h2>${page.title}</h2>
            ${inner}
        </article>`;
    bindMain();
    // 共有リンクで来た場合は、その動作へ直接移動。なければ先頭へ
    if (!(actionId && scrollToAction(actionId, false))) window.scrollTo(0, 0);
    return page.id;
}

// メイン内のボタン動作
function bindMain() {
    // 見本GIF：押したときだけ読み込む
    document.querySelectorAll('.js-sample-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const box = btn.parentElement.querySelector('.js-sample-box');
            if (box.hasChildNodes()) {
                box.replaceChildren();
                btn.textContent = '見本を表示';
                return;
            }
            const img = new Image();
            img.className = 'sample-img';
            img.alt = '動作見本';
            img.onerror = () => {
                // 未設置のGIFを表示：動作名は data-title、ファイルは data-src（各jsの *_GIFS で設定）
                box.innerHTML = `<p class="sample-msg">GIFがまだ置かれていません：${btn.dataset.title}（${btn.dataset.src}）</p>`;
            };
            img.src = btn.dataset.src;
            box.appendChild(img);
            btn.textContent = '見本を隠す';
        });
    });
    // お気に入り：押すたびに追加／解除（このブラウザの中だけに保存）
    document.querySelectorAll('.js-fav-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const key = btn.dataset.page + '/' + btn.dataset.action;
            const favs = loadFavs();
            const on = !favs.includes(key);
            saveFavs(on ? [...favs, key] : favs.filter((k) => k !== key));
            if (parseHash().pageId === 'favorites') {
                // お気に入りページでは、解除した動作を一覧から消す（今の位置は保つ）
                const y = window.scrollY;
                renderMain('favorites');
                window.scrollTo(0, y);
            } else {
                paintFavBtn(btn, on);
            }
        });
    });
    // 索引：押した動作へスクロール（URLは変えないので、戻る履歴が増えない）
    document.querySelectorAll('.js-index-btn').forEach((btn) => {
        btn.addEventListener('click', () => scrollToAction(btn.dataset.action, true));
    });
    // 共有：押したときだけ「#ページ/動作」付きのURLをコピー
    document.querySelectorAll('.js-share-btn').forEach((btn) => {
        btn.addEventListener('click', async () => {
            const url = location.href.split('#')[0] + '#' + btn.dataset.page + '/' + btn.dataset.action;
            const ok = await copyText(url);
            btn.textContent = ok ? 'コピーしました ✓' : 'コピー失敗';
            setTimeout(() => { btn.textContent = '🔗 リンクをコピー'; }, 1500);
        });
    });
    // ソースコードのコピー
    document.querySelectorAll('.js-copy-btn').forEach((btn) => {
        btn.addEventListener('click', async () => {
            const code = btn.parentElement.parentElement.querySelector('.js-code').textContent;
            const ok = await copyText(code);
            btn.textContent = ok ? 'コピーしました ✓' : 'コピー失敗';
            setTimeout(() => { btn.textContent = 'コピー'; }, 1500);
        });
    });
    // 実演：クリックで表示／非表示
    document.querySelectorAll('.js-panel-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const body = btn.parentElement.querySelector('.js-panel-body');
            body.hidden = !body.hidden;
        });
    });
}

// ===== フッター（サイト自身）=====
function renderFooter() {
    document.querySelector('.js-footer').innerHTML = `
        <p>© うぇぶら～にんぐ</p>
        <button class="top-btn js-top-btn" hidden>ページ上部へ</button>`;

    // 「ページ上部へ」ボタン：最上部から離れたら右下に現れ、押すと先頭へ戻る
    // ※現れ始める位置は SHOW_TOP_BTN_Y（px）で変更
    const SHOW_TOP_BTN_Y = 100;
    const btn = document.querySelector('.js-top-btn');
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    const toggleBtn = () => { btn.hidden = window.scrollY < SHOW_TOP_BTN_Y; };
    window.addEventListener('scroll', toggleBtn);
    toggleBtn();
}

// ===== 起動：URLの「#〜」を見て表示を決める（未選択・不明は TOP）=====
function showPage() {
    const { pageId, actionId } = parseHash();
    setActiveMenu(renderMain(pageId, actionId));
}

renderHeader();
renderFooter();
showPage();
window.addEventListener('hashchange', showPage);
