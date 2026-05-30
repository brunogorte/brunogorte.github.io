/* =========================================================
   LUMIÈRE SEMIJOIAS — products.js
   Dados dos produtos e funções de renderização
   ========================================================= */

// ---- BASE DE DADOS DE PRODUTOS ----
const PRODUCTS = [
  {
    id: 1, name: 'Anel Solitário Zircônia', category: 'aneis',
    price: 89.90, oldPrice: null,
    badge: 'new', rating: 4.8, reviews: 124,
    tags: ['ouro18k', 'zirconia', 'classico'],
    img: 'assets/img/produtos/produto-01.jpg',
    color: 'linear-gradient(135deg, #c9a96e 0%, #9e7a3f 100%)',
    description: 'Anel delicado banhado ouro 18k com pedra zircônia central.'
  },
  {
    id: 2, name: 'Colar Pérola Barroca', category: 'colares',
    price: 129.90, oldPrice: 159.90,
    badge: 'sale', rating: 4.9, reviews: 87,
    tags: ['ouro18k', 'perola', 'classico'],
    img: 'assets/img/produtos/produto-02.jpg',
    color: 'linear-gradient(135deg, #e8d5a3 0%, #c9a96e 100%)',
    description: 'Colar elegante com pingente de pérola barroca natural.'
  },
  {
    id: 3, name: 'Brinco Argola Fina', category: 'brincos',
    price: 59.90, oldPrice: null,
    badge: null, rating: 4.7, reviews: 256,
    tags: ['ouro18k', 'sem-pedra', 'minimalista'],
    img: 'assets/img/produtos/produto-03.jpg',
    color: 'linear-gradient(135deg, #d4aa70 0%, #9e7a3f 100%)',
    description: 'Argola fininha banhada ouro 18k, levinha e sofisticada.'
  },
  {
    id: 4, name: 'Pulseira Veneziana Fina', category: 'pulseiras',
    price: 79.90, oldPrice: null,
    badge: 'hot', rating: 4.6, reviews: 193,
    tags: ['ouro18k', 'sem-pedra', 'classico'],
    img: 'assets/img/produtos/produto-04.jpg',
    color: 'linear-gradient(135deg, #e0c98a 0%, #b8862e 100%)',
    description: 'Pulseira veneziana fina em banho ouro 18k, 18cm.'
  },
  {
    id: 5, name: 'Conjunto Lua e Estrela', category: 'conjuntos',
    price: 199.90, oldPrice: 249.90,
    badge: 'sale', rating: 5.0, reviews: 64,
    tags: ['ouro18k', 'zirconia', 'romantico'],
    img: 'assets/img/produtos/produto-05.jpg',
    color: 'linear-gradient(135deg, #1c1c1c 0%, #c9a96e 100%)',
    description: 'Conjunto completo: colar + brincos + anel temática lua e estrela.'
  },
  {
    id: 6, name: 'Anel Aparador Triângulo', category: 'aneis',
    price: 69.90, oldPrice: null,
    badge: 'new', rating: 4.5, reviews: 42,
    tags: ['ouro18k', 'sem-pedra', 'moderno'],
    img: 'assets/img/produtos/produto-06.jpg',
    color: 'linear-gradient(135deg, #b8862e 0%, #e8d5a3 100%)',
    description: 'Anel aparador geométrico, estilo moderno e minimalista.'
  },
  {
    id: 7, name: 'Colar Corrente Grumet', category: 'colares',
    price: 149.90, oldPrice: null,
    badge: null, rating: 4.8, reviews: 178,
    tags: ['ouro18k', 'sem-pedra', 'classico'],
    img: 'assets/img/produtos/produto-07.jpg',
    color: 'linear-gradient(135deg, #c9a96e 0%, #7a5c28 100%)',
    description: 'Corrente grumet dourada 60cm, elo grosso e resistente.'
  },
  {
    id: 8, name: 'Brinco Ear Cuff Folha', category: 'brincos',
    price: 49.90, oldPrice: 69.90,
    badge: 'sale', rating: 4.7, reviews: 315,
    tags: ['ouro18k', 'sem-pedra', 'moderno'],
    img: 'assets/img/produtos/produto-08.jpg',
    color: 'linear-gradient(135deg, #e0c98a 0%, #c9a96e 100%)',
    description: 'Ear cuff formato folha sem necessidade de furar a orelha.'
  },
  {
    id: 9, name: 'Tornozeleira Boho Cristal', category: 'tornozeleiras',
    price: 59.90, oldPrice: null,
    badge: 'new', rating: 4.6, reviews: 89,
    tags: ['ouro18k', 'cristal', 'romantico'],
    img: 'assets/img/produtos/produto-09.jpg',
    color: 'linear-gradient(135deg, #f0e6cc 0%, #c9a96e 100%)',
    description: 'Tornozeleira boho com detalhes em cristal transparente.'
  },
  {
    id: 10, name: 'Anel de Falange Coração', category: 'aneis',
    price: 39.90, oldPrice: null,
    badge: null, rating: 4.9, reviews: 421,
    tags: ['ouro18k', 'sem-pedra', 'romantico'],
    img: 'assets/img/produtos/produto-10.jpg',
    color: 'linear-gradient(135deg, #d4aa70 0%, #9e7a3f 100%)',
    description: 'Anel de falange formato coração, delicado e romantico.'
  },
  {
    id: 11, name: 'Colar Choker Zircônia', category: 'colares',
    price: 99.90, oldPrice: 129.90,
    badge: 'sale', rating: 4.8, reviews: 203,
    tags: ['ouro18k', 'zirconia', 'moderno'],
    img: 'assets/img/produtos/produto-11.jpg',
    color: 'linear-gradient(135deg, #1c1c1c 0%, #b8862e 100%)',
    description: 'Choker cravejada com zircônias brancas, glamourosa.'
  },
  {
    id: 12, name: 'Pulseira Berloque Viagem', category: 'pulseiras',
    price: 119.90, oldPrice: null,
    badge: 'hot', rating: 4.7, reviews: 147,
    tags: ['ouro18k', 'sem-pedra', 'classico'],
    img: 'assets/img/produtos/produto-12.jpg',
    color: 'linear-gradient(135deg, #e8d5a3 0%, #9e7a3f 100%)',
    description: 'Pulseira com berloques de viagem, personalizável.'
  },
];

