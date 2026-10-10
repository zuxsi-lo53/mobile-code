/* =============================================
   MobileCode IDE - Full Application Logic
   ============================================= */

// ===== STATE =====
const state = {
  currentUser: null,
  files: {},
  activeFile: null,
  openTabs: ['index.html', 'style.css', 'app.js'],
  extensions: [],
  previewDevice: 'mobile',
  previewWidth: 375,
  previewHeight: 667,
  zoom: 100,
  sidebarOpen: true,
  activeSidebarTab: 'explorer',
  aiModel: 'gpt4o',
  aiApiKey: '',
  aiLanguage: 'id',
  aiTemp: 0.7,
  chatHistory: [],
  isAIThinking: false,
  deviceBorder: true,
  autoRefresh: true,
};

// ===== INITIAL FILE SYSTEM =====
const defaultFiles = {
  'index.html': {
    content: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Proyek amin</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="container">
    <header class="hero">
      <h1>🚀 Selamat Datang uangku!</h1>
      <p>Edit kode di bawah dan lihat hasilnya secara live di sini.</p>
      <button class="cta-btn" onclick="greet()">Klik Saya!</button>
    </header>
    <main>
      <div class="cards">
        <div class="card">
          <span>🎨</span>
          <h3>Desain Modern</h3>
          <p>Buat antarmuka yang indah dengan mudah</p>
        </div>
        <div class="card">
          <span>⚡</span>
          <h3>Live Preview</h3>
          <p>Lihat perubahan secara real-time</p>
        </div>
        <div class="card">
          <span>🤖</span>
          <h3>AI Assistant</h3>
          <p>Bantuan AI untuk coding lebih cepat</p>
        </div>
      </div>
    </main>
  </div>
  <script src="app.js"></script>
</body>
</html>`,
    language: 'html',
    modified: false,
    icon: '📄'
  },
  'style.css': {
    content: `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', sans-serif;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  min-height: 100vh;
  color: white;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.hero {
  text-align: center;
  padding: 60px 20px;
}

.hero h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #6c63ff, #4fc3f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero p {
  font-size: 1.1rem;
  color: rgba(255,255,255,0.7);
  margin-bottom: 30px;
}

.cta-btn {
  padding: 14px 32px;
  background: linear-gradient(135deg, #6c63ff, #4fc3f7);
  border: none;
  border-radius: 30px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 20px rgba(108,99,255,0.4);
}

.cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(108,99,255,0.6);
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 40px;
}

.card {
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  transition: transform 0.2s, border-color 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  border-color: rgba(108,99,255,0.5);
}

.card span {
  font-size: 2rem;
  display: block;
  margin-bottom: 12px;
}

.card h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.card p {
  font-size: 0.875rem;
  color: rgba(255,255,255,0.6);
  line-height: 1.5;
}`,
    language: 'css',
    modified: false,
    icon: '🎨'
  },
  'app.js': {
    content: `// MobileCode IDE - Project Script

function greet() {
  const messages = [
    '🎉 Luar biasa! Coding itu menyebalkan!',
    '🚀 Selamat! Anda sudah memulai tapi ai selesai duluan!',
    '💡 Ide bagus datang saat Anda tanya ke ai!',
    '⚡ Keren! Terus berkembang menggunakan ai!',
  ];
  const msg = messages[Math.floor(Math.random() * messages.length)];
  
  const popup = document.createElement('div');
  popup.style.cssText = \`
    position: fixed; top: 20px; right: 20px;
    background: linear-gradient(135deg, #6c63ff, #4fc3f7);
    color: white; padding: 16px 24px;
    border-radius: 12px; font-weight: 600;
    box-shadow: 0 8px 30px rgba(108,99,255,0.4);
    z-index: 9999; font-size: 15px;
    animation: slideIn 0.3s ease;
  \`;
  popup.textContent = msg;
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 3000);
}

// Animate cards on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
});

document.querySelectorAll('.card').forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = \`opacity 0.5s ease \${i * 0.1}s, transform 0.5s ease \${i * 0.1}s\`;
  observer.observe(card);
});

console.log('✅ MobileCode IDE - Script loaded!');`,
    language: 'js',
    modified: false,
    icon: '⚡'
  },
  'src': {
    isFolder: true,
    children: {
      'components': {
        isFolder: true,
        children: {
          'Button.js': {
            content: `// Button Component
export function Button({ label, onClick, variant = 'primary' }) {
  const btn = document.createElement('button');
  btn.textContent = label;
  btn.className = \`btn btn-\${variant}\`;
  btn.onclick = onClick;
  return btn;
}`,
            language: 'js',
            modified: false,
            icon: '⚡'
          }
        }
      },
      'utils': {
        isFolder: true,
        children: {
          'helpers.js': {
            content: `// Utility helpers
export const formatDate = (date) => new Date(date).toLocaleDateString('id-ID');
export const truncate = (str, n) => str.length > n ? str.slice(0, n) + '...' : str;
export const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};`,
            language: 'js',
            modified: false,
            icon: '⚡'
          }
        }
      }
    }
  },
  'README.md': {
    content: `# Proyek MobileCode IDE

Selamat datang di proyek Anda!

## Cara Mulai
1. Edit **index.html** untuk struktur halaman
2. Edit **style.css** untuk tampilan
3. Edit **app.js** untuk interaktivitas
4. Lihat hasilnya di Live Preview di atas!

## Fitur
- ✅ Live Preview
- ✅ Syntax Highlighting
- ✅ AI Assistant
- ✅ Ekstensi Marketplace
- ✅ Git Integration`,
    language: 'md',
    modified: false,
    icon: '📝'
  }
};

// ===== MATERIAL ICON THEME (SVG DEFINITIONS) =====
const materialIcons = {
  folder: `<svg viewBox="0 0 24 24" width="16" height="16" style="vertical-align:middle;display:inline-block;"><path fill="#42a5f5" d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>`,
  folderOpen: `<svg viewBox="0 0 24 24" width="16" height="16" style="vertical-align:middle;display:inline-block;"><path fill="#64b5f6" d="M19 20H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h6l2 2h7c1.1 0 2 .9 2 2H4v10l2.14-8h17.1l-2.28 8.04c-.37 1.18-1.46 1.96-2.96 1.96z"/></svg>`,
  folderSrc: `<svg viewBox="0 0 24 24" width="16" height="16" style="vertical-align:middle;display:inline-block;"><path fill="#0288d1" d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/><path fill="#fff" d="M8.5 14.5l-2-2 2-2 1 1-1 1 1 1-1 1zm7 0l2-2-2-2-1 1 1 1-1 1 1 1z"/></svg>`,
  html: `<svg viewBox="0 0 24 24" width="16" height="16" style="vertical-align:middle;display:inline-block;"><path fill="#e44d26" d="M3 2l1.8 17.5 7.2 2 7.2-2L21 2H3zm14.4 5.6h-7.8l.2 2h7.4l-.6 6.8-4.6 1.3-4.6-1.3-.3-3.6h2l.2 2 2.7.7 2.7-.7.3-3H6.8l-.6-6.2h11.4l-.2 2z"/></svg>`,
  css: `<svg viewBox="0 0 24 24" width="16" height="16" style="vertical-align:middle;display:inline-block;"><path fill="#42a5f5" d="M3 2l1.8 17.5 7.2 2 7.2-2L21 2H3zm14.4 5.6H6.6l.2 2h10.4l-.6 6.8-4.6 1.3-4.6-1.3-.3-3.6h2l.2 2 2.7.7 2.7-.7.3-3.1H6.8l-.4-4h11.2l-.2 1.9z"/></svg>`,
  js: `<svg viewBox="0 0 24 24" width="16" height="16" style="vertical-align:middle;display:inline-block;"><rect width="20" height="20" x="2" y="2" rx="3" fill="#f7df1e"/><text x="12" y="15.5" font-family="'Segoe UI',Arial,sans-serif" font-weight="900" font-size="10.5" fill="#000" text-anchor="middle">JS</text></svg>`,
  ts: `<svg viewBox="0 0 24 24" width="16" height="16" style="vertical-align:middle;display:inline-block;"><rect width="20" height="20" x="2" y="2" rx="3" fill="#3178c6"/><text x="12" y="15.5" font-family="'Segoe UI',Arial,sans-serif" font-weight="900" font-size="10.5" fill="#fff" text-anchor="middle">TS</text></svg>`,
  json: `<svg viewBox="0 0 24 24" width="16" height="16" style="vertical-align:middle;display:inline-block;"><rect width="20" height="20" x="2" y="2" rx="3" fill="#cbcb41" fill-opacity="0.15" stroke="#cbcb41" stroke-width="1.5"/><text x="12" y="15.5" font-family="Consolas,monospace" font-weight="bold" font-size="12" fill="#cbcb41" text-anchor="middle">{ }</text></svg>`,
  md: `<svg viewBox="0 0 24 24" width="16" height="16" style="vertical-align:middle;display:inline-block;"><rect width="20" height="14" x="2" y="5" rx="2" fill="none" stroke="#42a5f5" stroke-width="2"/><path fill="#42a5f5" d="M5 15V9h2l2 2.5L13 9h2v6h-2v-3.5L11 14l-2-2.5V15H5zm12-4h2v2h2l-3 3-3-3h2v-2z"/></svg>`,
  image: `<svg viewBox="0 0 24 24" width="16" height="16" style="vertical-align:middle;display:inline-block;"><rect width="20" height="16" x="2" y="4" rx="2" fill="#26a69a"/><circle cx="8" cy="9" r="2" fill="#fff"/><path fill="#fff" d="M4 18l5-6 3 3 4-5 4 8z"/></svg>`,
  generic: `<svg viewBox="0 0 24 24" width="16" height="16" style="vertical-align:middle;display:inline-block;"><path fill="#90a4ae" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>`,
  logo: `<svg viewBox="0 0 100 100" width="38" height="38" style="vertical-align:middle;display:inline-block;"><circle cx="50" cy="50" r="48" fill="#1976d2"/><path d="M26 36 h16 l6 6 h26 a4 4 0 0 1 4 4 v20 a4 4 0 0 1 -4 4 h-48 a4 4 0 0 1 -4 -4 z" fill="#ffffff"/></svg>`
};

