const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

/* ===================== Particles Background ===================== */
(function initParticles() {
  const canvas = $("#particles");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w, h, particles = [], mouse = { x: null, y: null }, animId;

  const isMobile = () => window.innerWidth < 768;
  const COUNT = isMobile() ? 38 : 70;
  const CONNECT = isMobile() ? 90 : 120;
  const SPEED = 0.35;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function create() {
    particles = [];
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
        r: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.45 + 0.15
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // soft gradient glow in center-right
    const g = ctx.createRadialGradient(w * 0.7, h * 0.35, 0, w * 0.7, h * 0.35, w * 0.5);
    g.addColorStop(0, "rgba(255,91,110,0.04)");
    g.addColorStop(1, "transparent");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      // mild mouse attraction
      if (mouse.x !== null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160) {
          p.vx += dx * 0.00008;
          p.vy += dy * 0.00008;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 140, 120, ${p.alpha})`;
      ctx.fill();

      // connections
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(255, 120, 130, ${0.12 * (1 - dist / CONNECT)})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }

    animId = requestAnimationFrame(draw);
  }

  function onMove(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }

  function onLeave() {
    mouse.x = mouse.y = null;
  }

  resize();
  create();
  draw();

  window.addEventListener("resize", () => {
    resize();
    create();
  });
  window.addEventListener("mousemove", onMove, { passive: true });
  window.addEventListener("mouseleave", onLeave);

  // pause when tab hidden to save battery
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelAnimationFrame(animId);
    else draw();
  });
})();

/* ===================== Skills ===================== */
const sk = [
  ["Windows Server & Active Directory", 90],
  ["Networking (LAN/WAN, MikroTik)", 88],
  ["System Administration", 92],
  ["Web Design (HTML, CSS, Bootstrap, jQuery)", 82],
  ["Digital Marketing & SEO", 80],
  ["AI Tools & Automation", 78]
];

$("#sk").innerHTML = sk.map(s => `
  <div class="bar rv">
    <div><span>${s[0]}</span><span>${s[1]}%</span></div>
    <div class="trk"><div class="fill" data-w="${s[1]}"></div></div>
  </div>
`).join("");

/* ===================== Portfolio ===================== */
const pj = [
  ["🏫", "MHS School Management", "School website with management features for administration, staff and students.", "web", "Real project"],
  ["🛒", "SeiMart Marketplace", "E-commerce marketplace for Bangladesh with bKash-ready checkout.", "app", "Real project"],
  ["🎨", "Website design for Rainy Design", "Clean business site layout.", "web", "Demo"],
  ["🔥", "Come on babe light my fire", "Application interface concept.", "app", "Demo"],
  ["📣", "Branding for ABC Corporation", "Social media and ad campaign.", "mkt", "Demo"],
  ["🤖", "AI Chat Assistant", "Prompt-driven helper concept.", "ai", "Demo"]
];

const gr = [
  "#ff5b6e,#ff9a5b",
  "#6c5bff,#3ac3ff",
  "#12c2a0,#1d6fff",
  "#ff9a5b,#ffd35b",
  "#b24bff,#ff5b9a",
  "#1d6fff,#12c2a0"
];

const catLabel = { web: "Web Design", app: "Application", mkt: "Marketing", ai: "AI" };

$("#pg").innerHTML = pj.map((p, i) => `
  <div class="pi rv" data-c="${p[3]}">
    <div class="th" style="background:linear-gradient(135deg,${gr[i]})">${p[0]}</div>
    <div class="pb">
      <small>${catLabel[p[3]]}</small>
      <h3>${p[1]}</h3>
      <p>${p[2]}</p>
      <span class="tag${p[4] === "Real project" ? " real" : ""}">${p[4]}</span>
    </div>
  </div>
`).join("");

/* ===================== Services ===================== */
const sv = [
  ["🖥️", "Web Design", "Responsive, fast websites built with HTML, CSS, Bootstrap and jQuery."],
  ["📣", "Digital Marketing", "SEO and campaigns that bring the right visitors."],
  ["🤖", "AI Solutions", "Practical AI workflows that save time."],
  ["📱", "App Development", "Mobile and web apps from idea to launch."],
  ["⚙️", "AI Tools Management", "Setting up and managing AI tools for teams."],
  ["👍", "Facebook Marketing", "Page management, content and paid ads."],
  ["🌐", "Network & System Admin", "Servers, LAN/WAN, MikroTik and security."],
  ["📊", "MIS & Data Reports", "Clean data and clear reports for decisions."]
];

$("#sv").innerHTML = sv.map(s => `
  <div class="card rv">
    <div class="ic">${s[0]}</div>
    <h3>${s[1]}</h3>
    <p>${s[2]}</p>
  </div>
`).join("");

/* Portfolio filter */
$$(".flt button").forEach(b => {
  b.onclick = () => {
    $$(".flt button").forEach(x => x.classList.remove("on"));
    b.classList.add("on");
    const f = b.dataset.f;
    $$(".pi").forEach(p => {
      p.classList.toggle("hide", f !== "all" && p.dataset.c !== f);
    });
  };
});

/* Reveal on scroll + skill bars */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("in");
      e.target.querySelectorAll(".fill").forEach(f => {
        f.style.width = f.dataset.w + "%";
      });
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

$$(".rv").forEach(el => io.observe(el));

/* Counter animation */
$$(".cnt").forEach(c => {
  const n = +c.dataset.n;
  let i = 0;
  const step = Math.max(1, Math.floor(n / 40));
  const t = setInterval(() => {
    i = Math.min(i + step, n);
    c.textContent = i;
    if (i >= n) clearInterval(t);
  }, 30);
});

/* Active nav on scroll */
const links = $$("#side nav a");
const secs = links.map(a => $(a.getAttribute("href")));

addEventListener("scroll", () => {
  let k = 0;
  secs.forEach((s, i) => {
    if (s && s.getBoundingClientRect().top < 220) k = i;
  });
  links.forEach((a, i) => a.classList.toggle("on", i === k));
  $("#top").classList.toggle("show", scrollY > 500);
}, { passive: true });

/* Mobile menu */
$("#menu").onclick = () => $("#side").classList.toggle("open");
links.forEach(a => a.addEventListener("click", () => $("#side").classList.remove("open")));

/* Contact form */
$("#f").onsubmit = e => {
  e.preventDefault();
  const name = $("#n").value.trim();
  const email = $("#e").value.trim();
  const msg = $("#m").value.trim();
  const subject = encodeURIComponent("Message from " + name);
  const body = encodeURIComponent(msg + "\n\n— " + name + "\n" + email);
  location.href = `mailto:rajuislam.bd415@gmail.com?subject=${subject}&body=${body}`;

  const note = $("#form-note");
  note.hidden = false;
  note.textContent = "Opening your email app…";
};

/* Back to top */
$("#top").onclick = () => {
  scrollTo({ top: 0, behavior: "smooth" });
};
