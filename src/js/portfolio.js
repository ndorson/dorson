import '../css/style.css'
import content from '../data/content.json'
import { getFooter } from './footer.js'

document.querySelector('#portfolio-app').innerHTML = `
  <nav class="navbar">
    <div class="logo"><a href="/">Dorson</a></div>
    <div class="nav-links">
      <a href="/portfolio.html">Work</a>
      <a href="/#about">About</a>
      <a href="/#contact">Contact</a>
    </div>
  </nav>

  <main style="padding-top: 100px;">
    <section id="portfolio">
      <div class="container">
        <h2 class="fade-in-up">All Projects</h2>
        <div id="portfolio-grid" class="grid-container">
          ${content
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
    .map((item, index) => `
            <a href="/project.html?id=${item.id || index}" class="portfolio-item fade-in-up" style="animation-delay: ${index * 0.05}s">
              <div class="image-wrapper">
                 <img src="${(item.images && item.images.main) ? item.images.main : (item.image || '')}" alt="${item.title}" loading="lazy">
                <div class="overlay">
                  <h3>View Project</h3>
                </div>
              </div>
              <div class="item-meta">
                <span class="item-category">Studio Project</span>
                <div class="item-title-visible">${item.title}</div>
                <div class="item-explore">
                  <span>Explore</span>
                  <span class="explore-arrow">→</span>
                </div>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    </section>

    <section id="contact" class="fade-in-up">
      <h2>Get In Touch</h2>
      <div class="contact-content" style="text-align: center;">
        <p style="margin-bottom: 2rem;">Interested in working together?</p>
        <a href="mailto:info@dorson.de" style="display: inline-block; background: white; color: black; padding: 1rem 3rem; font-weight: 700; border-radius: 4px; text-transform: uppercase;">Contact Me</a>
      </div>
    </section>
  </main>
  ${getFooter()}
`

// Scroll Animation Observer from main.js
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

console.log('Dorson Portfolio Page Initialized with ' + content.length + ' items.');
