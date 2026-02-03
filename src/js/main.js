import '../css/style.css'
import content from '../data/content.json'

document.querySelector('#app').innerHTML = `
  <nav class="navbar">
    <div class="logo">
      <img src="/img/ndlogo1.png" alt="Dorson Logo" class="logo-img">
      <div class="logo-text">
        <span class="logo-main">DORSON</span>
        <span class="logo-sub">Creative Studio</span>
      </div>
    </div>
    <div class="nav-links">
      <a href="#portfolio">Projects</a>
      <a href="#services">Services</a>
      <a href="#about">Studio</a>
      <a href="#contact">Contact</a>
    </div>
  </nav>

  <header class="hero">
    <div class="container">
      <div class="hero-content">
        <h1>
          Creative Studio<br>
          <span class="hero-tagline">Designing, Building & Launching <br>Digital Experiences</span>
        </h1>
        
        <div class="hero-cta-container">
          <a href="#portfolio" class="btn-primary">Explore Our Work</a>
          <a href="#contact" class="btn-secondary">Get In Touch</a>
        </div>
      </div>
    </div>
    <div class="hero-image-container">
      <img src="/img/headerbg.jpg" alt="Background" class="hero-bg">
      <div class="hero-fog-animated"></div>
      <img src="/img/Heros2.png" alt="Characters" class="hero-characters">
      <div class="hero-fog-top"></div>
      <div class="hero-fog-bottom"></div>
      <div class="hero-fog-layer-2"></div>
      <div class="hero-fog-layer-3"></div>
      <div class="hero-fog-overlay"></div>
      <div class="hero-stars"></div>
      
      <!-- Poker Cards 2,3,4 - LOCKED POSITIONS (inside container) -->
      <img src="/img/herocard_2.png" alt="Poker Card 2" class="hero-poker-card" data-card="2" style="left: 51.4436%; top: 63.6079%;">
      <img src="/img/herocard_3.png" alt="Poker Card 3" class="hero-poker-card" data-card="3" style="left: 46.7717%; top: 73.3055%;">
      <img src="/img/herocard_4.png" alt="Poker Card 4" class="hero-poker-card" data-card="4" style="left: 52.1785%; top: 12.4088%;">
    </div>

    <!-- SVG Filter for Thick Fog Texture -->
    <svg style="position: fixed; width: 0; height: 0;" aria-hidden="true" focusable="false">
      <filter id="fog-filter-thick">
        <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" seed="2" />
        <feDisplacementMap in="SourceGraphic" scale="120" />
      </filter>
    </svg>
  </header>

  <!-- Card 1 - OUTSIDE hero for z-index stacking (appears above all sections) -->
  <img src="/img/herocard_1.png" alt="Poker Card 1" class="hero-poker-card hero-poker-card-flying" data-card="1">

  <div class="organic-divider">
    <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
      <path d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,208C960,235,1056,245,1152,224C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
    </svg>
    <div class="scroll-indicator">↓</div>
  </div>

  <main>
    <section id="portfolio">
      <div class="container">
        <h2 class="fade-in-up">Our Projects</h2>
        <div id="portfolio-grid" class="grid-container">
          ${content
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
    .slice(0, 4)
    .map((item, index) => `
            <div class="portfolio-item disabled-project fade-in-up" style="animation-delay: ${index * 0.1}s">
              <div class="image-wrapper">
                <img src="${(item.images && item.images.main) ? item.images.main : (item.image || '')}" alt="${item.title}" loading="lazy">
                <div class="overlay">
                  <h3>Project Coming Soon</h3>
                </div>
              </div>
              <div class="item-meta">
                <span class="item-category" style="color: #8b5cf6; font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">${item.tags || '#StudioProject'}</span>
                <div class="item-title-visible">${item.title}</div>
                <div class="item-short-desc" style="font-size: 0.9rem; color: #a1a1b8; margin: 0.25rem 0 0.75rem 0; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${item.shortDescription || ''}</div>
                <div class="item-explore">
                  <span>Explore Later</span>
                  <span class="explore-arrow">→</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        <div style="text-align: center; margin-top: 3rem;">
          <span class="btn-view-all disabled-btn fade-in-up">View All Projects</span>
        </div>
      </div>
    </section>

    <section id="services" class="services-modern">
      <div class="container">
        <h2 class="fade-in-up">Strategic Services</h2>
        <div class="services-grid">
          <div class="service-card" data-service="1">
            <div class="service-content">
              <h3>Planning & Design</h3>
              <p class="service-description">Concept, structure, UI/UX, visual design.</p>
              
              <div class="service-section">
                <h4>Includes:</h4>
                <p>Product planning, information architecture, wireframes, visual systems.</p>
              </div>
              
              <div class="service-section">
                <h4>Focus:</h4>
                <p>We define flows, direction, and scope early to avoid rework later.</p>
              </div>
            </div>
            <div class="service-glow"></div>
          </div>
          
          <div class="service-card" data-service="2">
            <div class="service-content">
              <h3>Development</h3>
              <p class="service-description">Websites, web apps, tools, platforms.</p>
              
              <div class="service-section">
                <h4>Includes:</h4>
                <p>Frontend & backend development, integrations, performance optimization.</p>
              </div>
              
              <div class="service-section">
                <h4>Focus:</h4>
                <p>We turn designs into functional, scalable products built to last.</p>
              </div>
            </div>
            <div class="service-glow"></div>
          </div>
          
          <div class="service-card" data-service="3">
            <div class="service-content">
              <h3>Launch</h3>
              <p class="service-description">Testing, deployment, and go-live.</p>
              
              <div class="service-section">
                <h4>Includes:</h4>
                <p>QA, deployment setup, handover, live checks.</p>
              </div>
              
              <div class="service-section">
                <h4>Focus:</h4>
                <p>We make sure everything works as expected when the product goes live.</p>
              </div>
            </div>
            <div class="service-glow"></div>
          </div>
        </div>
      </div>
    </section>

    <section id="about" class="about-elite">
      <div class="container">
        <h2 class="reveal-text">Across different projects.</h2>
        <div class="about-elite-grid">
          <div class="about-elite-text">
            <p class="premium-p">Besides my passion for graphic design, I have always been deeply immersed in the world of photography and film.</p>
            <p class="premium-p" style="margin-bottom: 1.5rem;">Over the years, I’ve had the privilege of capturing unique highlights across various creative industries:</p>
            <ul class="premium-list">
              <li>Creative direction in gaming</li>
              <li>Photography and cover shoots</li>
              <li>YouTube formats, TV productions, and digital products</li>
            </ul>
          </div>
          <div class="about-elite-visual">
            <div class="video-frame">
              <video 
                class="about-video" 
                loop 
                muted 
                playsinline 
                data-src="/video/Reel 2S Compressed.mp4"
                aria-label="Studio Reel"
              ></video>
              <div class="frame-glow"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="contact" class="contact-elite">
      <div class="container">
        <div class="cta-elite-card">
          <div class="cta-content-wrapper">
            <div class="cta-text-content">
              <h2 class="cta-headline">Ready for the Next Chapter?</h2>
              <p class="cta-subline">Whether it's a bold new project or just a conversation about design, I'm here to bring your vision to life.</p>
              
              <div class="cta-contact-info">
                <div class="contact-row">
                  <span class="contact-label">Email</span>
                  <a href="mailto:info@dorson.de" class="contact-link">info@dorson.de</a>
                </div>
                <div class="contact-row">
                  <span class="contact-label">Call</span>
                  <a href="tel:+17026264458" class="contact-link">+1 702 626 4458</a>
                </div>
                <div class="contact-row">
                  <span class="contact-label">Where</span>
                  <span class="contact-value">Las Vegas / Global Remote</span>
                </div>
              </div>
              
              <div class="cta-action" style="margin-top: 4rem;">
                <a href="mailto:info@dorson.de" class="btn-primary-elite">START A PROJECT</a>
              </div>
            </div>
            
            <div class="cta-visual-content">
              <div class="portrait-window">
                <img src="/img/dorsonheader.jpg" alt="Dorson Portrait" class="portrait-img">
                <div class="window-gloss"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
