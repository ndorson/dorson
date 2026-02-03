
// Import CSS directly if using Vite, though we linked it in HTML
// import '../css/style.css'; 

const app = document.getElementById('admin-app');
let projects = [];
let editor; // Editor.js instance

// Helper to generate UUID
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// SECURITY: Localhost Check
// This ensures the admin panel only runs in a local development environment.
if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    document.body.innerHTML = `
        <div style="display:flex; height:100vh; justify-content:center; align-items:center; background:#000; color:#ff3333; font-family:sans-serif; text-align:center;">
            <div>
                <h1>⚠️ ACCESS DENIED</h1>
                <p>The Admin Panel is for local development only.</p>
                <a href="/" style="color:white; text-decoration:underline; display:block; margin-top:1rem;">Return to Home</a>
            </div>
        </div>
    `;
    throw new Error("Admin access blocked: Not localhost.");
}

// Initial Data Load
async function loadData() {
    try {
        const response = await fetch('/src/data/content.json');
        if (!response.ok) throw new Error('Failed to load data');
        let data = await response.json();

        // Migration / Normalization
        projects = data.map((item, index) => ({
            id: item.id || uuidv4(),
            title: item.title || 'Untitled Project',
            description: item.description || '',
            image: item.image || '', // Main image (legacy)
            images: item.images || {
                main: item.image || '',
                carousel: '',
                grid: ''
            },
            link: item.link || '',
            tags: item.tags || '#StudioProject',
            shortDescription: item.shortDescription || '',
            video: item.video || { url: '', type: '' },
            content: item.content || null, // Editor.js data
            sortOrder: item.sortOrder !== undefined ? item.sortOrder : index,
            date: item.date || ''
        }));

        // Sort by sortOrder
        projects.sort((a, b) => a.sortOrder - b.sortOrder);

        render();
    } catch (err) {
        console.error(err);
        app.innerHTML = `<div style="color:red; text-align:center;">Error loading projects: ${err.message}. Make sure you are running 'npm run dev'.</div>`;
    }
}

// Save Data
async function saveData() {
    try {
        // Re-assign sortOrder based on current array order
        projects.forEach((p, idx) => p.sortOrder = idx);

        const response = await fetch('/api/save-content', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(projects)
        });

        if (!response.ok) throw new Error('Failed to save');
        alert('Saved successfully!');
    } catch (err) {
        console.error(err);
        alert('Error saving data: ' + err.message);
    }
}

// Render UI
function render() {
    app.innerHTML = `
        <header class="admin-header">
            <div>
                <h1 style="margin:0;">Portfolio Manager</h1>
                <p style="color:#666; margin:0.5rem 0 0;">Manage your creative work</p>
            </div>
            <div class="actions">
                <button class="btn-primary" id="btn-add">+ Add New Project</button>
                <button class="btn-primary" id="btn-save" style="background:var(--accent-color, #FFE600);">Save All Changes</button>
                <a href="/" target="_blank" class="btn-icon" title="View Site">↗</a>
            </div>
        </header>

        <div class="project-list" id="project-list">
            ${projects.map((p, index) => renderItem(p, index)).join('')}
        </div>

        ${renderModal()}
    `;

    attachEvents();
}

function renderItem(project, index) {
    const isFirst = index === 0;
    const isLast = index === projects.length - 1;

    return `
        <div class="project-item" data-id="${project.id}">
            <div class="actions" style="flex-direction:column; margin-right:1rem;">
                <button class="btn-icon btn-move-up" data-index="${index}" ${isFirst ? 'disabled style="opacity:0.3"' : ''}>↑</button>
                <button class="btn-icon btn-move-down" data-index="${index}" ${isLast ? 'disabled style="opacity:0.3"' : ''}>↓</button>
            </div>
            
            <img src="${project.images.main || project.image || 'https://via.placeholder.com/150'}" class="project-thumb">
            
            <div class="project-info">
                <div class="project-title">${project.title}</div>
                <div class="project-meta">
                   ${project.date ? `<span>${project.date}</span> • ` : ''} 
                   ${project.images.carousel ? 'Has Carousel Img' : 'No Carousel Img'} •
                   ${project.content ? 'Rich Content' : 'Legacy Content'}
                </div>
            </div>

            <div class="actions">
                <button class="btn-icon btn-edit" data-index="${index}" title="Edit">✎</button>
                <button class="btn-icon btn-delete" data-index="${index}" title="Delete" style="color:red;">🗑</button>
            </div>
        </div>
    `;
}

