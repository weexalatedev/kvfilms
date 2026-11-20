import { footer, nav, scripts } from "@/site-content/chrome";

import type { Project } from "./projects";
import { escapeHtml } from "./workMarkup";

/**
 * The project page the export never shipped: a full-bleed still, the project
 * title and credits, the synopsis, optional film and gallery, and a link to the
 * next project. It reuses the site's own nav, footer, styles and scripts.
 */

const PROJECT_CSS = `
/* --- Project Page | CSS --- */
.project_hero_media { position: relative; width: 100%; height: clamp(20rem, 62vh, 46rem); overflow: hidden; background: color-mix(in lab, currentColor 8%, transparent); }
.project_hero_media img { width: 100%; height: 100%; object-fit: cover; display: block; }
.project_hero_media::after { content: ""; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(180deg, rgba(11, 12, 16, 0.1) 0%, rgba(11, 12, 16, 0.8) 100%); }
.project_content { padding-top: clamp(1.5rem, 4vw, 3rem); padding-bottom: clamp(2rem, 5vw, 4rem); }
.project_back { display: inline-flex; align-items: center; gap: 0.5rem; font-family: var(--_typography---font-family--quaternary); font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.6; transition: opacity 0.3s ease; }
.project_back:hover { opacity: 1; }
.project_eyebrow { margin-top: clamp(1.5rem, 4vw, 3rem); margin-bottom: 0; font-family: var(--_typography---font-family--quaternary); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; opacity: 0.55; }
.project_title { margin: 0.5rem 0 0; font-family: var(--_typography---font-family--primary); font-size: clamp(2.5rem, 8vw, 7rem); font-weight: 500; line-height: 0.95; letter-spacing: -0.01em; text-transform: uppercase; }
.project_meta { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1.5rem; margin-top: clamp(2rem, 5vw, 3.5rem); padding-top: 1.5rem; border-top: 1px solid color-mix(in lab, currentColor 18%, transparent); }
.project_meta p { margin: 0; }
.project_meta p:first-child { margin-bottom: 0.4rem; font-family: var(--_typography---font-family--quaternary); font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.55; }
.project_meta p:last-child { font-family: var(--_typography---font-family--tertiary); font-size: 1.0625rem; line-height: 1.3; }
.project_section { padding: clamp(2.5rem, 6vw, 5rem) 0; border-top: 1px solid color-mix(in lab, currentColor 14%, transparent); }
.project_two_col { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 2.1fr); gap: clamp(1.5rem, 4vw, 4rem); align-items: start; }
.project_label { margin: 0; font-family: var(--_typography---font-family--quaternary); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; opacity: 0.55; }
.project_text { font-family: var(--_typography---font-family--tertiary); font-size: clamp(1.0625rem, 1.5vw, 1.375rem); line-height: 1.5; }
.project_text p { margin: 0 0 1.25rem; }
.project_text p:last-child { margin-bottom: 0; }
.project_credits { display: grid; grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr)); gap: 1.25rem 2rem; margin: 0; }
.project_credits p { margin: 0; }
.project_credits p:first-child { margin-bottom: 0.3rem; font-family: var(--_typography---font-family--quaternary); font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.55; }
.project_credits p:last-child { font-family: var(--_typography---font-family--tertiary); font-size: 1.0625rem; }
.project_video { position: relative; width: 100%; aspect-ratio: 16 / 9; overflow: hidden; background: #000; }
.project_video iframe, .project_video video { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; object-fit: cover; }
.project_gallery { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(0.5rem, 1.5vw, 1rem); }
.project_gallery img { width: 100%; height: 100%; aspect-ratio: 4 / 3; object-fit: cover; display: block; }
.project_next { display: flex; align-items: flex-end; justify-content: space-between; gap: 2rem; padding-bottom: clamp(3rem, 7vw, 6rem); }
.project_next p { margin: 0; }
.project_next p:first-child { font-family: var(--_typography---font-family--quaternary); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; opacity: 0.55; }
.project_next_title { margin-top: 0.75rem !important; font-family: var(--_typography---font-family--primary); font-size: clamp(1.75rem, 4.5vw, 3.5rem); font-weight: 500; line-height: 1; text-transform: uppercase; }
.project_next_arrow { font-size: clamp(1.5rem, 3vw, 2.5rem); line-height: 1; transition: transform 0.4s cubic-bezier(0.215, 0.61, 0.355, 1); }
.project_next:hover .project_next_arrow { transform: translateX(0.5rem); }
@media screen and (max-width: 767px) {
  .project_meta { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .project_two_col { grid-template-columns: minmax(0, 1fr); }
  .project_gallery { grid-template-columns: minmax(0, 1fr); }
}
`;

