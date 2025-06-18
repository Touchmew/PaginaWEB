  // ===== MENÚ BURGER =====
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".menu");

  if (burger && menu) {
    burger.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
  }

  // ===== TOAST DE "AÑADIR AL CARRITO" =====
// Alternar visibilidad del menú del carrito
function toggleCart(event) {
  const dropdown = document.getElementById('cartDropdown');
  dropdown.classList.toggle('show');
  if (event) event.stopPropagation();
}

// Evitar que el clic dentro del menú cierre el carrito
document.getElementById('cartDropdown')?.addEventListener('click', function(event) {
  event.stopPropagation();
});

// Cerrar el carrito si se hace clic fuera
document.addEventListener('click', function(event) {
  const cart = document.getElementById('cartButton');
  const dropdown = document.getElementById('cartDropdown');
  if (!cart.contains(event.target)) {
    dropdown.classList.remove('show');
  }
});

// Abrir/cerrar el carrito solo al hacer clic en el botón
document.getElementById('cartButton')?.addEventListener('click', function(event) {
  toggleCart(event);
});

// Lógica básica para agregar productos al carrito
let cart = [];

function updateCartDisplay() {
  const cartItems = document.getElementById('cartItems');
  const cartFooter = document.getElementById('cartFooter');
  const cartNumber = document.getElementById('cartNumber');
  const cartTotal = document.getElementById('cartTotal');

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <i class="fa-solid fa-basket-shopping" style="font-size: 48px; color: #ddd; margin-bottom: 15px;"></i>
        <p>Tu carrito está vacío</p>
      </div>
    `;
    cartFooter.style.display = 'none';
    cartNumber.textContent = '(0)';
    cartTotal.textContent = 'Total: $0.00';
  } else {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        </div>
      </div>
    `).join('');
    cartFooter.style.display = 'block';
    cartNumber.textContent = `(${cart.length})`;
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  }
}

// Agregar productos al carrito desde botones "Comprar Ahora"
document.querySelectorAll('.cta-button').forEach(btn => {
  btn.addEventListener('click', function(e) {
    if (btn.tagName === 'A') e.preventDefault();
    const name = btn.dataset.name || btn.dataset.productName || btn.closest('.offer-card')?.querySelector('.offer-title')?.textContent || 'Producto';
    const price = parseFloat(btn.dataset.price) || parseFloat(btn.closest('.offer-card')?.querySelector('.discount-price')?.textContent?.replace('$','')) || 0;
    const image = btn.dataset.image || btn.closest('.offer-card')?.querySelector('img')?.src || '';
    if (!name || !price) return;
    cart.push({name, price, image});
    updateCartDisplay();

    // Mostrar toast de compra si existe
    const toast = document.getElementById('liveToast');
    if (toast) {
      const bsToast = new bootstrap.Toast(toast);
      bsToast.show();
    }
  });
});

// Inicializar carrito vacío
updateCartDisplay();

