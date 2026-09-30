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
const PAGES = [
    { id: 'top',           label: '使い方',       badge: 'TOP',  title: 'このサイトの使い方',   body: GUIDE_TOP },
    { id: 'header-lesson', label: 'ヘッダー動作', badge: '1',    title: 'ヘッダーの動作',       actions: HEADER_ACTIONS },
    { id: 'main-lesson',   label: 'メイン動作',   badge: '2',    title: 'メインの動作',         actions: MAIN_ACTIONS },
    { id: 'footer-lesson', label: 'フッター動作', badge: '3',    title: 'フッターの動作',       actions: FOOTER_ACTIONS },
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
// 動作1件分のHTMLを作る
function buildAction(a) {
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
        <section class="action">
            <h3 class="action-title">${a.title}</h3>
            <p>${a.lead.join('<br>')}</p>
            <div class="code-group">${codes}</div>
            ${demo}
            <div class="sample">
                <button class="js-sample-btn" data-src="${a.gif}" data-title="${a.title}">見本を表示</button>
                <div class="sample-box js-sample-box"></div>
            </div>
        </section>`;
}

// 選ばれたページだけを main に書き込む。実際に表示したidを返す
function renderMain(id) {
    const page = PAGES.find((p) => p.id === id) || PAGES[0];
    const inner = page.actions ? page.actions.map(buildAction).join('') : page.body;
    const topClass = page.id === PAGES[0].id ? ' is-top' : '';
    document.querySelector('.js-main').innerHTML = `
        <article class="card${topClass}">
            <span class="badge">${page.badge}</span>
            <h2>${page.title}</h2>
            ${inner}
        </article>`;
    bindMain();
    window.scrollTo(0, 0);
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
        <button class="js-top-btn">ページ上部へ</button>
        <p>© うぇぶら～にんぐ</p>`;
    document.querySelector('.js-top-btn').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== 起動：URLの「#〜」を見て表示を決める（未選択・不明は TOP）=====
function showPage() {
    setActiveMenu(renderMain(location.hash.slice(1)));
}

renderHeader();
renderFooter();
showPage();
window.addEventListener('hashchange', showPage);
