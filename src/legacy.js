"use strict";
/* The Savory Bar — dependency-free TypeScript interaction layer */
const individualItems = [
    { name: 'Fish Pattie', price: 130, icon: '◌', category: 'pattie' },
    { name: 'Fish Roll', price: 130, icon: '◍', category: 'roll' },
    { name: 'Chicken Roll', price: 140, icon: '◍', category: 'roll' },
    { name: 'Chicken Pattie', price: 140, icon: '◌', category: 'pattie' },
    { name: 'Chicken Wrap', price: 170, icon: '⌁', category: 'wrap' },
    { name: 'Sandwich', price: 160, icon: '▱', category: 'sandwich' },
    { name: 'Mini Burger', price: 180, icon: '≋', category: 'burger' },
];
const cutletItems = [
    { name: 'Egg Cuttlet', price: 140, icon: '●', category: 'cutlet' },
    { name: 'Fish Cuttlet', price: 130, icon: '●', category: 'cutlet' },
    { name: 'Chicken Cuttlet', price: 140, icon: '●', category: 'cutlet' },
];
const allItems = [...individualItems, ...cutletItems];
const plattersData = [
    { name: 'The Wrap & Roll Platter', desc: 'A modern party favorite', price: '3,500 LKR', serves: 'Serves 6–8 people', items: ['6 Chicken Wraps', '6 Chicken Rolls', '6 Mini Burgers'] },
    { name: 'The Classic Bite Box', desc: 'Evening tea snack', price: '3,650 LKR', serves: 'Serves 5–6 people', items: ['4 Sandwiches', '4 Chicken Wraps', '4 Chicken Patties', '4 Chicken Rolls', '4 Mini Burgers'] },
    { name: 'The Sandwich Social', desc: 'Ideal for office meetings', price: '4,650 LKR', serves: 'Serves 8–10 people', items: ['12 Sandwiches', '12 Chicken Patties', '12 Chicken Rolls'] },
    { name: 'The Executive Savory Platter', desc: 'Perfect for corporate events', price: '6,700 LKR', serves: 'Serves 12–14 people', items: ['10 Mini Burgers', '10 Chicken Wraps', '10 Sandwiches', '10 Chicken Patties'] },
    { name: 'The Party Crave Box', desc: 'Best for birthdays', price: '7,150 LKR', serves: 'Serves 12–14 people', items: ['12 Sandwiches', '12 Chicken Patties', '12 Chicken Rolls', '12 Mini Burgers'] },
    { name: 'The Family Feast Box', desc: 'Made for larger groups', price: '7,950 LKR', serves: 'Serves 15–18 people', items: ['10 Mini Burgers', '10 Chicken Wraps', '10 Sandwiches', '10 Chicken Patties', '10 Chicken Rolls'] },
];
const galleryImages = [
    { caption: 'Grilled Chicken Wrap', url: 'images/wrap.jpg', fallback: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=1200&q=82' },
    { caption: 'Mini Burgers Platter', url: 'images/burger.jpg', fallback: 'https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=1000&q=82' },
    { caption: 'Fresh Chicken Sandwiches', url: 'images/sandwich.jpg', fallback: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1000&q=82' },
    { caption: 'Fresh Chicken Rolls', url: 'images/rolls.jpg', fallback: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=82' },
    { caption: 'Crispy Chicken Patties', url: 'images/patis.jpg', fallback: 'https://images.unsplash.com/photo-1432139509613-5c4255a1d1a2?auto=format&fit=crop&w=1000&q=82' },
    { caption: 'All in One', url: 'images/foods.jpg', fallback: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=82' },
    { caption: 'Signature Platters', url: 'images/platter.jpg', fallback: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=82' },
    { caption: 'Packed Platter', url: 'images/platterbox.jpg', fallback: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=1200&q=82' },
];
const testimonials = [
    { text: 'tbh all the items are really tasty and that chicken wrap is the most delicious one. All loved it. Good luck with your business!', name: 'Yasitha' },
    { text: 'Okkoma items tika rasaii, maarama quality and fresh! Everything was perfect. Highly recommended for gatherings.', name: 'Chinthani' },
    { text: 'The wraps & platters exceeded expectations! Authentic flavors & super fresh. Will order again!', name: 'Sanduni' },
];
const TRAVEL_COST = 250;
const SMALL_BOX_COST = 250;
const LARGE_BOX_COST = 300;
const BOUQUET_COST = 6500;
let cart = {};
let deliveryType = 'delivery';
let boxPreference = 'auto';
let bouquetAdded = false;
let searchTerm = '';
let toastTimer = 0;
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));
const money = (value) => `${value.toLocaleString('en-US')} LKR`;
function renderPlatters() {
    const grid = $('#plattersGrid');
    if (!grid)
        return;
    grid.innerHTML = plattersData.map((p, i) => `
    <article class="platter-card glass-heavy tilt-card reveal" data-tilt-strength="7">
      <div class="card-glow"></div>
      <div class="topline"><span class="number">0${i + 1}</span><span class="serves">${p.serves}</span></div>
      <h3>${p.name}</h3>
      <p class="platter-desc">${p.desc}</p>
      <div class="platter-items">${p.items.map(item => `<span>${item}</span>`).join('')}</div>
      <div class="platter-bottom"><strong class="platter-price">${p.price}</strong><span class="platter-arrow">↗</span></div>
    </article>
  `).join('');
}
function renderGallery() {
    const grid = $('#galleryGrid');
    if (!grid)
        return;
    grid.innerHTML = galleryImages.map((item, i) => `
    <figure class="gallery-item reveal" data-gallery-index="${i}">
      <div class="gallery-image" style="background-image:url('${item.url}'),url('${item.fallback}')" data-parallax-image></div>
      <figcaption class="gallery-caption"><span>${item.caption}</span><b>0${i + 1}</b></figcaption>
    </figure>
  `).join('');
    // Validate local image references and switch to remote fallback if unavailable.
    galleryImages.forEach((item, i) => {
        const image = new Image();
        image.onerror = () => {
            const node = document.querySelector(`[data-gallery-index="${i}"] .gallery-image`);
            if (node)
                node.style.backgroundImage = `url('${item.fallback}')`;
        };
        image.src = item.url;
    });
}
function renderBites() {
    const rail = $('#biteRail');
    if (!rail)
        return;
    rail.innerHTML = allItems.map(item => `
    <div class="bite-chip">
      <small>${item.category}</small>
      <strong><span>${item.icon} ${item.name}</span><b>${money(item.price)}</b></strong>
    </div>
  `).join('');
}
function renderTestimonials() {
    const grid = $('#testimonialGrid');
    if (!grid)
        return;
    grid.innerHTML = testimonials.map(t => `
    <article class="testimonial glass tilt-card reveal" data-tilt-strength="5">
      <div>
        <div class="quote-mark">“</div>
        <p>${t.text}</p>
      </div>
      <div class="testimonial-foot"><strong>— ${t.name}</strong><span class="stars">★★★★★</span></div>
    </article>
  `).join('');
}
function calculateBoxes() {
    let totalItems = 0;
    const categoryCounts = { cutlet: 0, roll: 0, pattie: 0, sandwich: 0, burger: 0, wrap: 0 };
    for (const [name, qty] of Object.entries(cart)) {
        const item = allItems.find(i => i.name === name);
        if (!item)
            continue;
        totalItems += qty;
        if (categoryCounts[item.category] !== undefined)
            categoryCounts[item.category] += qty;
    }
    if (totalItems === 0)
        return { smallBoxes: 0, largeBoxes: 0, totalCost: 0, totalItems: 0 };
    const smallCap = { cutlet: 12, roll: 8, pattie: 8, sandwich: 3, burger: 3, wrap: 6 };
    const largeCapMixed = 20;
    let smallBoxes = 0;
    let largeBoxes = 0;
    const remaining = { ...categoryCounts };
    if (boxPreference === 'small') {
        for (const cat of Object.keys(remaining)) {
            while (remaining[cat] >= smallCap[cat]) {
                smallBoxes++;
                remaining[cat] -= smallCap[cat];
            }
        }
        const leftoverItems = Object.values(remaining).reduce((a, b) => a + b, 0);
        if (leftoverItems > 0)
            largeBoxes = Math.ceil(leftoverItems / largeCapMixed);
    }
    else if (boxPreference === 'large') {
        largeBoxes = Math.ceil(totalItems / largeCapMixed);
    }
    else {
        for (const cat of Object.keys(remaining)) {
            while (remaining[cat] >= smallCap[cat] && (remaining[cat] % smallCap[cat] <= 4 || remaining[cat] >= smallCap[cat] * 2)) {
                smallBoxes++;
                remaining[cat] -= smallCap[cat];
            }
        }
        const leftoverItems = Object.values(remaining).reduce((a, b) => a + b, 0);
        if (leftoverItems > 0)
            largeBoxes = Math.ceil(leftoverItems / largeCapMixed);
        if (smallBoxes === 0 && largeBoxes === 0 && totalItems > 0) {
            if (totalItems <= 12)
                smallBoxes = 1;
            else
                largeBoxes = 1;
        }
    }
    return {
        smallBoxes,
        largeBoxes,
        totalCost: smallBoxes * SMALL_BOX_COST + largeBoxes * LARGE_BOX_COST,
        totalItems,
    };
}
function filteredItems() {
    const q = searchTerm.trim().toLowerCase();
    return q ? allItems.filter(item => item.name.toLowerCase().includes(q) || item.category.includes(q)) : allItems;
}
function renderSelector() {
    const grid = $('#selectorGrid');
    if (!grid)
        return;
    grid.innerHTML = filteredItems().map(item => {
        const qty = cart[item.name] || 0;
        return `
      <div class="selector-item ${qty ? 'selected' : ''}" data-item="${item.name}">
        <div class="selector-info"><strong>${item.icon} ${item.name}</strong><span>${money(item.price)}</span></div>
        <div class="qty">
          <button type="button" data-action="decrease" aria-label="Decrease ${item.name}">−</button>
          <b>${qty}</b>
          <button type="button" data-action="increase" aria-label="Increase ${item.name}">＋</button>
        </div>
      </div>
    `;
    }).join('') || '<div class="empty-state">No matching bites.</div>';
    $$('.selector-item').forEach(card => {
        card.addEventListener('pointermove', e => setLocalGlow(card, e));
        card.querySelectorAll('button[data-action]').forEach(button => {
            button.addEventListener('click', () => {
                const itemName = card.dataset.item || '';
                const action = button.dataset.action;
                if (!itemName)
                    return;
                if (action === 'increase')
                    cart[itemName] = (cart[itemName] || 0) + 1;
                if (action === 'decrease' && cart[itemName]) {
                    cart[itemName]--;
                    if (cart[itemName] <= 0)
                        delete cart[itemName];
                }
                renderSelector();
                updateSummary();
            });
        });
    });
}
function itemsSubtotal() {
    return Object.entries(cart).reduce((sum, [name, qty]) => {
        const item = allItems.find(i => i.name === name);
        return sum + (item ? item.price * qty : 0);
    }, 0);
}
function updateSummary() {
    const selectedList = $('#selectedList');
    const breakdown = $('#boxBreakdown');
    if (!selectedList || !breakdown)
        return;
    const entries = Object.entries(cart);
    selectedList.innerHTML = entries.length
        ? entries.map(([name, qty]) => {
            const item = allItems.find(i => i.name === name);
            return `<div class="selected-row"><span>${qty}× ${name}</span><b>${money(item.price * qty)}</b></div>`;
        }).join('')
        : '<div class="empty-state">No items selected yet.</div>';
    const boxes = calculateBoxes();
    breakdown.innerHTML = boxes.totalItems ? `
    ${boxes.smallBoxes ? `<div class="breakdown-row"><span>Small Box × ${boxes.smallBoxes}</span><b>${money(boxes.smallBoxes * SMALL_BOX_COST)}</b></div>` : ''}
    ${boxes.largeBoxes ? `<div class="breakdown-row"><span>Large Box × ${boxes.largeBoxes}</span><b>${money(boxes.largeBoxes * LARGE_BOX_COST)}</b></div>` : ''}
    <div class="breakdown-row"><span>Total items</span><b>${boxes.totalItems}</b></div>
  ` : '';
    const subtotal = itemsSubtotal();
    const travel = deliveryType === 'delivery' ? TRAVEL_COST : 0;
    const bouquet = bouquetAdded ? BOUQUET_COST : 0;
    const total = subtotal + boxes.totalCost + travel + bouquet;
    setText('#itemsSubtotal', money(subtotal));
    setText('#boxCost', money(boxes.totalCost));
    setText('#travelFee', money(travel));
    setText('#cartCount', String(boxes.totalItems));
    const bouquetRow = $('#bouquetCostRow');
    if (bouquetRow)
        bouquetRow.hidden = !bouquetAdded;
    animateTotal(total);
    syncBouquetUI();
}
function setText(selector, value) {
    const el = $(selector);
    if (el)
        el.textContent = value;
}
let totalAnimation = 0;
function animateTotal(target) {
    const el = $('#grandTotal');
    if (!el)
        return;
    cancelAnimationFrame(totalAnimation);
    const start = Number(el.dataset.value || 0);
    const started = performance.now();
    const duration = 420;
    const easeOut = (t) => 1 - Math.pow(1 - t, 4);
    const tick = (now) => {
        const t = Math.min(1, (now - started) / duration);
        const value = Math.round(start + (target - start) * easeOut(t));
        el.textContent = money(value);
        if (t < 1)
            totalAnimation = requestAnimationFrame(tick);
        else
            el.dataset.value = String(target);
    };
    totalAnimation = requestAnimationFrame(tick);
}
function syncBouquetUI() {
    const toggle = $('#bouquetToggle');
    const state = $('#bouquetState');
    const float = $('#bouquetFloat');
    toggle === null || toggle === void 0 ? void 0 : toggle.classList.toggle('active', bouquetAdded);
    float === null || float === void 0 ? void 0 : float.classList.toggle('show', bouquetAdded);
    if (state)
        state.textContent = bouquetAdded ? 'Added' : 'Add';
}
function resetOrder() {
    cart = {};
    bouquetAdded = false;
    renderSelector();
    updateSummary();
    showToast('Order builder reset.');
}
function buildPlainOrderMessage() {
    const boxes = calculateBoxes();
    const subtotal = itemsSubtotal();
    const travel = deliveryType === 'delivery' ? TRAVEL_COST : 0;
    const flower = bouquetAdded ? BOUQUET_COST : 0;
    const lines = ['CUSTOM BOX ORDER', '', 'Items Ordered:'];
    Object.entries(cart).forEach(([name, qty]) => {
        const item = allItems.find(i => i.name === name);
        lines.push(`• ${qty}x ${name} - ${money(item.price * qty)}`);
    });
    if (!Object.keys(cart).length)
        lines.push('• No food items selected');
    lines.push('', `Box Breakdown (Preference: ${boxPreference}):`);
    if (boxes.smallBoxes)
        lines.push(`• Small Box × ${boxes.smallBoxes} - ${money(boxes.smallBoxes * SMALL_BOX_COST)}`);
    if (boxes.largeBoxes)
        lines.push(`• Large Box × ${boxes.largeBoxes} - ${money(boxes.largeBoxes * LARGE_BOX_COST)}`);
    lines.push(`Total Items: ${boxes.totalItems} items`);
    lines.push(deliveryType === 'delivery' ? `Travel Fee: ${money(TRAVEL_COST)} (Delivery)` : 'Pickup: Self pickup (No travel fee)');
    if (bouquetAdded)
        lines.push(`Flower Bouquet: ${money(BOUQUET_COST)}`);
    lines.push('────────────────');
    lines.push(`Grand Total: ${money(subtotal + boxes.totalCost + travel + flower)}`);
    lines.push('', 'Delivery Location:', 'Delivery Date & Time:', 'Contact Number:', '', 'Thank you!');
    return lines.join('\n');
}
function sendWhatsApp() {
    if (!Object.keys(cart).length && !bouquetAdded) {
        showToast('Select at least one item or add a flower bouquet.');
        return;
    }
    const url = `https://wa.me/94705659555?text=${encodeURIComponent(buildPlainOrderMessage())}`;
    window.open(url, '_blank', 'noopener,noreferrer');
}
function printOrder() {
    if (!Object.keys(cart).length && !bouquetAdded) {
        showToast('Select at least one item or add a flower bouquet.');
        return;
    }
    const boxes = calculateBoxes();
    const travel = deliveryType === 'delivery' ? TRAVEL_COST : 0;
    const subtotal = itemsSubtotal();
    const bouquet = bouquetAdded ? BOUQUET_COST : 0;
    const grandTotal = subtotal + boxes.totalCost + travel + bouquet;
    const rows = Object.entries(cart).map(([name, qty]) => {
        const item = allItems.find(i => i.name === name);
        return `<tr><td>${qty}× ${name}</td><td>${money(item.price)}</td><td>${money(item.price * qty)}</td></tr>`;
    }).join('') || '<tr><td colspan="3">No food items selected</td></tr>';
    const boxLines = [
        boxes.smallBoxes ? `Small Box × ${boxes.smallBoxes} = ${money(boxes.smallBoxes * SMALL_BOX_COST)}` : '',
        boxes.largeBoxes ? `Large Box × ${boxes.largeBoxes} = ${money(boxes.largeBoxes * LARGE_BOX_COST)}` : '',
    ].filter(Boolean).join(', ') || 'None';
    const w = window.open('', '_blank');
    if (!w) {
        showToast('Popup blocked. Allow popups to print the order.');
        return;
    }
    w.document.write(`<!doctype html><html><head><title>The Savory Bar - Order Summary</title><style>
    body{font-family:Arial,sans-serif;padding:42px;max-width:820px;margin:auto;color:#2c1810}.head{text-align:center;border-bottom:2px solid #c26a2c;padding-bottom:20px}.logo{font:700 30px Georgia;color:#8b4513}.title{color:#c26a2c;font-size:24px;margin:20px 0 8px}table{width:100%;border-collapse:collapse;margin:18px 0}th,td{padding:11px;text-align:left;border-bottom:1px solid #eadcca}th{background:#c26a2c;color:#fff}.section{font-weight:700;color:#8b4513;border-left:4px solid #c26a2c;padding-left:10px;margin-top:24px}.total{text-align:right;border-top:2px solid #c26a2c;margin-top:20px;padding-top:14px;font-weight:700;font-size:20px;color:#c26a2c}.foot{text-align:center;margin-top:30px;border-top:1px solid #eadcca;padding-top:18px;color:#725746;font-size:12px}
  </style></head><body>
    <div class="head"><div class="logo">THE SAVORY BAR<br><small>by Anasley</small></div><div class="title">ORDER SUMMARY</div><div>${new Date().toLocaleString()}</div></div>
    <div class="section">Ordered Items</div><table><thead><tr><th>Item</th><th>Unit Price</th><th>Total</th></tr></thead><tbody>${rows}</tbody></table>
    <div class="section">Other</div><p>Packaging: ${boxLines}</p><p>${deliveryType === 'delivery' ? `Delivery: ${money(travel)}` : 'Self Pickup: No travel fee'}</p>${bouquetAdded ? `<p>Flower Bouquet: ${money(BOUQUET_COST)}</p>` : ''}
    <div class="total">Grand Total: ${money(grandTotal)}</div><div class="foot">Thank you for ordering from The Savory Bar.<br>WhatsApp: +94 70 565 9555 · IG/TikTok: @the.savory.bar</div>
    <script>window.onload=()=>{window.print();setTimeout(()=>window.close(),600)}<\/script>
  </body></html>`);
    w.document.close();
}
function showToast(message) {
    const toast = $('#toast');
    if (!toast)
        return;
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2400);
}
function bindBuilder() {
    var _a, _b, _c, _d, _e, _f;
    (_a = $('#itemSearch')) === null || _a === void 0 ? void 0 : _a.addEventListener('input', e => {
        searchTerm = e.target.value;
        renderSelector();
    });
    $$('input[name="deliveryType"]').forEach(radio => radio.addEventListener('change', () => {
        deliveryType = radio.value;
        updateSummary();
    }));
    $$('input[name="boxPreference"]').forEach(radio => radio.addEventListener('change', () => {
        boxPreference = radio.value;
        updateSummary();
    }));
    (_b = $('#bouquetToggle')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => { bouquetAdded = !bouquetAdded; updateSummary(); });
    (_c = $('#removeBouquet')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => { bouquetAdded = false; updateSummary(); });
    (_d = $('#resetOrder')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', resetOrder);
    (_e = $('#printOrder')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', printOrder);
    (_f = $('#whatsappOrder')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', sendWhatsApp);
}
/* ---------- Motion system ---------- */
function setLocalGlow(el, e) {
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    el.style.setProperty('--gx', `${x}%`);
    el.style.setProperty('--gy', `${y}%`);
}
function initLocalGlassGlow() {
    $$('.glass, .glass-heavy, .glass-soft, .platter-card').forEach(el => {
        el.addEventListener('pointermove', e => setLocalGlow(el, e));
    });
}
function initReveals() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    $$('.reveal').forEach(el => observer.observe(el));
}
function initTilt() {
    if (matchMedia('(hover:none), (pointer:coarse), (prefers-reduced-motion: reduce)').matches)
        return;
    $$('.tilt-card').forEach(card => {
        const strength = Number(card.dataset.tiltStrength || 6);
        card.addEventListener('pointermove', e => {
            const r = card.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            card.style.transform = `perspective(1100px) rotateX(${-py * strength}deg) rotateY(${px * strength}deg) translateY(-2px)`;
            setLocalGlow(card, e);
        });
        card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
}
function initMagnetic() {
    if (matchMedia('(hover:none), (pointer:coarse), (prefers-reduced-motion: reduce)').matches)
        return;
    $$('.magnetic').forEach(el => {
        el.addEventListener('pointermove', e => {
            const r = el.getBoundingClientRect();
            const x = (e.clientX - r.left - r.width / 2) * 0.18;
            const y = (e.clientY - r.top - r.height / 2) * 0.18;
            el.style.transform = `translate3d(${x}px,${y}px,0)`;
        });
        el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
}
function initCursor() {
    const glow = $('#cursorGlow');
    const dot = $('#cursorDot');
    if (!glow || !dot || matchMedia('(hover:none), (pointer:coarse)').matches)
        return;
    let tx = innerWidth / 2, ty = innerHeight / 2, gx = tx, gy = ty;
    window.addEventListener('pointermove', e => {
        tx = e.clientX;
        ty = e.clientY;
        dot.style.left = `${tx}px`;
        dot.style.top = `${ty}px`;
        document.documentElement.style.setProperty('--mx', `${tx}px`);
        document.documentElement.style.setProperty('--my', `${ty}px`);
    }, { passive: true });
    const loop = () => {
        gx += (tx - gx) * 0.11;
        gy += (ty - gy) * 0.11;
        glow.style.left = `${gx}px`;
        glow.style.top = `${gy}px`;
        requestAnimationFrame(loop);
    };
    loop();
}
function initParallax() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches)
        return;
    let ticking = false;
    const update = () => {
        const sy = window.scrollY;
        $$('[data-parallax]').forEach(el => {
            const amount = Number(el.dataset.parallax || 0);
            el.style.transform = `translate3d(0,${sy * amount}px,0)`;
        });
        $$('[data-parallax-image]').forEach(el => {
            const r = el.parentElement.getBoundingClientRect();
            const center = r.top + r.height / 2 - innerHeight / 2;
            const offset = Math.max(-22, Math.min(22, -center * 0.035));
            el.style.translate = `0 ${offset}px`;
        });
        ticking = false;
    };
    addEventListener('scroll', () => { if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
    } }, { passive: true });
    update();
}
function initScrollUI() {
    const progress = $('#scrollProgress');
    const topBtn = $('#scrollTop');
    const nav = $('#navShell');
    let prev = scrollY;
    addEventListener('scroll', () => {
        const max = document.documentElement.scrollHeight - innerHeight;
        if (progress)
            progress.style.width = `${max ? (scrollY / max) * 100 : 0}%`;
        topBtn === null || topBtn === void 0 ? void 0 : topBtn.classList.toggle('show', scrollY > 650);
        nav === null || nav === void 0 ? void 0 : nav.classList.toggle('scrolled', scrollY > 40);
        if (scrollY > 420 && scrollY > prev + 8)
            nav === null || nav === void 0 ? void 0 : nav.classList.add('hidden');
        if (scrollY < prev - 8)
            nav === null || nav === void 0 ? void 0 : nav.classList.remove('hidden');
        prev = scrollY;
    }, { passive: true });
    topBtn === null || topBtn === void 0 ? void 0 : topBtn.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
}
function initNav() {
    const toggle = $('#menuToggle');
    const links = $('#navLinks');
    toggle === null || toggle === void 0 ? void 0 : toggle.addEventListener('click', () => {
        const open = !(links === null || links === void 0 ? void 0 : links.classList.contains('open'));
        links === null || links === void 0 ? void 0 : links.classList.toggle('open', open);
        toggle.classList.toggle('active', open);
        toggle.setAttribute('aria-expanded', String(open));
        document.body.classList.toggle('menu-open', open);
    });
    $$('.nav-link').forEach(link => link.addEventListener('click', () => {
        links === null || links === void 0 ? void 0 : links.classList.remove('open');
        toggle === null || toggle === void 0 ? void 0 : toggle.classList.remove('active');
        document.body.classList.remove('menu-open');
    }));
    const sections = $$('main section[id]');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting)
                return;
            const id = entry.target.id;
            $$('.nav-link').forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
        });
    }, { rootMargin: '-42% 0px -48% 0px', threshold: 0 });
    sections.forEach(section => observer.observe(section));
}
function initTheme() {
    document.documentElement.dataset.theme = 'dark';
    localStorage.removeItem('savory-theme');
}
/* ---------- Ambient particle / fluid-light canvas ---------- */
function initAmbientCanvas() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches)
        return;
    const canvas = $('#ambientCanvas');
    if (!canvas)
        return;
    const ctx = canvas.getContext('2d');
    if (!ctx)
        return;
    let particles = [];
    let dpr = Math.min(2, devicePixelRatio || 1);
    const resize = () => {
        dpr = Math.min(2, devicePixelRatio || 1);
        canvas.width = Math.floor(innerWidth * dpr);
        canvas.height = Math.floor(innerHeight * dpr);
        canvas.style.width = `${innerWidth}px`;
        canvas.style.height = `${innerHeight}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const count = Math.max(18, Math.min(44, Math.floor(innerWidth / 35)));
        particles = Array.from({ length: count }, () => ({
            x: Math.random() * innerWidth, y: Math.random() * innerHeight,
            r: 20 + Math.random() * 90, vx: (Math.random() - .5) * .09, vy: (Math.random() - .5) * .08,
            phase: Math.random() * Math.PI * 2, alpha: .012 + Math.random() * .035,
        }));
    };
    resize();
    addEventListener('resize', resize, { passive: true });
    let time = 0;
    const draw = () => {
        time += .006;
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        const light = document.documentElement.dataset.theme === 'light';
        particles.forEach((p, i) => {
            p.x += p.vx + Math.sin(time + p.phase) * .025;
            p.y += p.vy + Math.cos(time * .8 + p.phase) * .025;
            if (p.x < -120)
                p.x = innerWidth + 120;
            if (p.x > innerWidth + 120)
                p.x = -120;
            if (p.y < -120)
                p.y = innerHeight + 120;
            if (p.y > innerHeight + 120)
                p.y = -120;
            const pulse = 1 + Math.sin(time * 1.7 + p.phase) * .08;
            const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * pulse);
            const warm = i % 3 !== 0;
            const rgb = warm ? (light ? '182,99,39' : '239,182,93') : (light ? '143,75,78' : '180,90,84');
            g.addColorStop(0, `rgba(${rgb},${p.alpha * (light ? 1.8 : 1)})`);
            g.addColorStop(1, `rgba(${rgb},0)`);
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r * pulse, 0, Math.PI * 2);
            ctx.fill();
        });
        requestAnimationFrame(draw);
    };
    draw();
}
function initLoader() {
    const loader = $('#pageLoader');
    const hide = () => window.setTimeout(() => loader === null || loader === void 0 ? void 0 : loader.classList.add('hide'), 420);
    if (document.readyState === 'complete')
        hide();
    else
        addEventListener('load', hide, { once: true });
}
function boot() {
    renderPlatters();
    renderBites();
    renderTestimonials();
    renderSelector();
    updateSummary();
    bindBuilder();
    initTheme();
    initLoader();
    initCursor();
    initAmbientCanvas();
    initScrollUI();
    initReveals();
    initTilt();
    initMagnetic();
    initLocalGlassGlow();
    initParallax();
}
document.addEventListener('DOMContentLoaded', boot, { once: true });
