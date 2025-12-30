/* ===============================
   INITIAL LOCK
================================ */
document.body.classList.add("lock-scroll");

/* ===============================
   LOADER PROGRESS SIMULATION
================================ */
const loader = document.getElementById("loader");
const progressBar = document.querySelector(".progress-bar");
const progressText = document.querySelector(".progress-percent");

let progress = 0;

const fakeLoading = setInterval(() => {
  progress += Math.random() * 12;

  if (progress >= 100) {
    progress = 100;
    clearInterval(fakeLoading);

    gsap.to(progressBar, {
      width: "100%",
      duration: 0.4
    });

    progressText.textContent = "100%";

    // Loader out
    gsap.to(loader, {
      opacity: 0,
      duration: 0.6,
      delay: 0.3,
      pointerEvents: "none",
      onComplete: startIntro
    });


  } else {
    gsap.to(progressBar, {
      width: `${progress}%`,
      duration: 0.3
    });
    progressText.textContent = `${Math.floor(progress)}%`;
  }
}, 200);

/* ===============================
   LENIS + GSAP STABLE INTEGRATION
================================ */
document.body.classList.add("lock-scroll");

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.1,
  smooth: true,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
});

lenis.on("scroll", ScrollTrigger.update);
lenis.stop(); // 🔒 intro bitene kadar

function startIntro() {
  // Loader'ı DOM'dan tamamen kaldır
  if (loader) loader.remove();

  document.body.style.pointerEvents = "auto";

  const introTL = gsap.timeline({
  onComplete: () => {
  // Scroll kilidini kaldır
  document.body.classList.remove("lock-scroll");

  // Scroll'u ZORLA en üste al (mobil fix)
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  // Lenis'i en üstten başlat
  lenis.scrollTo(0, { immediate: true });
  lenis.start();

  // Trigger'ları yeniden hesapla
  ScrollTrigger.refresh(true);

  // Height reset (mobil beyazlık fix)
  document.documentElement.style.height = "auto";
  document.body.style.height = "auto";
}

  });

  introTL
    .fromTo(
      ".hero-title",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 }
    )
    .fromTo(
      ".hero-subtitle",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.4"
    )
    .fromTo(
      ".hero-description",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.4"
    )
    .fromTo(
      ".hero-actions a",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 },
      "-=0.3"
    );
}

// GSAP ticker instead of RAF
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

// Disable GSAP lag smoothing (critical)
gsap.ticker.lagSmoothing(0);

/* ===============================
   GSAP DEFAULTS
================================ */
gsap.defaults({
  ease: "power3.out",
  duration: 1
});

/* ===============================
   HERO INTRO
================================ */
const introTL = gsap.timeline({
  onComplete: () => {
    document.body.classList.remove("lock-scroll");
    lenis.start(); // 🔓 scroll açılır
    ScrollTrigger.refresh();
  }
});

introTL
  .from(".hero-title", {
    y: 50,
    opacity: 0,
    duration: 1
  })
  .from(".hero-subtitle", {
    y: 30,
    opacity: 0,
    duration: 0.8
  }, "-=0.4")
  .from(".hero-description", {
    y: 20,
    opacity: 0,
    duration: 0.8
  }, "-=0.4")
  .from(".hero-actions a", {
    y: 20,
    opacity: 0,
    stagger: 0.15,
    duration: 0.6
  }, "-=0.3");

gsap.from(".hero-description", {
  y: 20,
  opacity: 0,
  delay: 0.5
});

gsap.from(".hero-actions a", {
  y: 20,
  opacity: 0,
  stagger: 0.15,
  delay: 0.75
});

/* ===============================
   SECTION REVEAL (EXCEPT HERO)
================================ */
gsap.utils.toArray(".section:not(.hero)").forEach(section => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      once: true
    },
    y: 60,
    opacity: 0
  });
});

/* ===============================
   TIMELINE ITEMS
================================ */
gsap.utils.toArray(".timeline-item").forEach(item => {
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      start: "top 85%",
      once: true
    },
    x: -40,
    opacity: 0
  });
});

/* ===============================
   PROJECT CARDS
================================ */
gsap.from(".project-card", {
  scrollTrigger: {
    trigger: ".projects-grid",
    start: "top 80%",
    once: true
  },
  y: 40,
  opacity: 0,
  stagger: 0.2
});

/* ===============================
   LANGUAGE SYSTEM (TR / EN)
================================ */
const translations = {
  tr: {
    "nav.about": "Hakkımda",
    "nav.skills": "Beceriler",
    "nav.experience": "Deneyim",
    "nav.projects": "Projeler",
    "nav.contact": "İletişim",

    "hero.title": "Dijital Operasyonlar & BT Odaklı Profesyonel",
    "hero.description":
      "Teknik operasyonlar, dijital sistemler ve kurumsal süreçlerde deneyimli profesyonel.",
    "hero.contact": "İletişime Geç",
    "hero.download": "CV İndir",

    "about.title": "Hakkımda",
    "about.text":
      "BT sistemleri, teknik destek, dijital topluluklar ve operasyonel süreçlerde deneyime sahip bir dijital operasyonlar uzmanıyım.",

    "skills.title": "Beceriler",
    "skills.tech": "Teknik",
    "skills.digital": "Dijital",
    "skills.soft": "Profesyonel",

    "experience.title": "Deneyim",
    "experience.aktip":
      "Sosyal medya yönetimi, müşteri ilişkileri, satın alma süreçleri ve 3D üretim operasyonları.",
    "experience.red":
      "Büyük ölçekli dijital platformlarda topluluk yönetimi ve operasyonel koordinasyon.",

    "projects.title": "Projeler",
    "projects.community":
      "Yapılandırılmış operasyonel süreçlerle büyük dijital toplulukların yönetimi.",
    "projects.3d":
      "3D yazıcı operasyonları ve üretim odaklı iş akışları.",

    "contact.title": "İletişim"
  },

  en: {
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.contact": "Contact",

    "hero.title": "Digital Operations & IT-Oriented Professional",
    "hero.description":
      "Experienced professional in technical operations, digital systems and corporate processes.",
    "hero.contact": "Contact Me",
    "hero.download": "Download CV",

    "about.title": "About Me",
    "about.text":
      "I am a digital operations professional with experience in IT systems, technical support, digital communities and operational workflows.",

    "skills.title": "Skills",
    "skills.tech": "Technical",
    "skills.digital": "Digital",
    "skills.soft": "Professional",

    "experience.title": "Experience",
    "experience.aktip":
      "Social media management, customer relations, purchasing processes and 3D production operations.",
    "experience.red":
      "Community management and operational coordination for large-scale digital platforms.",

    "projects.title": "Projects",
    "projects.community":
      "Managing large online communities with structured operational processes.",
    "projects.3d":
      "3D printer operations and production-focused workflows.",

    "contact.title": "Contact"
  }
};

const langToggle = document.getElementById("lang-toggle");
let currentLang = localStorage.getItem("lang") || "en";

function applyLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  langToggle.textContent = lang === "en" ? "TR" : "EN";
  localStorage.setItem("lang", lang);
}

langToggle.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "tr" : "en";
  applyLanguage(currentLang);
});

// INIT
applyLanguage(currentLang);

/* ===============================
   COPY PROTECTION
================================ */
document.addEventListener("contextmenu", e => e.preventDefault());

document.addEventListener("keydown", e => {
  if (
    (e.ctrlKey && ["c", "u", "s"].includes(e.key.toLowerCase())) ||
    (e.ctrlKey && e.shiftKey && ["i", "j"].includes(e.key.toLowerCase()))
  ) {
    e.preventDefault();
  }
});