function isMaterialThemeActive() {
  if (!state.extensions) return false;
  const ext = state.extensions.find(e => e.id === 'material-icon-theme');
  return !!(ext && ext.installed && !ext.disabled);
}

function getFileIconHtml(name) {
  if (isMaterialThemeActive()) {
    const ext = name.split('.').pop().toLowerCase();
    if (ext === 'html') return materialIcons.html;
    if (ext === 'css') return materialIcons.css;
    if (['js', 'jsx'].includes(ext)) return materialIcons.js;
    if (['ts', 'tsx'].includes(ext)) return materialIcons.ts;
    if (ext === 'json') return materialIcons.json;
    if (ext === 'md') return materialIcons.md;
    if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'].includes(ext)) return materialIcons.image;
    return materialIcons.generic;
  }
  const ext = name.split('.').pop().toLowerCase();
  return langIcons[ext] || '📄';
}

function getFolderIconHtml(name, isOpen = false) {
  if (isMaterialThemeActive()) {
    if (name.toLowerCase() === 'src') return materialIcons.folderSrc;
    return isOpen ? materialIcons.folderOpen : materialIcons.folder;
  }
  return isOpen ? '📂' : '📁';
}

// ===== EXTENSION DATA =====
const extensionsData = [
  {
    id: 'material-icon-theme',
    name: 'Material Icon Theme',
    author: 'PKief',
    desc: 'Material Design Icons for Visual Studio Code dengan ikon file & folder modern',
    icon: '📁',
    stars: '⭐⭐⭐⭐⭐ (4.9)',
    downloads: '30M+',
    installed: true,
    disabled: false,
    category: 'theme',
    version: '5.39.0',
    identifier: 'pkief.material-icon-theme',
    rating: '4.9 / 5',
    published: '6 years ago',
    lastReleased: '1 week ago'
  },
  { id: 'prettier', name: 'Prettier', author: 'Prettier Team', desc: 'Format kode otomatis untuk HTML, CSS, JS, dan banyak lagi', icon: '✨', stars: '⭐⭐⭐⭐⭐', downloads: '12.5M', installed: false, disabled: false, category: 'formatter' },
  { id: 'eslint', name: 'ESLint', author: 'Microsoft', desc: 'Temukan dan perbaiki masalah pada kode JavaScript Anda', icon: '🔍', stars: '⭐⭐⭐⭐⭐', downloads: '8.2M', installed: false, disabled: false, category: 'linter' },
  { id: 'emmet', name: 'Emmet', author: 'Emmet Team', desc: 'Ekspansi snippet HTML/CSS untuk produktivitas maksimal', icon: '⚡', stars: '⭐⭐⭐⭐⭐', downloads: '10.1M', installed: true, disabled: false, category: 'productivity' },
  { id: 'gitlens', name: 'GitLens', author: 'GitKraken', desc: 'Supercharge Git: blame, history, dan banyak lagi', icon: '🌿', stars: '⭐⭐⭐⭐⭐', downloads: '5.3M', installed: false, disabled: false, category: 'git' },
  { id: 'liveserver', name: 'Live Server Pro', author: 'Ritwick Dey', desc: 'Server lokal dengan hot-reload untuk pengembangan web', icon: '🌐', stars: '⭐⭐⭐⭐', downloads: '7.8M', installed: true, disabled: false, category: 'server' },
  { id: 'dracula', name: 'Dracula Theme', author: 'Dracula', desc: 'Tema gelap yang elegan dan nyaman untuk mata', icon: '🧛', stars: '⭐⭐⭐⭐⭐', downloads: '6.5M', installed: false, disabled: false, category: 'theme' },
  { id: 'indent-rainbow', name: 'Indent Rainbow', author: 'oderwat', desc: 'Visualisasikan indentasi kode dengan warna-warna indah', icon: '🌈', stars: '⭐⭐⭐⭐', downloads: '2.1M', installed: false, disabled: false, category: 'visual' },
  { id: 'bracket-pair', name: 'Bracket Pair Colorizer', author: 'CoenraadS', desc: 'Beri warna pada pasangan kurung yang sesuai', icon: '🎨', stars: '⭐⭐⭐⭐⭐', downloads: '9.2M', installed: false, disabled: false, category: 'visual' },
  { id: 'path-intellisense', name: 'Path IntelliSense', author: 'Christian Kohler', desc: 'Autocomplete untuk path file di editor', icon: '📁', stars: '⭐⭐⭐⭐', downloads: '4.7M', installed: false, disabled: false, category: 'intellisense' },
  { id: 'auto-rename', name: 'Auto Rename Tag', author: 'Jun Han', desc: 'Rename tag HTML/XML secara otomatis saat mengedit', icon: '🔄', stars: '⭐⭐⭐⭐', downloads: '3.8M', installed: true, disabled: false, category: 'html' },
  { id: 'css-peek', name: 'CSS Peek', author: 'Pranay Prakash', desc: 'Lihat definisi CSS langsung dari HTML', icon: '👁️', stars: '⭐⭐⭐⭐', downloads: '2.3M', installed: false, disabled: false, category: 'css' },
  { id: 'todo-highlight', name: 'TODO Highlight', author: 'Wayou Liu', desc: 'Highlight komentar TODO, FIXME, dan lainnya', icon: '📌', stars: '⭐⭐⭐⭐', downloads: '1.9M', installed: false, disabled: false, category: 'productivity' },
];

// ===== RESOLUTION PRESETS =====
const resolutionPresets = [
  { name: 'iPhone SE', width: 375, height: 667, icon: '📱' },
  { name: 'iPhone 14 Pro', width: 393, height: 852, icon: '📱' },
  { name: 'iPhone 14 Plus', width: 430, height: 932, icon: '📱' },
  { name: 'Galaxy S23', width: 360, height: 780, icon: '📱' },
  { name: 'Pixel 7', width: 412, height: 892, icon: '📱' },
  { name: 'iPad Mini', width: 768, height: 1024, icon: '📟' },
  { name: 'iPad Pro 11"', width: 834, height: 1194, icon: '📟' },
  { name: 'Laptop HD', width: 1366, height: 768, icon: '💻' },
  { name: 'Desktop FHD', width: 1920, height: 1080, icon: '🖥️' },
  { name: '4K UHD', width: 3840, height: 2160, icon: '🖥️' },
];

// ===== LANGUAGE ICONS =====
const langIcons = { html: '📄', css: '🎨', js: '⚡', jsx: '⚛️', ts: '💙', tsx: '⚛️', json: '📦', md: '📝', py: '🐍', php: '🐘', vue: '💚', svg: '🖼️', txt: '📄', xml: '📄' };
const langNames = { html: 'HTML', css: 'CSS', js: 'JavaScript', jsx: 'JSX', ts: 'TypeScript', tsx: 'TSX', json: 'JSON', md: 'Markdown', py: 'Python', php: 'PHP', vue: 'Vue', svg: 'SVG', txt: 'Text' };

// ===== INIT =====
window.addEventListener('DOMContentLoaded', () => {
  loadFromStorage();
  setTimeout(initApp, 3100);
});

function cleanFilesObject(obj) {
  if (!obj || typeof obj !== 'object') return;
  for (const key of Object.keys(obj)) {
    const item = obj[key];
    if (item && item.content && typeof item.content === 'string') {
      if (item.content.includes('class="hl-tag"') || item.content.includes('hl-attr') || item.content.includes('class="hl-')) {
        if (defaultFiles[key]) {
          item.content = defaultFiles[key].content;
        } else {
          item.content = item.content.replace(/class="hl-[^"]*">/g, '').replace(/<span[^>]*>/g, '').replace(/<\/span>/g, '');
        }
      }
    }
    if (item && item.children) {
      cleanFilesObject(item.children);
    }
  }
}

function loadFromStorage() {
  const savedFiles = localStorage.getItem('mc_files');
  const savedExt = localStorage.getItem('mc_extensions');
  const savedUser = localStorage.getItem('mc_user');
  const savedAI = localStorage.getItem('mc_ai_settings');
  
  if (savedFiles) {
    try {
      const parsed = JSON.parse(savedFiles);
      cleanFilesObject(parsed);
      state.files = parsed;
    } catch (e) {
      state.files = JSON.parse(JSON.stringify(defaultFiles));
    }
  } else {
    state.files = JSON.parse(JSON.stringify(defaultFiles));
  }
  
  state.extensions = savedExt ? JSON.parse(savedExt) : JSON.parse(JSON.stringify(extensionsData));
  if (savedUser) state.currentUser = JSON.parse(savedUser);
  if (savedAI) {
    const ai = JSON.parse(savedAI);
    state.aiModel = ai.model || 'gpt4o';
    state.aiApiKey = ai.apiKey || '';
    state.aiLanguage = ai.language || 'id';
    state.aiTemp = ai.temp || 0.7;
  }
}

function saveToStorage() {
  localStorage.setItem('mc_files', JSON.stringify(state.files));
  localStorage.setItem('mc_extensions', JSON.stringify(state.extensions));
  if (state.currentUser) localStorage.setItem('mc_user', JSON.stringify(state.currentUser));
}

function initApp() {
  document.getElementById('splash-screen').style.display = 'none';
  document.getElementById('app').classList.remove('hidden');
  
  if (!state.currentUser) {
    openModal('auth-modal');
  }
  
  renderFileTree();
  renderExtensionsSidebar();
  renderResolutionGrid();
  openFile('index.html');
  updateUserUI();
  initResizeHandle();
  initEditorSync();
}

// ===== AUTH =====
function loginWith(provider) {
  const names = { Google: 'Pengguna Google', GitHub: 'GitHub User', Microsoft: 'MS User', GitLab: 'GitLab User' };
  const avatars = { Google: '🔵', GitHub: '⚫', Microsoft: '🟦', GitLab: '🟠' };
  state.currentUser = {
    name: names[provider] || provider,
    email: `user@${provider.toLowerCase()}.com`,
    avatar: avatars[provider] || '👤',
    provider
  };
  localStorage.setItem('mc_user', JSON.stringify(state.currentUser));
  updateUserUI();
  closeModal('auth-modal');
  showNotification(`✅ Berhasil masuk dengan ${provider}!`, 'success');
}

