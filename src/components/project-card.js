import { I18n } from "../core/i18n.js";

export function createProjectCard({
  image,
  title,
  description,
  tags,
  github_link,
  website_link,
}) {
  var translatedTitle = I18n.t(title);
  var translatedDescription = I18n.t(description);

  return `
        <div class="project-card">
            <div class="project-card__image-wrapper">
                <img src="assets/images/${!image ? "logo.png" : image}" alt="${translatedTitle}" class="project-card__image"/>
            </div>
            <div class="project-card__content">
                <h3 class="project-card__title">${translatedTitle}</h3>
                <p class="project-card__description">${translatedDescription}</p>
                <div class="project-card__tags">
                    ${tags ? tags.map(tag => `<span class="project-card__tag" data-tag="${tag}">${tag}</span>`).join('') : ''}
                </div>
                <div class="project-card__actions">
                ${
                  github_link
                    ? `
                <a href="${github_link}" class="project-card__link project-card__link--github" target="_blank" rel="noopener noreferrer">
                    <img src="/assets/images/github.png" alt="GitHub Repository">
                </a>
                `
                    : ""
                }

                ${
                  website_link
                    ? `<a href="${website_link}" class="project-card__website-link" target="_blank" rel="noopener noreferrer">
                        <img src="/assets/images/resize.png" alt="Website Link">
                    </a>`
                    : ""
                } 
                </div>
            </div>
        </div>
  `;
}