// ---- RENDERIZAR CARD DE PRODUTO ----
function renderProductCard(product, showAddToCart = true) {
  const stars = '★'.repeat(Math.round(product.rating)) + '☆'.repeat(5 - Math.round(product.rating));
  const badgeHtml = product.badge ? `
    <div class="product-badges">
      <span class="badge badge-${product.badge}">
        ${product.badge === 'new' ? 'Novo' : product.badge === 'sale' ? 'Oferta' : '🔥 Hot'}
      </span>
    </div>` : '';
  const oldPriceHtml = product.oldPrice
    ? `<span class="product-price-old">R$ ${product.oldPrice.toFixed(2).replace('.', ',')}</span>` : '';

  return `
    <div class="product-card" data-id="${product.id}" data-cat="${product.category}">
      <div class="product-img-wrap">
        <div style="position:absolute;inset:0;background:${product.color};z-index:0;"></div>
        <img
          class="product-img"
          src="${product.img}"
          alt="${product.name}"
          loading="lazy"
          style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;z-index:1;display:block;"
          onerror="this.style.opacity=0"
        />
        ${badgeHtml}
        <div class="product-actions">
          <button class="product-action-btn btn-wishlist" data-id="${product.id}" title="Favoritar" aria-label="Favoritar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          <button class="product-action-btn btn-quick-view" data-id="${product.id}" title="Ver rápido" aria-label="Ver rápido">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="product-info">
        <p class="product-category">${product.category}</p>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-price-wrap">
          <span class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
          ${oldPriceHtml}
        </div>
        <div class="product-rating">
          <span class="stars">${stars}</span>
          <span class="rating-count">(${product.reviews})</span>
        </div>
        ${showAddToCart ? `
          <button class="product-add-btn btn-add-cart" data-id="${product.id}">
            Adicionar ao Carrinho
          </button>` : ''}
      </div>
    </div>
  `;
}

// ---- RENDERIZAR PRODUTOS DESTAQUE (home) ----
function renderFeaturedProducts() {
  const grid = document.getElementById('featured-products');
  if (!grid) return;
  const featured = PRODUCTS.filter(p => p.badge === 'hot' || p.badge === 'sale' || p.rating >= 4.8).slice(0, 8);
  grid.innerHTML = featured.map(p => renderProductCard(p)).join('');
  bindProductActions(grid);
}