function loginWithEmail() {
  const email = document.getElementById('auth-email').value;
  const pass = document.getElementById('auth-password').value;
  if (!email || !pass) { showNotification('Isi email dan kata sandi!', 'error'); return; }
  state.currentUser = { name: email.split('@')[0], email, avatar: '📧', provider: 'Email' };
  localStorage.setItem('mc_user', JSON.stringify(state.currentUser));
  updateUserUI();
  closeModal('auth-modal');
  showNotification('✅ Berhasil masuk!', 'success');
}

function skipAuth() {
  state.currentUser = { name: 'Guest User', email: 'Tidak login', avatar: '👤', provider: 'Guest', isGuest: true };
  closeModal('auth-modal');
}

function logout() {
  state.currentUser = null;
  localStorage.removeItem('mc_user');
  updateUserUI();
  closeUserMenu();
  showNotification('Berhasil keluar.', 'success');
  setTimeout(() => openModal('auth-modal'), 500);
}

function updateUserUI() {
  const u = state.currentUser;
  const avatar = document.getElementById('user-avatar');
  const menuAvatar = document.getElementById('menu-avatar');
  const menuName = document.getElementById('menu-username');
  const menuEmail = document.getElementById('menu-email');
  const logoutBtn = document.getElementById('logout-btn');
  
  if (u) {
    const av = u.avatar || '👤';
    avatar.textContent = av;
    menuAvatar.textContent = av;
    menuName.textContent = u.name;
    menuEmail.textContent = u.email;
    logoutBtn.style.display = u.isGuest ? 'none' : 'flex';
  }
}

// ===== MODAL MANAGEMENT =====
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) { modal.classList.remove('hidden'); }
  if (id === 'extensions-modal') renderExtensions('marketplace');
  if (id === 'ai-settings-modal') loadAISettings();
  if (id === 'preview-settings-modal') loadPreviewSettings();
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('hidden');
}

// ===== FILE TREE =====
function renderFileTree() {
  const tree = document.getElementById('file-tree');
  tree.innerHTML = '';
  
  const projectRoot = document.createElement('div');
  projectRoot.className = 'tree-item';
  projectRoot.style.paddingLeft = '8px';
  projectRoot.innerHTML = `<span class="tree-chevron open">▶</span><span class="tree-icon">📂</span><span class="tree-label" style="font-weight:600;color:var(--text-primary)">PROYEK SAYA</span>`;
  tree.appendChild(projectRoot);
  
  const rootChildren = document.createElement('div');
  rootChildren.className = 'tree-folder-children open';
  renderTreeChildren(state.files, rootChildren, 1);
  tree.appendChild(rootChildren);
  
  projectRoot.addEventListener('click', () => {
    const chevron = projectRoot.querySelector('.tree-chevron');
    const open = rootChildren.classList.toggle('open');
    chevron.classList.toggle('open', open);
  });
}

function renderTreeChildren(files, container, depth) {
  const indent = depth * 16;
  const folders = [], filesList = [];
  
  for (const [name, data] of Object.entries(files)) {
    if (data.isFolder) folders.push([name, data]);
    else filesList.push([name, data]);
  }
  
  [...folders, ...filesList].forEach(([name, data]) => {
    if (data.isFolder) {
      const folderEl = document.createElement('div');
      folderEl.innerHTML = `
        <div class="tree-item" style="padding-left:${indent}px" data-folder="${name}">
          <span class="tree-chevron">▶</span>
          <span class="tree-icon">📁</span>
          <span class="tree-label">${name}</span>
        </div>
        <div class="tree-folder-children" id="folder-${name.replace(/[^a-z0-9]/gi, '_')}"></div>
      `;
      container.appendChild(folderEl);
      
      const childrenEl = folderEl.querySelector('.tree-folder-children');
      renderTreeChildren(data.children || {}, childrenEl, depth + 1);
      
      const folderItem = folderEl.querySelector('.tree-item');
      folderItem.addEventListener('click', () => {
        const open = childrenEl.classList.toggle('open');
        const chevron = folderItem.querySelector('.tree-chevron');
        chevron.classList.toggle('open', open);
        const icon = folderItem.querySelector('.tree-icon');
        icon.textContent = open ? '📂' : '📁';
      });
    } else {
      const ext = name.split('.').pop().toLowerCase();
      const icon = langIcons[ext] || '📄';
      const fileEl = document.createElement('div');
      fileEl.className = `tree-item${state.activeFile === name ? ' active' : ''}`;
      fileEl.style.paddingLeft = `${indent}px`;
      fileEl.innerHTML = `<span class="tree-icon">${icon}</span><span class="tree-label">${name}</span>${data.modified ? '<span style="color:var(--accent-warning);font-size:10px;">●</span>' : ''}`;
      fileEl.addEventListener('click', () => openFile(name));
      container.appendChild(fileEl);
    }
  });
}

// ===== FILE OPERATIONS =====
function openFile(name) {
  const file = findFile(name, state.files);
  if (!file || file.isFolder) return;
  
  state.activeFile = name;
  
  if (!state.openTabs.includes(name)) {
    state.openTabs.push(name);
  }
  
  const editor = document.getElementById('code-editor');
  editor.value = file.content;
  
  document.getElementById('active-filename').textContent = name;
  document.getElementById('file-modified-dot').style.display = file.modified ? 'inline' : 'none';
  
  const ext = name.split('.').pop().toLowerCase();
  document.getElementById('status-lang').textContent = langNames[ext] || ext.toUpperCase();
  
  renderTabs();
  renderFileTree();
  updateHighlight();
  updateLineNumbers();
  updateBreadcrumbs();
  updateActiveLineHighlight();
  updateActiveIndentGuide();
  
  if (name === 'index.html' || name.endsWith('.html')) {
    updatePreview();
  }
}

function findFile(name, files) {
  if (files[name]) return files[name];
  for (const [, data] of Object.entries(files)) {
    if (data.isFolder && data.children) {
      const found = findFile(name, data.children);
      if (found) return found;
    }
  }
  return null;
}

function findAndUpdateFile(name, newContent, files) {
  if (files[name]) {
    files[name].content = newContent;
    files[name].modified = true;
    return true;
  }
  for (const [, data] of Object.entries(files)) {
    if (data.isFolder && data.children) {
      if (findAndUpdateFile(name, newContent, data.children)) return true;
    }
  }
  return false;
}

function getFileBadgeHtml(fileName) {
  const ext = fileName.split('.').pop().toLowerCase();
  if (ext === 'html') return '<span class="vscode-tab-icon html-icon">5</span>';
  if (ext === 'css') return '<span class="vscode-tab-icon css-icon">#</span>';
  if (['js', 'jsx'].includes(ext)) return '<span class="vscode-tab-icon js-icon">JS</span>';
  if (['ts', 'tsx'].includes(ext)) return '<span class="vscode-tab-icon js-icon" style="background:#3178c6;color:#fff;">TS</span>';
  if (ext === 'json') return '<span class="vscode-tab-icon json-icon">{}</span>';
  if (ext === 'md') return '<span class="vscode-tab-icon md-icon">M↓</span>';
  return '<span class="vscode-tab-icon generic-icon">📄</span>';
}

function renderTabs() {
  const bar = document.getElementById('editor-tabs-bar');
  if (!bar) return;
  bar.innerHTML = '';
  
  state.openTabs.forEach(name => {
    const file = findFile(name, state.files);
    if (!file) return;
    const badge = getFileBadgeHtml(name);
    const tab = document.createElement('div');
    const isActive = state.activeFile === name;
    tab.className = `editor-tab${isActive ? ' active' : ''}`;
    
    let extraBadge = '';
    if (name === 'style.css') {
      extraBadge = `<span class="tab-modified-badge" title="2 rules">2</span>`;
    } else if (file.modified) {
      extraBadge = `<span class="tab-modified-badge" title="Modified">●</span>`;
    }
    
    tab.innerHTML = `${badge} <span>${name}</span>${extraBadge}<span class="tab-close" onclick="closeTab(event,'${name}')" title="Tutup">✕</span>`;
    tab.addEventListener('click', () => openFile(name));
    bar.appendChild(tab);
  });
}

function closeTab(e, name) {
  e.stopPropagation();
  state.openTabs = state.openTabs.filter(t => t !== name);
  if (state.activeFile === name) {
    state.activeFile = state.openTabs[state.openTabs.length - 1] || null;
    if (state.activeFile) openFile(state.activeFile);
    else document.getElementById('code-editor').value = '';
  }
  renderTabs();
}

// ===== NEW FILE/FOLDER =====
function createNewItem() {
  const name = document.getElementById('new-item-name').value.trim();
  const type = document.getElementById('new-item-type').value;
  if (!name) { showNotification('Masukkan nama!', 'error'); return; }
  
  if (type === 'folder') {
    state.files[name] = { isFolder: true, children: {} };
  } else {
    const ext = name.split('.').pop().toLowerCase();
    const icon = langIcons[ext] || '📄';
    state.files[name] = { content: `<!-- ${name} -->\n`, language: ext, modified: false, icon };
  }
  
  saveToStorage();
  renderFileTree();
  closeModal('new-file-modal');
  if (type === 'file') openFile(name);
  showNotification(`✅ ${type === 'folder' ? 'Folder' : 'File'} "${name}" dibuat!`, 'success');
  document.getElementById('new-item-name').value = '';
}

function collapseAll() {
  document.querySelectorAll('.tree-folder-children').forEach(el => el.classList.remove('open'));
  document.querySelectorAll('.tree-chevron').forEach(el => el.classList.remove('open'));
}

// ===== EDITOR LOGIC =====
function onEditorInput() {
  const editor = document.getElementById('code-editor');
  const content = editor.value;
  
  if (state.activeFile) {
    findAndUpdateFile(state.activeFile, content, state.files);
    document.getElementById('file-modified-dot').style.display = 'inline';
    saveToStorage();
  }
  
  updateHighlight();
  updateLineNumbers();
  updateCursorStatus();
  updateActiveLineHighlight();
  updateBreadcrumbs();
  updateActiveIndentGuide();
  
  if (state.autoRefresh) {
    clearTimeout(state._refreshTimer);
    state._refreshTimer = setTimeout(updatePreview, 800);
  }
}

