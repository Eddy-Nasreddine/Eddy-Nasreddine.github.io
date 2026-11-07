/*
  Renders the project map, tabs and project panel from projects.js.
  You shouldn't need to edit this file to add or change projects.
*/
(function () {
  "use strict";

  const all = (typeof PROJECTS !== "undefined" && Array.isArray(PROJECTS) ? PROJECTS : [])
    .filter((p) => p && p.id && p.title);

  const map = document.getElementById("map");
  const lines = document.getElementById("map-lines");
  const tabs = document.getElementById("tabs");
  const meta = document.getElementById("project-meta");
  const sheet = document.getElementById("sheet");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let current = 0;
  let image = 0;

  // Star positions (in %) used when a project has no `map` field.
  const SLOTS = [[24, 62], [56, 32], [78, 60], [38, 22], [86, 24], [62, 82], [14, 30], [44, 48], [90, 80], [20, 86]];

  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
  const has = (v) => (Array.isArray(v) ? v.length > 0 : v != null && String(v).trim() !== "");
  const pad = (n) => String(n).padStart(2, "0");
  const list = (v) => (Array.isArray(v) ? v.filter(has) : []);

  function position(p, i) {
    if (p.map && isFinite(p.map.x) && isFinite(p.map.y)) return { x: +p.map.x, y: +p.map.y };
    if (i < SLOTS.length) return { x: SLOTS[i][0], y: SLOTS[i][1] };
    let h = 0;
    for (const ch of String(p.id)) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    return { x: 10 + (h % 80), y: 12 + ((h >>> 8) % 76) };
  }

  /* ---------- Map + tabs ---------- */
  function renderNav() {
    const points = [];
    all.forEach((p, i) => {
      const pos = position(p, i);
      points.push(pos.x + "," + pos.y);

      const star = document.createElement("button");
      star.type = "button";
      star.className = "star" + (pos.x > 66 ? " star--left" : "");
      star.style.left = pos.x + "%";
      star.style.top = pos.y + "%";
      star.dataset.index = i;
      star.setAttribute("aria-label", "Open " + p.title);
      star.innerHTML = '<span class="star__dot"></span><span class="star__name">' + pad(i + 1)
        + '<span class="star__title"> ' + esc(p.title) + "</span></span>";
      star.addEventListener("click", () => select(i, true));
      map.appendChild(star);

      const tab = document.createElement("button");
      tab.type = "button";
      tab.className = "tab";
      tab.dataset.index = i;
      tab.innerHTML = '<span class="tab__num">' + pad(i + 1) + "</span>" + esc(p.title);
      tab.addEventListener("click", () => select(i, false));
      tabs.appendChild(tab);
    });
    lines.setAttribute("points", points.join(" "));
  }

  /* ---------- Project panel ---------- */
  function renderSheet() {
    const p = all[current];
    if (!p) {
      sheet.innerHTML = '<p class="sheet__empty">No projects yet. Add one in projects.js.</p>';
      meta.textContent = "";
      return;
    }

    meta.textContent = [p.kind, p.status, p.year].filter(has).join(" · ");

    const images = Array.isArray(p.images) ? p.images.filter((im) => im && (has(im.src) || has(im.caption))) : [];
    image = Math.min(image, Math.max(images.length - 1, 0));

    const links = Array.isArray(p.links) ? p.links.filter((l) => l && has(l.url)) : [];
    let html = '<div class="sheet__head"><div class="sheet__title"><h2>' + esc(p.title) + "</h2>";
    if (has(p.subtitle)) html += '<span class="sheet__sub">' + esc(p.subtitle) + "</span>";
    html += "</div>";
    if (links.length) html += '<div class="sheet__links">' + links.map(linkButton).join("") + "</div>";
    html += "</div>";

    // Body: image + thumbnails on the left, details on the right (stacked on smaller screens)
    let gallery = "";
    if (images.length) {
      const im = images[image];
      const cap = has(im.caption) ? im.caption : p.title;
      gallery += '<div class="gallery"><figure class="figure"><div class="figure__frame">'
        + (has(im.src)
          ? '<a href="' + esc(im.src) + '" target="_blank" rel="noopener"><img src="' + esc(im.src) + '" alt="' + esc(cap) + '"></a>'
          : '<span class="figure__placeholder">' + esc(cap) + "</span>")
        + "</div><figcaption>Fig. " + pad(image + 1) + " — " + esc(cap) + "</figcaption></figure>";
      if (images.length > 1) {
        gallery += '<div class="thumbs">';
        images.forEach((t, i) => {
          const label = has(t.caption) ? t.caption : "Image " + (i + 1);
          gallery += '<button type="button" class="thumb" data-image="' + i + '" aria-pressed="' + (i === image) + '" aria-label="Show ' + esc(label) + '">'
            + (has(t.src) ? '<img src="' + esc(t.src) + '" alt="" loading="lazy">' : pad(i + 1))
            + "</button>";
        });
        gallery += "</div>";
      }
      gallery += "</div>";
    }

    const details = [];
    if (has(p.summary)) {
      details.push('<div class="detail"><span class="label">Overview</span><p>' + esc(p.summary) + "</p></div>");
    }
    const built = list(p.built);
    if (built.length) {
      details.push('<div class="detail"><span class="label">What I built</span><ul class="built">'
        + built.map((b) => {
          // "The mount: ..." → the short label before the colon is shown in bold
          const m = String(b).match(/^([^:]{1,24}):\s+(.*)$/);
          return "<li><span>" + (m ? "<strong>" + esc(m[1]) + ":</strong> " + esc(m[2]) : esc(b)) + "</span></li>";
        }).join("") + "</ul></div>");
    }
    const stack = list(p.stack);
    const specs = Array.isArray(p.specs) ? p.specs.filter((s) => s && has(s.label)) : [];
    if (stack.length || specs.length) {
      let d = '<div class="detail detail--narrow"><span class="label">' + (stack.length ? "Stack" : "Specs") + "</span>";
      if (stack.length) d += '<ul class="chips">' + stack.map((t) => "<li>" + esc(t) + "</li>").join("") + "</ul>";
      if (specs.length) {
        d += '<dl class="specs">' + specs.map((s) => "<div><dt>" + esc(s.label) + "</dt><dd>" + esc(s.value) + "</dd></div>").join("") + "</dl>";
      }
      details.push(d + "</div>");
    }
    const side = details.length ? '<div class="details">' + details.join("") + "</div>" : "";
    if (gallery || side) {
      html += '<div class="sheet__body' + (gallery && side ? "" : " sheet__body--single") + '">' + gallery + side + "</div>";
    }

    sheet.innerHTML = html;

    // A brand name simpleicons.org doesn't know: fall back to the plain link icon.
    sheet.querySelectorAll(".plink__img[data-brand]").forEach((img) => {
      img.addEventListener("error", () => {
        const box = img.closest(".plink__icon");
        if (box) box.innerHTML = svg("link");
      });
    });
  }

  /* ---------- Link buttons (next to the project title) ---------- */
  const CREAM = "F0E9DA";
  const ICONS = {
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    cube: '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5l8 4.5 8-4.5M12 12v9"/>',
    download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  };
  // Built-in link types. `brand` = logo name on simpleicons.org, `color` = hover color
  // when the brand's own color wouldn't show on the dark background.
  const LINK_TYPES = {
    github: { label: "GitHub", brand: "github", color: "FFFFFF" },
    youtube: { label: "YouTube", brand: "youtube" },
    onshape: { label: "Onshape", icon: "cube" },   // no Onshape logo on simpleicons.org
    printables: { label: "Printables", brand: "printables" },
    thingiverse: { label: "Thingiverse", brand: "thingiverse" },
    demo: { label: "Live demo", icon: "globe" },
    website: { label: "Website", icon: "globe" },
    cad: { label: "CAD model", icon: "cube" },
    download: { label: "Download", icon: "download" },
    link: { label: "Link", icon: "link" },
  };

  const svg = (name) => '<svg class="plink__svg" viewBox="0 0 24 24" aria-hidden="true">' + ICONS[name] + "</svg>";

  function linkButton(l) {
    const type = String(has(l.type) ? l.type : "link").toLowerCase().replace(/\s+/g, "");
    const def = LINK_TYPES[type] || { label: type.charAt(0).toUpperCase() + type.slice(1), brand: type };
    const label = has(l.label) ? l.label : def.label;
    const hover = has(l.color) ? String(l.color).replace("#", "") : def.color;

    let icon;
    if (has(l.icon)) {
      icon = '<img class="plink__img" src="' + esc(l.icon) + '" alt="">';
    } else if (def.brand) {
      const base = "https://cdn.simpleicons.org/" + encodeURIComponent(def.brand);
      icon = '<img class="plink__img" data-brand src="' + base + "/" + CREAM + '" alt="">'
        + '<img class="plink__img plink__img--hover" src="' + base + (hover ? "/" + encodeURIComponent(hover) : "") + '" alt="">';
    } else {
      icon = svg(def.icon);
    }

    const style = !def.brand && hover ? ' style="--hover: #' + esc(hover) + '"' : "";
    const external = /^https?:/i.test(l.url);
    return '<a class="plink" href="' + esc(l.url) + '"' + style
      + (external ? ' target="_blank" rel="noopener"' : "")
      + (type === "download" && !external ? " download" : "") + ">"
      + '<span class="plink__icon">' + icon + "</span>" + esc(label) + "</a>";
  }

  function markActive() {
    document.querySelectorAll(".star, .tab").forEach((el) => {
      el.setAttribute("aria-pressed", String(Number(el.dataset.index) === current));
    });
  }

  function select(i, scroll) {
    current = i;
    image = 0;
    markActive();
    renderSheet();
    if (all[i]) history.replaceState(null, "", "#project-" + all[i].id);
    if (scroll) document.getElementById("work").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }

  // Thumbnails
  sheet.addEventListener("click", (e) => {
    const btn = e.target.closest(".thumb");
    if (!btn) return;
    image = Number(btn.dataset.image);
    renderSheet();
    const again = sheet.querySelector('.thumb[data-image="' + image + '"]');
    if (again) again.focus();
  });

  /* ---------- Start ---------- */
  renderNav();
  const fromHash = location.hash.match(/^#project-(.+)$/);
  const start = fromHash ? all.findIndex((p) => p.id === decodeURIComponent(fromHash[1])) : -1;
  current = start >= 0 ? start : 0;
  markActive();
  renderSheet();
  if (start >= 0) document.getElementById("work").scrollIntoView();

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
