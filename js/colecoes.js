/* =========================================================
   LUMIÈRE SEMIJOIAS — colecoes.js
   Filtros, ordenação, paginação e view toggle
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  if (!document.getElementById('products-grid')) return;

  let activeCategory = 'todos';
  let activeSort     = 'relevancia';
  let activeView     = 'grid';
  let currentPage    = 1;
  const ITEMS_PER_PAGE = 12;

  // ---- FILTROS ATIVOS ----
  let activeFilters = {
    priceMin: 0,
    priceMax: 500,
    material: [],
    pedra: [],
    estilo: [],
    disponibilidade: ['em-estoque']
  };

  // ---- CATEGORIA TABS ----
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.cat;
      currentPage = 1;
      renderProducts();
    });
  });

  // ---- ORDENAÇÃO ----
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      activeSort = sortSelect.value;
      currentPage = 1;
      renderProducts();
    });
  }

  // ---- VIEW TOGGLE ----
  const viewBtns = document.querySelectorAll('.view-btn');
  const grid = document.getElementById('products-grid');
  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      viewBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeView = btn.dataset.view;
      if (grid) {
        grid.classList.toggle('list-view', activeView === 'list');
        grid.classList.toggle('grid-view', activeView === 'grid');
      }
    });
  });

  // ---- FILTROS SIDEBAR ----
  const applyBtn = document.getElementById('apply-filters');
  const clearBtn = document.getElementById('clear-filters');
  const priceSlider = document.getElementById('price-slider');
  const priceMax = document.getElementById('price-max');

  if (priceSlider) {
    priceSlider.addEventListener('input', () => {
      if (priceMax) priceMax.value = priceSlider.value;
      activeFilters.priceMax = parseInt(priceSlider.value);
    });
  }
  if (priceMax) {
    priceMax.addEventListener('input', () => {
      if (priceSlider) priceSlider.value = priceMax.value;
      activeFilters.priceMax = parseInt(priceMax.value) || 500;
    });
  }

  const priceMinInput = document.getElementById('price-min');
  if (priceMinInput) {
    priceMinInput.addEventListener('input', () => {
      activeFilters.priceMin = parseInt(priceMinInput.value) || 0;
    });
  }

  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      // Coletar checkboxes
      activeFilters.material = [...document.querySelectorAll('.filter-check input[value="ouro18k"], .filter-check input[value="ouro24k"], .filter-check input[value="rosé"], .filter-check input[value="prata"]')]
        .filter(cb => cb.checked).map(cb => cb.value);

      activeFilters.pedra = [...document.querySelectorAll('.filter-check input[value="zirconia"], .filter-check input[value="cristal"], .filter-check input[value="perola"], .filter-check input[value="sem-pedra"]')]
        .filter(cb => cb.checked).map(cb => cb.value);

      activeFilters.estilo = [...document.querySelectorAll('.filter-check input[value="classico"], .filter-check input[value="moderno"], .filter-check input[value="romantico"], .filter-check input[value="minimalista"]')]
        .filter(cb => cb.checked).map(cb => cb.value);

      currentPage = 1;
      renderProducts();

      if (typeof showToast === 'function') showToast('Filtros aplicados!');
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      activeFilters = { priceMin: 0, priceMax: 500, material: [], pedra: [], estilo: [], disponibilidade: [] };
      document.querySelectorAll('.filters-sidebar input[type="checkbox"]').forEach(cb => cb.checked = false);
      if (priceSlider) { priceSlider.value = 500; }
      if (priceMax) { priceMax.value = 500; }
      if (priceMinInput) { priceMinInput.value = 0; }
      currentPage = 1;
      renderProducts();
    });
  }

  // ---- FILTRAR E ORDENAR ----
  function getFilteredProducts() {
    let result = typeof PRODUCTS !== 'undefined' ? [...PRODUCTS] : [];

    // Categoria
    if (activeCategory !== 'todos') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Preço
    result = result.filter(p => p.price >= activeFilters.priceMin && p.price <= activeFilters.priceMax);

    // Material (tags)
    if (activeFilters.material.length > 0) {
      result = result.filter(p => activeFilters.material.some(m => p.tags?.includes(m)));
    }

    // Pedra
    if (activeFilters.pedra.length > 0) {
      result = result.filter(p => activeFilters.pedra.some(pe => p.tags?.includes(pe)));
    }

    // Estilo
    if (activeFilters.estilo.length > 0) {
      result = result.filter(p => activeFilters.estilo.some(e => p.tags?.includes(e)));
    }

    // Ordenação
    switch (activeSort) {
      case 'menor-preco':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'maior-preco':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'novidades':
        result.sort((a, b) => b.id - a.id);
        break;
      case 'mais-vendidos':
        result.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
        break;
      default:
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }

  // ---- PAGINAÇÃO ----
  function renderPagination(total) {
    const paginationEl = document.getElementById('pagination');
    if (!paginationEl) return;

    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
    if (totalPages <= 1) { paginationEl.innerHTML = ''; return; }

    let html = '';
    if (currentPage > 1) html += `<button class="page-btn" data-page="${currentPage - 1}">‹</button>`;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        html += `<span style="padding:0 4px;color:var(--warm-gray);">…</span>`;
      }
    }

    if (currentPage < totalPages) html += `<button class="page-btn" data-page="${currentPage + 1}">›</button>`;

    paginationEl.innerHTML = html;
    paginationEl.querySelectorAll('.page-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentPage = parseInt(btn.dataset.page);
        renderProducts();
        window.scrollTo({ top: document.querySelector('.shop-section').offsetTop - 80, behavior: 'smooth' });
      });
    });
  }

  // ---- RENDER PRINCIPAL ----
  function renderProducts() {
    const grid = document.getElementById('products-grid');
    const countEl = document.getElementById('products-count');
    if (!grid) return;

    const filtered = getFilteredProducts();
    const total = filtered.length;
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);

    if (countEl) {
      countEl.textContent = `${total} produto${total !== 1 ? 's' : ''} encontrado${total !== 1 ? 's' : ''}`;
    }

    if (paginated.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:60px 0;">
          <p style="font-family:var(--font-display);font-size:1.8rem;font-weight:300;color:var(--warm-gray);margin-bottom:16px;">
            Nenhum produto encontrado
          </p>
          <p style="color:var(--warm-gray);font-weight:300;margin-bottom:24px;">
            Tente ajustar os filtros ou explorar outra categoria.
          </p>
          <button class="btn btn-outline" onclick="document.getElementById('clear-filters').click()">
            Limpar Filtros
          </button>
        </div>
      `;
      renderPagination(0);
      return;
    }

    // Animação de saída
    grid.style.opacity = '0';
    grid.style.transform = 'translateY(10px)';

    setTimeout(() => {
      if (typeof renderProductCard === 'function') {
        grid.innerHTML = paginated.map(p => renderProductCard(p)).join('');

        // Bind actions
        grid.querySelectorAll('.btn-add-cart').forEach(btn => {
          btn.addEventListener('click', () => {
            if (typeof addToCart === 'function') addToCart(parseInt(btn.dataset.id));
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

        // Bind botão de visualização rápida (olhinho)
        grid.querySelectorAll('.btn-quick-view').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            if (typeof openQuickView === 'function') openQuickView(id);
          });
        });
      }

      grid.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      grid.style.opacity = '1';
      grid.style.transform = 'translateY(0)';

      renderPagination(total);
    }, 150);
  }

  // ---- HASH NAVIGATION (ex: colecoes.html#aneis) ----
  function checkHash() {
    const hash = window.location.hash.replace('#', '');
    if (hash && hash !== '') {
      const validCats = ['aneis', 'colares', 'brincos', 'pulseiras', 'tornozeleiras', 'conjuntos'];
      if (validCats.includes(hash)) {
        activeCategory = hash;
        tabBtns.forEach(btn => {
          btn.classList.toggle('active', btn.dataset.cat === hash);
        });
      }
    }
  }

  checkHash();
  renderProducts();

  // URL params (filter=novo)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('filter') === 'novo') {
    activeSort = 'novidades';
    if (sortSelect) sortSelect.value = 'novidades';
    renderProducts();
  }
});
