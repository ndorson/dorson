
import '../css/style.css'
import { getFooter } from './footer.js'

document.querySelector('#app').innerHTML = `
  <nav class="navbar">
    <div class="logo">
      <a href="/" style="display: flex; align-items: center; gap: 0.75rem;">
        <img src="/img/ndlogo1.png" alt="Dorson Logo" class="logo-img">
        <div class="logo-text">
          <span class="logo-main">DORSON</span>
          <span class="logo-sub">Creative Studio</span>
        </div>
      </a>
    </div>
    <div class="nav-links">
      <a href="/#portfolio">Projects</a>
      <a href="/#about">Studio</a>
      <a href="/#contact">Contact</a>
    </div>
  </nav>

  <main class="legal-page">
    <div class="container">
      <header class="legal-header">
        <h1>Legal Notice</h1>
        <p class="legal-update">Information according to § 5 TMG</p>
      </header>
      
      <div class="legal-grid">
        <section class="legal-card">
          <h2>Studio Information</h2>
          <div class="legal-content-block">
            <p>
              <strong>Owner:</strong> Nojan Dorson<br>
              <strong>Digital:</strong> dorson.de<br>
              <strong>Location:</strong> Las Vegas, NV<br>
              United States
            </p>
          </div>
        </section>

        <section class="legal-card">
          <h2>Contact</h2>
          <div class="legal-content-block">
            <p>
              <strong>Email:</strong> <a href="mailto:info@dorson.de" class="legal-link">info@dorson.de</a><br>
              <strong>Phone:</strong> <a href="tel:+17026264458" class="legal-link">+1 702 626 4458</a>
            </p>
          </div>
        </section>

        <section class="legal-card full-width">
          <h2>Content Governance</h2>
          <div class="legal-content-block">
            <p>
              <strong>Responsible for content according to § 55 Abs. 2 RStV:</strong><br>
              Nojan Dorson<br>
              Las Vegas, NV, United States
            </p>
            <p style="font-size: 0.95rem; opacity: 0.8;">
              Please note: Although this website is operated in English, it follows relevant legal requirements for digital media services.
            </p>
          </div>
        </section>
      </div>
    </div>
  </main>
  
  ${getFooter()}
`;
