/* =========================================================
   LUMIÈRE SEMIJOIAS — slider.js
   Controle dos sliders de produtos e depoimentos
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ---- SLIDER DE PRODUTOS (Novidades) ----
  initProductSlider();

  // ---- SLIDER DE DEPOIMENTOS ----
  initTestimonialsSlider();

});

// ---- PRODUTOS SLIDER ----
function initProductSlider() {
  const slider = document.getElementById('products-slider');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');
  const dotsContainer = document.getElementById('slider-dots');

  if (!slider) return;

  let currentSlide = 0;

  function getSlides() {
    return slider.querySelectorAll('.slider-slide');
  }

  function goToSlide(index) {
    const slides = getSlides();
    if (slides.length === 0) return;

    const total = slides.length;
    currentSlide = ((index % total) + total) % total;

    slider.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Atualizar dots
    if (dotsContainer) {
      dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
    }
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

  // Auto-play
  let autoplay = setInterval(() => goToSlide(currentSlide + 1), 5000);

  if (slider.parentElement) {
    slider.parentElement.addEventListener('mouseenter', () => clearInterval(autoplay));
    slider.parentElement.addEventListener('mouseleave', () => {
      autoplay = setInterval(() => goToSlide(currentSlide + 1), 5000);
    });
  }

  // Touch / Swipe
  let touchStartX = 0;
  slider.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goToSlide(currentSlide + (diff > 0 ? 1 : -1));
  });

  // Expor função global para dots
  window.goToSlide = goToSlide;
}

// ---- DEPOIMENTOS SLIDER ----
const TESTIMONIALS = [
  {
    text: 'Comprei o conjunto Lua e Estrela e simplesmente não consigo mais tirar. A qualidade é incrível, o banho é super duradouro e chegou muito bem embalado. Recomendo demais!',
    author: 'Ana Carolina S.',
    detail: 'Cliente desde 2022 · Rio de Janeiro',
    stars: 5
  },
  {
    text: 'Já comprei em vários lugares, mas a Thais Semijoias tem o melhor custo-benefício. Minha pulseira veneziana está impecável depois de 8 meses usando todo dia!',
    author: 'Fernanda M.',
    detail: 'Cliente desde 2023 · São Paulo',
    stars: 5
  },
  {
    text: 'O atendimento é maravilhoso. Tive uma dúvida e responderam na hora pelo WhatsApp. E as peças então... são lindíssimas. Já indiquei para todas as amigas.',
    author: 'Juliana R.',
    detail: 'Cliente desde 2021 · Curitiba',
    stars: 5
  },
  {
    text: 'Recebi meu pedido em 2 dias e a embalagem é um presente. Os brincos argola são delicados e sofisticados. Perfeitos para o dia a dia e para ocasiões especiais.',
    author: 'Mariana L.',
    detail: 'Cliente desde 2024 · Belo Horizonte',
    stars: 5
  },
  {
    text: 'Presente para minha mãe no aniversário dela. Ela amou! Disse que foi a joia mais bonita que já ganhou. Com certeza vou comprar mais.',
    author: 'Patricia F.',
    detail: 'Compradora · Brasília',
    stars: 5
  }
];

function initTestimonialsSlider() {
  const sliderEl = document.getElementById('testimonials-slider');
  const dotsEl = document.getElementById('testimonials-dots');

  if (!sliderEl) return;

  let currentT = 0;

  // Renderizar slides
  sliderEl.innerHTML = TESTIMONIALS.map((t, i) => `
    <div class="testimonial-item ${i === 0 ? 'active' : ''}">
      <div class="testimonial-stars">${'★'.repeat(t.stars)}</div>
      <p class="testimonial-text">"${t.text}"</p>
      <div class="testimonial-author">
        <strong>${t.author}</strong>
        <span>${t.detail}</span>
      </div>
    </div>
  `).join('');

  // Renderizar dots
  if (dotsEl) {
    dotsEl.innerHTML = TESTIMONIALS.map((_, i) => `
      <div class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></div>
    `).join('');

    dotsEl.querySelectorAll('.dot').forEach(dot => {
      dot.addEventListener('click', () => goToTestimonial(parseInt(dot.dataset.index)));
    });
  }

  function goToTestimonial(index) {
    const items = sliderEl.querySelectorAll('.testimonial-item');
    const dots = dotsEl ? dotsEl.querySelectorAll('.dot') : [];

    items[currentT]?.classList.remove('active');
    dots[currentT]?.classList.remove('active');

    currentT = ((index % TESTIMONIALS.length) + TESTIMONIALS.length) % TESTIMONIALS.length;

    items[currentT]?.classList.add('active');
    dots[currentT]?.classList.add('active');
  }

  // Auto-play depoimentos
  setInterval(() => goToTestimonial(currentT + 1), 6000);

  // Swipe
  let touchStartX = 0;
  sliderEl.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  sliderEl.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goToTestimonial(currentT + (diff > 0 ? 1 : -1));
  });
}
