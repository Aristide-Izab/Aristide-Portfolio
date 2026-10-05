const order = ["home", "projects", "about", "contact"];
const details = {
  "meet-and-mani": {
    number: "01",
    category: "BEAUTY MARKETPLACE",
    title: "Meet&Mani",
    intro:
      "Making it easier for clients and nail technicians to meet in convenient, accessible places.",
    problem:
      "Travel and venue costs can make beauty appointments harder to arrange. Meet&Mani explores a simpler way for clients to find nail technicians and choose suitable meeting locations.",
    work: "I am developing the web experience, starting with the technician side, including how services and pricing are presented. The project is in development.",
    stack: ["React", "TypeScript", "Java", "Spring Boot", "MySQL"],
    link: "https://github.com/Aristide-Izab/meet-and-mani",
    linkLabel: "View on GitHub",
  },
  "community-store": {
    number: "02",
    category: "CAMPUS COMMERCE",
    title: "Community Store",
    intro:
      "A marketplace app designed around the people and everyday needs of a university community.",
    problem:
      "Students and other campus members need a simple way to discover products and connect within their own community.",
    work: "I built the first phase of the Android onboarding experience: welcome, account choice, login, registration, student verification, and password reset. The app uses Firebase Authentication and Firestore for account flows.",
    stack: ["Android", "Java", "Firebase Authentication", "Firestore"],
    link: "Mobile app is in development and not yet publicly available.",
    linkLabel: "Private repository",
  },
  "ssg-auto-glass": {
    number: "03",
    category: "CLIENT WEBSITE",
    title: "SSG Auto Glass",
    intro:
      "A responsive service website created for a windscreen business client.",
    problem:
      "The business needed a clear online presence where customers could understand its services and quickly request a quote or call directly.",
    work: "I designed and developed the responsive client website, maintained its functionality and performance, resolved technical issues, and supported updates connected to its Google Ads campaigns.",
    stack: ["HTML", "CSS", "JavaScript", "Responsive design"],
    link: "https://github.com/Aristide-Izab/SSGAUTOGLASS",
    linkLabel: "View on GitHub",
  },
};

let active = "home";

function route() {
  const hash = decodeURIComponent(location.hash.slice(1));
  let view = order.includes(hash)
    ? hash
    : hash.startsWith("project/") && details[hash.slice(8)]
      ? "detail"
      : "home";

  if (view === "detail") {
    const d = details[hash.slice(8)];
    document.getElementById("detail-content").innerHTML =
      `<div class="detail-heading"><div class="eyebrow"><span></span> ${d.number} / ${d.category}</div><h2 id="detail-title">${d.title}<em>.</em></h2><p>${d.intro}</p></div><div class="detail-layout"><div class="detail-art detail-art-${d.number}"><span>${d.number} / SELECTED WORK</span><strong>${d.title}</strong><span>ARISTIDE IZABKORA ↗</span></div><div class="detail-text"><div><span class="index">THE PROBLEM</span><p>${d.problem}</p></div><div><span class="index">MY WORK</span><p>${d.work}</p></div><div><span class="index">TOOLS & FOCUS</span><div class="tags">${d.stack.map((s) => `<span>${s}</span>`).join("")}</div></div>${d.link ? `<a class="primary-btn" href="${d.link}" target="_blank" rel="noopener noreferrer">${d.linkLabel} <span>↗</span></a>` : ""}</div></div>`;
  }

  document.querySelectorAll(".view").forEach((el) => {
    const on = el.dataset.view === view;
    el.classList.toggle("active", on);
    el.setAttribute("aria-hidden", String(!on));
    el.inert = !on;
  });

  document
    .querySelectorAll("[data-nav]")
    .forEach((el) => el.classList.toggle("selected", el.dataset.nav === view));

  document.body.dataset.view = view;
  active = view;
  window.scrollTo(0, 0);
}

function move(n) {
  const current = order.indexOf(active);
  location.hash =
    order[
      Math.max(0, Math.min(order.length - 1, (current < 0 ? 1 : current) + n))
    ];
}

document
  .getElementById("back-projects")
  .addEventListener("click", () => (location.hash = "projects"));

document
  .querySelectorAll("[data-jump]")
  .forEach((el) =>
    el.addEventListener("click", () => (location.hash = el.dataset.jump)),
  );

document.addEventListener("keydown", (e) => {
  if (
    e.altKey ||
    e.ctrlKey ||
    e.metaKey ||
    e.target.closest("a,button,input,textarea")
  )
    return;

  if (e.key === "ArrowRight") move(1);
  if (e.key === "ArrowLeft") move(-1);
});

window.addEventListener("hashchange", route);
route();