/* Nicole Grant — minimal site script.
 * Mobile nav toggle + current-page marker.
 * No dependencies. Pure vanilla. Safe to load with `defer`.
 */
(function () {
  "use strict";

  // ---- Mobile navigation toggle ----
  var toggle  = document.querySelector("[data-nav-toggle]");
  var panel   = document.querySelector("[data-nav-mobile]");
  var closer  = document.querySelector("[data-nav-close]");

  function openNav() {
    if (!panel) return;
    panel.setAttribute("data-open", "true");
    if (toggle) toggle.setAttribute("aria-expanded", "true");
    document.documentElement.style.overflow = "hidden";
    var firstLink = panel.querySelector("a, button");
    if (firstLink) firstLink.focus();
  }
  function closeNav() {
    if (!panel) return;
    panel.setAttribute("data-open", "false");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.focus();
    }
    document.documentElement.style.overflow = "";
  }

  if (toggle && panel) {
    toggle.addEventListener("click", openNav);
  }
  if (closer) {
    closer.addEventListener("click", closeNav);
  }
  if (panel) {
    panel.addEventListener("click", function (e) {
      if (e.target && e.target.tagName === "A") closeNav();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && panel && panel.getAttribute("data-open") === "true") {
      closeNav();
    }
  });

  // ---- Mark current nav link ----
  // Compares pathname (last segment) against each nav link's href.
  var path = location.pathname.split("/").pop() || "index.html";
  if (path === "" ) path = "index.html";
  var links = document.querySelectorAll("[data-nav-link]");
  links.forEach(function (a) {
    var href = a.getAttribute("href");
    if (!href) return;
    var leaf = href.split("/").pop();
    if (leaf === path) {
      a.setAttribute("aria-current", "page");
    }
  });
})();
