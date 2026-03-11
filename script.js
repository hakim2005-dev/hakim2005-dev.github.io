/* ============================================================
   script.js – IoTE KMITL  (shared across all pages)
   แก้ไขเมนู/footer ได้ที่ NAVBAR_HTML และ FOOTER_HTML ด้านล่าง
============================================================ */

/* ── 1. SHARED NAVBAR HTML ──────────────────────────────────
   เพิ่ม/ลบ เมนูได้ที่นี่ เพียงที่เดียว จะอัปเดตทุกหน้า
──────────────────────────────────────────────────────────── */
const NAVBAR_HTML = `
<div class="topbar">
  <span>📍 E-12 Building, KMITL</span>
  <span>✉️ iote@kmitl.ac.th</span>
</div>
<header id="navbar">
  <div class="nav-inner">
    <a href="index.html" class="logo">
      <img src="Image/logo.png" alt="IoTE KMITL" class="logo-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
      <span class="logo-fallback" style="display:none; align-items:baseline; gap:6px;">
        <span class="logo-iot">IoTE</span>
        <span class="logo-sub">KMITL</span>
      </span>
    </a>
    <button class="hamburger" id="hamburger" aria-label="เมนู">
      <span></span><span></span><span></span>
    </button>
    <nav id="main-nav">
      <ul>
        <li><a href="index.html">หน้าแรก</a></li>
        <li><a href="about.html">ABOUT IoTE</a></li>
        <li><a href="academics.html">ACADEMICS</a></li>
        <li><a href="admission.html">ADMISSION</a></li>
        <li><a href="faculty.html">FACULTY</a></li>
        
        <li><a href="contact.html">CONTACT</a></li>
      </ul>
    </nav>
  </div>
</header>
`;

/* ── 2. SHARED FOOTER HTML ──────────────────────────────────
   แก้ไข footer ได้ที่นี่เพียงที่เดียว
──────────────────────────────────────────────────────────── */
const FOOTER_HTML = `
<footer class="footer">
  <div class="container">
    <div class="footer-inner">
      <div class="footer-logo">
        <span class="logo-iot">IoTE</span>
        <span class="logo-sub">KMITL</span>
      </div>
      <p>© 2026 IoT and Information Engineering, KMITL. All rights reserved.</p>
      <div class="footer-links">
        <a href="about.html">เกี่ยวกับเรา</a>
        <a href="contact.html">ติดต่อ</a>
        <a href="admission.html">สมัครเรียน</a>
      </div>
    </div>
  </div>
</footer>
`;

/* ── 3. INJECT NAVBAR & FOOTER ──────────────────────────────*/
document.addEventListener('DOMContentLoaded', () => {
  const navPlaceholder = document.getElementById('navbar-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (navPlaceholder) navPlaceholder.outerHTML = NAVBAR_HTML;
  if (footerPlaceholder) footerPlaceholder.outerHTML = FOOTER_HTML;

  // Force close all dropdowns immediately after inject
  document.querySelectorAll('.dropdown').forEach(d => { d.style.display = 'none'; });

  // ONE single click handler for everything
  document.addEventListener('click', (e) => {
    const hamburger = document.getElementById('hamburger');
    const mainNav = document.getElementById('main-nav');

    // Hamburger
    if (hamburger && hamburger.contains(e.target)) {
      mainNav && mainNav.classList.toggle('open');
      return;
    }

    // Dropdown trigger — คลิกที่ .has-dropdown แต่ไม่ใช่ item ข้างใน
    const dropdownParent = e.target.closest('.has-dropdown');
    if (dropdownParent && !e.target.closest('.dropdown')) {
      e.preventDefault();
      e.stopPropagation();
      const dropdown = dropdownParent.querySelector('.dropdown');
      const isOpen = dropdown && dropdown.style.display === 'flex';
      // ปิดทุก dropdown ก่อน
      document.querySelectorAll('.dropdown').forEach(d => { d.style.display = 'none'; });
      // ถ้าปิดอยู่ → เปิด
      if (!isOpen && dropdown) dropdown.style.display = 'flex';
      return;
    }

    // คลิกนอก → ปิดทุก dropdown
    document.querySelectorAll('.dropdown').forEach(d => { d.style.display = 'none'; });
    if (mainNav && !mainNav.contains(e.target)) mainNav.classList.remove('open');
  });

  initAll();
});

function initAll() {
  highlightActiveNav();
  initHamburger();
  initMobileDropdown();
  initNavbarScroll();
  initFacultyFilter();
  initScrollReveal();
}

/* ── 4. HIGHLIGHT ACTIVE NAV LINK ───────────────────────────
   ไฮไลต์เมนูตาม URL ของหน้าปัจจุบันอัตโนมัติ
──────────────────────────────────────────────────────────── */
function highlightActiveNav() {
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#main-nav a').forEach(link => {
    const href = link.getAttribute('href').split('#')[0]; // ตัด anchor
    if (href === currentFile) {
      link.classList.add('active-link');
    }
  });

  // inject style สำหรับ active link
  const s = document.createElement('style');
  s.textContent = `
    #main-nav a.active-link {
      color: #7a4f1e !important;
      background: rgba(122,79,30,0.12) !important;
    }
  `;
  document.head.appendChild(s);
}

/* ── 5. HAMBURGER MENU ──────────────────────────────────────*/
function initHamburger() {
  // handled in main DOMContentLoaded click listener
}

/* ── 6. MOBILE DROPDOWN ─────────────────────────────────────*/
function initMobileDropdown() {
  // handled in main DOMContentLoaded click listener
}

/* ── 7. NAVBAR SCROLL EFFECT ────────────────────────────────*/
function initNavbarScroll() {
  // ไม่เปลี่ยนสี navbar ตอน scroll
}

/* ── 8. FACULTY FILTER TABS ─────────────────────────────────*/
function initFacultyFilter() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const facultyCards = document.querySelectorAll('.faculty-card');
  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      facultyCards.forEach(card => {
        if (filter === 'all' || card.dataset.cat === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transition = 'opacity 0.3s ease';
          }, 10);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ── 9. SCROLL REVEAL ANIMATION ────────────────────────────*/
function initScrollReveal() {
  const els = document.querySelectorAll(
    '.program-card, .feature-item, .community-card, .faculty-card, ' +
    '.contact-item, .stat-item, .highlight-card, .step-item, ' +
    '.program-detail-card, .reveal'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || 0) * 80;
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  els.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    el.dataset.delay = i % 6;
    observer.observe(el);
  });
}