function handleEditorKeydown(e) {
  const editor = e.target;
  
  if (e.key === 'Tab') {
    e.preventDefault();
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    editor.value = editor.value.substring(0, start) + '  ' + editor.value.substring(end);
    editor.selectionStart = editor.selectionEnd = start + 2;
    onEditorInput();
  }
  
  if (e.key === 'Enter') {
    const start = editor.selectionStart;
    const textBefore = editor.value.substring(0, start);
    const lastLine = textBefore.split('\n').pop();
    const indent = lastLine.match(/^(\s*)/)[1];
    
    const charBefore = textBefore.trim().slice(-1);
    let extra = '';
    if (['{', '[', '('].includes(charBefore)) extra = '  ';
    
    if (indent || extra) {
      e.preventDefault();
      const ins = '\n' + indent + extra;
      editor.value = editor.value.substring(0, start) + ins + editor.value.substring(editor.selectionEnd);
      editor.selectionStart = editor.selectionEnd = start + ins.length;
      onEditorInput();
    }
  }
  
  // Auto-close brackets
  const pairs = { '(': ')', '[': ']', '{': '}', '"': '"', "'": "'" };
  if (pairs[e.key] && !e.ctrlKey && !e.metaKey) {
    const sel = editor.selectionStart;
    if (editor.selectionStart === editor.selectionEnd) {
      e.preventDefault();
      const before = editor.value.substring(0, sel);
      const after = editor.value.substring(editor.selectionEnd);
      editor.value = before + e.key + pairs[e.key] + after;
      editor.selectionStart = editor.selectionEnd = sel + 1;
      onEditorInput();
    }
  }
  
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault();
    saveFile();
  }
  
  if ((e.ctrlKey || e.metaKey) && e.key === '/') {
    e.preventDefault();
    toggleComment();
  }
}

function saveFile() {
  if (!state.activeFile) return;
  const file = findFile(state.activeFile, state.files);
  if (file) {
    file.modified = false;
    document.getElementById('file-modified-dot').style.display = 'none';
    saveToStorage();
    renderFileTree();
    showNotification('💾 File tersimpan!', 'success');
  }
}

function toggleComment() {
  const editor = document.getElementById('code-editor');
  const start = editor.selectionStart;
  const textBefore = editor.value.substring(0, start);
  const lineStart = textBefore.lastIndexOf('\n') + 1;
  const lineEnd = editor.value.indexOf('\n', start);
  const line = editor.value.substring(lineStart, lineEnd === -1 ? editor.value.length : lineEnd);
  
  const ext = state.activeFile?.split('.').pop().toLowerCase();
  let prefix = '// ';
  if (ext === 'html') prefix = '<!-- ';
  if (ext === 'css') prefix = '/* ';
  
  const commented = line.trimStart().startsWith(prefix.trim());
  const newLine = commented
    ? line.replace(prefix.trim(), '').replace(' -->', '').replace(' */', '')
    : prefix + line;
  
  const newVal = editor.value.substring(0, lineStart) + newLine + editor.value.substring(lineEnd === -1 ? editor.value.length : lineEnd);
  editor.value = newVal;
  onEditorInput();
}

function updateCursorStatus() {
  const editor = document.getElementById('code-editor');
  if (!editor) return;
  const pos = editor.selectionStart || 0;
  const textBefore = editor.value.substring(0, pos);
  const lines = textBefore.split('\n');
  const line = lines.length;
  const col = lines[lines.length - 1].length + 1;
  const statusEl = document.getElementById('status-cursor');
  if (statusEl) statusEl.textContent = `Ln ${line}, Col ${col}`;
}

function updateActiveLineHighlight() {
  const editor = document.getElementById('code-editor');
  const highlightBar = document.getElementById('active-line-highlight');
  if (!editor || !highlightBar) return;
  
  const pos = editor.selectionStart || 0;
  const textBefore = editor.value.substring(0, pos);
  const lineIndex = textBefore.split('\n').length - 1; // 0-based
  
  // padding-top: 10px, line-height: 21px
  const topPos = 10 + lineIndex * 21 - editor.scrollTop;
  highlightBar.style.top = `${topPos}px`;
  
  // Highlight active line number in gutter
  const lineNums = document.querySelectorAll('.line-numbers .line-num');
  lineNums.forEach((el, idx) => {
    if (idx === lineIndex) el.classList.add('active');
    else el.classList.remove('active');
  });
}

function updateBreadcrumbs() {
  const container = document.getElementById('editor-breadcrumbs');
  if (!container) return;
  
  const activeFileName = state.activeFile || 'index.html';
  const ext = activeFileName.split('.').pop().toLowerCase();
  const fileBadge = getFileBadgeHtml(activeFileName);
  
  const editor = document.getElementById('code-editor');
  if (!editor) {
    container.innerHTML = `<span class="bc-item">${fileBadge} ${activeFileName}</span>`;
    return;
  }
  
  const pos = editor.selectionStart || 0;
  const content = editor.value || '';
  
  const crumbs = [];
  crumbs.push({ label: activeFileName, icon: fileBadge });
  
  if (ext === 'html') {
    const textBefore = content.substring(0, pos);
    const tagStack = [];
    const tagRegex = /<\/?([a-zA-Z0-9-]+)([^>]*)>/g;
    const voidTags = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
    let m;
    while ((m = tagRegex.exec(textBefore)) !== null) {
      const full = m[0];
      const tag = m[1].toLowerCase();
      const attrs = m[2] || '';
      
      if (voidTags.has(tag) || full.endsWith('/>')) continue;
      
      if (full.startsWith('</')) {
        for (let j = tagStack.length - 1; j >= 0; j--) {
          if (tagStack[j].tag === tag) {
            tagStack.splice(j, 1);
            break;
          }
        }
      } else {
        let display = tag;
        const idMatch = attrs.match(/id=["']([^"']+)["']/);
        const classMatch = attrs.match(/class=["']([^"']+)["']/);
        if (idMatch) display += '#' + idMatch[1];
        if (classMatch) {
          const firstClass = classMatch[1].trim().split(/\s+/)[0];
          if (firstClass) display += '.' + firstClass;
        }
        tagStack.push({ tag, display });
      }
    }
    
    tagStack.forEach(t => {
      crumbs.push({ label: t.display, icon: '<span class="bc-tag-icon">&lt;&gt;</span>' });
    });
  } else if (ext === 'css') {
    const textBefore = content.substring(0, pos);
    const lastOpen = textBefore.lastIndexOf('{');
    const lastClose = textBefore.lastIndexOf('}');
    if (lastOpen > lastClose) {
      const sel = textBefore.substring(lastClose + 1, lastOpen).trim().split('\n').pop().trim();
      if (sel) crumbs.push({ label: sel, icon: '<span class="bc-tag-icon">#</span>' });
    }
  } else if (['js', 'jsx', 'ts', 'tsx'].includes(ext)) {
    const textBefore = content.substring(0, pos);
    const matches = textBefore.match(/(?:function\s+([a-zA-Z0-9_$]+)|class\s+([a-zA-Z0-9_$]+))/g);
    if (matches && matches.length) {
      const last = matches[matches.length - 1];
      crumbs.push({ label: last, icon: '<span class="bc-tag-icon">⚡</span>' });
    }
  }
  
  let html = '';
  crumbs.forEach((c, idx) => {
    if (idx > 0) html += `<span class="bc-sep">›</span>`;
    html += `<span class="bc-item">${c.icon ? c.icon + ' ' : ''}${c.label}</span>`;
  });
  
  container.innerHTML = html;
}

function onEditorCursorMove() {
  updateCursorStatus();
  updateActiveLineHighlight();
  updateBreadcrumbs();
  updateActiveIndentGuide();
}

function updateActiveIndentGuide() {
  const editor = document.getElementById('code-editor');
  if (!editor) return;
  const pos = editor.selectionStart || 0;
  const textBefore = editor.value.substring(0, pos);
  const currentLineText = textBefore.split('\n').pop() || '';
  const match = currentLineText.match(/^( +)/);
  const currentLevel = match ? Math.floor(match[1].length / 2) : 0;
  
  const guides = document.querySelectorAll('.hl-indent-guide');
  guides.forEach(el => {
    const lvl = parseInt(el.getAttribute('data-level'), 10);
    if (lvl === currentLevel && currentLevel > 0) {
      el.classList.add('active-guide');
    } else {
      el.classList.remove('active-guide');
    }
  });
}

function detectIndentSize(code) {
  const lines = code.split('\n');
  let minIndent = 0;
  for (const line of lines) {
    const match = line.match(/^( +)/);
    if (match) {
      const len = match[1].length;
      if (len > 0) {
        if (minIndent === 0 || len < minIndent) {
          minIndent = len;
        }
      }
    }
  }
  return minIndent >= 2 ? minIndent : 2;
}

