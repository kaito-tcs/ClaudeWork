const CATEGORIES = {
    veggie: { label: '野菜・果物',    emoji: '🥦', color: '#5B8A4A' },
    meat:   { label: '肉・魚',        emoji: '🥩', color: '#C4622D' },
    drink:  { label: '飲み物・乳製品', emoji: '🥛', color: '#3A7BD5' },
    bread:  { label: 'パン・穀物',    emoji: '🍞', color: '#8B6B4A' },
    other:  { label: 'その他',        emoji: '🛒', color: '#7A6B8A' },
};

let items = JSON.parse(localStorage.getItem('shoppingItems') || '[]');
let currentFilter = 'all';

function save() {
    localStorage.setItem('shoppingItems', JSON.stringify(items));
}

function setFilter(cat) {
    currentFilter = cat;
    document.querySelectorAll('.filter-tab').forEach(el => {
        el.classList.toggle('active', el.dataset.cat === cat);
    });
    renderList();
}

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

function toggleItem(id) {
    const item = items.find(i => i.id === id);
    if (item) { item.done = !item.done; save(); renderList(); }
}

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
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

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

document.getElementById('itemName').addEventListener('keydown', e => {
    if (e.key === 'Enter') addItem();
});

renderList();
