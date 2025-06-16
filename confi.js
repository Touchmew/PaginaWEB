  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".menu");

  burger.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  const toastLiveExample = document.getElementById('liveToast');
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);

  // Selecciona todos los botones "Añadir al carrito"
  const toastTriggers = document.querySelectorAll('.btn-add-cart');

  toastTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const productName = trigger.getAttribute('data-product-name'); // Obtiene el nombre del producto
      const toastBody = toastLiveExample.querySelector('.toast-body');

      // Actualiza el mensaje del toast
      toastBody.textContent = `Se añadió al carrito: ${productName}`;

      toastBootstrap.show();

      // Ocultar el toast después de 3 segundos (3000 ms)
      setTimeout(() => {
        toastBootstrap.hide();
      }, 3000);
    });
  });

  /*carrusel ofertas*/
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
                  // Event listeners para botones
                  this.prevBtn.addEventListener('click', () => this.prevSection());
                  this.nextBtn.addEventListener('click', () => this.nextSection());
                  
                  // Event listeners para indicadores
                  this.indicators.forEach((dot, index) => {
                      dot.addEventListener('click', () => this.goToSection(index));
                  });
                  
                  // Auto-play opcional (descomenta si quieres)
                  // this.startAutoPlay();
                  
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
                  // Mover el track
                  const translateX = -this.currentSection * 100;
                  this.track.style.transform = `translateX(${translateX}%)`;
                  
                  // Actualizar indicadores
                  this.indicators.forEach((dot, index) => {
                      dot.classList.toggle('active', index === this.currentSection);
                  });
                  
                  // Actualizar botones
                  this.prevBtn.style.opacity = this.currentSection === 0 ? '0.5' : '1';
                  this.nextBtn.style.opacity = this.currentSection === this.totalSections - 1 ? '0.5' : '1';
              }

              startAutoPlay() {
                  setInterval(() => {
                      this.nextSection();
                  }, 5000); // Cambia cada 5 segundos
              }
          }

          // Inicializar el carrusel cuando se carga la página
          document.addEventListener('DOMContentLoaded', () => {
              new OffersCarousel();
          });

          // Añadir efectos de hover a las tarjetas
          document.querySelectorAll('.offer-card').forEach(card => {
              card.addEventListener('mouseenter', function() {
                  this.style.transform = 'translateY(-10px) scale(1.02)';
              });
              
              card.addEventListener('mouseleave', function() {
                  this.style.transform = 'translateY(0) scale(1)';
              });
          });
  // ===== JAVASCRIPT PARA ANIMACIONES ON SCROLL =====
          
          // Función para detectar si un elemento está visible en el viewport
          function isElementInViewport(element) {
              const rect = element.getBoundingClientRect();
              return (
                  rect.top >= 0 &&
                  rect.left >= 0 &&
                  rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                  rect.right <= (window.innerWidth || document.documentElement.clientWidth)
              );
          }

          // Función alternativa más flexible para detectar visibilidad
          function isElementVisible(element) {
              const rect = element.getBoundingClientRect();
              const windowHeight = window.innerHeight || document.documentElement.clientHeight;
              
              return (
                  rect.top <= windowHeight * 0.8 && // El elemento está 80% visible desde arriba
                  rect.bottom >= windowHeight * 0.2   // El elemento está 20% visible desde abajo
              );
          }

          // Función principal para manejar las animaciones
          function handleScrollAnimations() {
              const animatedElements = document.querySelectorAll('.animate-on-scroll');
              
              animatedElements.forEach((element, index) => {
                  if (isElementVisible(element) && !element.classList.contains('animate')) {
                      // Obtener el delay personalizado si existe
                      const delay = element.getAttribute('data-delay') || 0;
                      
                      // Aplicar la animación con delay
                      setTimeout(() => {
                          element.classList.add('animate');
                      }, parseInt(delay));
                  }
              });
          }

          // Función para efectos adicionales en la laptop
          function initLaptopEffects() {
              const laptopImage = document.querySelector('.laptop-image');
              const keys = document.querySelectorAll('.key');
              
              if (laptopImage) {
                  // Efecto de hover mejorado
                  laptopImage.addEventListener('mouseenter', function() {
                      this.style.transform = 'translateY(-15px) scale(1.03) rotateX(5deg)';
                      this.style.boxShadow = '0 40px 100px rgba(111, 66, 193, 0.5), 0 0 150px rgba(32, 201, 151, 0.4)';
                  });
                  
                  laptopImage.addEventListener('mouseleave', function() {
                      this.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
                      this.style.boxShadow = '0 20px 60px rgba(111, 66, 193, 0.3), 0 0 100px rgba(232, 62, 140, 0.2)';
                  });
              }

              // Efecto de teclas aleatorias
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

              // Ejecutar efecto de teclas cada 2 segundos
              setInterval(randomKeyGlow, 2000);
          }

          // Función para efectos de las tarjetas de características
          function initFeatureCardEffects() {
              const featureCards = document.querySelectorAll('.feature-card');
              
              featureCards.forEach(card => {
                  card.addEventListener('mouseenter', function() {
                      // Efecto de pulso en el ícono
                      const icon = this.querySelector('.feature-icon');
                      if (icon) {
                          icon.style.animation = 'pulse 0.6s ease-in-out';
                      }
                      
                      // Cambiar colores de forma suave
                      this.style.transform = 'translateY(-15px) scale(1.02)';
                      this.style.background = 'rgba(111, 66, 193, 0.15)';
                      this.style.borderColor = 'rgba(32, 201, 151, 0.5)';
                  });
              });
          }

          // Función para el botón CTA con efectos especiales
          function initCTAButton() {
              const ctaButton = document.querySelector('.cta-button');
              
              if (ctaButton) {
                  ctaButton.addEventListener('click', function(e) {
                      e.preventDefault();
                      
                      // Efecto de ripple
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
                      
                      setTimeout(() => {
                          ripple.remove();
                      }, 600);
                      
                      // Aquí puedes agregar la lógica para abrir modal o navegar
                      console.log('Ver detalles del producto');
                  });
              }
          }

          // Función para contador de especificaciones (efecto typewriter)
          function initSpecsCounter() {
              const specValues = document.querySelectorAll('.spec-value');
              
              specValues.forEach(spec => {
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

          // Función para animar texto tipo máquina de escribir
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

          // Event Listeners
          document.addEventListener('DOMContentLoaded', function() {
              // Ejecutar animaciones iniciales
              handleScrollAnimations();
              
              // Inicializar efectos especiales
              initLaptopEffects();
              initFeatureCardEffects();
              initCTAButton();
              initSpecsCounter();
              
              // Agregar CSS para animación de pulse y ripple
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

          // Ejecutar animaciones en scroll
          window.addEventListener('scroll', handleScrollAnimations);

          // Ejecutar animaciones en resize (por si acaso)
          window.addEventListener('resize', handleScrollAnimations);

          // Función de utilidad para debugging
          function debugAnimations() {
              console.log('🚀 Sistema de animaciones activado');
              console.log('📱 Elementos animados:', document.querySelectorAll('.animate-on-scroll').length);
          }

          // Ejecutar debug en desarrollo
          debugAnimations();
