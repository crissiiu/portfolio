import { createProjectCard } from "../components/project-card.js";
import { projectsData } from "../data/projects.js";

export { projectsData };

export function initProject(options = { limit: 4 }) {
  const container = document.getElementById("projects-list");
  if (!container) return;

  let projects = [...projectsData].sort(
    (a, b) => (a.priority || 99) - (b.priority || 99)
  );

  const totalProjects = projects.length;

  if (options.limit && !options.page) {
    projects = projects.slice(0, options.limit);
  } else if (options.limit && options.page) {
    const start = (options.page - 1) * options.limit;
    const end = start + options.limit;
    projects = projects.slice(start, end);
  }

  container.innerHTML = projects
    .map((item) => createProjectCard(item))
    .join("");

  // Initialize zoom
  initImageZoom();

  // Handle pagination if a container exists and page is provided
  if (options.page && document.getElementById("pagination")) {
    renderPagination(totalProjects, options.limit, options.page, options.onPageChange);
  }
}

function renderPagination(total, limit, currentPage, onPageChange) {
  const paginationContainer = document.getElementById("pagination");
  if (!paginationContainer) return;

  const totalPages = Math.ceil(total / limit);
  if (totalPages <= 1) {
    paginationContainer.innerHTML = "";
    return;
  }

  let html = `
    <button class="pagination__btn" ${currentPage === 1 ? "disabled" : ""} data-page="${currentPage - 1}">
      &larr; Prev
    </button>
  `;

  for (let i = 1; i <= totalPages; i++) {
    html += `
      <button class="pagination__page ${i === currentPage ? "active" : ""}" data-page="${i}">
        ${i}
      </button>
    `;
  }

  html += `
    <button class="pagination__btn" ${currentPage === totalPages ? "disabled" : ""} data-page="${currentPage + 1}">
      Next &rarr;
    </button>
  `;

  paginationContainer.innerHTML = html;

  paginationContainer.querySelectorAll("button").forEach((btn) => {
    btn.onclick = () => {
      const page = parseInt(btn.getAttribute("data-page"));
      if (page && page !== currentPage && page >= 1 && page <= totalPages) {
        onPageChange(page);
      }
    };
  });
}

function initImageZoom() {
  const images = document.querySelectorAll(".project-card__image");
  images.forEach((img) => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => {
      openModal(img.src);
    });
  });
}

function openModal(src) {
  let modal = document.getElementById("image-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "image-modal";
    modal.className = "image-modal";
    modal.innerHTML = `
      <span class="image-modal__close">&times;</span>
      <img class="image-modal__content" id="modal-img">
    `;
    document.body.appendChild(modal);

    modal.querySelector(".image-modal__close").onclick = () => {
      modal.classList.remove("open");
    };

    modal.onclick = (e) => {
      if (e.target === modal) {
        modal.classList.remove("open");
      }
    };

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("open")) {
        modal.classList.remove("open");
      }
    });
  }

  const modalImg = document.getElementById("modal-img");
  modalImg.src = src;
  modal.classList.add("open");
}
