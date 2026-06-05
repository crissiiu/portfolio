import { skillsData } from '../data/skills.js';
import { createSkillCard } from '../components/skill-card.js';

export function initSkills() {
    const container = document.getElementById('skills-list');
    if (!container) return;

    container.innerHTML = skillsData
        .map(skill => createSkillCard(skill))
        .join('');
}
