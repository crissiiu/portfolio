import { I18n } from "../core/i18n.js";

export function createAboutCard({ image, title, description }) {
  const translatedTitle = I18n.t(title);

  const descriptionItems = I18n.t(description);

  return `
        <li class="about-card">
            <div class="about-card__icon-wrapper">
                    <img src="/assets/images/${image}" alt="${translatedTitle} icon" class="about-card__icon">
                </div>
            <h3 class="about-card__title">${translatedTitle}</h3>
            <p class="about-card__description">
                ${descriptionItems}
            </p>
        </div>
    `;
}
