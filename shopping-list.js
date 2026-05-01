const CATEGORIES = {
    veggie: { label: '野菜・果物',    emoji: '🥦', color: '#5B8A4A' },
    meat:   { label: '肉・魚',        emoji: '🥩', color: '#C4622D' },
    drink:  { label: '飲み物・乳製品', emoji: '🥛', color: '#3A7BD5' },
    bread:  { label: 'パン・穀物',    emoji: '🍞', color: '#8B6B4A' },
    other:  { label: 'その他',        emoji: '🛒', color: '#7A6B8A' },
};

let items = JSON.parse(localStorage.getItem('shoppingItems') || '[]');
let purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory') || '[]');
let currentFilter = 'all';
let pendingCompleteId = null;
let historyFilter = { month: '', date: '', location: '' };

function save() { localStorage.setItem('shoppingItems', JSON.stringify(items)); }
function saveHistory() { localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory)); }

// ── View switching ──
function switchView(view) {
    document.querySelectorAll('.view-tab').forEach(el => {
        el.classList.toggle('active', el.dataset.view === view);
    });
    document.getElementById('viewList').style.display    = view === 'list'    ? '' : 'none';
    document.getElementById('viewHistory').style.display = view === 'history' ? '' : 'none';
    if (view === 'history') renderHistory();
}

// ── Filter ──
function setFilter(cat) {
    currentFilter = cat;
    document.querySelectorAll('.filter-tab').forEach(el => {
        el.classList.toggle('active', el.dataset.cat === cat);
    });
    renderList();
}

// ── Add item ──
function addItem() {
    const nameEl = document.getElementById('itemName');
    const name = nameEl.value.trim();
    const qty  = Math.max(1, parseInt(document.getElementById('itemQty').value) || 1);
    const cat  = document.getElementById('itemCat').value;

    if (!name) {
        nameEl.style.borderColor = '#C4622D';
        nameEl.focus();
        setTimeout(() => { nameEl.style.borderColor = ''; }, 900);
        return;
    }

    items.push({ id: Date.now(), name, qty, cat, done: false });
    save();
    renderList();
    nameEl.value = '';
    document.getElementById('itemQty').value = '1';
    nameEl.focus();
}

// ── Toggle: show modal when completing ──
function toggleItem(id) {
    const item = items.find(i => i.id === id);
    if (!item) return;
    if (item.done) {
        item.done = false;
        save();
        renderList();
    } else {
        pendingCompleteId = id;
        document.getElementById('modalItemName').textContent = item.name;
        document.getElementById('modalPrice').value = '';
        document.getElementById('modalLocation').value = '';
        const t = new Date();
        document.getElementById('modalDate').value =
            `${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,'0')}-${String(t.getDate()).padStart(2,'0')}`;
        document.getElementById('modalOverlay').classList.add('open');
        setTimeout(() => document.getElementById('modalPrice').focus(), 320);
    }
}

// ── Modal actions ──
function cancelModal() {
    document.getElementById('modalOverlay').classList.remove('open');
    pendingCompleteId = null;
}

function skipRecord() {
    const item = items.find(i => i.id === pendingCompleteId);
    if (item) { item.done = true; save(); renderList(); }
    cancelModal();
}

function confirmRecord() {
    const priceVal = document.getElementById('modalPrice').value;
    const price    = priceVal !== '' ? parseFloat(priceVal) : null;
    const location = document.getElementById('modalLocation').value.trim() || null;
    const item     = items.find(i => i.id === pendingCompleteId);

    if (item) {
        item.done = true;
        save();
        const dateVal = document.getElementById('modalDate').value;
        const date = dateVal ? new Date(dateVal + 'T12:00:00').toISOString() : new Date().toISOString();
        purchaseHistory.push({
            id: Date.now(),
            itemName: item.name,
            category: item.cat,
            price,
            location,
            date,
        });
        saveHistory();
        renderList();
    }
    cancelModal();
}

// ── Delete item ──
function deleteItem(id) {
    const el = document.getElementById('item-' + id);
    if (!el) return;
    el.classList.add('removing');
    setTimeout(() => {
        items = items.filter(i => i.id !== id);
        save();
        renderList();
    }, 230);
}

