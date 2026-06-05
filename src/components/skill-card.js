import { I18n } from "../core/i18n.js";

/**
 * Skill Card Component
 * @param {Object} data - Skill data object
 * @returns {string} - HTML string
 */
export function createSkillCard({ image, title, skills }) {
  const skillItems = skills.map((skill) => `<li>${skill}</li>`).join("");
  const translatedTitle = I18n.t(title);

  return `
        <div class="skill-card">
            <div class="skill-card__header">
                <div class="skill-card__icon-wrapper">
                    <img src="/assets/images/${image}" alt="${translatedTitle} icon" class="skill-card__icon">
                </div>
                <h3 class="skill-card__title">${translatedTitle}</h3>
            </div>
            <ul class="skill-card__list">
                ${skillItems}
            </ul>
        </div>
    `;
}
