// Enhanced Moroccan Restaurant JS - Smooth animations, tabs, modal carousel, parallax
document.addEventListener('DOMContentLoaded', function() {

  // Smooth scrolling
  document.querySelectorAll('a[href^=\"#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(anchor.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Mobile nav
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Gallery Modal Carousel
  let currentImage = 0;
  const galleryItems = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const closeBtn = document.querySelector('.modal-close');
  const galleryImages = Array.from(galleryItems).map(item => item.querySelector('img').src);

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      currentImage = index;
      modalImg.src = galleryImages[currentImage];
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function showImage(index) {
    currentImage = (index + galleryImages.length) % galleryImages.length;
    modalImg.src = galleryImages[currentImage];
  }

  nextBtn.addEventListener('click', () => showImage(currentImage + 1));
  prevBtn.addEventListener('click', () => showImage(currentImage - 1));
  
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  });

  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Menu Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const menuCards = document.querySelectorAll('.menu-card');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.tab;
      
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      menuCards.forEach(card => {
        card.style.display = card.dataset.category === category ? 'block' : 'none';
        if (card.style.display === 'block') {
          card.style.animation = 'fadeInUp 0.6s ease-out';
        }
      });
    });
  });

  // Enhanced Card Hovers (3D flip + glow)
  menuCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-25px) rotateY(10deg) scale(1.02)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) rotateY(0deg) scale(1)';
    });
  });

  // Parallax Hero
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });

  // Scroll Animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Form Submission
  document.querySelector('.contact-form').addEventListener('submit', e => {
    e.preventDefault();
    // Simulate sending
    const btn = e.target.querySelector('.submit-btn');
    btn.innerHTML = 'Envoyé! <i class="fas fa-check"></i>';
    btn.style.background = 'linear-gradient(45deg, var(--emerald), var(--gold))';
    setTimeout(() => {
      btn.innerHTML = 'Envoyer <i class="fas fa-paper-plane"></i>';
      btn.style.background = '';
      e.target.reset();
    }, 2000);
  });

  // Button Ripple Effect
  document.querySelectorAll('.cta-button, .submit-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const ripple = document.createElement('span');
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255,255,255,0.6);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
      `;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

});

