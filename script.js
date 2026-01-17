// Navigation
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu mobile
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Fermer le menu au clic sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Gestion des pages
function showPage(pageId) {
    // Masquer toutes les pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Afficher la page demandée
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Mettre à jour la navigation
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${pageId}`) {
            link.classList.add('active');
        }
    });
    
    // Scroll vers le haut
    window.scrollTo(0, 0);
}

// Navigation par hash
window.addEventListener('hashchange', () => {
    handleHashNavigation();
});

// Initialisation
window.addEventListener('DOMContentLoaded', () => {
    handleHashNavigation();
});

// Variable pour éviter les appels récursifs
let isNavigating = false;

// Fonction pour gérer la navigation par hash
function handleHashNavigation() {
    // Éviter les appels récursifs
    if (isNavigating) {
        return;
    }
    
    const hash = window.location.hash.substring(1) || 'home';
    
    // Ne rien faire si on est déjà sur la bonne page
    const currentPage = document.querySelector('.page.active');
    if (hash === 'home' && currentPage && currentPage.id === 'home') return;
    if (hash === 'modules' && currentPage && currentPage.id === 'modules') return;
    if (hash === 'about' && currentPage && currentPage.id === 'about') return;
    if (hash.startsWith('module-') && currentPage && currentPage.id === 'module-detail') {
        const moduleId = parseInt(hash.replace('module-', ''));
        const currentTitle = document.getElementById('moduleTitle');
        if (currentTitle && currentTitle.textContent) {
            const currentModule = modulesData.find(m => m.id === moduleId);
            if (currentModule && currentTitle.textContent === currentModule.title) {
                return; // Déjà sur le bon module
            }
        }
    }
    
    isNavigating = true;
    
    try {
        if (hash === 'modules') {
            showModules();
        } else if (hash === 'about') {
            showAbout();
        } else if (hash.startsWith('module-')) {
            // Extraire l'ID du module depuis le hash (ex: module-1 -> 1)
            const moduleId = parseInt(hash.replace('module-', ''));
            if (moduleId && !isNaN(moduleId)) {
                showModuleDetail(moduleId, false); // false = ne pas changer le hash
            } else {
                showHome();
            }
        } else {
            showHome();
        }
    } finally {
        // Réactiver après un court délai
        setTimeout(() => {
            isNavigating = false;
        }, 200);
    }
}

// Fonctions de navigation
function showHome() {
    showPage('home');
    window.location.hash = 'home';
    renderModulesPreview();
}

function showModules() {
    showPage('modules');
    window.location.hash = 'modules';
    renderModulesList();
}

function showAbout() {
    showPage('about');
    window.location.hash = 'about';
}

function showModuleDetail(moduleId, updateHash = true) {
    console.log('showModuleDetail appelé avec moduleId:', moduleId);
    
    const module = modulesData.find(m => m.id === moduleId);
    if (!module) {
        console.error('Module non trouvé:', moduleId);
        showHome();
        return;
    }
    
    // Afficher la page du module d'abord
    showPage('module-detail');
    
    // Rendre le contenu immédiatement
    renderModuleDetail(moduleId);
    
    // Mettre à jour le hash seulement si demandé (pas lors de la navigation par hash)
    if (updateHash) {
        isNavigating = true;
        const newHash = `module-${moduleId}`;
        if (window.location.hash !== `#${newHash}`) {
            window.location.hash = newHash;
        }
        setTimeout(() => {
            isNavigating = false;
        }, 300);
    }
}

// Rendu des modules en preview (page d'accueil)
function renderModulesPreview() {
    const grid = document.getElementById('modulesGrid');
    if (!grid) return;
    
    grid.innerHTML = modulesData.map(module => `
        <div class="module-card" data-module-id="${module.id}">
            <div class="module-card-header">
                <div class="module-icon">${module.icon}</div>
                <h3 class="module-title">${module.title}</h3>
            </div>
            <p class="module-description">${module.description}</p>
            <div class="module-meta">
                <span>${module.sections.length} sections</span>
                <span>•</span>
                <span>${module.sections.reduce((acc, section) => acc + section.resources.length, 0)} ressources</span>
            </div>
        </div>
    `).join('');
    
    // Ajouter les event listeners après le rendu
    grid.querySelectorAll('.module-card').forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const moduleId = parseInt(this.getAttribute('data-module-id'));
            if (moduleId) {
                showModuleDetail(moduleId);
            }
        });
    });
}

