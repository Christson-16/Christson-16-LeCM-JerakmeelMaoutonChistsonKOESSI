/**
 * LE CM — Jerakmeel M. Christson KOESSI
 * Script JS Moderne (ES6+) pour Portfolio Premium
 * Optimisé pour les performances et l'interactivité UX
 */

document.addEventListener('DOMContentLoaded', () => {

  // ===== 1. NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  // ===== 2. MOBILE HAMBURGER MENU =====
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('active');
      hamburger.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when clicking any nav link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
        document.body.style.overflow = '';
      });
    });
  }

  // ===== 3. GALLERY TOGGLES (Voir Plus) =====
  const setupGalleryToggle = (btnId, btnTextId, hiddenGalleryId) => {
    const btn = document.getElementById(btnId);
    const btnText = document.getElementById(btnTextId);
    const hiddenGallery = document.getElementById(hiddenGalleryId);

    if (btn && hiddenGallery) {
      btn.addEventListener('click', () => {
        const isExpanded = hiddenGallery.classList.toggle('active');
        if (btnText) {
          btnText.textContent = isExpanded ? 'Voir moins' : 'Voir plus';
        }
        const icon = btn.querySelector('i');
        if (icon) {
          icon.className = isExpanded ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down';
        }
      });
    }
  };

  setupGalleryToggle('toggleProofBtn', 'proofBtnText', 'hiddenProofGallery');
  setupGalleryToggle('toggleCertBtn', 'certBtnText', 'hiddenCertGallery');

  // ===== 4. LIGHTBOX MODAL =====
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const closeLightbox = document.getElementById('closeLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxSubtitle = document.getElementById('lightboxSubtitle');
  const lightboxLink = document.getElementById('lightboxLink');

  const openModal = (title, subtitle, imgSrc) => {
    if (!lightboxModal) return;
    lightboxImg.src = imgSrc;
    lightboxTitle.textContent = title || 'Preuve officielle';
    lightboxSubtitle.textContent = subtitle || 'Statistiques extraites de Meta Business Suite';
    lightboxLink.href = imgSrc;

    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeLightbox) closeLightbox.addEventListener('click', closeModal);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Attach lightbox click handlers to all gallery cards
  document.querySelectorAll('.gallery-card').forEach(card => {
    card.addEventListener('click', () => {
      const title = card.getAttribute('data-title');
      const subtitle = card.getAttribute('data-subtitle');
      const img = card.getAttribute('data-img') || card.querySelector('img')?.src;
      if (img) openModal(title, subtitle, img);
    });
  });

  // ===== 5. SIMULATEUR ROI CALCULATOR =====
  const followersSlider = document.getElementById('followersSlider');
  const priceSlider = document.getElementById('priceSlider');
  const followersVal = document.getElementById('followersVal');
  const priceVal = document.getElementById('priceVal');
  const calcViews = document.getElementById('calcViews');
  const calcLeads = document.getElementById('calcLeads');
  const calcRevenue = document.getElementById('calcRevenue');
  const calcSalesSub = document.getElementById('calcSalesSub');
  const calcWhatsappLink = document.getElementById('calcWhatsappLink');

  const updateCalculator = () => {
    if (!followersSlider || !priceSlider) return;

    const followers = parseInt(followersSlider.value, 10);
    const price = parseInt(priceSlider.value, 10);

    // Update Label UI
    if (followersVal) followersVal.textContent = `${followers.toLocaleString('fr-FR')} abonnés`;
    if (priceVal) priceVal.textContent = `${price.toLocaleString('fr-FR')} FCFA`;

    // Mathematical Calculation based on Christson's conversion ratio:
    // Reach = ~28x followers + 12k baseline non-followers distribution
    const views = Math.round(followers * 28 + 12000);
    // WhatsApp Leads = 2.8% of views
    const leads = Math.round(views * 0.028);
    // Sales closed = 15% of WhatsApp leads
    const sales = Math.max(1, Math.round(leads * 0.15));
    // Revenue = Sales * Average Order Value
    const revenue = sales * price;

    if (calcViews) calcViews.textContent = `~${views.toLocaleString('fr-FR')}`;
    if (calcLeads) calcLeads.textContent = `~${leads.toLocaleString('fr-FR')} prospects`;
    if (calcRevenue) {
      calcRevenue.innerHTML = `${revenue.toLocaleString('fr-FR')} FCFA <span class="per-month">/ mois</span>`;
    }
    if (calcSalesSub) {
      calcSalesSub.textContent = `Basé sur ~${sales} ventes mensuelles clôturées avec un taux de conversion standard.`;
    }

    if (calcWhatsappLink) {
      const msg = `Bonjour Christson, j'ai simulé mon potentiel de ${revenue.toLocaleString('fr-FR')} FCFA sur votre site. Je veux réserver mon audit pour ma page.`;
      calcWhatsappLink.href = `https://wa.me/2290149340416?text=${encodeURIComponent(msg)}`;
    }
  };

  if (followersSlider) followersSlider.addEventListener('input', updateCalculator);
  if (priceSlider) priceSlider.addEventListener('input', updateCalculator);
  updateCalculator();

  // ===== 6. INTERACTIVE CHART DOT TOOLTIP =====
  const chartPoint = document.getElementById('chartPoint');
  const chartTooltip = document.getElementById('chartTooltip');
  const tooltipTitle = document.getElementById('tooltipTitle');
  const tooltipVal = document.getElementById('tooltipVal');

  if (chartPoint && chartTooltip) {
    chartPoint.addEventListener('mouseenter', () => {
      tooltipTitle.textContent = 'Pic de conversion (27 Mai)';
      tooltipVal.textContent = '18 420 vues / jour';
      chartPoint.setAttribute('r', '9');
    });

    chartPoint.addEventListener('mouseleave', () => {
      chartPoint.setAttribute('r', '7');
    });
  }

  // ===== 7. IMAGE FALLBACKS =====
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      const altText = this.alt || 'Visuel Portfolio';
      this.onerror = null;
      this.src = `https://placehold.co/600x450/0f172a/e8b84b?text=${encodeURIComponent(altText)}`;
    });
  });

  console.log('%c🚀 Portfolio Christson KOESSI prêt et optimisé!', 'color: #E8B84B; font-weight: bold; font-size: 14px;');
});
