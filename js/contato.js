/* =========================================================
   LUMIÈRE SEMIJOIAS — contato.js
   FAQ accordion + validação do formulário
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ---- FAQ ----
  const FAQ_DATA = [
    {
      q: 'Qual é o prazo de entrega?',
      a: 'O prazo varia de acordo com a sua localização. Para capitais, entregamos em até 3 dias úteis. Para o interior, de 5 a 8 dias úteis. Você receberá um código de rastreio por e-mail assim que seu pedido for enviado.'
    },
    {
      q: 'As peças têm garantia?',
      a: 'Sim! Todas as nossas peças têm garantia de 12 meses contra defeitos de fabricação, descoloração do banho e outros problemas relacionados ao processo produtivo. A garantia não cobre danos por mau uso, exposição a produtos químicos ou impactos físicos.'
    },
    {
      q: 'Como cuidar das semijoias?',
      a: 'Para prolongar a vida das suas peças: evite contato com água, perfume, cremes e produtos de limpeza. Guarde em local seco, preferencialmente em caixinhas individuais. Coloque as joias por último ao se arrumar. Com esses cuidados simples, suas peças durarão muito mais!'
    },
    {
      q: 'Posso trocar ou devolver?',
      a: 'Sim! Você tem até 7 dias corridos após o recebimento para solicitar a troca ou devolução, conforme o Código de Defesa do Consumidor. O produto deve estar sem uso e na embalagem original. Basta entrar em contato pelo WhatsApp ou e-mail para iniciar o processo.'
    },
    {
      q: 'Quais são as formas de pagamento?',
      a: 'Aceitamos cartões de crédito (Visa, Mastercard, Elo, Amex) em até 12x sem juros para compras acima de R$ 150. Também aceitamos Pix (5% de desconto) e boleto bancário. Para pagamentos via WhatsApp, consulte disponibilidade.'
    },
    {
      q: 'O frete é grátis?',
      a: 'Sim! Para compras acima de R$ 199 o frete é totalmente grátis para todo o Brasil. Para compras abaixo desse valor, o frete é calculado automaticamente no checkout conforme o seu CEP.'
    },
    {
      q: 'Como funciona o banho de ouro?',
      a: 'Nossas peças são banhadas em ouro 18k com espessura mínima de 3 micras, o que garante durabilidade e resistência superior à maioria das semijoias do mercado. O processo é realizado por fornecedores certificados com rigoroso controle de qualidade.'
    },
    {
      q: 'Vocês fazem vendas no atacado?',
      a: 'Sim! Temos uma linha especial para revendedoras. Entre em contato pelo WhatsApp ou e-mail informando seu interesse, quantidade desejada e localidade. Nossa equipe comercial retornará com tabela de preços e condições especiais.'
    }
  ];

  const faqList = document.getElementById('faq-list');
  if (faqList) {
    faqList.innerHTML = FAQ_DATA.map((item, i) => `
      <div class="faq-item reveal-up" style="transition-delay:${i * 0.05}s;">
        <button class="faq-question" aria-expanded="false">
          <span>${item.q}</span>
          <div class="faq-icon">+</div>
        </button>
        <div class="faq-answer">
          <p>${item.a}</p>
        </div>
      </div>
    `).join('');

    // Accordion logic
    faqList.querySelectorAll('.faq-item').forEach(item => {
      const btn = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');

      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Fechar todos
        faqList.querySelectorAll('.faq-item.open').forEach(openItem => {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-answer').style.maxHeight = '0';
          openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });

        // Abrir clicado se estava fechado
        if (!isOpen) {
          item.classList.add('open');
          answer.style.maxHeight = answer.scrollHeight + 'px';
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  // ---- FORMULÁRIO DE CONTATO ----
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome    = contactForm.querySelector('#nome')?.value.trim();
      const email   = contactForm.querySelector('#email')?.value.trim();
      const assunto = contactForm.querySelector('#assunto')?.value;
      const msg     = contactForm.querySelector('#mensagem')?.value.trim();

      // Validações básicas
      if (!nome || nome.length < 2) {
        shakeField('nome'); return;
      }
      if (!email || !isValidEmail(email)) {
        shakeField('email'); return;
      }
      if (!msg || msg.length < 10) {
        shakeField('mensagem'); return;
      }

      // Simular envio
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.textContent = '✓ Mensagem enviada!';
          submitBtn.style.background = '#27ae60';
          submitBtn.style.borderColor = '#27ae60';
          submitBtn.style.opacity = '1';
        }

        contactForm.reset();

        if (typeof showToast === 'function') {
          showToast('✉️ Mensagem enviada! Retornaremos em até 24h.');
        }

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.textContent = 'Enviar Mensagem';
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            submitBtn.style.borderColor = '';
          }
        }, 4000);

      }, 1500);
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function shakeField(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    field.style.borderColor = '#e74c3c';
    field.style.animation = 'shake 0.4s ease';
    field.focus();
    setTimeout(() => {
      field.style.borderColor = '';
      field.style.animation = '';
    }, 1500);
  }

  // Adicionar animação shake se não existir
  if (!document.querySelector('#shake-style')) {
    const style = document.createElement('style');
    style.id = 'shake-style';
    style.textContent = `
      @keyframes shake {
        0%,100% { transform: translateX(0); }
        20%      { transform: translateX(-6px); }
        40%      { transform: translateX(6px); }
        60%      { transform: translateX(-4px); }
        80%      { transform: translateX(4px); }
      }
    `;
    document.head.appendChild(style);
  }

});
