/* ==========================================================
   Dhaya Mukkera – Portfolio Scripts
   ========================================================== */

/* ----------------------------------------------------------
   1. PROJECTS DATA  -  ADD / EDIT PROJECTS HERE
   To add a project, copy one object and paste it in the array.
   - github: replace with the exact repo URL
   - demo:   set a URL to show a "Live Demo" button, or null to hide it
   ---------------------------------------------------------- */
const PROJECTS = [
  {
    title: "Serverless Bookstore Application",
    description: "A fully serverless bookstore with a REST API that handles book listings and orders without managing any servers.",
    tech: ["AWS Lambda", "API Gateway", "DynamoDB", "HTML", "CSS", "JavaScript"],
    github: "https://github.com/Dhaya-Mukkera", // [ADD GITHUB LINK]
    demo: null
  },
  {
    title: "Multi-Tier Project for Server Connectivity",
    description: "A multi-tier AWS architecture that securely connects web, application, and database servers across public and private subnets with load balancing.",
    tech: ["AWS VPC", "EC2", "Load Balancer", "RDS", "Linux", "Nginx/Tomcat"],
    github: "https://github.com/Dhaya-Mukkera", // [ADD GITHUB LINK]
    demo: null
  },
  {
    title: "Online Tours and Travel Management System",
    description: "A web platform for exploring and booking customized travel packages, with hotel and transport selection and an admin dashboard.",
    tech: ["HTML", "CSS", "JavaScript", "SQL"],
    github: "https://github.com/Dhaya-Mukkera", // [ADD GITHUB LINK]
    demo: null
  },
  {
    title: "Text-to-Image Generation Using Fine-Tuned Stable Diffusion",
    description: "Fine-tuned a Stable Diffusion model on custom datasets to improve context-aware text-to-image alignment and output quality.",
    tech: ["Python", "Stable Diffusion", "AI/ML"],
    github: "https://github.com/Dhaya-Mukkera", // [ADD GITHUB LINK]
    demo: null
  }
];

/* Render project cards into #projectGrid */
function renderProjects() {
  const grid = document.getElementById("projectGrid");
  if (!grid) return;
  grid.innerHTML = PROJECTS.map(p => `
    <article class="card project reveal">
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <ul class="chips" aria-label="Technologies used">
        ${p.tech.map(t => `<li>${t}</li>`).join("")}
      </ul>
      <div class="project__links">
        <a class="btn btn--ghost" href="${p.github}" target="_blank" rel="noopener" aria-label="${p.title} on GitHub">GitHub</a>
        ${p.demo ? `<a class="btn btn--primary" href="${p.demo}" target="_blank" rel="noopener" aria-label="${p.title} live demo">Live Demo</a>` : ""}
      </div>
    </article>`).join("");
}

/* ----------------------------------------------------------
   2. MOBILE MENU
   ---------------------------------------------------------- */
function initMenu() {
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");
  const setOpen = open => {
    menu.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
  };
  burger.addEventListener("click", () => setOpen(!menu.classList.contains("open")));
  menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", e => { if (e.key === "Escape") setOpen(false); });
}

/* ----------------------------------------------------------
   3. ACTIVE NAV LINK ON SCROLL
   ---------------------------------------------------------- */
function initActiveNav() {
  const links = document.querySelectorAll(".menu a");
  const sections = [...links].map(a => document.querySelector(a.getAttribute("href")));
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(a => {
        const on = a.getAttribute("href") === "#" + entry.target.id;
        a.classList.toggle("active", on);
        on ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach(s => s && obs.observe(s));
}

/* ----------------------------------------------------------
   4. REVEAL ON SCROLL
   ---------------------------------------------------------- */
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("visible")); return; }
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("visible"); o.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(e => obs.observe(e));
}

/* ----------------------------------------------------------
   5. CONTACT FORM VALIDATION (frontend only, no backend)
   ---------------------------------------------------------- */
function initForm() {
  const form = document.getElementById("contactForm");
  const success = document.getElementById("formSuccess");
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const rules = {
    name:    v => v.trim().length >= 2 ? "" : "Please enter your name (at least 2 characters).",
    email:   v => emailRe.test(v.trim()) ? "" : "Please enter a valid email address.",
    message: v => v.trim().length >= 10 ? "" : "Message should be at least 10 characters."
  };

  /* Validate a single field and show/hide its error */
  const check = field => {
    const msg = rules[field.name](field.value);
    document.getElementById(field.id + "Err").textContent = msg;
    field.closest(".field").classList.toggle("invalid", !!msg);
    field.setAttribute("aria-invalid", msg ? "true" : "false");
    return !msg;
  };

  const fields = [...form.querySelectorAll("input, textarea")];
  fields.forEach(f => f.addEventListener("blur", () => check(f)));
  fields.forEach(f => f.addEventListener("input", () => { if (f.getAttribute("aria-invalid") === "true") check(f); }));

  form.addEventListener("submit", e => {
    e.preventDefault();
    success.hidden = true;
    const results = fields.map(check);
    const firstBad = fields[results.indexOf(false)];
    if (firstBad) { firstBad.focus(); return; }
    // No backend: show success. To send real emails, connect a service like Formspree here.
    form.reset();
    success.hidden = false;
  });
}

/* ----------------------------------------------------------
   6. INIT
   ---------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();   // must run before the reveal observer
  initMenu();
  initActiveNav();
  initReveal();
  initForm();
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