`


// Scroll Animation Observer
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in-up').forEach(el => {
  observer.observe(el);
});

// Portfolio Items Scroll Animation Observer with "Smart Revisit"
const portfolioObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Add staggered delay based on index when appearing
      const delay = Array.from(document.querySelectorAll('.portfolio-item')).indexOf(entry.target) * 100;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
    } else {
      // ONLY reset if scrolling UP (element goes off bottom screen)
      // entry.boundingClientRect.top > 0 means it's below the viewport
      if (entry.boundingClientRect.top > 0) {
        entry.target.classList.remove('visible');
      }
    }
  });
}, {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
});

document.querySelectorAll('.portfolio-item').forEach(item => {
  portfolioObserver.observe(item);
});

// Service Cards Scroll Animation Observer with "Smart Revisit"
const serviceObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add visible class when in view
      entry.target.classList.add('visible');
    } else {
      // ONLY reset if scrolling UP (element goes off bottom screen)
      if (entry.boundingClientRect.top > 0) {
        entry.target.classList.remove('visible');
      }
    }
  });
}, {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
});

document.querySelectorAll('.service-card').forEach(card => {
  serviceObserver.observe(card);
});


// Video Lazy Load Observer
const videoObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const video = entry.target;
      const src = video.getAttribute('data-src');
      if (src) {
        video.src = src;
        video.load();
        video.play().catch(e => console.log("Autoplay prevented:", e));
        video.removeAttribute('data-src'); // Prevent re-loading
        obs.unobserve(video);
      }
    }
  });
}, { rootMargin: '200px' }); // Load a bit before it's visible

const aboutVideo = document.querySelector('.about-video');
if (aboutVideo) {
  videoObserver.observe(aboutVideo);
}



// Celestial Effects: Stars and Shooting Stars
function initCelestialEffects() {
  const container = document.querySelector('.hero-stars');
  if (!container) return;

  const starCount = 50;

  // Generate Stars
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';

    // Random position in top 30%
    const x = Math.random() * 100;
    const y = Math.random() * 30;

    // Random size and blur
    const size = Math.random() * 2 + 1;
    const opacity = Math.random() * 0.5 + 0.3;
    const delay = Math.random() * 5;
    const duration = Math.random() * 3 + 2;

    star.style.left = `${x}%`;
    star.style.top = `${y}%`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.opacity = opacity;
    star.style.animationDelay = `${delay}s`;
    star.style.animationDuration = `${duration}s`;

    container.appendChild(star);
  }

  // Shooting Star Function
  function createShootingStar() {
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';

    // Random start position (top 30%)
    const x = Math.random() * 80 + 10;
    const y = Math.random() * 25 + 5;

    shootingStar.style.left = `${x}%`;
    shootingStar.style.top = `${y}%`;

    container.appendChild(shootingStar);

    // Remove after animation
    setTimeout(() => {
      shootingStar.remove();
    }, 4000);

    // Schedule next shooting star (rarer: every 20-60 seconds)
    setTimeout(createShootingStar, Math.random() * 40000 + 20000);
  }

  // Start shooting stars after a delay
  setTimeout(createShootingStar, 3000);
}

initCelestialEffects();

// ============================================
// POKER CARD DRAGGING FUNCTIONALITY
// ============================================
function initDraggableCards() {
  const draggableCards = document.querySelectorAll('.hero-poker-card.draggable');

  draggableCards.forEach(card => {
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    // Mouse events
    card.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    // Touch events for mobile
    card.addEventListener('touchstart', dragStart);
    document.addEventListener('touchmove', drag);
    document.addEventListener('touchend', dragEnd);

    function dragStart(e) {
      // Get the card's current position
      const rect = card.getBoundingClientRect();
      const parent = card.parentElement.getBoundingClientRect();

      if (e.type === 'touchstart') {
        initialX = e.touches[0].clientX - parent.left;
        initialY = e.touches[0].clientY - parent.top;
      } else {
        initialX = e.clientX - parent.left;
        initialY = e.clientY - parent.top;
        e.preventDefault(); // Prevent image dragging
      }

      // Calculate offset from card's current position
      const currentLeft = (parseFloat(card.style.left) || 0) / 100 * parent.width;
      const currentTop = (parseFloat(card.style.top) || 0) / 100 * parent.height;

      xOffset = currentLeft;
      yOffset = currentTop;

      isDragging = true;
      card.style.cursor = 'grabbing';
      card.style.zIndex = 1000;
    }

    function drag(e) {
      if (isDragging) {
        e.preventDefault();

        const parent = card.parentElement.getBoundingClientRect();

        if (e.type === 'touchmove') {
          currentX = e.touches[0].clientX - parent.left;
          currentY = e.touches[0].clientY - parent.top;
        } else {
          currentX = e.clientX - parent.left;
          currentY = e.clientY - parent.top;
        }

        xOffset = currentX;
        yOffset = currentY;

        // Convert to percentage for responsive positioning
        const xPercent = (xOffset / parent.width) * 100;
        const yPercent = (yOffset / parent.height) * 100;

        card.style.left = `${xPercent}%`;
        card.style.top = `${yPercent}%`;
      }
    }

    function dragEnd(e) {
      if (isDragging) {
        isDragging = false;
        card.style.cursor = 'grab';
        card.style.zIndex = 10;
      }
    }
  });

  console.log('%c🎴 POKER CARDS DRAGGING ENABLED!', 'color: #ff6b6b; font-size: 16px; font-weight: bold;');
  console.log('%cDrag the cards to position them where you want.', 'color: #4ecdc4; font-size: 14px;');
  console.log('%cWhen you\'re done, press the "L" key to LOG the positions.', 'color: #ffe66d; font-size: 14px;');
}

// Keyboard shortcut to log positions (Press 'L' for Lock/Log)
document.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'l') {
    logCardPositions();
  }
});

function logCardPositions() {
  const cards = document.querySelectorAll('.hero-poker-card');
  console.log('\n%c════════════════════════════════════════', 'color: #95e1d3;');
  console.log('%c🎴 POKER CARD POSITIONS - COPY THIS!', 'color: #38ef7d; font-size: 18px; font-weight: bold;');
  console.log('%c════════════════════════════════════════', 'color: #95e1d3;');

  const positions = [];
  cards.forEach(card => {
    const cardNum = card.getAttribute('data-card');
    const left = card.style.left;
    const top = card.style.top;
    positions.push({
      card: cardNum,
      left: left,
      top: top
    });
    console.log(`%cCard ${cardNum}: left: ${left}, top: ${top}`, 'color: #f093fb; font-size: 14px;');
  });

  console.log('\n%cCODE TO PASTE:', 'color: #feca57; font-size: 16px; font-weight: bold;');
  cards.forEach(card => {
    const cardNum = card.getAttribute('data-card');
    const left = card.style.left;
    const top = card.style.top;
    console.log(`<img src="/img/herocard_${cardNum}.png" alt="Poker Card ${cardNum}" class="hero-poker-card" data-card="${cardNum}" style="left: ${left}; top: ${top};">`);
  });

  console.log('%c════════════════════════════════════════\n', 'color: #95e1d3;');
}

// Initialize the draggable cards - DISABLED (positions locked)
// initDraggableCards();

// ============================================
// POKER CARD SCROLL ANIMATIONS
// ============================================
function initPokerCardScrollEffects() {
  const card1 = document.querySelector('.hero-poker-card[data-card="1"]');
  const card2 = document.querySelector('.hero-poker-card[data-card="2"]');
  const card3 = document.querySelector('.hero-poker-card[data-card="3"]');
  const card4 = document.querySelector('.hero-poker-card[data-card="4"]');
  const hero = document.querySelector('.hero');

  if (!hero || !card1 || !card2 || !card3 || !card4) return;

  // Store initial positions
  const initialPositions = {
    card1: { left: 78.4777, top: 85.5057 },
    card2: { left: 51.4436, top: 63.6079 },
    card3: { left: 46.7717, top: 73.3055 },
    card4: { left: 52.1785, top: 12.4088 }
  };

  let ticking = false;

  function updateCardAnimations() {
    const scrollY = window.scrollY;
    const heroHeight = hero.offsetHeight;
    const scrollProgress = Math.min(scrollY / (heroHeight * 0.8), 1);

    // Easing function for smoother animations
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    const easedProgress = easeOutCubic(scrollProgress);

    // ========== CARD 1: Smooth zoom toward camera while moving left ==========
    const card1ScrollProgress = Math.min(scrollY / heroHeight, 1); // Ends exactly at hero height

    // Smooth easing for natural motion
    const card1Eased = easeOutCubic(card1ScrollProgress);

    // Zoom: gradually scale up as it approaches camera (1x -> 3x)
    const card1Scale = 1 + (card1Eased * 2);

    // Move left: smooth continuous movement to the left side
    const card1MoveX = card1Eased * -100; // Move all the way to left edge

    // Move down slightly: natural arc motion
    const card1MoveY = card1Eased * 20; // Slight downward drift

    // Fade out earlier (starts at 55%, complete by 85%)
    const card1Opacity = card1ScrollProgress < 0.55 ? 1 : 1 - ((card1ScrollProgress - 0.55) / 0.3);

    card1.style.transform = `
      translate(-50%, -50%)
      translate(${card1MoveX}vw, ${card1MoveY}vh)
      scale(${card1Scale})
    `;
    card1.style.opacity = Math.max(0, card1Opacity);
    card1.style.filter = `drop-shadow(0 ${10 + card1Eased * 20}px ${30 + card1Eased * 40}px rgba(0, 0, 0, ${0.7 + card1Eased * 0.3}))`;

    // ========== CARD 2: Orbit to the right with rotation ==========
    const card2MoveX = easedProgress * 25; // Move right
    const card2MoveY = easedProgress * -15; // Move up slightly
    const card2Rotate = easedProgress * -35; // Rotate counter-clockwise
    const card2Scale = 1 + (easedProgress * 0.3);

    card2.style.transform = `
      translate(-50%, -50%)
      translate(${card2MoveX}vw, ${card2MoveY}vh)
      scale(${card2Scale})
      rotate(${card2Rotate}deg)
      rotateX(${easedProgress * 10}deg)
    `;

    // ========== CARD 3: Float forward with 3D bend/tilt ==========
    const card3MoveY = easedProgress * -25; // Float upward
    const card3MoveX = easedProgress * -10; // Drift left
    const card3Scale = 1 + (easedProgress * 0.5);
    const card3RotateX = easedProgress * -20; // Tilt back (3D bend effect)
    const card3RotateZ = easedProgress * 15; // Slight twist

    card3.style.transform = `
      translate(-50%, -50%)
      translate(${card3MoveX}vw, ${card3MoveY}vh)
      scale(${card3Scale})
      perspective(800px)
      rotateX(${card3RotateX}deg)
      rotateZ(${card3RotateZ}deg)
    `;

    // ========== CARD 4: Parallax - moves slower (deeper in background) ==========
    const card4MoveY = easedProgress * -8; // Move up very slowly (parallax)
    const card4MoveX = easedProgress * 5; // Drift slightly right
    const card4Scale = 1 - (easedProgress * 0.1); // Shrink slightly (recede)
    const card4Blur = 1.5 + (easedProgress * 2); // Increase blur
    const card4Opacity = 0.6 - (easedProgress * 0.3); // Fade slightly

    card4.style.transform = `
      translate(-50%, -50%)
      translate(${card4MoveX}vw, ${card4MoveY}vh)
      scale(${card4Scale})
    `;
    card4.style.filter = `blur(${card4Blur}px) drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5))`;
    card4.style.opacity = Math.max(0.2, card4Opacity);

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateCardAnimations);
      ticking = true;
    }
  }

  // Listen for scroll events
  window.addEventListener('scroll', onScroll, { passive: true });

  // Initial update
  updateCardAnimations();

  console.log('%c🎴 POKER CARD SCROLL ANIMATIONS ACTIVE!', 'color: #8b5cf6; font-size: 16px; font-weight: bold;');
}

// Initialize scroll effects
initPokerCardScrollEffects();

console.log('Dorson Studio Website Initialized with ' + content.length + ' items.');