// ---- RENDERIZAR NOVIDADES (slider) ----
function renderNewArrivals() {
  const slider = document.getElementById('products-slider');
  const dotsContainer = document.getElementById('slider-dots');
  if (!slider) return;

  const newProducts = PRODUCTS.filter(p => p.badge === 'new' || p.id > 8).slice(0, 8);

  // Para o slider exibimos 4 por vez
  const itemsPerSlide = 4;
  const totalSlides = Math.ceil(newProducts.length / itemsPerSlide);

  // Criar wrapper por slide
  let slidesHtml = '';
  for (let i = 0; i < totalSlides; i++) {
    const batch = newProducts.slice(i * itemsPerSlide, (i + 1) * itemsPerSlide);
    slidesHtml += `
      <div class="slider-slide" style="min-width:100%; display:flex; gap:24px;">
        ${batch.map(p => `<div style="flex:1;min-width:0;">${renderProductCard(p, false)}</div>`).join('')}
      </div>`;
  }
  slider.innerHTML = slidesHtml;
  slider.style.display = 'flex';
  slider.style.transition = 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)';

  // Dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  bindProductActions(slider);
}

// ---- BINDINGS: Carrinho e Wishlist ----
function bindProductActions(container) {
  container.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      addToCart(id);
      btn.textContent = '✓ Adicionado!';
      btn.style.background = 'var(--gold)';
      btn.style.color = '#fff';
      setTimeout(() => {
        btn.textContent = 'Adicionar ao Carrinho';
        btn.style.background = '';
        btn.style.color = '';
      }, 2000);
    });
  });

  container.querySelectorAll('.btn-wishlist').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      toggleWishlist(id, btn);
    });
  });

  container.querySelectorAll('.btn-quick-view').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      openQuickView(id);
    });
  });
}

// ---- WISHLIST ----
function toggleWishlist(id, btn) {
  let wishlist = JSON.parse(localStorage.getItem('thais_wishlist') || '[]');
  const idx = wishlist.indexOf(id);
  if (idx === -1) {
    wishlist.push(id);
    btn.style.color = '#C9A96E';
    btn.querySelector('svg path').setAttribute('fill', 'currentColor');
    showToast('💛 Adicionado aos favoritos!');
  } else {
    wishlist.splice(idx, 1);
    btn.style.color = '';
    btn.querySelector('svg path').setAttribute('fill', 'none');
    showToast('Removido dos favoritos');
  }
  localStorage.setItem('thais_wishlist', JSON.stringify(wishlist));
}

// ---- QUICK VIEW ----
window.openQuickView = function openQuickView(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  // Criar modal
  const existing = document.getElementById('quick-view-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'quick-view-modal';
  modal.style.cssText = `
    position:fixed;inset:0;background:rgba(0,0,0,0.6);
    z-index:5000;display:flex;align-items:center;justify-content:center;
    padding:20px;animation:fadeIn 0.3s ease;
  `;
  modal.innerHTML = `
    <div style="background:var(--white);border-radius:16px;max-width:700px;width:100%;
                display:grid;grid-template-columns:1fr 1fr;overflow:hidden;box-shadow:var(--shadow-lg);">
      <div style="position:relative;min-height:300px;background:${product.color};">
        <img src="${product.img}" alt="${product.name}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;" onerror="this.style.opacity=0" loading="lazy" />
      </div>
      <div style="padding:36px;">
        <p style="font-size:0.68rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--warm-gray);margin-bottom:8px;">
          ${product.category}
        </p>
        <h2 style="font-family:var(--font-display);font-size:1.8rem;font-weight:300;margin-bottom:12px;">
          ${product.name}
        </h2>
        <p style="color:var(--charcoal-3);font-weight:300;line-height:1.7;margin-bottom:20px;">
          ${product.description}
        </p>
        <p style="font-size:1.4rem;font-weight:500;color:var(--gold-dark);margin-bottom:24px;">
          R$ ${product.price.toFixed(2).replace('.', ',')}
        </p>
        <button onclick="addToCart(${product.id}); document.getElementById('quick-view-modal').remove();"
          style="width:100%;padding:14px;background:var(--gold);color:#fff;
                 border:none;border-radius:999px;font-size:0.8rem;font-weight:500;
                 letter-spacing:0.15em;text-transform:uppercase;cursor:pointer;">
          Adicionar ao Carrinho
        </button>
        <button onclick="document.getElementById('quick-view-modal').remove();"
          style="width:100%;padding:12px;background:transparent;color:var(--warm-gray);
                 border:none;font-size:0.8rem;cursor:pointer;margin-top:8px;
                 letter-spacing:0.1em;text-transform:uppercase;">
          Fechar
        </button>
      </div>
    </div>
  `;
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
  document.body.appendChild(modal);
}

// ---- INICIALIZAÇÃO ----
document.addEventListener('DOMContentLoaded', () => {
  renderFeaturedProducts();
  renderNewArrivals();
});
