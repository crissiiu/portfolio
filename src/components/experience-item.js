import { I18n } from "../core/i18n.js";

/**
 * Experience Item Component
 * @param {Object} data - Experience data object
 * @returns {string} - HTML string
 */
export function createExperienceItem({
  period,
  role,
  company,
  description,
  logo,
}) {
  const translatedRole = I18n.t(role);
  const translatedCompany = I18n.t(company);
  const translatedDesc = I18n.t(description);

  return `
    <div class="experience-item">
      <!-- Milestone on the timeline line -->
      <div class="experience-item__milestone">
        <div class="experience-item__dot"></div>
      </div>

      <!-- Content below milestone -->
      <div class="experience-item__container">
        <div class="experience-item__icon-wrapper">
          <img src="./assets/images/${logo ? logo : "logo.png"}" alt="${translatedCompany}" class="experience-item__logo">
        </div>

        <div class="experience-item__info">
          <span class="experience-item__period">${period}</span>
          <h3 class="experience-item__role">${translatedRole}</h3>
          <span class="experience-item__company">${translatedCompany}</span>
          <p class="experience-item__description">${translatedDesc}</p>
        </div>
      </div>
    </div>
  `;
}