// Rendu de la liste complète des modules
function renderModulesList() {
    const list = document.getElementById('modulesList');
    if (!list) return;
    
    list.innerHTML = modulesData.map(module => `
        <div class="module-card" data-module-id="${module.id}">
            <div class="module-card-header">
                <div class="module-icon">${module.icon}</div>
                <h3 class="module-title">${module.title}</h3>
            </div>
            <p class="module-description">${module.description}</p>
            <div class="module-meta">
                <span>${module.sections.length} sections</span>
                <span>•</span>
                <span>${module.sections.reduce((acc, section) => acc + section.resources.length, 0)} ressources</span>
            </div>
        </div>
    `).join('');
    
    // Ajouter les event listeners après le rendu
    list.querySelectorAll('.module-card').forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const moduleId = parseInt(this.getAttribute('data-module-id'));
            if (moduleId) {
                showModuleDetail(moduleId);
            }
        });
    });
}

// Rendu du détail d'un module
function renderModuleDetail(moduleId) {
    const module = modulesData.find(m => m.id === moduleId);
    if (!module) return;
    
    const title = document.getElementById('moduleTitle');
    const content = document.getElementById('moduleContent');
    
    if (title) {
        title.textContent = module.title;
    }
    
    if (content) {
        // Aperçu du module
        let overviewHtml = '';
        if (module.overview) {
            overviewHtml = `
                <div class="module-overview">
                    <h2>📋 Aperçu du module</h2>
                    <p>${module.overview}</p>
                </div>
            `;
        }
        
        // Vidéos principales du module
        let moduleVideosHtml = '';
        if (module.videos && module.videos.length > 0) {
            moduleVideosHtml = `
                <div class="module-videos">
                    <h2>🎥 Vidéos du module</h2>
                    <div class="videos-grid">
                        ${module.videos.map(video => `
                            <div class="video-card">
                                <div class="video-wrapper">
                                    <iframe 
                                        src="https://www.youtube.com/embed/${video.youtubeId}" 
                                        frameborder="0" 
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                        allowfullscreen>
                                    </iframe>
                                </div>
                                <div class="video-info">
                                    <h4>${video.title}</h4>
                                    <p>${video.description}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        
        // Sections du module
        const sectionsHtml = module.sections.map(section => {
            // Description de la section
            let sectionDescHtml = '';
            if (section.description) {
                sectionDescHtml = `<p class="section-description">${section.description}</p>`;
            }
            
            // Contenu détaillé de la section
            let sectionContentHtml = '';
            if (section.content) {
                sectionContentHtml = `
                    <div class="section-content">
                        ${section.content}
                    </div>
                `;
            }
            
            // Vidéos de la section
            let sectionVideosHtml = '';
            if (section.videos && section.videos.length > 0) {
                sectionVideosHtml = `
                    <div class="section-videos">
                        <h4>🎥 Vidéos de cette section</h4>
                        <div class="videos-grid">
                            ${section.videos.map(video => `
                                <div class="video-card">
                                    <div class="video-wrapper">
                                        <iframe 
                                            src="https://www.youtube.com/embed/${video.youtubeId}" 
                                            frameborder="0" 
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                            allowfullscreen>
                                        </iframe>
                                    </div>
                                    <div class="video-info">
                                        <h5>${video.title}</h5>
                                        <p>${video.description}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }
            
            // Ressources de la section
            const resourcesHtml = section.resources.map(resource => `
                <div class="resource-item">
                    <div class="resource-info">
                        <div class="resource-icon">${getResourceIcon(resource.type)}</div>
                        <div class="resource-details">
                            <h4>${resource.name}</h4>
                            <p>${getResourceLabel(resource.type)}</p>
                        </div>
                    </div>
                    <div class="resource-actions">
                        <button class="btn btn-primary" onclick="viewPDF('${escapePath(resource.path)}', '${escapeHtml(resource.name)}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14 2 14 8 20 8"/>
                                <line x1="16" y1="13" x2="8" y2="13"/>
                                <line x1="16" y1="17" x2="8" y2="17"/>
                                <polyline points="10 9 9 9 8 9"/>
                            </svg>
                            Voir
                        </button>
                        <a href="${escapePath(resource.path)}" download="${escapeHtml(resource.name)}.pdf" class="btn btn-secondary">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                <polyline points="7 10 12 15 17 10"/>
                                <line x1="12" y1="15" x2="12" y2="3"/>
                            </svg>
                            Télécharger
                        </a>
                    </div>
                </div>
            `).join('');
            
            return `
                <div class="section-card">
                    <h3 class="section-title-small">${section.title}</h3>
                    ${sectionDescHtml}
                    ${sectionContentHtml}
                    ${sectionVideosHtml}
                    <div class="resources-section">
                        <h4>📚 Ressources</h4>
                        <div class="resources-list">
                            ${resourcesHtml}
                        </div>
                    </div>
                    ${renderGamesForSection(module.id, section.title)}
                </div>
            `;
        }).join('');
        
        content.innerHTML = overviewHtml + moduleVideosHtml + sectionsHtml;
    }
}

// Fonction pour échapper les chemins pour JavaScript
function escapePath(path) {
    return path.replace(/\\/g, '/').replace(/'/g, "\\'");
}

// Fonction pour échapper le HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Gestion du modal PDF
function viewPDF(path, title) {
    // Normaliser le chemin pour Windows
    const normalizedPath = path.replace(/\\/g, '/');
    
    // Créer le modal s'il n'existe pas
    let modal = document.getElementById('pdfModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'pdfModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title" id="modalTitle">${title}</h3>
                    <button class="modal-close" onclick="closePDF()">&times;</button>
                </div>
                <div class="modal-body">
                    <div id="pdfError" style="display: none; padding: 2rem; text-align: center; color: var(--text-secondary);">
                        <p style="margin-bottom: 1rem;">⚠️ Le PDF ne peut pas être affiché directement dans le navigateur.</p>
                        <p style="margin-bottom: 1.5rem;">Veuillez utiliser le bouton "Télécharger" pour ouvrir le fichier.</p>
                        <button class="btn btn-primary" onclick="closePDF()">Fermer</button>
                    </div>
                    <iframe class="pdf-viewer" id="pdfViewer" src="" onerror="showPDFError()"></iframe>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Fermer au clic en dehors
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closePDF();
            }
        });
    }
    
    // Masquer l'erreur et afficher le viewer
    const errorDiv = document.getElementById('pdfError');
    const viewer = document.getElementById('pdfViewer');
    if (errorDiv) errorDiv.style.display = 'none';
    if (viewer) viewer.style.display = 'block';
    
    // Mettre à jour le titre et le PDF
    document.getElementById('modalTitle').textContent = title;
    if (viewer) {
        viewer.src = normalizedPath;
        
        // Vérifier après un délai si le PDF s'est chargé
        setTimeout(() => {
            try {
                if (viewer.contentDocument === null || viewer.contentWindow === null) {
                    showPDFError();
                }
            } catch (e) {
                // Erreur CORS - normal avec file://
                showPDFError();
            }
        }, 1000);
    }
    
    // Afficher le modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function showPDFError() {
    const errorDiv = document.getElementById('pdfError');
    const viewer = document.getElementById('pdfViewer');
    if (errorDiv) errorDiv.style.display = 'block';
    if (viewer) viewer.style.display = 'none';
}

function closePDF() {
    const modal = document.getElementById('pdfModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        // Vider le viewer pour libérer la mémoire
        const viewer = document.getElementById('pdfViewer');
        if (viewer) {
            viewer.src = '';
        }
    }
}

// Fermer avec Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePDF();
    }
});

// Gestion des liens de navigation (seulement pour les liens du menu, pas les modules)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = this.getAttribute('href').substring(1);
        // Ne pas intercepter les clics sur les modules (gérés par onclick)
        if (target === 'home' || target === 'modules' || target === 'about') {
            e.preventDefault();
            if (target === 'home') {
                showHome();
            } else if (target === 'modules') {
                showModules();
            } else if (target === 'about') {
                showAbout();
            }
        }
    });
});