function addIndentGuides(html, rawCode) {
  if (!html) return html;
  
  const indentSize = detectIndentSize(rawCode || '');
  const lines = html.split('\n');
  const rawLines = (rawCode || '').split('\n');
  
  const editor = document.getElementById('code-editor');
  let activeIndentLevel = 0;
  if (editor) {
    const pos = editor.selectionStart || 0;
    const textBefore = editor.value.substring(0, pos);
    const activeLineText = textBefore.split('\n').pop() || '';
    const activeMatch = activeLineText.match(/^( +)/);
    if (activeMatch) {
      activeIndentLevel = Math.floor(activeMatch[1].length / indentSize);
    }
  }

  // Calculate indent level for each raw line
  const levels = [];
  for (let i = 0; i < rawLines.length; i++) {
    const rLine = rawLines[i];
    if (rLine.trim().length > 0) {
      if (rLine.startsWith('\t')) {
        const tabs = rLine.match(/^\t+/)[0].length;
        levels.push(tabs);
      } else {
        const spaces = (rLine.match(/^ +/) || [''])[0].length;
        levels.push(Math.floor(spaces / indentSize));
      }
    } else {
      levels.push(-1); // Empty line
    }
  }

  // Fill in empty line levels between indented blocks
  for (let i = 0; i < levels.length; i++) {
    if (levels[i] === -1) {
      let prev = 0;
      for (let p = i - 1; p >= 0; p--) {
        if (levels[p] !== -1) { prev = levels[p]; break; }
      }
      let next = 0;
      for (let n = i + 1; n < levels.length; n++) {
        if (levels[n] !== -1) { next = levels[n]; break; }
      }
      levels[i] = Math.min(prev, next);
    }
  }

  // Inject guide spans
  const result = lines.map((line, idx) => {
    const lvl = levels[idx] || 0;
    const rLine = rawLines[idx] || '';

    // Handle tab indent
    if (rLine.startsWith('\t')) {
      const tabMatch = rLine.match(/^\t+/);
      const tabCount = tabMatch ? tabMatch[0].length : 0;
      const rest = line.substring(tabCount);
      let guides = '';
      for (let g = 1; g <= tabCount; g++) {
        const isActive = g === activeIndentLevel;
        guides += `<span class="hl-indent-guide${isActive ? ' active-guide' : ''}" data-level="${g}">\t</span>`;
      }
      return guides + rest;
    }

    // Handle space indent
    const spaceMatch = line.match(/^( +)/);
    if (spaceMatch) {
      const leadingSpaces = spaceMatch[1];
      const rest = line.substring(leadingSpaces.length);
      const totalSpaces = leadingSpaces.length;
      let guides = '';
      let remaining = totalSpaces;
      let guideLevel = 1;
      
      while (remaining >= indentSize) {
        const isActive = guideLevel === activeIndentLevel;
        guides += `<span class="hl-indent-guide${isActive ? ' active-guide' : ''}" data-level="${guideLevel}">${' '.repeat(indentSize)}</span>`;
        remaining -= indentSize;
        guideLevel++;
      }
      if (remaining > 0) {
        guides += ' '.repeat(remaining);
      }
      return guides + rest;
    } else if (line.trim().length === 0 && lvl > 0) {
      let guides = '';
      for (let g = 1; g <= lvl; g++) {
        const isActive = g === activeIndentLevel;
        guides += `<span class="hl-indent-guide${isActive ? ' active-guide' : ''}" data-level="${g}">${' '.repeat(indentSize)}</span>`;
      }
      return guides;
    }

    return line;
  });

  return result.join('\n');
}

