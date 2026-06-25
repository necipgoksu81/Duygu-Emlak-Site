/* Duygu Emlak — etkileşimler */
(function () {
  "use strict";

  /* ---- Sticky header shadow ---- */
  var header = document.querySelector(".site-header");
  var onScroll = function () {
    if (header) header.classList.toggle("scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Mobile navigation ---- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  var backdrop = document.querySelector(".nav-backdrop");
  function setNav(open) {
    if (!nav) return;
    nav.classList.toggle("open", open);
    if (backdrop) backdrop.classList.toggle("open", open);
    document.body.classList.toggle("nav-open", open);
    if (toggle) toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }
  if (toggle) toggle.addEventListener("click", function () { setNav(!nav.classList.contains("open")); });
  if (backdrop) backdrop.addEventListener("click", function () { setNav(false); });
  if (nav) nav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { setNav(false); }); });

  /* ---- Reveal on scroll ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- "Daha fazla göster" gallery toggle ---- */
  var gallery = document.querySelector(".gallery");
  var moreBtn = document.querySelector("[data-gallery-more]");
  var INITIAL = 16;
  if (gallery && moreBtn) {
    var figures = Array.prototype.slice.call(gallery.querySelectorAll("figure"));
    if (figures.length > INITIAL) {
      figures.forEach(function (f, i) { if (i >= INITIAL) f.style.display = "none"; });
      var expanded = false;
      moreBtn.addEventListener("click", function () {
        expanded = !expanded;
        figures.forEach(function (f, i) { if (i >= INITIAL) f.style.display = expanded ? "" : "none"; });
        moreBtn.querySelector("[data-more-label]").textContent =
          expanded ? "Daha az göster" : "Tüm fotoğrafları göster (" + figures.length + ")";
        if (!expanded) document.getElementById("galeri").scrollIntoView({ behavior: "smooth" });
      });
      moreBtn.querySelector("[data-more-label]").textContent =
        "Tüm fotoğrafları göster (" + figures.length + ")";
    } else {
      moreBtn.parentNode.style.display = "none";
    }
  }

  /* ---- Lightbox ---- */
  var lb = document.querySelector(".lightbox");
  if (lb && gallery) {
    var lbImg = lb.querySelector("img");
    var lbCounter = lb.querySelector(".lb-counter");
    var triggers = Array.prototype.slice.call(gallery.querySelectorAll("figure"));
    var current = 0;

    function fullSrc(fig) { return fig.getAttribute("data-full"); }

    function show(i) {
      current = (i + triggers.length) % triggers.length;
      var fig = triggers[current];
      lbImg.src = fullSrc(fig);
      lbImg.alt = fig.querySelector("img").alt || "";
      if (lbCounter) lbCounter.textContent = (current + 1) + " / " + triggers.length;
      // preload neighbours
      [current + 1, current - 1].forEach(function (n) {
        var f = triggers[(n + triggers.length) % triggers.length];
        if (f) { var p = new Image(); p.src = fullSrc(f); }
      });
    }
    function open(i) { show(i); lb.classList.add("open"); document.body.style.overflow = "hidden"; }
    function close() { lb.classList.remove("open"); document.body.style.overflow = ""; lbImg.src = ""; }

    triggers.forEach(function (fig, i) {
      fig.addEventListener("click", function () { open(i); });
    });
    lb.querySelector(".lb-close").addEventListener("click", close);
    lb.querySelector(".lb-next").addEventListener("click", function () { show(current + 1); });
    lb.querySelector(".lb-prev").addEventListener("click", function () { show(current - 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") show(current + 1);
      else if (e.key === "ArrowLeft") show(current - 1);
    });

    /* swipe on touch */
    var sx = 0;
    lb.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    }, { passive: true });
  }

  /* ---- Footer year ---- */
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
})();
