/* =========================================================
   LUMIÈRE SEMIJOIAS — cart.js
   Lógica completa do carrinho com localStorage
   ========================================================= */

const CART_KEY = 'thais_cart';

// ---- HELPERS ----
function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
  catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function getCartTotal() {
  return getCart().reduce((sum, item) => {
    const product = PRODUCTS.find(p => p.id === item.id);
    return product ? sum + product.price * item.qty : sum;
  }, 0);
}

// ---- ATUALIZAR UI DO HEADER ----
function updateCartUI() {
  const count = getCartCount();
  const badges = document.querySelectorAll('.cart-count');
  badges.forEach(badge => {
    badge.textContent = count;
    if (count > 0) {
      badge.classList.add('visible');
      badge.classList.add('pulse');
      setTimeout(() => badge.classList.remove('pulse'), 400);
    } else {
      badge.classList.remove('visible');
    }
  });
}

// ---- ADICIONAR AO CARRINHO ----
window.addToCart = function(id, qty = 1) {
  const product = typeof PRODUCTS !== 'undefined' ? PRODUCTS.find(p => p.id === id) : null;
  if (!product) return;

  let cart = getCart();
  const idx = cart.findIndex(item => item.id === id);

  if (idx !== -1) {
    cart[idx].qty += qty;
  } else {
    cart.push({ id, qty });
  }

  saveCart(cart);
  updateCartUI();

  if (typeof showToast === 'function') {
    showToast(`✓ ${product.name} adicionado ao carrinho!`);
  }
};

// ---- REMOVER DO CARRINHO ----
window.removeFromCart = function(id) {
  let cart = getCart().filter(item => item.id !== id);
  saveCart(cart);
  updateCartUI();
  if (document.getElementById('cart-layout')) renderCartPage();
};

// ---- ATUALIZAR QUANTIDADE ----
window.updateCartQty = function(id, delta) {
  let cart = getCart();
  const idx = cart.findIndex(item => item.id === id);
  if (idx === -1) return;

  cart[idx].qty = Math.max(1, cart[idx].qty + delta);
  saveCart(cart);
  updateCartUI();
  if (document.getElementById('cart-layout')) renderCartPage();
};

// ---- RENDERIZAR PÁGINA DO CARRINHO ----
function renderCartPage() {
  const layout = document.getElementById('cart-layout');
  if (!layout) return;

  const cart = getCart();
  const products = typeof PRODUCTS !== 'undefined' ? PRODUCTS : [];

  if (cart.length === 0) {
    layout.innerHTML = `
      <div class="cart-empty">
        <p style="font-size:3rem;margin-bottom:16px;">🛍️</p>
        <h3>Seu carrinho está vazio</h3>
        <p style="color:var(--warm-gray);margin-bottom:32px;font-weight:300;">
          Explore nossas coleções e encontre peças que brilham para você!
        </p>
        <a href="colecoes.html" class="btn btn-primary">Ver Coleções</a>
      </div>
    `;
    return;
  }

  const subtotal = getCartTotal();
  const frete = subtotal >= 199 ? 0 : 14.90;
  const total = subtotal + frete;

  const itemsHtml = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) return '';
    return `
      <div class="cart-item">
        <div class="cart-item-img">
          <div style="width:100%;height:100%;background:${product.color};border-radius:6px;position:relative;overflow:hidden;">
              <img src="${product.img}" alt="${product.name}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;" onerror="this.style.opacity=0" loading="lazy"/>
            </div>
        </div>
        <div class="cart-item-info">
          <p class="cart-item-cat">${product.category}</p>
          <h4 class="cart-item-name">${product.name}</h4>
          <p class="cart-item-price">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
        </div>
        <div class="cart-item-actions">
          <div class="qty-control">
            <button class="qty-btn" onclick="updateCartQty(${product.id}, -1)">−</button>
            <span class="qty-display">${item.qty}</span>
            <button class="qty-btn" onclick="updateCartQty(${product.id}, 1)">+</button>
          </div>
          <p style="font-size:0.9rem;font-weight:600;color:var(--gold-dark);">
            R$ ${(product.price * item.qty).toFixed(2).replace('.', ',')}
          </p>
          <button class="cart-remove" onclick="removeFromCart(${product.id})">Remover</button>
        </div>
      </div>
    `;
  }).join('');

  const freteText = frete === 0
    ? '<span style="color:#27ae60;font-weight:500;">Grátis 🎉</span>'
    : `R$ ${frete.toFixed(2).replace('.', ',')}`;

  const freteProgress = subtotal >= 199 ? '' : `
    <div style="margin-bottom:16px;padding:12px 16px;background:var(--champagne);border-radius:8px;font-size:0.82rem;color:var(--charcoal-3);">
      Falta <strong style="color:var(--gold-dark);">R$ ${(199 - subtotal).toFixed(2).replace('.', ',')}</strong> para frete grátis!
      <div style="height:4px;background:rgba(0,0,0,0.08);border-radius:2px;margin-top:8px;">
        <div style="height:100%;width:${Math.min((subtotal / 199) * 100, 100)}%;background:var(--gold);border-radius:2px;transition:width 0.5s ease;"></div>
      </div>
    </div>`;

  layout.innerHTML = `
    <div class="cart-items">${itemsHtml}</div>
    <div class="cart-summary">
      <h3>Resumo do Pedido</h3>
      ${freteProgress}
      <div class="summary-row"><span>Subtotal</span><span>R$ ${subtotal.toFixed(2).replace('.', ',')}</span></div>
      <div class="summary-row"><span>Frete</span><span>${freteText}</span></div>
      <div class="coupon-form">
        <input type="text" placeholder="Código de desconto" id="coupon-input" />
        <button onclick="applyCoupon()">Aplicar</button>
      </div>
      <div id="discount-row" style="display:none;" class="summary-row">
        <span style="color:#27ae60;">Desconto</span>
        <span id="discount-value" style="color:#27ae60;"></span>
      </div>
      <div class="summary-row total">
        <span>Total</span>
        <span id="cart-total">R$ ${total.toFixed(2).replace('.', ',')}</span>
      </div>
      <button class="btn btn-primary btn-full" style="margin-top:20px;" onclick="goToCheckout()">
        Finalizar Compra
      </button>
      <a href="colecoes.html" class="btn btn-ghost btn-full" style="margin-top:10px;">
        Continuar Comprando
      </a>
      <div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-top:20px;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--warm-gray)" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        <span style="font-size:0.72rem;color:var(--warm-gray);">Compra 100% segura e criptografada</span>
      </div>
    </div>
  `;

  // Sugestões
  renderSuggestions();
}