function renderModal() {
    return `
        <div class="modal-overlay" id="modal-overlay">
            <div class="modal">
                <h2 id="modal-title" style="margin-top:0; margin-bottom:1.5rem; border-bottom:1px solid #333; padding-bottom:1rem;">Edit Project</h2>
                
                <form id="project-form">
                    <input type="hidden" id="edit-index" value="">
                    
                    <div class="form-group">
                        <label class="form-label">Title</label>
                        <input type="text" id="inp-title" class="form-input" required>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Tags (e.g. #Branding #Web)</label>
                            <input type="text" id="inp-tags" class="form-input" placeholder="#Design #Development">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Short Description (max 100 chars)</label>
                            <input type="text" id="inp-short-desc" class="form-input" maxlength="100" placeholder="Brief summary for the grid container...">
                        </div>
                    </div>

                    <div class="form-row">
                         <div class="form-group">
                            <label class="form-label">Main Image (Thumbnail)</label>
                            <div class="drop-zone" id="drop-img-main">
                                <div class="drop-zone-text">Drag & Drop or Click to Upload</div>
                                <input type="file" hidden accept="image/*">
                            </div>
                            <input type="text" id="inp-img-main" class="form-input" placeholder="Image URL (auto-filled)" style="margin-top: 0.5rem; font-size: 0.8rem; opacity: 0.7;">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Header Carousel Image</label>
                            <div class="drop-zone" id="drop-img-carousel">
                                <div class="drop-zone-text">Drag & Drop or Click to Upload</div>
                                <input type="file" hidden accept="image/*">
                            </div>
                            <input type="text" id="inp-img-carousel" class="form-input" placeholder="Image URL (auto-filled)" style="margin-top: 0.5rem; font-size: 0.8rem; opacity: 0.7;">
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Project Story / Content</label>
                        <div class="editor-wrapper">
                            <div id="editor-container"></div>
                        </div>
                        <p style="font-size:0.8rem; color:#888; margin-top:0.5rem;">Highlight text to format. You can also paste images directly.</p>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">External Link</label>
                            <input type="text" id="inp-link" class="form-input">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Original Link (Date/Legacy)</label>
                            <input type="text" id="inp-date" class="form-input" placeholder="YYYY-MM-DD or Text">
                        </div>
                    </div>

                    <div class="form-group" style="padding: 1rem; background: #222; border-radius: 8px;">
                        <label class="form-label" style="font-weight:bold; color:white;">Video Embed</label>
                        <div class="form-row">
                             <div>
                                <label class="form-label">Video URL (Vimeo/YouTube)</label>
                                <input type="text" id="inp-vid-url" class="form-input">
                             </div>
                             <div>
                                <label class="form-label">Type</label>
                                <select id="inp-vid-type" class="form-input">
                                    <option value="">None</option>
                                    <option value="vimeo">Vimeo</option>
                                    <option value="youtube">YouTube</option>
                                </select>
                             </div>
                        </div>
                    </div>

                    <div class="modal-actions">
                        <button type="button" class="btn-cancel" id="btn-modal-cancel">Cancel</button>
                        <button type="submit" class="btn-primary" id="btn-modal-save">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

async function initEditor(data) {
    editor = new Quill('#editor-container', {
        theme: 'snow',
        placeholder: 'Tell the project story...',
        modules: {
            toolbar: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['link', 'image'],
                ['clean']
            ]
        }
    });

    // Custom Image Handler
    const toolbar = editor.getModule('toolbar');
    toolbar.addHandler('image', () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            if (file) {
                const url = await uploadFile(file);
                if (url) {
                    const range = editor.getSelection();
                    editor.insertEmbed(range.index, 'image', url);
                }
            }
        };
    });

    if (data) {
        if (typeof data === 'string') {
            editor.root.innerHTML = data;
        } else if (data.blocks) {
            // Convert Editor.js blocks to HTML (Simple conversion)
            editor.root.innerHTML = convertBlocksToHtml(data.blocks);
        }
    }
}

async function uploadFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            try {
                const response = await fetch('/api/upload-image', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ image: reader.result, filename: file.name })
                });
                const result = await response.json();
                if (result.success) {
                    resolve(result.file.url);
                } else {
                    alert('Upload failed: ' + result.message);
                    resolve(null);
                }
            } catch (err) {
                console.error(err);
                resolve(null);
            }
        };
    });
}

function convertBlocksToHtml(blocks) {
    return blocks.map(block => {
        switch (block.type) {
            case 'header': return `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
            case 'paragraph': return `<p>${block.data.text}</p>`;
            case 'list':
                const tag = block.data.style === 'ordered' ? 'ol' : 'ul';
                const items = block.data.items.map(i => `<li>${i}</li>`).join('');
                return `<${tag}>${items}</${tag}>`;
            case 'image': return `<img src="${block.data.file.url}" alt="${block.data.caption || ''}">`;
            default: return '';
        }
    }).join('');
}

function setupDropZones() {
    setupDropZone('drop-img-main', 'inp-img-main');
    setupDropZone('drop-img-carousel', 'inp-img-carousel');
}

function setupDropZone(zoneId, inputId) {
    const zone = document.getElementById(zoneId);
    const hiddenInput = zone.querySelector('input[type="file"]');
    const urlInput = document.getElementById(inputId);

    zone.onclick = () => hiddenInput.click();

    zone.ondragover = (e) => {
        e.preventDefault();
        zone.classList.add('dragover');
    };

    zone.ondragleave = () => zone.classList.remove('dragover');

    zone.ondrop = async (e) => {
        e.preventDefault();
        zone.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file) handleUpload(file);
    };

    hiddenInput.onchange = () => {
        const file = hiddenInput.files[0];
        if (file) handleUpload(file);
    };

    async function handleUpload(file) {
        zone.querySelector('.drop-zone-text').textContent = 'Uploading...';
        const url = await uploadFile(file);
        if (url) {
            urlInput.value = url;
            updateDropZonePreview(zone, url);
        } else {
            zone.querySelector('.drop-zone-text').textContent = 'Upload Failed';
        }
    }
}

