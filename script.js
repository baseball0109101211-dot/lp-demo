// ========================
// SCROLL ANIMATIONS
// ========================
document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for fade-in animations
  const animateElements = document.querySelectorAll('[data-animate]');
  
  const observer = new IntersectionObserver((entries) => {
    let localIndex = 0;
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // stagger animation per batch
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, localIndex * 80);
        localIndex++;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px 50px 0px' });

  animateElements.forEach(el => observer.observe(el));

  // Fallback: force show all elements after 2 seconds in case observer doesn't fire
  setTimeout(() => {
    animateElements.forEach(el => {
      if (!el.classList.contains('visible')) {
        el.classList.add('visible');
      }
    });
  }, 2000);

  // ========================
  // FLOATING CTA BAR
  // ========================
  const floatingCta = document.getElementById('floating-cta');
  const heroSection = document.getElementById('hero');
  const finalCtaSection = document.getElementById('reserve');

  function toggleFloatingCta() {
    if (!heroSection || !finalCtaSection || !floatingCta) return;
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    const finalCtaTop = finalCtaSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (heroBottom < 0 && finalCtaTop > windowHeight) {
      floatingCta.classList.add('visible');
    } else {
      floatingCta.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', toggleFloatingCta, { passive: true });

  // ========================
  // COUNTDOWN TIMER
  // ========================
  // Set deadline to 5 days from now
  const deadline = new Date();
  deadline.setDate(deadline.getDate() + 5);
  deadline.setHours(23, 59, 59, 0);

  function updateCountdown() {
    const now = new Date();
    const diff = deadline - now;

    if (diff <= 0) {
      document.getElementById('days').textContent = '0';
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const dEl = document.getElementById('days');
    const hEl = document.getElementById('hours');
    const mEl = document.getElementById('minutes');
    const sEl = document.getElementById('seconds');

    if (dEl) dEl.textContent = days;
    if (hEl) hEl.textContent = String(hours).padStart(2, '0');
    if (mEl) mEl.textContent = String(minutes).padStart(2, '0');
    if (sEl) sEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ========================
  // SLOTS BAR ANIMATION
  // ========================
  const slotsSection = document.getElementById('urgency');
  const slotsFill = document.getElementById('slots-fill');
  if (slotsSection && slotsFill) {
    const slotsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 30 slots, 18 taken, 12 remaining = 60% filled
          slotsFill.style.width = '60%';
          slotsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    slotsObserver.observe(slotsSection);
  }

  // ========================
  // SMOOTH SCROLL
  // ========================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 20;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
});

// ========================
// FAQ ACCORDION
// ========================
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  if (!item) return;
  const wasOpen = item.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-item').forEach(i => {
    i.classList.remove('open');
  });

  // Toggle clicked
  if (!wasOpen) {
    item.classList.add('open');
  }
}
