/* =========================================================
   LUMIÈRE SEMIJOIAS — favoritos.js
   Renderiza a lista de favoritos do usuário
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  const grid  = document.getElementById('wishlist-grid');
  const empty = document.getElementById('wishlist-empty');

  if (!grid) return;

  function renderWishlist() {
    const wishlist = JSON.parse(localStorage.getItem('thais_wishlist') || '[]');

    if (wishlist.length === 0) {
      grid.style.display = 'none';
      if (empty) empty.style.display = 'block';
      return;
    }

    if (empty) empty.style.display = 'none';
    grid.style.display = 'grid';

    const products = typeof PRODUCTS !== 'undefined' ? PRODUCTS : [];
    const favProducts = products.filter(p => wishlist.includes(p.id));

    if (typeof renderProductCard === 'function') {
      grid.innerHTML = favProducts.map(p => renderProductCard(p)).join('');

      // Bind add to cart
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

      // Bind wishlist (remover)
      grid.querySelectorAll('.btn-wishlist').forEach(btn => {
        const id = parseInt(btn.dataset.id);
        // Marcar como favorito
        btn.style.color = 'var(--gold)';
        const path = btn.querySelector('svg path');
        if (path) path.setAttribute('fill', 'currentColor');

        btn.addEventListener('click', () => {
          let wl = JSON.parse(localStorage.getItem('thais_wishlist') || '[]');
          const idx = wl.indexOf(id);
          if (idx !== -1) {
            wl.splice(idx, 1);
            localStorage.setItem('thais_wishlist', JSON.stringify(wl));
            if (typeof showToast === 'function') showToast('Removido dos favoritos');
            renderWishlist(); // Re-render
          }
        });
      });
    }
  }

  renderWishlist();
});