// ---- CUPOM ----
const COUPONS = {
  'LUMIERE10': 0.10,
  'PRIMEIRACOMPRA': 0.15,
  'VERAO25': 0.25,
};

window.applyCoupon = function() {
  const input = document.getElementById('coupon-input');
  if (!input) return;
  const code = input.value.trim().toUpperCase();
  const discount = COUPONS[code];

  if (discount) {
    const subtotal = getCartTotal();
    const amount = subtotal * discount;
    const discountRow = document.getElementById('discount-row');
    const discountVal = document.getElementById('discount-value');
    const totalEl = document.getElementById('cart-total');

    if (discountRow) discountRow.style.display = 'flex';
    if (discountVal) discountVal.textContent = `− R$ ${amount.toFixed(2).replace('.', ',')}`;
    const frete = subtotal >= 199 ? 0 : 14.90;
    if (totalEl) totalEl.textContent = `R$ ${(subtotal + frete - amount).toFixed(2).replace('.', ',')}`;

    if (typeof showToast === 'function') showToast(`🎉 Cupom ${code} aplicado! ${(discount * 100)}% de desconto`);
  } else {
    if (typeof showToast === 'function') showToast('Cupom inválido ou expirado.');
  }
};

// ---- CHECKOUT (placeholder) ----
window.goToCheckout = function() {
  if (typeof showToast === 'function') showToast('🚀 Redirecionando para o checkout...');
  setTimeout(() => {
    alert('Página de checkout em desenvolvimento.\nIntegre com seu sistema de pagamento preferido (PagSeguro, Mercado Pago, Stripe, etc.)');
  }, 1000);
};

// ---- SUGESTÕES NO CARRINHO ----
function renderSuggestions() {
  const grid = document.getElementById('suggestions-grid');
  if (!grid || typeof PRODUCTS === 'undefined') return;

  const cart = getCart();
  const cartIds = cart.map(i => i.id);
  const suggestions = PRODUCTS.filter(p => !cartIds.includes(p.id)).slice(0, 4);

  if (typeof renderProductCard === 'function') {
    grid.innerHTML = suggestions.map(p => renderProductCard(p)).join('');
    // Bind actions
    grid.querySelectorAll('.btn-add-cart').forEach(btn => {
      btn.addEventListener('click', () => {
        addToCart(parseInt(btn.dataset.id));
        btn.textContent = '✓ Adicionado!';
        setTimeout(() => { btn.textContent = 'Adicionar ao Carrinho'; }, 2000);
      });
    });
  }
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();
  if (document.getElementById('cart-layout')) renderCartPage();
});
