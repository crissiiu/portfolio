import { Renderer } from "./renderer.js";
import { I18n } from "./i18n.js";
import { initProject } from "../features/project.js";

const APP_SECTIONS = [
  {
    selector: "#header",
    path: "./src/layouts/header.html",
    callback: bindEvents,
  }
];

let currentPage = 1;
const PROJECTS_PER_PAGE = 6;

async function init() {
  I18n.init();
  await Renderer.loadAll(APP_SECTIONS);
  render();
}

function render() {
  initProject({
    limit: PROJECTS_PER_PAGE,
    page: currentPage,
    onPageChange: (page) => {
      currentPage = page;
      window.scrollTo({ top: 0, behavior: "smooth" });
      render();
    },
  });
}

function bindEvents() {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const siteNav = document.querySelector(".site-nav");

  if (mobileMenuBtn && siteNav) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenuBtn.classList.toggle("open");
      siteNav.classList.toggle("open");
    });
  }

  // Language switching
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      I18n.setLanguage(lang);
      render();
    });
  });
}

document.addEventListener("DOMContentLoaded", init);