function paragraphs(text: string) {
  return text
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => `<p>${escapeHtml(block).replace(/\n/g, "<br>")}</p>`)
    .join("");
}

function videoEmbed(project: Project) {
  const url = project.videoUrl;
  if (!url) return "";

  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  const youtube = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{6,})/i);

  const source = vimeo
    ? `<iframe src="https://player.vimeo.com/video/${vimeo[1]}" title="${escapeHtml(project.title)}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe>`
    : youtube
      ? `<iframe src="https://www.youtube.com/embed/${youtube[1]}" title="${escapeHtml(project.title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>`
      : `<video src="${escapeHtml(url)}" poster="${escapeHtml(project.image.url)}" controls playsinline preload="metadata"></video>`;

  return `<section class="project_section"><div class="u-container-large"><div class="project_video">${source}</div></div></section>`;
}

function creditList(project: Project) {
  const credits = project.credits.length
    ? project.credits
    : [
        { label: "Format", value: project.category },
        { label: "Director", value: project.director },
        { label: "Client", value: project.client },
        { label: "Year", value: project.year },
      ].filter((credit) => credit.value);

  if (credits.length === 0) return "";

  return `<section class="project_section"><div class="u-container-large project_two_col">
<p class="project_label">Credits</p>
<div class="project_credits">${credits
    .map((credit) => `<div><p>${escapeHtml(credit.label)}</p><p>${escapeHtml(credit.value)}</p></div>`)
    .join("")}</div>
</div></section>`;
}

function gallery(project: Project) {
  if (project.gallery.length === 0) return "";

  return `<section class="project_section"><div class="u-container-large">
<div class="project_gallery">${project.gallery
    .map(
      (image) =>
        `<img src="${escapeHtml(image.url)}" alt="${escapeHtml(image.alt || project.title)}" loading="lazy">`,
    )
    .join("")}</div>
</div></section>`;
}

function nextProject(project: Project, nextProject: Project) {
  if (project.slug === nextProject.slug) return "";

  return `<section><div class="u-container-large"><a class="project_next" href="/work/${encodeURIComponent(
    nextProject.slug,
  )}">
<div>
<p>Next Project</p>
<p class="project_next_title">${escapeHtml(nextProject.title)}</p>
</div>
<span class="project_next_arrow">&rarr;</span>
</a></div></section>`;
}

export function projectPageHtml(project: Project, next: Project) {
  const meta = [
    { label: "Format", value: project.category },
    { label: "Director", value: project.director },
    { label: "Client", value: project.client },
    { label: "Year", value: project.year },
  ].filter((item) => item.value);

  const eyebrow = [project.category, project.year].filter(Boolean).join(" · ");

  return `<div class="page_wrap">
${nav}
<main id="main" class="page_main">
<div class="u-embed-css w-embed"><style>${PROJECT_CSS}</style></div>
<section class="project_hero">
<div class="project_hero_media"><img src="${escapeHtml(project.image.url)}" alt="${escapeHtml(
    project.image.alt || project.title,
  )}"></div>
<div class="project_content u-container-large">
<a class="project_back" href="/work">&larr; All Work</a>
${eyebrow ? `<p class="project_eyebrow">${escapeHtml(eyebrow)}</p>` : ""}
<h1 class="project_title">${escapeHtml(project.title)}</h1>
${
  meta.length
    ? `<div class="project_meta">${meta
        .map((item) => `<div><p>${escapeHtml(item.label)}</p><p>${escapeHtml(item.value)}</p></div>`)
        .join("")}</div>`
    : ""
}
</div>
</section>
${
  project.description
    ? `<section class="project_section"><div class="u-container-large project_two_col">
<p class="project_label">Synopsis</p>
<div class="project_text">${paragraphs(project.description)}</div>
</div></section>`
    : ""
}
${creditList(project)}
${videoEmbed(project)}
${gallery(project)}
${nextProject(project, next)}
</main>
${footer}
${scripts}
</div>`;
}
