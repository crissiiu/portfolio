import { experiences } from '../data/experience.js';
import { createExperienceItem } from '../components/experience-item.js';

export function initExperience() {
    const container = document.getElementById('experience-list');
    if (!container) return;

    container.innerHTML = experiences
        .map(exp => createExperienceItem(exp))
        .join('');
}
