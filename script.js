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
      <span class="logo-iot">IoTE</span>
      <span class="logo-sub">KMITL</span>
    </a>
    <button class="hamburger" id="hamburger" aria-label="เมนู">
      <span></span><span></span><span></span>
    </button>
    <nav id="main-nav">
      <ul>
        <li><a href="index.html">หน้าแรก</a></li>
        <li><a href="about.html">ABOUT IoTE</a></li>
        <li class="has-dropdown">
          <a href="academics.html">ACADEMICS ▾</a>
          <ul class="dropdown">
            <li><a href="academics.html#bachelor">วศ.บ. วิศวกรรมระบบไอโอทีและสารสนเทศ</a></li>
            <li><a href="academics.html#dual">Dual Degree (B.Eng. + B.Sc.)</a></li>
            <li><a href="academics.html#continuing">วศ.บ. คอมพิวเตอร์และไอโอที (ต่อเนื่อง)</a></li>
            <li><a href="academics.html#graduate">ปริญญาโท / เอก (AIoT)</a></li>
          </ul>
        </li>
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

  // หลัง inject แล้วค่อย init ส่วนที่ต้องการ DOM
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
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('main-nav');
  if (!hamburger || !mainNav) return;

  hamburger.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });

  // ปิดเมื่อคลิกนอก nav
  document.addEventListener('click', (e) => {
    if (!mainNav.contains(e.target) && !hamburger.contains(e.target)) {
      mainNav.classList.remove('open');
    }
  });

  // ปิดเมื่อคลิก link
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mainNav.classList.remove('open'));
  });
}

/* ── 6. MOBILE DROPDOWN ─────────────────────────────────────*/
function initMobileDropdown() {
  document.querySelectorAll('.has-dropdown').forEach(item => {
    item.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.stopPropagation();
        item.classList.toggle('open');
      }
    });
  });
}

/* ── 7. NAVBAR SCROLL EFFECT ────────────────────────────────*/
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.style.background = window.scrollY > 50
      ? 'rgba(10, 14, 26, 0.98)'
      : 'rgba(10, 14, 26, 0.92)';
  });
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
