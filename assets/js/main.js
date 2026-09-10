/* ============================================================
   Sleek Modern Portfolio - Main JS
   Loads all content from data/*.json, renders sections,
   handles scroll animations via IntersectionObserver.
   ============================================================ */

(function () {
  'use strict';

  // ---- SVG Icon Map (inline, no external library) ---- //
  const icons = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    briefcase: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
    laptop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M2 20h20"/></svg>',
    graduation: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,7 12,13 2,7"/></svg>',
    arrowRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
    envelope: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,7 12,13 2,7"/></svg>',
    chevronDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
    wand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 4V2"/><path d="M15 16v-2"/><path d="M8 9h2"/><path d="M20 9h2"/><path d="M17.8 11.8L19 13"/><path d="M15 9h0"/><path d="M17.8 6.2L19 5"/><path d="m3 21 9-9"/><path d="M12.2 6.2L11 5"/></svg>',
    lightbulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>',
    codeFile: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    server: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>',
    cloud: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>',
    palette: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',
    network: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2" width="6" height="6" rx="1"/><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><path d="M5 16v-4h14v4"/><path d="M12 12V8"/></svg>',
    layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
    cpu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>',
    bookOpen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>',
    award: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
    mapPin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>',
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,7 12,13 2,7"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
    rocket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>',
    certificate: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 10h8"/><path d="M8 14h4"/><circle cx="17" cy="18" r="3"/><path d="M17 21v-3"/></svg>',
  };

  function icon(name, extraClass) {
    const svg = icons[name] || '';
    if (!svg) return '';
    if (extraClass) {
      return svg.replace('<svg', `<svg class="${extraClass}"`);
    }
    return svg;
  }

  // ---- Data fetching ---- //
  async function loadJson(file) {
    try {
      const resp = await fetch(`data/${file}`);
      if (!resp.ok) throw new Error(`Failed to load ${file}`);
      return await resp.json();
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  // ---- Syntax highlighting (simple) ---- //
  function highlightCode(code) {
    let html = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    html = html.replace(/\b(const|let|var|function|return|this|true|false|new|if|else)\b/g, '<span class="code-keyword">$1</span>');
    html = html.replace(/(&#39;[^&#]*&#39;|'[^']*')/g, '<span class="code-string">$1</span>');
    html = html.replace(/\b(\d+)\b/g, '<span class="code-number">$1</span>');
    html = html.replace(/:\s*<span class="code-keyword">(true|false)<\/span>/g, ': <span class="code-boolean">$1</span>');
    html = html.replace(/(\w+)(\s*:)/g, '<span class="code-property">$1</span>$2');
    html = html.replace(/(\w+)\(/g, '<span class="code-function">$1</span>(');

    return html;
  }

  // ---- Meteor Generator ---- //
  function createMeteors(container, count) {
    for (let i = 0; i < count; i++) {
      const meteor = document.createElement('div');
      meteor.className = 'hero-meteor';
      meteor.style.cssText = `--top: ${Math.random() * 50}%; --left: ${Math.random() * 100}%; --duration: ${3 + Math.random() * 4}s; --delay: ${Math.random() * 5}s;`;
      container.appendChild(meteor);
    }
  }

  // ---- Flip Words (enhanced with per-letter animation) ---- //
  function startFlipWords(container, words) {
    if (!words || words.length === 0) return;
    let current = 0;

    words.forEach((word, i) => {
      const span = document.createElement('span');
      span.className = 'flip-word' + (i === 0 ? ' active' : '');
      // Wrap each character in a span for staggered animation
      span.innerHTML = word.split('').map((ch, ci) => {
        const delay = ci * 0.025;
        return ch === ' '
          ? ' '
          : `<span class="flip-char" style="transition-delay: ${delay}s">${ch}</span>`;
      }).join('');
      container.appendChild(span);
    });

    setInterval(() => {
      const spans = container.querySelectorAll('.flip-word');
      // Exit current word
      spans[current].classList.add('exiting');
      spans[current].classList.remove('active');

      setTimeout(() => {
        spans[current].classList.remove('exiting');
        // Advance
        current = (current + 1) % words.length;
        spans[current].classList.add('active');
      }, 400);
    }, 3000);
  }

  // ---- SparklesText ---- //
  function createSparkles(targetEl) {
    if (!targetEl) return;
    const wrapper = document.createElement('span');
    wrapper.className = 'sparkles-wrapper';
    targetEl.parentNode.insertBefore(wrapper, targetEl);
    wrapper.appendChild(targetEl);

    const colors = ['#9E7AFF', '#FE8BBB', '#60a5fa', '#34d399'];
    const starSVG = `<svg viewBox="0 0 21 21" fill="currentColor"><path d="M10.5 0L13.09 7.36L21 8.27L15.18 13.14L16.82 21L10.5 17.27L4.18 21L5.82 13.14L0 8.27L7.91 7.36L10.5 0Z"/></svg>`;

    function addSparkle() {
      const sparkle = document.createElement('span');
      sparkle.className = 'sparkle-particle';
      const size = 8 + Math.random() * 12;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const duration = 1.5 + Math.random() * 2;
      const delay = Math.random() * 0.5;

      sparkle.style.cssText = `
        width: ${size}px; height: ${size}px;
        top: ${Math.random() * 100}%; left: ${Math.random() * 100}%;
        color: ${color};
        --sparkle-duration: ${duration}s;
        --sparkle-delay: ${delay}s;
      `;
      sparkle.innerHTML = starSVG;
      wrapper.appendChild(sparkle);

      setTimeout(() => sparkle.remove(), (duration + delay) * 1000);
    }

    // Generate sparkles continuously
    for (let i = 0; i < 6; i++) addSparkle();
    setInterval(() => { if (document.visibilityState === 'visible') addSparkle(); }, 300);
  }

  // ---- 3D Icon Cloud ---- //
  function createIconCloud(containerId) {
    const sphere = document.getElementById('iconCloudSphere');
    if (!sphere) return;

    const techNames = [
      'JS', 'TS', 'React', 'Vue', 'Node', 'Python', 'Go', 'Rust',
      'HTML', 'CSS', 'Docker', 'AWS', 'Git', 'Linux', 'SQL', 'Redis',
      'Next.js', 'Express', 'Figma', 'Vercel', 'Firebase', 'GraphQL',
      'Jest', 'Vite', 'Tailwind', 'Svelte', 'MongoDB', 'K8s'
    ];

    const count = techNames.length;
    const radius = 160;

    techNames.forEach((name, i) => {
      // Fibonacci sphere distribution
      const phi = Math.acos(1 - 2 * (i + 0.5) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      const item = document.createElement('div');
      item.className = 'icon-cloud-item';
      item.textContent = name;
      item.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
      sphere.appendChild(item);
    });

    // Mouse interaction
    const container = document.getElementById(containerId);
    if (container) {
      container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const mx = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const my = (e.clientY - rect.top - rect.height / 2) / rect.height;
        sphere.style.animationPlayState = 'paused';
        sphere.style.transform = `rotateY(${mx * 40}deg) rotateX(${-my * 40}deg)`;
      });

      container.addEventListener('mouseleave', () => {
        sphere.style.animationPlayState = '';
        sphere.style.transform = '';
      });
    }
  }

  // ---- Stacking Project Cards (scroll-linked) ---- //
  function initStackingCards() {
    const cards = document.querySelectorAll('.project-card');
    if (cards.length === 0) return;

    const grid = document.querySelector('.projects-grid');
    if (!grid) return;

    // Wrap each card for sticky positioning
    cards.forEach((card, i) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'project-stack-card';
      wrapper.style.top = (80 + i * 25) + 'px';
      card.parentNode.insertBefore(wrapper, card);
      wrapper.appendChild(card);
    });

    function updateCardScales() {
      const wrappers = document.querySelectorAll('.project-stack-card');
      const total = wrappers.length;

      wrappers.forEach((wrapper, i) => {
        const rect = wrapper.getBoundingClientRect();
        const viewportH = window.innerHeight;
        const progress = Math.max(0, Math.min(1, 1 - (rect.top / (viewportH * 0.5))));
        const targetScale = 1 - (total - i - 1) * 0.04;
        const scale = 1 - progress * (1 - targetScale);

        wrapper.querySelector('.project-card').style.transform = `scale(${Math.max(targetScale, scale)})`;
      });
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateCardScales();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // ---- Render Functions ---- //

  function renderNavigation(data) {
    const header = document.getElementById('site-header');
    const logoEl = header.querySelector('.navbar__logo');
    logoEl.textContent = data.logo || 'P';

    // Menu toggle
    const menuBtn = header.querySelector('.navbar__hamburger');
    const navLinks = header.querySelector('.navbar__links');

    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      menuBtn.classList.toggle('active');
    });

    // Nav items
    data.items.forEach((item, idx) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = item.href;
      a.innerHTML = `<span class="nav-icon">${icon(item.icon)}</span><span>${item.label}</span>`;
      if (idx === 0) a.classList.add('active');

      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuBtn.classList.remove('active');
        header.querySelectorAll('.navbar__links a').forEach(l => l.classList.remove('active'));
        a.classList.add('active');
      });

      li.appendChild(a);
      navLinks.appendChild(li);
    });
  }

  function renderHero(data, config) {
    const section = document.getElementById('hero');

    // Grid background
    const gridBg = section.querySelector('.hero-grid-bg');
    gridBg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <pattern id="heroGrid" width="40" height="40" patternUnits="userSpaceOnUse">
        <rect width="40" height="40" fill="none" stroke="white" stroke-width="0.5" opacity="0.3"/>
      </pattern>
      <rect width="100%" height="100%" fill="url(#heroGrid)"/>
    </svg>`;

    // Meteors
    createMeteors(section.querySelector('.hero-meteors'), 8);

    // Welcome badge text
    section.querySelector('.hero-badge-text').textContent = 'Welcome to my universe';

    // Heading with SparklesText on greeting
    const heading = section.querySelector('.hero-name');
    heading.innerHTML = `<span class="hero-name-hello" id="heroGreeting">${data.greeting || "Hello, I'm"}</span><span class="hero-name-line"><span class="gradient-text"> ${data.name || 'Developer'}</span></span>`;

    // Add sparkles to greeting text
    const greetingEl = document.getElementById('heroGreeting');
    createSparkles(greetingEl);

    // Flip words
    const flipContainer = section.querySelector('.hero-role-text');
    startFlipWords(flipContainer, data.roles || []);

    // Tagline
    section.querySelector('.hero-tagline').textContent = data.tagline || '';

    // CTA buttons
    const ctaPrimary = section.querySelector('.btn--primary');
    if (data.ctaPrimary) {
      ctaPrimary.href = data.ctaPrimary.href || '#projects';
      ctaPrimary.querySelector('.btn-inner').innerHTML = `<span>${data.ctaPrimary.text || 'View Projects'}</span>${icon('arrowRight', 'btn-arrow')}`;
    }

    const ctaSecondary = section.querySelector('.btn--secondary');
    if (data.ctaSecondary) {
      ctaSecondary.href = data.ctaSecondary.href || '#contact';
      ctaSecondary.querySelector('.btn-inner').innerHTML = `<span>${data.ctaSecondary.text || 'Get Resume'}</span>${icon('envelope', 'btn-icon-mail')}`;
    }

    // Floating badges
    const badgeContainer = section.querySelector('.hero-floating-badges');
    const badgeIcons = { purple: 'wand', blue: 'code', amber: 'lightbulb' };
    if (data.floatingBadges) {
      data.floatingBadges.forEach(b => {
        const div = document.createElement('div');
        div.className = `floating-badge floating-badge--${b.color}`;
        div.innerHTML = `${icon(badgeIcons[b.color] || 'code')} ${b.text}`;
        badgeContainer.appendChild(div);
      });
    }

    // Code window
    if (data.codeSnippet) {
      section.querySelector('.code-window-filename').innerHTML = `${icon('codeFile')} ${data.codeSnippet.filename || 'developer.js'}`;
      section.querySelector('.code-window-body').innerHTML = highlightCode(data.codeSnippet.code || '');
    }
  }

  function renderAbout(data) {
    if (!data) return;
    const section = document.getElementById('about');

    section.querySelector('.about-roles').textContent = data.roles || 'About Me';

    // Image or placeholder
    const imgWrapper = section.querySelector('.about-image-wrapper');
    if (data.avatarUrl) {
      imgWrapper.innerHTML = `<img src="${data.avatarUrl}" alt="Profile photo">`;
    } else {
      imgWrapper.innerHTML = '<div class="about-image-placeholder">&lt;/&gt;</div>';
    }

    // Bio
    const textContainer = section.querySelector('.about-text');
    let bioHtml = '';
    if (Array.isArray(data.bio)) {
      data.bio.forEach(p => { bioHtml += `<p>${p}</p>`; });
    } else if (data.bio) {
      bioHtml = `<p>${data.bio}</p>`;
    }

    if (data.quote) {
      bioHtml += `<div class="about-quote"><p>${data.quote}</p></div>`;
    }

    textContainer.innerHTML = bioHtml;

    // Highlights
    const highlightsContainer = section.querySelector('.about-highlights');
    if (data.highlights) {
      data.highlights.forEach(h => {
        const div = document.createElement('div');
        div.className = 'about-stat';
        div.innerHTML = `<span class="about-stat-value">${h.value}</span><span class="about-stat-label">${h.label}</span>`;
        highlightsContainer.appendChild(div);
      });
    }
  }

  function renderSkills(data) {
    if (!data) return;
    const section = document.getElementById('skills');

    section.querySelector('.section-title').textContent = data.heading || 'Skills & Technologies';

    const grid = section.querySelector('.skills-grid');
    const iconMap = {
      code: 'code', server: 'server', cloud: 'cloud', palette: 'palette',
      frontend: 'code', backend: 'server', devops: 'cloud', design: 'palette',
    };

    (data.categories || []).forEach(cat => {
      const card = document.createElement('div');
      card.className = 'skill-card';

      const iconName = iconMap[cat.icon] || iconMap[cat.name?.toLowerCase()?.split(' ')[0]] || 'code';
      const color = cat.color || '#60a5fa';

      let skillsHtml = '';
      (cat.skills || []).forEach(skill => {
        const level = typeof skill === 'object' ? skill.level : 80;
        const name = typeof skill === 'object' ? skill.name : skill;
        skillsHtml += `
          <div class="skill-item">
            <div class="skill-item-header">
              <span class="skill-item-name">${name}</span>
              <span class="skill-item-level">${level}%</span>
            </div>
            <div class="skill-item-bar">
              <div class="skill-item-fill" style="--bar-color: ${color}; --bar-color-end: ${color}88; --fill-width: ${level}%;" data-level="${level}"></div>
            </div>
          </div>`;
      });

      card.innerHTML = `
        <div class="skill-card-header">
          <div class="skill-card-icon" style="color: ${color}">${icon(iconName)}</div>
          <div class="skill-card-title">${cat.name}</div>
        </div>
        <div class="skill-card-items">${skillsHtml}</div>`;

      grid.appendChild(card);
    });
  }

  function renderExperience(data) {
    if (!data) return;
    const section = document.getElementById('experience');

    section.querySelector('.section-title').textContent = data.heading || 'Professional Journey';
    section.querySelector('.section-subtitle').textContent = data.subtitle || '';

    const grid = section.querySelector('.experience-grid');
    const expIcons = ['network', 'layers', 'code', 'cpu', 'briefcase', 'server'];

    (data.positions || []).forEach((pos, idx) => {
      const card = document.createElement('div');
      card.className = 'exp-card';

      let achieveHtml = '';
      if (pos.achievements && pos.achievements.length) {
        achieveHtml = '<div class="exp-card-achievements">' +
          pos.achievements.map(a => `<span class="exp-card-achievement">${a}</span>`).join('') +
          '</div>';
      }

      card.innerHTML = `
        <div class="exp-card-glass"></div>
        <div class="exp-card-gradient-border"></div>
        <div class="exp-card-inner">
          <div class="exp-card-icon">
            <div class="exp-card-icon-glow"></div>
            ${icon(expIcons[idx % expIcons.length])}
          </div>
          <div class="exp-card-title">${pos.title}</div>
          <div class="exp-card-meta">
            <span class="exp-card-company">${pos.company}</span>
            <span class="exp-card-period">${pos.startDate}${pos.endDate ? ' - ' + pos.endDate : ''}</span>
          </div>
          <p class="exp-card-description">${pos.description}</p>
          ${achieveHtml}
        </div>`;

      grid.appendChild(card);
    });

    // Floating particles
    const particleContainer = section.querySelector('.exp-particles');
    for (let i = 0; i < 15; i++) {
      const p = document.createElement('div');
      p.className = 'exp-particle';
      p.style.top = `${Math.random() * 100}%`;
      p.style.left = `${Math.random() * 100}%`;
      p.style.animationDelay = `${Math.random() * 5}s`;
      particleContainer.appendChild(p);
    }
  }

  function renderProjects(data) {
    if (!data) return;
    const section = document.getElementById('projects');

    section.querySelector('.section-title').textContent = data.heading || 'Featured Projects';

    const grid = section.querySelector('.projects-grid');

    (data.projects || []).forEach((proj, idx) => {
      const card = document.createElement('div');
      card.className = 'project-card reveal-up';

      const color = proj.color || '#5196fd';

      let imgContent = '';
      if (proj.imageUrl) {
        imgContent = `<img src="${proj.imageUrl}" alt="${proj.name}">`;
      } else {
        imgContent = `<div class="project-card-image-placeholder">${icon('laptop')}</div>`;
      }

      let techsHtml = '';
      if (proj.technologies && proj.technologies.length) {
        techsHtml = '<div class="project-card-techs">' +
          proj.technologies.map(t => `<span class="project-card-tech">${t}</span>`).join('') +
          '</div>';
      }

      card.innerHTML = `
        <div class="project-card-image">
          ${imgContent}
          <div class="project-card-number">Project ${idx + 1}</div>
        </div>
        <div class="project-card-body">
          <div>
            <div class="project-card-accent">
              <div class="project-card-accent-dot" style="background: ${color}"></div>
              <div class="project-card-accent-line"></div>
            </div>
            <h3 class="project-card-name">${proj.name}</h3>
            <p class="project-card-desc">${proj.description}</p>
            ${techsHtml}
          </div>
          <div>
            <div class="project-card-divider"></div>
            <div class="project-card-links">
              ${proj.githubUrl ? `<a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-card-link" style="color: ${color}">${icon('github')} <span>Code</span></a>` : ''}
              ${proj.liveUrl ? `<a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-card-link" style="color: ${color}">${icon('globe')} <span>Live</span></a>` : ''}
            </div>
          </div>
        </div>`;

      grid.appendChild(card);
    });
  }

  function renderEducation(data) {
    if (!data) return;
    const section = document.getElementById('education');

    section.querySelector('.section-title').textContent = data.heading || 'Educational Journey';
    section.querySelector('.section-subtitle').textContent = data.subtitle || '';

    const grid = section.querySelector('.education-grid');
    const mascots = ['&#128216;', '&#128215;', '&#128218;', '&#128214;'];

    (data.entries || []).forEach((edu, idx) => {
      const card = document.createElement('div');
      card.className = 'edu-card';

      let achieveHtml = '';
      if (edu.achievements && edu.achievements.length) {
        achieveHtml = `
          <div class="edu-card-achievements">
            ${edu.achievements.map(a => `<span class="edu-card-achievement">${icon('award', 'edu-card-achievement-icon')} ${a}</span>`).join('')}
          </div>`;
      }

      let skillsHtml = '';
      if (edu.skills && edu.skills.length) {
        skillsHtml = '<div class="edu-card-skills">' +
          edu.skills.map(s => `<span class="edu-card-skill">${s}</span>`).join('') +
          '</div>';
      }

      const dateStr = [edu.startDate, edu.endDate].filter(Boolean).join(' - ');

      card.innerHTML = `
        <div class="edu-card-header">
          <span class="edu-card-emoji">${mascots[idx % mascots.length]}</span>
          <h3 class="edu-card-degree">${edu.degree}</h3>
        </div>
        <div class="edu-card-institution">${icon('bookOpen', 'edu-card-institution-icon')} ${edu.institution}</div>
        ${dateStr ? `<div class="edu-card-dates">${icon('calendar')} ${dateStr}</div>` : ''}
        ${edu.description ? `<p class="edu-card-description">${edu.description}</p>` : ''}
        ${achieveHtml}
        ${skillsHtml}`;

      grid.appendChild(card);
    });

    // Certifications
    if (data.certifications && data.certifications.length) {
      const certSection = section.querySelector('.education-certs');
      certSection.style.display = 'block';
      const certList = certSection.querySelector('.education-certs-list');
      data.certifications.forEach(c => {
        const tag = document.createElement('span');
        tag.className = 'cert-badge';
        tag.innerHTML = `${icon('certificate', 'cert-badge-icon')} ${c}`;
        certList.appendChild(tag);
      });
    }
  }

  function renderContact(data) {
    if (!data) return;
    const section = document.getElementById('contact');

    section.querySelector('.section-title').textContent = data.heading || 'Get In Touch';
    section.querySelector('.contact-subheading').textContent = data.subheading || '';

    // Contact info items
    const infoContainer = section.querySelector('.contact-details');

    if (data.email) {
      const item = document.createElement('div');
      item.className = 'contact-detail';
      item.innerHTML = `
        <div class="contact-detail-icon contact-detail-icon--email">${icon('mail')}</div>
        <div><div class="contact-detail-label">Email</div><div class="contact-detail-value">${data.email}</div></div>`;
      infoContainer.appendChild(item);
    }

    if (data.location) {
      const item = document.createElement('div');
      item.className = 'contact-detail';
      item.innerHTML = `
        <div class="contact-detail-icon contact-detail-icon--location">${icon('mapPin')}</div>
        <div><div class="contact-detail-label">Location</div><div class="contact-detail-value">${data.location}</div></div>`;
      infoContainer.appendChild(item);
    }

    if (data.phone) {
      const item = document.createElement('div');
      item.className = 'contact-detail';
      item.innerHTML = `
        <div class="contact-detail-icon contact-detail-icon--phone">${icon('phone')}</div>
        <div><div class="contact-detail-label">Phone</div><div class="contact-detail-value">${data.phone}</div></div>`;
      infoContainer.appendChild(item);
    }

    if (data.availability) {
      const badge = document.createElement('div');
      badge.className = 'contact-availability';
      badge.innerHTML = `<div class="availability-badge"><div class="availability-badge__dot"></div><span>${data.availability}</span></div>`;
      infoContainer.appendChild(badge);
    }

    // Form
    const form = section.querySelector('.contact-form');
    if (data.formAction) {
      form.action = data.formAction;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const statusEl = section.querySelector('.contact-status');
      const formData = new FormData(form);

      const name = formData.get('name')?.toString().trim();
      const email = formData.get('email')?.toString().trim();
      const message = formData.get('message')?.toString().trim();

      if (!name || !email || !message) {
        statusEl.textContent = 'Please fill in all required fields.';
        statusEl.className = 'contact-status error';
        return;
      }

      if (data.formAction) {
        fetch(data.formAction, { method: 'POST', body: formData })
          .then(r => r.json())
          .then(() => {
            statusEl.textContent = 'Message sent successfully!';
            statusEl.className = 'contact-status success';
            form.reset();
          })
          .catch(() => {
            statusEl.textContent = 'Error sending message. Please try again.';
            statusEl.className = 'contact-status error';
          });
      } else {
        const subject = formData.get('subject')?.toString() || 'Portfolio Contact';
        const mailtoLink = `mailto:${data.email || ''}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)}`;
        window.location.href = mailtoLink;
        statusEl.textContent = 'Opening your email client...';
        statusEl.className = 'contact-status success';
      }
    });
  }

  function renderFooter(data) {
    if (!data) return;
    const footer = document.getElementById('site-footer');

    footer.querySelector('.footer-copyright').textContent =
      `\u00A9 ${data.year || new Date().getFullYear()} ${data.copyright || ''}. All rights reserved.`;

    if (data.tagline) {
      footer.querySelector('.footer-tagline').textContent = data.tagline;
    }

    const linksContainer = footer.querySelector('.footer-links');
    (data.links || []).forEach(link => {
      if (!link) return;
      const a = document.createElement('a');
      a.href = link.url;
      a.className = 'footer-link';
      a.target = link.url.startsWith('mailto:') ? '_self' : '_blank';
      a.rel = 'noopener noreferrer';
      a.title = link.label;
      a.innerHTML = `<span class="footer-link-icon">${icon(link.icon || 'globe')}</span><span>${link.label}</span>`;
      linksContainer.appendChild(a);
    });
  }

  // ---- Apply site config (CSS variables) ---- //
  function applySiteConfig(config) {
    if (!config) return;
    const root = document.documentElement;
    if (config.gradientStart) root.style.setProperty('--gradient-start', config.gradientStart);
    if (config.gradientEnd) root.style.setProperty('--gradient-end', config.gradientEnd);
    if (config.bgPrimary) root.style.setProperty('--bg-primary', config.bgPrimary);
    if (config.bgSecondary) root.style.setProperty('--bg-secondary', config.bgSecondary);

    if (config.siteName) document.title = config.siteName;
  }

  // ---- Scroll-based navigation highlighting ---- //
  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar__links a');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(link => {
              link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );

    sections.forEach(s => observer.observe(s));
  }

  // ---- Scroll animations (IntersectionObserver) ---- //
  function initRevealAnimations() {
    const revealClasses = ['.reveal-up', '.reveal-left', '.reveal-right', '.reveal-scale'];
    const staggerElements = document.querySelectorAll('.stagger-children');
    const elements = document.querySelectorAll(revealClasses.join(','));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');

            // Animate skill bars
            const bars = entry.target.querySelectorAll('.skill-item-fill');
            bars.forEach(bar => {
              bar.classList.add('animated');
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    elements.forEach(el => observer.observe(el));
    staggerElements.forEach(el => observer.observe(el));
  }

  // ---- Header scroll behavior ---- //
  function initHeaderScroll() {
    const header = document.getElementById('site-header');
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          header.classList.toggle('navbar--scrolled', window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // ---- INIT ---- //
  async function init() {
    const [config, nav, hero, about, experience, skills, projects, education, contact, footer] = await Promise.all([
      loadJson('site-config.json'),
      loadJson('navigation.json'),
      loadJson('hero.json'),
      loadJson('about.json'),
      loadJson('experience.json'),
      loadJson('skills.json'),
      loadJson('projects.json'),
      loadJson('education.json'),
      loadJson('contact.json'),
      loadJson('footer.json'),
    ]);

    applySiteConfig(config);
    renderNavigation(nav || { logo: 'P', items: [] });
    renderHero(hero || {}, config || {});
    renderAbout(about);
    renderSkills(skills);
    renderExperience(experience);
    renderProjects(projects);
    renderEducation(education);
    renderContact(contact);
    renderFooter(footer);

    initHeaderScroll();
    initScrollSpy();

    // 3D Icon Cloud
    createIconCloud('iconCloud');

    // Stacking project cards
    initStackingCards();

    requestAnimationFrame(() => {
      initRevealAnimations();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
