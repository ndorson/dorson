
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
        <h1>Privacy Policy</h1>
        <p class="legal-update">Last Updated: February 2026</p>
      </header>
      
      <div class="legal-grid">
        <section class="legal-card">
          <h2>1. Data Controller</h2>
          <div class="legal-content-block">
            <p>
               Responsible for data processing on this website is:<br>
               <strong>Nojan Dorson</strong><br>
               <strong>Digital:</strong> dorson.de<br>
               Email: <a href="mailto:info@dorson.de" class="legal-link">info@dorson.de</a>
            </p>
          </div>
        </section>

        <section class="legal-card">
          <h2>2. Hosting & Infrastructure</h2>
          <div class="legal-content-block">
            <p>
               This website is hosted on <strong>AWS Amplify</strong> (Amazon Web Services). 
               When you visit our site, technical data (Server Log Files) is automatically collected and processed by AWS to ensure secure and stable operation. 
            </p>
            <p>
               This includes IP addresses, browser type, operating system, and access timestamps. 
               This data collection is based on Art. 6 (1) (f) GDPR (legitimate interest in security and stability).
            </p>
          </div>
        </section>

        <section class="legal-card">
          <h2>3. Contact Processing</h2>
          <div class="legal-content-block">
            <p>
               If you contact us via email, phone, or any provided link, various data (e.g., name, email address, content of your message) will be stored and processed by us for the purpose of responding to your inquiry. 
            </p>
            <p>
               This data is not passed on to third parties without your consent. We retain this data as long as necessary to fulfill the request or as required by law.
            </p>
          </div>
        </section>

        <section class="legal-card">
          <h2>4. Cookies & Analytics</h2>
          <div class="legal-content-block">
            <p>
               <strong>Transparency is our priority.</strong> We currently do not use tracking cookies or third-party analytics services (like Google Analytics). 
               The website is designed to provide information about our portfolio without invasive tracking methodologies.
            </p>
          </div>
        </section>

        <section class="legal-card full-width">
          <h2>5. Your Rights</h2>
          <div class="legal-content-block">
            <p>
               You have the right to request information about your stored personal data at any time. 
               You also have the right to request the correction, blocking, or deletion of this data. 
            </p>
            <p>
               For any privacy-related requests, please contact us at <a href="mailto:info@dorson.de" class="legal-link">info@dorson.de</a>.
            </p>
          </div>
        </section>
      </div>
    </div>
  </main>
  
  ${getFooter()}
`;
