import { abouts } from "../data/about.js";
import { createAboutCard } from "../components/about-card.js";

export function initAbout() {
  const container = document.getElementById("about-highlights-list");

  if (!container) return;

  container.innerHTML = abouts.map((item) => createAboutCard(item)).join("");
}