// ===== SYNTAX HIGHLIGHTING (TRUE CHARACTER-BY-CHARACTER TOKENIZERS) =====
function updateHighlight() {
  const editor = document.getElementById('code-editor');
  const highlightEl = document.getElementById('highlight-code');
  if (!editor || !highlightEl) return;
  
  const content = editor.value;
  const ext = state.activeFile?.split('.').pop().toLowerCase() || 'html';
  
  let html = '';
  if (ext === 'html') {
    html = highlightHTML(content);
  } else if (ext === 'css') {
    html = highlightCSS(content);
  } else if (['js', 'jsx', 'ts', 'tsx'].includes(ext)) {
    html = highlightJS(content);
  } else if (ext === 'json') {
    html = highlightJSON(content);
  } else {
    html = escapeHtml(content);
  }
  
  highlightEl.innerHTML = addIndentGuides(html, content) + '\n';
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function highlightHTML(code) {
  let out = '';
  let i = 0;
  const len = code.length;

  while (i < len) {
    // 1. Comment <!-- ... -->
    if (code.startsWith('<!--', i)) {
      const end = code.indexOf('-->', i + 4);
      if (end === -1) {
        out += `<span class="hl-comment">${escapeHtml(code.substring(i))}</span>`;
        break;
      } else {
        out += `<span class="hl-comment">${escapeHtml(code.substring(i, end + 3))}</span>`;
        i = end + 3;
        continue;
      }
    }

    // 2. DOCTYPE <!DOCTYPE ... >
    if (code.startsWith('<!', i)) {
      const end = code.indexOf('>', i + 2);
      if (end === -1) {
        out += `<span class="hl-doctype">${escapeHtml(code.substring(i))}</span>`;
        break;
      } else {
        out += `<span class="hl-doctype">${escapeHtml(code.substring(i, end + 1))}</span>`;
        i = end + 1;
        continue;
      }
    }

    // 3. Tags: <tag ...> or </tag>
    if (code[i] === '<') {
      let isClosing = false;
      i++; // skip '<'
      if (i < len && code[i] === '/') {
        isClosing = true;
        i++; // skip '/'
      }
      
      const nameStart = i;
      while (i < len && /[a-zA-Z0-9-]/.test(code[i])) {
        i++;
      }
      const tagName = code.substring(nameStart, i);
      
      out += `<span class="hl-tag">&lt;${isClosing ? '/' : ''}</span>`;
      if (tagName) {
        out += `<span class="hl-tagname">${escapeHtml(tagName)}</span>`;
      }

      while (i < len && code[i] !== '>') {
        if (code[i] === '/' && i + 1 < len && code[i + 1] === '>') {
          out += `<span class="hl-tag">/&gt;</span>`;
          i += 2;
          break;
        }

        if (/\s/.test(code[i])) {
          out += code[i];
          i++;
          continue;
        }

        if (/[a-zA-Z0-9-:@#._]/.test(code[i])) {
          const attrStart = i;
          while (i < len && /[a-zA-Z0-9-:@#._]/.test(code[i])) {
            i++;
          }
          const attrName = code.substring(attrStart, i);
          out += `<span class="hl-attr">${escapeHtml(attrName)}</span>`;

          while (i < len && /\s/.test(code[i])) {
            out += code[i];
            i++;
          }

          if (i < len && code[i] === '=') {
            out += `<span class="hl-operator">=</span>`;
            i++;

            while (i < len && /\s/.test(code[i])) {
              out += code[i];
              i++;
            }

            if (i < len && (code[i] === '"' || code[i] === "'")) {
              const quote = code[i];
              const valStart = i;
              i++;
              while (i < len && code[i] !== quote) {
                if (code[i] === '\\' && i + 1 < len) i++;
                i++;
              }
              if (i < len) i++;
              const attrVal = code.substring(valStart, i);
              out += `<span class="hl-value">${escapeHtml(attrVal)}</span>`;
            } else if (i < len && !/\s|>/.test(code[i])) {
              const valStart = i;
              while (i < len && !/\s|>/.test(code[i])) {
                i++;
              }
              const attrVal = code.substring(valStart, i);
              out += `<span class="hl-value">${escapeHtml(attrVal)}</span>`;
            }
          }
          continue;
        }

        out += escapeHtml(code[i]);
        i++;
      }

      if (i < len && code[i] === '>') {
        out += `<span class="hl-tag">&gt;</span>`;
        i++;
      }
      continue;
    }

    // 4. Regular text outside tags
    const nextTag = code.indexOf('<', i);
    if (nextTag === -1) {
      out += escapeHtml(code.substring(i));
      break;
    } else {
      out += escapeHtml(code.substring(i, nextTag));
      i = nextTag;
    }
  }

  return out;
}

function highlightCSS(code) {
  let out = '';
  let i = 0;
  const len = code.length;
  let inBlock = false;

  while (i < len) {
    if (code.startsWith('/*', i)) {
      const end = code.indexOf('*/', i + 2);
      if (end === -1) {
        out += `<span class="hl-comment">${escapeHtml(code.substring(i))}</span>`;
        break;
      } else {
        out += `<span class="hl-comment">${escapeHtml(code.substring(i, end + 2))}</span>`;
        i = end + 2;
        continue;
      }
    }

    if (code[i] === '"' || code[i] === "'") {
      const quote = code[i];
      let j = i + 1;
      while (j < len && code[j] !== quote) {
        if (code[j] === '\\' && j + 1 < len) j++;
        j++;
      }
      if (j < len) j++;
      out += `<span class="hl-string">${escapeHtml(code.substring(i, j))}</span>`;
      i = j;
      continue;
    }

    if (code[i] === '{') {
      inBlock = true;
      out += `<span class="hl-bracket">{</span>`;
      i++;
      continue;
    }
    if (code[i] === '}') {
      inBlock = false;
      out += `<span class="hl-bracket">}</span>`;
      i++;
      continue;
    }

    if (code[i] === '@') {
      const start = i;
      while (i < len && /[a-zA-Z0-9-]/.test(code[i])) i++;
      out += `<span class="hl-css-at">${escapeHtml(code.substring(start, i))}</span>`;
      continue;
    }

    if (inBlock) {
      if (/[a-zA-Z-]/.test(code[i])) {
        const start = i;
        while (i < len && /[a-zA-Z0-9-]/.test(code[i])) i++;
        const word = code.substring(start, i);

        let k = i;
        while (k < len && /\s/.test(code[k])) k++;
        if (k < len && code[k] === ':') {
          out += `<span class="hl-css-prop">${escapeHtml(word)}</span>`;
        } else {
          out += `<span class="hl-css-val">${escapeHtml(word)}</span>`;
        }
        continue;
      }

      if (/[0-9]/.test(code[i]) || (code[i] === '.' && i + 1 < len && /[0-9]/.test(code[i + 1]))) {
        const start = i;
        while (i < len && /[0-9.a-zA-Z%]/.test(code[i])) i++;
        out += `<span class="hl-number">${escapeHtml(code.substring(start, i))}</span>`;
        continue;
      }

      if (code[i] === '#' && i + 1 < len && /[0-9a-fA-F]/.test(code[i + 1])) {
        const start = i;
        i++;
        while (i < len && /[0-9a-fA-F]/.test(code[i])) i++;
        out += `<span class="hl-css-val">${escapeHtml(code.substring(start, i))}</span>`;
        continue;
      }

      if (code[i] === ':' || code[i] === ';') {
        out += `<span class="hl-operator">${code[i]}</span>`;
        i++;
        continue;
      }
    } else {
      if (code[i] === '.' || code[i] === '#') {
        const start = i;
        i++;
        while (i < len && /[a-zA-Z0-9_-]/.test(code[i])) i++;
        out += `<span class="hl-css-sel">${escapeHtml(code.substring(start, i))}</span>`;
        continue;
      }
      if (/[a-zA-Z*]/.test(code[i])) {
        const start = i;
        while (i < len && /[a-zA-Z0-9_-]/.test(code[i])) i++;
        out += `<span class="hl-tagname">${escapeHtml(code.substring(start, i))}</span>`;
        continue;
      }
    }

    out += escapeHtml(code[i]);
    i++;
  }

  return out;
}

function highlightJS(code) {
  let out = '';
  let i = 0;
  const len = code.length;

  const keywords = new Set([
    'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while',
    'class', 'import', 'export', 'default', 'from', 'new', 'this', 'typeof',
    'instanceof', 'async', 'await', 'try', 'catch', 'throw', 'switch', 'case',
    'break', 'continue', 'extends', 'super', 'yield', 'delete', 'in', 'of'
  ]);
  const builtins = new Set(['true', 'false', 'null', 'undefined', 'NaN', 'Infinity']);

  while (i < len) {
    if (code.startsWith('//', i)) {
      const end = code.indexOf('\n', i + 2);
      if (end === -1) {
        out += `<span class="hl-comment">${escapeHtml(code.substring(i))}</span>`;
        break;
      } else {
        out += `<span class="hl-comment">${escapeHtml(code.substring(i, end))}</span>`;
        i = end;
        continue;
      }
    }

    if (code.startsWith('/*', i)) {
      const end = code.indexOf('*/', i + 2);
      if (end === -1) {
        out += `<span class="hl-comment">${escapeHtml(code.substring(i))}</span>`;
        break;
      } else {
        out += `<span class="hl-comment">${escapeHtml(code.substring(i, end + 2))}</span>`;
        i = end + 2;
        continue;
      }
    }

    if (code[i] === '"' || code[i] === "'" || code[i] === '`') {
      const quote = code[i];
      let j = i + 1;
      while (j < len && code[j] !== quote) {
        if (code[j] === '\\' && j + 1 < len) j++;
        j++;
      }
      if (j < len) j++;
      out += `<span class="hl-string">${escapeHtml(code.substring(i, j))}</span>`;
      i = j;
      continue;
    }

    if (/[0-9]/.test(code[i]) || (code[i] === '.' && i + 1 < len && /[0-9]/.test(code[i + 1]))) {
      const start = i;
      while (i < len && /[0-9.a-fA-FxX_]/.test(code[i])) i++;
      out += `<span class="hl-number">${escapeHtml(code.substring(start, i))}</span>`;
      continue;
    }

    if (/[a-zA-Z_$]/.test(code[i])) {
      const start = i;
      while (i < len && /[a-zA-Z0-9_$]/.test(code[i])) i++;
      const word = code.substring(start, i);

      if (keywords.has(word)) {
        out += `<span class="hl-keyword">${word}</span>`;
      } else if (builtins.has(word)) {
        out += `<span class="hl-builtin">${word}</span>`;
      } else {
        let k = i;
        while (k < len && /\s/.test(code[k])) k++;
        if (k < len && code[k] === '(') {
          out += `<span class="hl-function">${escapeHtml(word)}</span>`;
        } else {
          out += `<span class="hl-variable">${escapeHtml(word)}</span>`;
        }
      }
      continue;
    }

    if (/[=+\-*/%&|^!~?:<>]/.test(code[i])) {
      out += `<span class="hl-operator">${escapeHtml(code[i])}</span>`;
      i++;
      continue;
    }

    if (/[{}()[\]]/.test(code[i])) {
      out += `<span class="hl-bracket">${code[i]}</span>`;
      i++;
      continue;
    }

    out += escapeHtml(code[i]);
    i++;
  }

  return out;
}

function highlightJSON(code) {
  let out = '';
  let i = 0;
  const len = code.length;

  while (i < len) {
    if (code[i] === '"') {
      let j = i + 1;
      while (j < len && code[j] !== '"') {
        if (code[j] === '\\' && j + 1 < len) j++;
        j++;
      }
      if (j < len) j++;
      const str = code.substring(i, j);
      let k = j;
      while (k < len && /\s/.test(code[k])) k++;
      if (k < len && code[k] === ':') {
        out += `<span class="hl-attr">${escapeHtml(str)}</span>`;
      } else {
        out += `<span class="hl-value">${escapeHtml(str)}</span>`;
      }
      i = j;
      continue;
    }
    if (/[0-9-]/.test(code[i])) {
      const start = i;
      while (i < len && /[0-9.eE+-]/.test(code[i])) i++;
      out += `<span class="hl-number">${escapeHtml(code.substring(start, i))}</span>`;
      continue;
    }
    if (code.startsWith('true', i) || code.startsWith('null', i)) {
      const w = code.startsWith('true', i) ? 'true' : 'null';
      out += `<span class="hl-builtin">${w}</span>`;
      i += w.length;
      continue;
    }
    if (code.startsWith('false', i)) {
      out += `<span class="hl-builtin">false</span>`;
      i += 5;
      continue;
    }
    if (/[{}[\]:,]/.test(code[i])) {
      out += `<span class="hl-bracket">${code[i]}</span>`;
      i++;
      continue;
    }
    out += escapeHtml(code[i]);
    i++;
  }
  return out;
}

// ===== LINE NUMBERS & EDITOR SYNC =====
function updateLineNumbers() {
  const editor = document.getElementById('code-editor');
  const numsEl = document.getElementById('line-numbers');
  if (!editor || !numsEl) return;
  
  const text = editor.value;
  const lineCount = text.split('\n').length;
  const pos = editor.selectionStart || 0;
  const currentLine = text.substring(0, pos).split('\n').length;
  
  let html = '';
  for (let i = 1; i <= lineCount; i++) {
    const isActive = i === currentLine;
    html += `<div class="line-num${isActive ? ' active' : ''}" data-line="${i}">${i}</div>`;
  }
  numsEl.innerHTML = html;
}

function syncScroll(editor) {
  const highlight = document.getElementById('code-highlight');
  const lineNums = document.getElementById('line-numbers');
  if (highlight) {
    highlight.scrollTop = editor.scrollTop;
    highlight.scrollLeft = editor.scrollLeft;
  }
  if (lineNums) {
    lineNums.scrollTop = editor.scrollTop;
  }
  updateActiveLineHighlight();
}

function initEditorSync() {
  const editor = document.getElementById('code-editor');
  if (!editor) return;
  editor.addEventListener('click', onEditorCursorMove);
  editor.addEventListener('keyup', onEditorCursorMove);
  editor.addEventListener('select', onEditorCursorMove);
  updateLineNumbers();
  updateBreadcrumbs();
  updateActiveLineHighlight();
  updateActiveIndentGuide();
}

// ===== LIVE PREVIEW =====
function updatePreview() {
  const iframe = document.getElementById('preview-iframe');
  const htmlFile = findFile('index.html', state.files);
  if (!htmlFile) return;
  
  let html = htmlFile.content;
  const cssFile = findFile('style.css', state.files);
  const jsFile = findFile('app.js', state.files);
  
  // Inject CSS and JS inline
  if (cssFile) {
    html = html.replace(/<link[^>]*href=["']style\.css["'][^>]*>/gi, `<style>${cssFile.content}</style>`);
  }
  if (jsFile) {
    html = html.replace(/<script[^>]*src=["']app\.js["'][^>]*><\/script>/gi, `<script>${jsFile.content}<\/script>`);
  }
  
  // If current file is HTML, use it
  if (state.activeFile && state.activeFile.endsWith('.html')) {
    const currFile = findFile(state.activeFile, state.files);
    if (currFile && state.activeFile !== 'index.html') {
      html = currFile.content;
    }
  }
  
  iframe.srcdoc = html;
  document.getElementById('preview-url').textContent = `live-preview://${state.activeFile || 'index.html'}`;
}

function runCode() {
  updatePreview();
  showNotification('▶ Preview diperbarui!', 'success');
}

function refreshPreview() {
  updatePreview();
  const btn = document.querySelector('.icon-btn-sm[title="Refresh"]');
  if (btn) { btn.style.transform = 'rotate(360deg)'; setTimeout(() => btn.style.transform = '', 300); }
}

function selectDevice(device, btn) {
  state.previewDevice = device;
  document.querySelectorAll('.device-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  
  const frame = document.getElementById('device-frame');
  const notch = document.getElementById('device-notch');
  const wrapper = document.getElementById('preview-wrapper');
  
  frame.className = 'device-frame ' + device;
  
  const presets = { mobile: [375, 667], tablet: [768, 1024], desktop: ['100%', '100%'], fullscreen: ['100%', '100%'] };
  const [w, h] = presets[device];
  
  if (device === 'desktop' || device === 'fullscreen') {
    frame.style.width = '100%';
    frame.style.height = '100%';
    frame.style.maxHeight = '';
    notch.style.display = 'none';
  } else {
    frame.style.width = typeof w === 'number' ? `${w}px` : w;
    frame.style.maxHeight = typeof h === 'number' ? `${h}px` : h;
    notch.style.display = device === 'mobile' ? 'block' : 'none';
  }
}

function togglePreviewFullscreen() {
  const panel = document.getElementById('preview-panel');
  const edPanel = document.getElementById('editor-panel');
  if (panel.style.flex === '1 0 100%') {
    panel.style.flex = '';
    edPanel.style.display = '';
  } else {
    panel.style.flex = '1 0 100%';
    edPanel.style.display = 'none';
  }
}

function toggleDeviceBorder() {
  const toggle = document.getElementById('device-border-toggle');
  const frame = document.getElementById('device-frame');
  state.deviceBorder = toggle.checked;
  frame.style.border = state.deviceBorder ? '' : 'none';
}

function applyZoom(val) {
  const frame = document.getElementById('device-frame');
  frame.style.transform = `scale(${val / 100})`;
  frame.style.transformOrigin = 'top center';
  document.getElementById('zoom-label').textContent = val + '%';
  state.zoom = parseInt(val);
}

// ===== RESIZE HANDLE =====
function initResizeHandle() {
  const handle = document.getElementById('preview-resize-handle');
  const previewPanel = document.getElementById('preview-panel');
  const editorPanel = document.getElementById('editor-panel');
  const container = document.getElementById('editor-preview-container');
  
  let isDragging = false, startY = 0, startPreviewH = 0;
  
  const onStart = (e) => {
    isDragging = true;
    startY = e.touches ? e.touches[0].clientY : e.clientY;
    startPreviewH = previewPanel.offsetHeight;
    document.body.style.cursor = 'ns-resize';
    document.body.style.userSelect = 'none';
  };
  
  const onMove = (e) => {
    if (!isDragging) return;
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    const delta = y - startY;
    const containerH = container.offsetHeight;
    const newH = Math.max(80, Math.min(containerH - 80, startPreviewH + delta));
    previewPanel.style.flex = `0 0 ${newH}px`;
    editorPanel.style.flex = '1';
  };
  
  const onEnd = () => { isDragging = false; document.body.style.cursor = ''; document.body.style.userSelect = ''; };
  
  handle.addEventListener('mousedown', onStart);
  handle.addEventListener('touchstart', onStart, { passive: true });
  document.addEventListener('mousemove', onMove);
  document.addEventListener('touchmove', onMove, { passive: true });
  document.addEventListener('mouseup', onEnd);
  document.addEventListener('touchend', onEnd);
}

// ===== PREVIEW SETTINGS =====
function renderResolutionGrid() {
  const grid = document.getElementById('resolution-grid');
  if (!grid) return;
  grid.innerHTML = '';
  resolutionPresets.forEach((preset, i) => {
    const item = document.createElement('div');
    item.className = `resolution-item${i === 0 ? ' active' : ''}`;
    item.innerHTML = `<div class="res-name">${preset.icon} ${preset.name}</div><div class="res-size">${preset.width}×${preset.height}</div>`;
    item.addEventListener('click', () => {
      document.querySelectorAll('.resolution-item').forEach(el => el.classList.remove('active'));
      item.classList.add('active');
      applyResolution(preset.width, preset.height);
    });
    grid.appendChild(item);
  });
}

function applyResolution(w, h) {
  const frame = document.getElementById('device-frame');
  state.previewWidth = w;
  state.previewHeight = h;
  frame.style.width = w + 'px';
  frame.style.maxHeight = h + 'px';
  showNotification(`📐 Resolusi: ${w}×${h}`, 'success');
}

function applyCustomResolution() {
  const w = parseInt(document.getElementById('custom-width').value);
  const h = parseInt(document.getElementById('custom-height').value);
  if (!w || !h) { showNotification('Masukkan lebar dan tinggi!', 'error'); return; }
  applyResolution(w, h);
}

function loadPreviewSettings() {
  document.getElementById('preview-zoom').value = state.zoom;
  document.getElementById('zoom-label').textContent = state.zoom + '%';
  renderResolutionGrid();
}

// ===== SIDEBAR =====
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  state.sidebarOpen = !state.sidebarOpen;
  sidebar.classList.toggle('collapsed', !state.sidebarOpen);
}

function switchSidebarTab(tab, btn) {
  state.activeSidebarTab = tab;
  document.querySelectorAll('.sidebar-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.sidebar-panel').forEach(p => p.classList.remove('active'));
  document.getElementById(`panel-${tab}`).classList.add('active');
  
  if (tab === 'extensions') renderExtensionsSidebar();
}

// ===== BOTTOM NAV =====
function bottomNavSelect(tab, btn) {
  document.querySelectorAll('.bottom-nav-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  
  const sidebar = document.getElementById('sidebar');
  const editorPanel = document.getElementById('editor-panel');
  const previewPanel = document.getElementById('preview-panel');
  
  if (tab === 'explorer') {
    if (!state.sidebarOpen) { state.sidebarOpen = true; sidebar.classList.remove('collapsed'); }
    else { state.sidebarOpen = false; sidebar.classList.add('collapsed'); }
  } else if (tab === 'editor') {
    editorPanel.style.display = '';
    previewPanel.style.flex = '0 0 200px';
    editorPanel.style.flex = '1';
  } else if (tab === 'preview') {
    previewPanel.style.flex = '1';
    editorPanel.style.display = 'none';
  }
}

// ===== EXTENSIONS =====
let currentExtTab = 'marketplace';

function renderExtensions(tab) {
  currentExtTab = tab;
  const list = document.getElementById('extensions-list');
  if (!list) return;
  list.innerHTML = '';
  
  const search = document.getElementById('ext-search')?.value.toLowerCase() || '';
  
  let filtered = state.extensions.filter(ext => {
    const matchSearch = !search || ext.name.toLowerCase().includes(search) || ext.desc.toLowerCase().includes(search);
    if (tab === 'marketplace') return matchSearch && !ext.installed;
    if (tab === 'installed') return matchSearch && ext.installed && !ext.disabled;
    if (tab === 'disabled') return matchSearch && ext.disabled;
    return matchSearch;
  });
  
  if (filtered.length === 0) {
    list.innerHTML = `<div style="text-align:center;padding:30px;color:var(--text-muted);">Tidak ada ekstensi ditemukan</div>`;
    return;
  }
  
  filtered.forEach(ext => {
    const card = document.createElement('div');
    card.className = `ext-card${ext.disabled ? ' disabled' : ''}`;
    card.innerHTML = `
      <div class="ext-icon">${ext.icon}</div>
      <div class="ext-info">
        <div class="ext-name">${ext.name}</div>
        <div class="ext-author">${ext.author}</div>
        <div class="ext-desc">${ext.desc}</div>
        <div class="ext-meta">
          <span class="ext-stars">${ext.stars}</span>
          <span class="ext-downloads">⬇ ${ext.downloads}</span>
        </div>
      </div>
      <div class="ext-actions">
        ${!ext.installed ? `<button class="ext-btn install" onclick="installExt('${ext.id}')">Pasang</button>` : ''}
        ${ext.installed && !ext.disabled ? `
          <button class="ext-btn disable" onclick="disableExt('${ext.id}')">Nonaktifkan</button>
          <button class="ext-btn uninstall" onclick="uninstallExt('${ext.id}')">Hapus</button>
        ` : ''}
        ${ext.disabled ? `<button class="ext-btn enable" onclick="enableExt('${ext.id}')">Aktifkan</button>` : ''}
      </div>
    `;
    list.appendChild(card);
  });
}

function switchExtTab(tab, btn) {
  document.querySelectorAll('.ext-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderExtensions(tab);
}

function filterExtensions(query) {
  renderExtensions(currentExtTab);
}

function installExt(id) {
  const ext = state.extensions.find(e => e.id === id);
  if (ext) {
    ext.installed = true;
    ext.disabled = false;
    saveToStorage();
    renderExtensions(currentExtTab);
    renderExtensionsSidebar();
    showNotification(`✅ ${ext.name} terpasang!`, 'success');
  }
}

function uninstallExt(id) {
  const ext = state.extensions.find(e => e.id === id);
  if (ext) {
    ext.installed = false;
    ext.disabled = false;
    saveToStorage();
    renderExtensions(currentExtTab);
    renderExtensionsSidebar();
    showNotification(`🗑️ ${ext.name} dihapus`, 'success');
  }
}

function disableExt(id) {
  const ext = state.extensions.find(e => e.id === id);
  if (ext) {
    ext.disabled = true;
    saveToStorage();
    renderExtensions(currentExtTab);
    renderExtensionsSidebar();
    showNotification(`⏸️ ${ext.name} dinonaktifkan`, 'success');
  }
}

function enableExt(id) {
  const ext = state.extensions.find(e => e.id === id);
  if (ext) {
    ext.disabled = false;
    saveToStorage();
    renderExtensions(currentExtTab);
    renderExtensionsSidebar();
    showNotification(`▶ ${ext.name} diaktifkan`, 'success');
  }
}

function renderExtensionsSidebar() {
  const list = document.getElementById('ext-sidebar-list');
  if (!list) return;
  list.innerHTML = '';
  
  const installed = state.extensions.filter(e => e.installed);
  if (installed.length === 0) {
    list.innerHTML = '<div style="padding:12px;color:var(--text-muted);font-size:12px;">Belum ada ekstensi terpasang</div>';
    return;
  }
  
  installed.forEach(ext => {
    const item = document.createElement('div');
    item.className = 'ext-sidebar-item';
    item.innerHTML = `
      <span class="ext-sidebar-item-icon">${ext.icon}</span>
      <span class="ext-sidebar-item-name">${ext.name}</span>
      <span class="ext-sidebar-item-status${ext.disabled ? ' disabled' : ''}"></span>
    `;
    item.addEventListener('click', () => { openModal('extensions-modal'); switchExtTab('installed', document.querySelector('.ext-tab:nth-child(2)')); });
    list.appendChild(item);
  });
}

// ===== AI ASSISTANT =====
function openAISettings() {
  closeModal('ai-modal');
  openModal('ai-settings-modal');
}

function loadAISettings() {
  document.getElementById('ai-model-select').value = state.aiModel;
  document.getElementById('ai-api-key').value = state.aiApiKey;
  document.getElementById('ai-language').value = state.aiLanguage;
  document.getElementById('ai-temperature').value = state.aiTemp;
  document.getElementById('temp-value').textContent = state.aiTemp;
  toggleCustomEndpoint(state.aiModel === 'custom');
}

function changeAIModel(val) {
  toggleCustomEndpoint(val === 'custom');
  const badge = document.querySelector('.ai-model-badge');
  if (badge) {
    const names = { gpt4o: 'GPT-4o', gpt35: 'GPT-3.5', claude3: 'Claude 3', gemini: 'Gemini', llama: 'LLaMA 3', mistral: 'Mistral', custom: 'Custom' };
    badge.textContent = names[val] || val;
  }
}

function toggleCustomEndpoint(show) {
  document.getElementById('custom-endpoint-group').style.display = show ? 'flex' : 'none';
}

function toggleApiKeyVisibility() {
  const input = document.getElementById('ai-api-key');
  input.type = input.type === 'password' ? 'text' : 'password';
}

function saveAISettings() {
  state.aiModel = document.getElementById('ai-model-select').value;
  state.aiApiKey = document.getElementById('ai-api-key').value;
  state.aiLanguage = document.getElementById('ai-language').value;
  state.aiTemp = parseFloat(document.getElementById('ai-temperature').value);
  localStorage.setItem('mc_ai_settings', JSON.stringify({ model: state.aiModel, apiKey: state.aiApiKey, language: state.aiLanguage, temp: state.aiTemp }));
  closeModal('ai-settings-modal');
  showNotification('✅ Pengaturan AI tersimpan!', 'success');
}

function handleAIKeydown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendAIMessage();
  }
}

function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 120) + 'px';
}

function sendAISuggestion(text) {
  document.getElementById('ai-input').value = text;
  sendAIMessage();
}

function sendAIMessage() {
  if (state.isAIThinking) return;
  const input = document.getElementById('ai-input');
  const msg = input.value.trim();
  if (!msg) return;
  
  input.value = '';
  input.style.height = 'auto';
  
  addChatMessage('user', msg);
  showAIThinking();
  
  // Simulate AI response
  const delay = 1000 + Math.random() * 1500;
  setTimeout(() => {
    hideAIThinking();
    const response = generateAIResponse(msg);
    addChatMessage('ai', response);
  }, delay);
}

function generateAIResponse(msg) {
  const lower = msg.toLowerCase();
  const editor = document.getElementById('code-editor');
  const code = editor.value.substring(0, 200);
  const lang = state.activeFile?.split('.').pop() || 'html';
  
  if (lower.includes('jelaskan') || lower.includes('explain')) {
    return `📖 **Penjelasan Kode** (${lang.toUpperCase()})\n\nKode yang Anda buat adalah file **${state.activeFile || 'aktif'}**. Berikut penjelasannya:\n\n• File ini berisi ${editor.value.split('\n').length} baris kode\n• Bahasa: **${lang.toUpperCase()}**\n• Kode mendefinisikan struktur/logika utama aplikasi Anda\n\nApakah ada bagian spesifik yang ingin Anda pelajari lebih lanjut?`;
  }
  
  if (lower.includes('perbaiki') || lower.includes('bug') || lower.includes('fix')) {
    return `🔧 **Analisis Bug**\n\nSaya telah memeriksa kode Anda. Beberapa saran perbaikan:\n\n1. Pastikan semua tag HTML tertutup dengan benar\n2. Periksa konsistensi indentasi (gunakan 2 spasi)\n3. Validasi semua variabel sudah dideklarasikan\n4. Pastikan tidak ada referensi circular\n\n\`\`\`${lang}\n// Kode yang diperbaiki akan muncul di sini\n// berdasarkan analisis aktual API AI Anda\n\`\`\`\n\n💡 Untuk analisis lebih akurat, tambahkan API Key di Pengaturan AI!`;
  }
  
  if (lower.includes('optimasi') || lower.includes('optimize')) {
    return `⚡ **Tips Optimasi**\n\nBeberapa cara optimasi kode ${lang.toUpperCase()}:\n\n**Performa:**\n• Minifikasi CSS dan JS untuk produksi\n• Gunakan lazy loading untuk gambar\n• Cache aset statis\n\n**Kode Bersih:**\n• Pisahkan logic ke fungsi kecil\n• Gunakan const/let bukan var\n• Tambahkan error handling\n\n**SEO:**\n• Tambahkan meta tags\n• Gunakan semantic HTML5\n• Optimalkan ukuran file`;
  }
  
  if (lower.includes('komentar') || lower.includes('comment')) {
    return `📝 **Cara Menambahkan Komentar**\n\n**HTML:**\n\`\`\`html\n<!-- Ini komentar HTML -->\n\`\`\`\n\n**CSS:**\n\`\`\`css\n/* Ini komentar CSS */\n\`\`\`\n\n**JavaScript:**\n\`\`\`js\n// Komentar satu baris\n/* Komentar\n   multi baris */\n\`\`\`\n\n💡 Tips: Gunakan **Ctrl+/** untuk toggle komentar otomatis!`;
  }
  
  const responses = [
    `🤖 Halo! Saya siap membantu Anda dengan **${state.activeFile || 'proyek'}** Anda.\n\nUntuk mendapatkan respons AI yang lebih akurat dan personal, silakan:\n1. Buka ⚙️ Pengaturan AI\n2. Pilih model AI favorit Anda\n3. Tambahkan API Key\n\nSementara itu, saya bisa membantu dengan pertanyaan umum tentang HTML, CSS, dan JavaScript!`,
    `💡 Pertanyaan bagus! Terkait "${msg}":\n\nDalam pengembangan web, ada beberapa pendekatan yang bisa Anda gunakan. Bisakah Anda memberi tahu lebih detail tentang apa yang ingin Anda capai? Saya akan memberikan solusi terbaik!`,
    `🚀 Untuk masalah "${msg}", saya sarankan:\n\n1. Periksa dokumentasi resmi\n2. Gunakan developer tools browser\n3. Test secara bertahap\n\nPerlu bantuan lebih lanjut? Tambahkan API Key untuk respons AI yang lebih cerdas! 🧠`,
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

function addChatMessage(role, text) {
  const messages = document.getElementById('ai-chat-messages');
  const div = document.createElement('div');
  div.className = `chat-message ${role}`;
  
  const now = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  
  // Format markdown-ish text
  let formatted = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre>$2</pre>')
    .replace(/\n/g, '<br>');
  
  div.innerHTML = `
    <div class="chat-bubble">${formatted}</div>
    <span class="chat-time">${now}</span>
  `;
  
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
  state.chatHistory.push({ role, content: text, time: now });
}

function showAIThinking() {
  state.isAIThinking = true;
  const messages = document.getElementById('ai-chat-messages');
  const thinking = document.createElement('div');
  thinking.className = 'chat-message ai';
  thinking.id = 'ai-thinking';
  thinking.innerHTML = `<div class="ai-thinking"><div class="thinking-dot"></div><div class="thinking-dot"></div><div class="thinking-dot"></div></div>`;
  messages.appendChild(thinking);
  messages.scrollTop = messages.scrollHeight;
}

function hideAIThinking() {
  state.isAIThinking = false;
  const thinking = document.getElementById('ai-thinking');
  if (thinking) thinking.remove();
}

// ===== SEARCH =====
function globalSearch(query) {
  const results = document.getElementById('search-results');
  if (!query) { results.innerHTML = ''; return; }
  
  const matches = [];
  const searchInFiles = (files) => {
    for (const [name, data] of Object.entries(files)) {
      if (data.isFolder && data.children) { searchInFiles(data.children); continue; }
      if (!data.content) continue;
      const lines = data.content.split('\n');
      lines.forEach((line, i) => {
        if (line.toLowerCase().includes(query.toLowerCase())) {
          matches.push({ file: name, line: i + 1, content: line.trim() });
        }
      });
    }
  };
  
  searchInFiles(state.files);
  results.innerHTML = matches.slice(0, 20).map(m => `
    <div class="search-result-item" onclick="openFile('${m.file}')">
      <div class="search-result-filename">${m.file}:${m.line}</div>
      <div class="search-result-preview">${m.content.replace(new RegExp(query, 'gi'), `<span class="search-result-match">$&</span>`)}</div>
    </div>
  `).join('') || '<div style="color:var(--text-muted);font-size:12px;padding:8px;">Tidak ditemukan</div>';
}

// ===== USER MENU =====
function openUserMenu() {
  const menu = document.getElementById('user-menu');
  menu.classList.toggle('hidden');
}

function closeUserMenu() {
  document.getElementById('user-menu').classList.add('hidden');
}

function openAppSettings() {
  closeUserMenu();
  showNotification('⚙️ Pengaturan aplikasi akan segera hadir!', 'success');
}

document.addEventListener('click', (e) => {
  const menu = document.getElementById('user-menu');
  const btn = document.getElementById('user-btn');
  if (!menu.contains(e.target) && !btn.contains(e.target)) {
    closeUserMenu();
  }
});

// ===== FORMAT CODE =====
function formatCode() {
  const editor = document.getElementById('code-editor');
  let code = editor.value;
  const ext = state.activeFile?.split('.').pop().toLowerCase();
  
  if (ext === 'html') {
    code = formatHTML(code);
  } else if (ext === 'css') {
    code = formatCSS(code);
  } else if (ext === 'js') {
    // Basic JS formatting
    code = code.replace(/\{([^\n])/g, '{\n  $1').replace(/([^\n])\}/g, '$1\n}');
  }
  
  editor.value = code;
  onEditorInput();
  showNotification('✨ Kode diformat!', 'success');
}

function formatHTML(html) {
  let result = '';
  let indent = 0;
  const lines = html.replace(/>\s+</g, '>\n<').split('\n');
  
  lines.forEach(line => {
    line = line.trim();
    if (!line) return;
    if (line.match(/^<\//)) indent = Math.max(0, indent - 1);
    result += '  '.repeat(indent) + line + '\n';
    if (line.match(/^<[^/!][^>]*[^/]>/) && !line.match(/<\//)) {
      if (!line.match(/^<(input|img|br|hr|meta|link)/i)) indent++;
    }
  });
  
  return result.trim();
}

function formatCSS(css) {
  return css
    .replace(/\s*\{\s*/g, ' {\n  ')
    .replace(/;\s*/g, ';\n  ')
    .replace(/\s*\}\s*/g, '\n}\n')
    .replace(/  \n\}/g, '\n}')
    .trim();
}

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'info') {
  const container = document.getElementById('notification-container');
  const notif = document.createElement('div');
  notif.className = `notification ${type}`;
  notif.textContent = message;
  container.appendChild(notif);
  
  setTimeout(() => {
    notif.style.animation = 'notifFadeOut 0.3s ease forwards';
    setTimeout(() => notif.remove(), 300);
  }, 3000);
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault();
    saveFile();
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
    e.preventDefault();
    openModal('preview-settings-modal');
  }
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal:not(.hidden)').forEach(m => m.classList.add('hidden'));
    closeUserMenu();
  }
});

// ===== TOUCH GESTURES =====
let touchStartX = 0;
document.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
document.addEventListener('touchend', (e) => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 60) {
    if (dx > 0 && !state.sidebarOpen) toggleSidebar();
    if (dx < 0 && state.sidebarOpen) toggleSidebar();
  }
}, { passive: true });

console.log('🚀 MobileCode IDE - Initialized!');