function updateDropZonePreview(zone, url) {
    let img = zone.querySelector('img');
    if (!img) {
        img = document.createElement('img');
        zone.appendChild(img);
    }
    img.src = url;
    zone.querySelector('.drop-zone-text').textContent = 'Change Image';
}

function attachEvents() {
    // Add User
    document.getElementById('btn-add').onclick = () => openModal(-1);

    // Save All
    document.getElementById('btn-save').onclick = saveData;

    // Modal Cancel
    document.getElementById('btn-modal-cancel').onclick = closeModal;

    // Form Submit
    document.getElementById('project-form').onsubmit = async (e) => {
        e.preventDefault();
        saveItem();
    };

    // List Actions
    document.querySelectorAll('.btn-move-up').forEach(btn => {
        btn.onclick = (e) => {
            const idx = parseInt(e.target.closest('button').dataset.index);
            if (idx > 0) {
                [projects[idx], projects[idx - 1]] = [projects[idx - 1], projects[idx]];
                render();
            }
        };
    });

    document.querySelectorAll('.btn-move-down').forEach(btn => {
        btn.onclick = (e) => {
            const idx = parseInt(e.target.closest('button').dataset.index);
            if (idx < projects.length - 1) {
                [projects[idx], projects[idx + 1]] = [projects[idx + 1], projects[idx]];
                render();
            }
        };
    });

    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.onclick = (e) => {
            if (confirm('Are you sure you want to delete this project?')) {
                const idx = parseInt(e.target.closest('button').dataset.index);
                projects.splice(idx, 1);
                render();
            }
        };
    });

    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.onclick = (e) => {
            const idx = parseInt(e.target.closest('button').dataset.index);
            openModal(idx);
        };
    });
}

function openModal(index) {
    const modal = document.getElementById('modal-overlay');
    const form = document.getElementById('project-form');
    const title = document.getElementById('modal-title');

    modal.classList.add('active');
    document.getElementById('edit-index').value = index;

    if (index === -1) {
        title.textContent = 'Add New Project';
        form.reset();
        initEditor("");
        setupDropZones();
    } else {
        title.textContent = 'Edit Project';
        const p = projects[index];
        document.getElementById('inp-title').value = p.title;
        document.getElementById('inp-tags').value = p.tags || '';
        document.getElementById('inp-short-desc').value = p.shortDescription || '';
        document.getElementById('inp-img-main').value = p.images.main || p.image || '';
        document.getElementById('inp-img-carousel').value = p.images.carousel || '';
        document.getElementById('inp-link').value = p.link || '';
        document.getElementById('inp-date').value = p.date || '';

        if (p.video) {
            document.getElementById('inp-vid-url').value = p.video.url || '';
            document.getElementById('inp-vid-type').value = p.video.type || '';
        }

        initEditor(p.content);
        setupDropZones();

        // Update previews
        if (p.images.main || p.image) updateDropZonePreview(document.getElementById('drop-img-main'), p.images.main || p.image);
        if (p.images.carousel) updateDropZonePreview(document.getElementById('drop-img-carousel'), p.images.carousel);
    }
}

function closeModal() {
    document.getElementById('modal-overlay').classList.remove('active');
}

async function saveItem() {
    const index = parseInt(document.getElementById('edit-index').value);
    const title = document.getElementById('inp-title').value;
    const tags = document.getElementById('inp-tags').value;
    const shortDesc = document.getElementById('inp-short-desc').value;
    const imgMain = document.getElementById('inp-img-main').value;
    const imgCarousel = document.getElementById('inp-img-carousel').value;
    const link = document.getElementById('inp-link').value;
    const date = document.getElementById('inp-date').value;
    const vidUrl = document.getElementById('inp-vid-url').value;
    const vidType = document.getElementById('inp-vid-type').value;

    // Get Editor content
    const savedData = editor.root.innerHTML;

    const newItem = {
        id: index === -1 ? uuidv4() : projects[index].id,
        title,
        tags,
        shortDescription: shortDesc,
        description: "", // Deprecated, using content now
        image: imgMain, // Legacy sync
        images: {
            main: imgMain,
            carousel: imgCarousel,
            grid: imgMain
        },
        link,
        date,
        video: {
            url: vidUrl,
            type: vidType
        },
        content: savedData, // Save Rich Content
        sortOrder: index === -1 ? -1 : projects[index].sortOrder // Temp order
    };

    if (index === -1) {
        projects.unshift(newItem);
    } else {
        projects[index] = newItem;
    }

    // Refresh sortOrder for all projects immediately
    projects.forEach((p, idx) => p.sortOrder = idx);

    closeModal();
    render();
}

// Start
loadData();