// Simular checkout
function checkout() {
  alert('¡Gracias por su compra!');
  cart = [];
  updateCartDisplay();
  document.getElementById('cartDropdown').classList.remove('show');
}

  // ===== CARRUSEL DE OFERTAS =====
  class OffersCarousel {
    constructor() {
      this.currentSection = 0;
      this.totalSections = 3;
      this.track = document.getElementById('carouselTrack');
      this.prevBtn = document.getElementById('prevBtn');
      this.nextBtn = document.getElementById('nextBtn');
      this.indicators = document.querySelectorAll('.nav-dot');
      this.init();
    }

    init() {
      if (this.prevBtn && this.nextBtn) {
        this.prevBtn.addEventListener('click', () => this.prevSection());
        this.nextBtn.addEventListener('click', () => this.nextSection());
      }
      this.indicators.forEach((dot, index) => {
        dot.addEventListener('click', () => this.goToSection(index));
      });
      // this.startAutoPlay(); // Descomenta para autoplay
      this.updateCarousel();
    }

    nextSection() {
      this.currentSection = (this.currentSection + 1) % this.totalSections;
      this.updateCarousel();
    }

    prevSection() {
      this.currentSection = this.currentSection === 0 ? this.totalSections - 1 : this.currentSection - 1;
      this.updateCarousel();
    }

    goToSection(sectionIndex) {
      this.currentSection = sectionIndex;
      this.updateCarousel();
    }

    updateCarousel() {
      if (this.track) {
        const translateX = -this.currentSection * 100;
        this.track.style.transform = `translateX(${translateX}%)`;
      }
      this.indicators.forEach((dot, index) => {
        dot.classList.toggle('active', index === this.currentSection);
      });
      if (this.prevBtn && this.nextBtn) {
        this.prevBtn.style.opacity = this.currentSection === 0 ? '0.5' : '1';
        this.nextBtn.style.opacity = this.currentSection === this.totalSections - 1 ? '0.5' : '1';
      }
    }

    startAutoPlay() {
      setInterval(() => this.nextSection(), 5000);
    }
  }

  // ===== EFECTOS DE HOVER EN TARJETAS DE OFERTA =====
  function initOfferCardHover() {
    document.querySelectorAll('.offer-card').forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
      });
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
      });
    });
  }

  // ===== ANIMACIONES ON SCROLL =====
  function isElementVisible(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return (
      rect.top <= windowHeight * 0.8 &&
      rect.bottom >= windowHeight * 0.2
    );
  }

  function handleScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => {
      if (isElementVisible(element) && !element.classList.contains('animate')) {
        const delay = element.getAttribute('data-delay') || 0;
        setTimeout(() => {
          element.classList.add('animate');
        }, parseInt(delay));
      }
    });
  }

  // ===== EFECTOS EN LAPTOP =====
  function initLaptopEffects() {
    const laptopImage = document.querySelector('.laptop-image');
    const keys = document.querySelectorAll('.key');
    if (laptopImage) {
      laptopImage.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.03) rotateX(5deg)';
        this.style.boxShadow = '0 40px 100px rgba(111, 66, 193, 0.5), 0 0 150px rgba(32, 201, 151, 0.4)';
      });
      laptopImage.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
        this.style.boxShadow = '0 20px 60px rgba(111, 66, 193, 0.3), 0 0 100px rgba(232, 62, 140, 0.2)';
      });
    }
    function randomKeyGlow() {
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      if (randomKey) {
        randomKey.style.background = '#20c997';
        randomKey.style.boxShadow = '0 0 15px rgba(32, 201, 151, 0.8)';
        setTimeout(() => {
          randomKey.style.background = '#444';
          randomKey.style.boxShadow = 'none';
        }, 300);
      }
    }
    setInterval(randomKeyGlow, 2000);
  }

  // ===== EFECTOS EN TARJETAS DE CARACTERÍSTICAS =====
  function initFeatureCardEffects() {
    document.querySelectorAll('.feature-card').forEach(card => {
      card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.feature-icon');
        if (icon) icon.style.animation = 'pulse 0.6s ease-in-out';
        this.style.transform = 'translateY(-15px) scale(1.02)';
        this.style.background = 'rgba(111, 66, 193, 0.15)';
        this.style.borderColor = 'rgba(32, 201, 151, 0.5)';
      });
    });
  }

  // ===== BOTÓN CTA CON EFECTO RIPPLE =====
  function initCTAButton() {
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
      ctaButton.addEventListener('click', function(e) {
        e.preventDefault();
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.marginLeft = '-10px';
        ripple.style.marginTop = '-10px';
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
        // Lógica adicional aquí
        console.log('Ver detalles del producto');
      });
    }
  }

  // ===== CONTADOR DE ESPECIFICACIONES (TYPEWRITER) =====
  function initSpecsCounter() {
    document.querySelectorAll('.spec-value').forEach(spec => {
      const originalText = spec.textContent;
      spec.setAttribute('data-original', originalText);
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateText(spec, originalText);
            observer.unobserve(spec);
          }
        });
      });
      observer.observe(spec);
    });
  }

  function animateText(element, text) {
    element.textContent = '';
    let i = 0;
    const typeWriter = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typeWriter);
      }
    }, 50);
  }

  // ===== INICIALIZACIÓN GENERAL =====
  document.addEventListener('DOMContentLoaded', () => {
    new OffersCarousel();
    initOfferCardHover();
    handleScrollAnimations();
    initLaptopEffects();
    initFeatureCardEffects();
    initCTAButton();
    initSpecsCounter();

    // Agregar CSS para animaciones
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
      }
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  });

  // ===== EVENTOS DE SCROLL Y RESIZE =====
  window.addEventListener('scroll', handleScrollAnimations);
  window.addEventListener('resize', handleScrollAnimations);

  // ===== DEBUG =====
  function debugAnimations() {
    console.log('🚀 Sistema de animaciones activado');
    console.log('📱 Elementos animados:', document.querySelectorAll('.animate-on-scroll').length);
  }
  debugAnimations();
// JavaScript para animaciones on scroll - reutilizando tu lógica
        function handleScrollAnimations() {
            const animatedElements = document.querySelectorAll('.animate-on-scroll');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            animatedElements.forEach(element => {
                observer.observe(element);
            });
        }

        // Función para manejar clicks en botones
        function handleProductButtons() {
            const buttons = document.querySelectorAll('.product-button');
            
            buttons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Efecto de click
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 150);
                    
                    // Aquí puedes agregar la lógica para navegar al producto
                    const productName = this.closest('.product-card').querySelector('.product-name').textContent;
                    console.log(`Clicked on: ${productName}`);
                    
                    // Ejemplo: alert o redirección
                    // alert(`Ver detalles de: ${productName}`);
                    // window.location.href = `/product/${productName}`;
                });
            });
        }

        // Función para efecto hover mejorado en cards
        function enhanceCardHovers() {
            const cards = document.querySelectorAll('.product-card');
            
            cards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    // Agregar efecto de brillo
                    this.style.boxShadow = '0 20px 40px rgba(111, 66, 193, 0.3), 0 0 50px rgba(232, 62, 140, 0.2)';
                });
                
                card.addEventListener('mouseleave', function() {
                    // Resetear efecto
                    this.style.boxShadow = '';
                });
            });
        }

        // Inicializar todo cuando el DOM esté listo
        document.addEventListener('DOMContentLoaded', function() {
            handleScrollAnimations();
            handleProductButtons();
            enhanceCardHovers();
        });

        // Función adicional para stagger animations (opcional)
        function staggerAnimations() {
            const cards = document.querySelectorAll('.product-card');
            cards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.1}s`;
            });
        }

        // Llamar stagger animations
        staggerAnimations();
