import '../css/style.css'
import content from '../data/content.json'
import { getFooter } from './footer.js'

const app = document.querySelector('#project-app');
const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('id');

// Find project by ID or Index
let project = null;
if (projectId) {
  project = content.find(p => p.id === projectId);
  if (!project && !isNaN(projectId) && content[projectId]) {
    project = content[projectId];
  }
}

// Simple Navbar
const navbar = `
  <nav class="navbar" style="position: sticky;">
    <div class="logo"><a href="/">Dorson</a></div>
    <div class="nav-links">
      <a href="/#portfolio">Work</a>
      <a href="/#about">About</a>
      <a href="/#contact">Contact</a>
    </div>
  </nav>
`;

if (project) {
  document.title = `${project.title} | Dorson Portfolio`;

  // Video Embed Logic (Top)
  let topVideoEmbed = '';
  if (project.video && project.video.url) {
    let embedSrc = '';
    if (project.video.type === 'vimeo' || project.video.url.includes('vimeo')) {
      const vimeoId = project.video.url.split('/').pop();
      embedSrc = `https://player.vimeo.com/video/${vimeoId}`;
    } else if (project.video.type === 'youtube' || project.video.url.includes('youtu')) {
      let ytId = project.video.url.split('v=')[1];
      if (!ytId && project.video.url.includes('youtu.be/')) {
        ytId = project.video.url.split('youtu.be/')[1];
      }
      if (ytId) {
        const ampersandPosition = ytId.indexOf('&');
        if (ampersandPosition !== -1) {
          ytId = ytId.substring(0, ampersandPosition);
        }
        embedSrc = `https://www.youtube.com/embed/${ytId}`;
      }
    }

    if (embedSrc) {
      topVideoEmbed = `
            <div class="project-video fade-in-up" style="margin-bottom: 3rem; position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 12px;">
                <iframe src="${embedSrc}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
            </div>`;
    }
  }

  // Block Renderer
  let blocksHtml = '';
  if (project.content) {
    if (typeof project.content === 'string') {
      // New Quill format (HTML)
      blocksHtml = `<div class="quill-content fade-in-up">${project.content}</div>`;
    } else if (project.content.blocks) {
      // Legacy Editor.js format
      blocksHtml = project.content.blocks.map(block => {
        switch (block.type) {
          case 'header':
            return `<h${block.data.level} class="fade-in-up" style="margin-top:2rem; margin-bottom:1rem;">${block.data.text}</h${block.data.level}>`;
          case 'paragraph':
            return `<p class="fade-in-up" style="margin-bottom:1.5rem;">${block.data.text}</p>`;
          case 'list':
            const tag = block.data.style === 'ordered' ? 'ol' : 'ul';
            const items = block.data.items.map(i => `<li>${i}</li>`).join('');
            return `<${tag} class="fade-in-up" style="margin-bottom:1.5rem; padding-left:1.5rem;">${items}</${tag}>`;
          case 'quote':
            return `<blockquote class="fade-in-up" style="border-left:4px solid var(--accent-color, #ffe600); padding-left:1rem; font-style:italic; margin: 2rem 0;">${block.data.text}</blockquote>`;
          case 'image':
            return `
                        <div class="fade-in-up" style="margin: 2rem 0;">
                            <img src="${block.data.file.url}" alt="${block.data.caption || ''}" style="width:100%; height:auto; border-radius:8px;">
                            ${block.data.caption ? `<div style="text-align:center; color:#888; font-size:0.9rem; margin-top:0.5rem;">${block.data.caption}</div>` : ''}
                        </div>
                    `;
          case 'embed':
            return `
                        <div class="fade-in-up" style="margin: 2rem 0; position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 12px;">
                            <iframe src="${block.data.embed}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                        </div>
                     `;
          default:
            return '';
        }
      }).join('');
    }
  } else {
    // Fallback to legacy description
    blocksHtml = project.description ? project.description.replace(/\n/g, '<br>') : '<p><em>No description available.</em></p>';
  }

  app.innerHTML = `
    ${navbar}

    <main class="project-page">
      <header class="project-header">
        <div class="container" style="max-width: 900px; margin: 0 auto; padding: 4rem 2rem;">
            <p class="breadcrumb" style="color: var(--text-secondary); margin-bottom: 1rem;">
                <a href="/">Home</a> / <span style="color: white;">${project.title}</span>
            </p>
            <h1 class="fade-in-up" style="font-size: clamp(2rem, 5vw, 4rem); margin-bottom: 2rem;">${project.title}</h1>
            
            ${topVideoEmbed ? topVideoEmbed : `
            <div class="project-hero-image fade-in-up" style="width: 100%; aspect-ratio: 16/9; overflow: hidden; border-radius: 12px; margin-bottom: 3rem;">
                <img src="${(project.images && project.images.main) ? project.images.main : (project.image || '')}" alt="${project.title}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            `}

            <div class="project-content" style="font-size: 1.1rem; line-height: 1.8; color: #ddd;">
                ${project.link ? `
                <p class="fade-in-up" style="margin-bottom: 2rem;">
                    <strong>External Link:</strong> <a href="${project.link}" target="_blank" style="color: var(--accent-color, #ffe600); text-decoration: underline;">${project.link}</a>
                </p>` : ''}
                
                <div class="project-body">
                   ${blocksHtml}
                </div>
            </div>
        </div>
      </header>
    </main>
    
    ${getFooter()}
  `;

  // Animation Observer
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

  // Defer observation slightly to allow DOM to paint
  setTimeout(() => {
    document.querySelectorAll('.fade-in-up').forEach(el => {
      observer.observe(el);
    });
  }, 100);

} else {
  // 404 / Not Found
  app.innerHTML = `
    ${navbar}
    <div style="height: 80vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
        <h1>Project Not Found</h1>
        <p style="color: var(--text-secondary); margin-top: 1rem;">The project you are looking for does not exist.</p>
        <a href="/" class="btn-view-all" style="margin-top: 2rem;">Back to Home</a>
    </div>
  `;
}