function esc(str) {
    return String(str)
        .replace(/&/g,'&amp;').replace(/</g,'&lt;')
        .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── Render list ──
function renderList() {
    const area = document.getElementById('listArea');
    const filtered = currentFilter === 'all' ? items : items.filter(i => i.cat === currentFilter);

    const total = items.length;
    const done  = items.filter(i => i.done).length;
    document.getElementById('progressFill').style.width = total ? (done / total * 100) + '%' : '0%';
    document.getElementById('progressText').textContent = `${done} / ${total} 完了`;

    if (filtered.length === 0) {
        area.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🛍️</div>
                <div class="empty-title">リストは空です</div>
                <div class="empty-sub">上のフォームから商品を追加してください</div>
            </div>`;
        return;
    }

    const grouped = {};
    for (const cat of Object.keys(CATEGORIES)) {
        const list = filtered.filter(i => i.cat === cat);
        if (list.length) grouped[cat] = list;
    }

    area.innerHTML = Object.entries(grouped).map(([cat, list]) => {
        const { label, emoji, color } = CATEGORIES[cat];
        const doneCount = list.filter(i => i.done).length;
        return `
        <div class="category-group">
            <div class="category-header">
                <div class="category-dot" style="background:${color}"></div>
                <span class="category-name">${emoji} ${label}</span>
                <span class="category-count">${doneCount}/${list.length}</span>
            </div>
            <div class="items-list">
                ${list.map(item => `
                <div class="item${item.done ? ' completed' : ''}" id="item-${item.id}" onclick="toggleItem(${item.id})">
                    <div class="item-check">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4L3.5 6.5L9 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <span class="item-name">${esc(item.name)}</span>
                    <span class="item-qty">×${item.qty}</span>
                    <button class="item-delete" onclick="event.stopPropagation();deleteItem(${item.id})" title="削除">
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                            <path d="M1 1L10 10M10 1L1 10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>`).join('')}
            </div>
        </div>`;
    }).join('');
}

// ── History filter helpers ──
function getFilteredHistory() {
    return purchaseHistory.filter(r => {
        const d = new Date(r.date);
        const rMonth = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
        const rDate  = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
        if (historyFilter.month    && rMonth !== historyFilter.month) return false;
        if (historyFilter.date     && rDate  !== historyFilter.date)  return false;
        if (historyFilter.location && !(r.location || '').toLowerCase().includes(historyFilter.location)) return false;
        return true;
    });
}

function applyHistoryFilter() {
    historyFilter.month    = document.getElementById('searchMonth').value;
    historyFilter.date     = document.getElementById('searchDate').value;
    historyFilter.location = document.getElementById('searchLocation').value.trim().toLowerCase();
    renderHistory();
}

function clearSearch() {
    document.getElementById('searchMonth').value    = '';
    document.getElementById('searchDate').value     = '';
    document.getElementById('searchLocation').value = '';
    historyFilter = { month: '', date: '', location: '' };
    renderHistory();
}

// ── Export ──
function exportCSV() {
    const data = getFilteredHistory();
    if (!data.length) { alert('エクスポートするデータがありません'); return; }

    const sorted = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
    const header = ['購入日', '商品名', 'カテゴリ', '金額（円）', '購入場所'];
    const rows   = sorted.map(r => [
        new Date(r.date).toLocaleDateString('ja-JP'),
        r.itemName,
        CATEGORIES[r.category]?.label || r.category,
        r.price ?? '',
        r.location ?? '',
    ]);

    const csv = [header, ...rows]
        .map(row => row.map(c => `"${String(c).replace(/"/g, '""')}"`).join(','))
        .join('\r\n');

    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    const suffix = historyFilter.month || historyFilter.date?.slice(0,7) || new Date().toISOString().slice(0,7);
    a.download = `購入履歴_${suffix}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}

function exportPDF() {
    const data = getFilteredHistory();
    if (!data.length) { alert('エクスポートするデータがありません'); return; }

    const sorted = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
    let label = '全期間';
    if (historyFilter.month)     label = historyFilter.month.replace('-', '年') + '月';
    else if (historyFilter.date) label = new Date(historyFilter.date + 'T12:00:00').toLocaleDateString('ja-JP');

    const rows = sorted.map(r => `
        <tr>
            <td>${new Date(r.date).toLocaleDateString('ja-JP')}</td>
            <td>${esc(r.itemName)}</td>
            <td>${CATEGORIES[r.category]?.emoji || ''} ${CATEGORIES[r.category]?.label || r.category}</td>
            <td class="num">${r.price !== null ? '¥' + r.price.toLocaleString() : '—'}</td>
            <td>${r.location ? esc(r.location) : '—'}</td>
        </tr>`).join('');

    const total = sorted.filter(r => r.price !== null).reduce((s, r) => s + r.price, 0);

    const html = `<!DOCTYPE html>
<html lang="ja"><head><meta charset="UTF-8">
<title>購入履歴 ${label}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap');
  body{font-family:'Noto Sans JP',sans-serif;margin:2cm;color:#1E3028;font-size:11pt}
  h1{font-size:16pt;margin-bottom:4px;color:#2C4A3E}
  .meta{font-size:9pt;color:#7A9488;margin-bottom:16px}
  table{width:100%;border-collapse:collapse}
  th{background:#2C4A3E;color:white;padding:6px 10px;text-align:left;font-size:9pt}
  td{padding:5px 10px;border-bottom:1px solid #DDD6C8;font-size:10pt}
  .num{text-align:right}
  tr:nth-child(even) td{background:#F5EFE3}
  .total td{font-weight:700;border-top:2px solid #2C4A3E;background:#F5EFE3}
</style></head><body>
<h1>購入履歴 — ${label}</h1>
<div class="meta">出力日: ${new Date().toLocaleDateString('ja-JP')} ／ ${sorted.length}件</div>
<table>
  <thead><tr><th>購入日</th><th>商品名</th><th>カテゴリ</th><th>金額</th><th>購入場所</th></tr></thead>
  <tbody>
    ${rows}
    <tr class="total"><td colspan="3">合計</td><td class="num">¥${total.toLocaleString()}</td><td></td></tr>
  </tbody>
</table></body></html>`;

    const win = window.open('', '_blank');
    if (!win) { alert('ポップアップがブロックされました。ブラウザの設定を確認してください。'); return; }
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 500);
}

// ── Render history ──
function renderHistory() {
    const area     = document.getElementById('historyArea');
    const filtered = getFilteredHistory();

    if (purchaseHistory.length === 0) {
        area.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📊</div>
                <div class="empty-title">購入履歴がありません</div>
                <div class="empty-sub">商品を完了にすると履歴が記録されます</div>
            </div>`;
        return;
    }

    if (filtered.length === 0) {
        area.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🔍</div>
                <div class="empty-title">該当する履歴がありません</div>
                <div class="empty-sub">検索条件を変更してください</div>
            </div>`;
        return;
    }

    // Group by item name, sort each group by date asc
    const grouped = {};
    for (const record of filtered) {
        if (!grouped[record.itemName]) grouped[record.itemName] = [];
        grouped[record.itemName].push(record);
    }
    for (const name of Object.keys(grouped)) {
        grouped[name].sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    // Sort groups by most recently purchased
    const sortedEntries = Object.entries(grouped).sort((a, b) => {
        const latestA = new Date(a[1][a[1].length - 1].date);
        const latestB = new Date(b[1][b[1].length - 1].date);
        return latestB - latestA;
    });

    area.innerHTML = sortedEntries.map(([name, records], idx) => {
        const cat = records[records.length - 1].category;
        const { emoji, color } = CATEGORIES[cat] || CATEGORIES.other;
        const priceRecords = records.filter(r => r.price !== null);

        let statsHtml = '';
        if (priceRecords.length) {
            const avg = Math.round(priceRecords.reduce((s, r) => s + r.price, 0) / priceRecords.length);
            const min = Math.min(...priceRecords.map(r => r.price));
            const max = Math.max(...priceRecords.map(r => r.price));
            statsHtml = `
            <div class="history-stats">
                <span>平均 <strong>¥${avg}</strong></span>
                <span>最安 <strong>¥${min}</strong></span>
                <span>最高 <strong>¥${max}</strong></span>
            </div>`;
        }

        const chartHtml = priceRecords.length >= 1 ? renderChart(priceRecords, color, idx) : '';

        const rows = [...records].reverse().slice(0, 6).map(r => `
            <div class="history-row">
                <span class="history-date">${new Date(r.date).toLocaleDateString('ja-JP', {month:'numeric', day:'numeric'})}</span>
                <span class="history-price">${r.price !== null ? '¥' + r.price : '—'}</span>
                <span class="history-location">${r.location ? esc(r.location) : '—'}</span>
            </div>`).join('');

        return `
        <div class="history-card">
            <div class="history-card-header">
                <div class="category-dot" style="background:${color}"></div>
                <span class="history-item-name">${esc(name)}</span>
                <span class="history-count">${records.length}回購入</span>
            </div>
            ${statsHtml}
            ${chartHtml}
            <div class="history-rows">
                <div class="history-row history-row-head">
                    <span>日付</span><span>金額</span><span>場所</span>
                </div>
                ${rows}
            </div>
        </div>`;
    }).join('');
}

// ── SVG price chart ──
function renderChart(priceRecords, color, idx) {
    const W = 400, H = 110;
    const pad = { top: 16, right: 14, bottom: 26, left: 46 };
    const cW = W - pad.left - pad.right;
    const cH = H - pad.top - pad.bottom;

    const prices   = priceRecords.map(r => r.price);
    const minP     = Math.min(...prices);
    const maxP     = Math.max(...prices);
    const samePrice = minP === maxP;
    const gradId   = `ag${idx}`;

    const toX = i => pad.left + (priceRecords.length === 1 ? cW / 2 : (i / (priceRecords.length - 1)) * cW);
    const toY = p => samePrice
        ? pad.top + cH / 2
        : pad.top + cH - ((p - minP) / (maxP - minP)) * cH;

    const pts = priceRecords.map((r, i) => ({
        x: toX(i).toFixed(1),
        y: toY(r.price).toFixed(1),
    }));

    const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
    const areaPath = pts.length > 1
        ? `${linePath} L${pts[pts.length-1].x},${(pad.top+cH).toFixed(1)} L${pts[0].x},${(pad.top+cH).toFixed(1)} Z`
        : '';

    const n = priceRecords.length;
    const labelIndices = n <= 4 ? priceRecords.map((_, i) => i)
        : [0, Math.floor(n / 3), Math.floor(2 * n / 3), n - 1];
    const uniqueIdx = [...new Set(labelIndices)];

    return `
    <svg viewBox="0 0 ${W} ${H}" class="price-chart">
        <defs>
            <linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stop-color="${color}" stop-opacity="0.2"/>
                <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
            </linearGradient>
        </defs>
        <line x1="${pad.left}" y1="${pad.top}" x2="${pad.left}" y2="${pad.top+cH}" stroke="#DDD6C8" stroke-width="1"/>
        <line x1="${pad.left}" y1="${pad.top+cH}" x2="${W-pad.right}" y2="${pad.top+cH}" stroke="#DDD6C8" stroke-width="1"/>
        ${!samePrice ? `<line x1="${pad.left}" y1="${pad.top}" x2="${W-pad.right}" y2="${pad.top}" stroke="#DDD6C8" stroke-width="0.5" stroke-dasharray="3,3"/>` : ''}
        ${!samePrice
            ? `<text x="${pad.left-5}" y="${pad.top+4}"    text-anchor="end" class="chart-label">¥${maxP}</text>`
            : ''}
        <text x="${pad.left-5}" y="${(pad.top+cH).toFixed(1)}" text-anchor="end" class="chart-label">¥${minP}</text>
        ${areaPath ? `<path d="${areaPath}" fill="url(#${gradId})"/>` : ''}
        ${pts.length > 1 ? `<path d="${linePath}" stroke="${color}" stroke-width="2" fill="none" stroke-linejoin="round" stroke-linecap="round"/>` : ''}
        ${pts.map(p => `<circle cx="${p.x}" cy="${p.y}" r="3.5" fill="white" stroke="${color}" stroke-width="2"/>`).join('')}
        ${uniqueIdx.map(i => `
            <text x="${pts[i].x}" y="${H-6}" text-anchor="middle" class="chart-label">
                ${new Date(priceRecords[i].date).toLocaleDateString('ja-JP', {month:'numeric', day:'numeric'})}
            </text>`).join('')}
    </svg>`;
}

// ── Event listeners ──
document.getElementById('modalOverlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modalOverlay')) cancelModal();
});
document.getElementById('modalLocation').addEventListener('keydown', e => {
    if (e.key === 'Enter') confirmRecord();
});
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && document.getElementById('modalOverlay').classList.contains('open')) cancelModal();
});
document.getElementById('itemName').addEventListener('keydown', e => {
    if (e.key === 'Enter') addItem();
});

renderList();
