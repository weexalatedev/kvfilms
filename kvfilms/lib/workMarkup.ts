import type { Project } from "./projects";

/**
 * Markup generated for the work page. It mirrors the class structure of the
 * Webflow export so the exported stylesheet and scripts keep working while the
 * content comes from Payload.
 */

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Direct video files can play inline; page links (Vimeo, YouTube) cannot. */
export function isDirectVideo(url: string) {
  return /\.(mp4|webm|ogg)(\?|#|$)/i.test(url);
}

const href = (project: Project) => `/work/${encodeURIComponent(project.slug)}`;

const coverImage = (project: Project, className: string) =>
  `<img src="${escapeHtml(project.image.url)}" alt="${escapeHtml(project.image.alt || project.title)}" loading="lazy" style="object-fit:cover" class="${className}">`;

const cardVideo = (project: Project) =>
  isDirectVideo(project.videoUrl)
    ? `<video src="${escapeHtml(project.videoUrl)}" autoplay loop muted playsinline class="u-video_wrap"></video>`
    : "";

export function heroCards(projects: Project[]) {
  return projects
    .map(
      (project, index) => `<div role="listitem" class="work-hero_content_cms_item is-active w-dyn-item">
<a href="${href(project)}" class="work-hero_card w-inline-block">
<h1 class="work-hero_card_heading">${escapeHtml(project.title)}</h1>
<div class="work-hero_card_number w-embed"><p>[${index + 1}]</p></div>
</a>
</div>`,
    )
    .join("");
}

export function heroBackgrounds(projects: Project[]) {
  return projects
    .map((project) => {
      const media = isDirectVideo(project.videoUrl)
        ? `<video src="${escapeHtml(project.videoUrl)}" autoplay loop muted playsinline class="u-video_wrap"></video>`
        : coverImage(project, "u-cover-absolute");
      return `<div role="listitem" class="work-hero_bg_cms_item is-active w-dyn-item">
<div class="work-hero_video_wrap">${media}</div>
</div>`;
    })
    .join("");
}

export function heroTabs(projects: Project[]) {
  return projects
    .map(
      () => `<div page-load-tabs="" role="listitem" class="work-hero_tabs_cms_item w-dyn-item">
<div class="work-hero_tabs_playbar_wrap"><div class="work-hero_tabs_playbar_line"></div></div>
</div>`,
    )
    .join("");
}

const STAR_ICON = `<div class="work-list_small-icon_wrap"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 14 12" fill="none"><path d="M5.31733 7.65983C5.65679 9.72162 6.52339 11.3455 6.86178 11.9204C6.92425 12.0265 7.07575 12.0265 7.13822 11.9204C7.47661 11.3455 8.34321 9.72162 8.6824 7.65983C11.1892 7.36327 13.1862 6.49503 13.9083 6.14692C14.0306 6.08805 14.0306 5.91223 13.9083 5.85335C13.1865 5.50524 11.1892 4.63727 8.6824 4.34017C8.34294 2.27838 7.47634 0.654502 7.13795 0.0795659C7.07548 -0.026522 6.92398 -0.026522 6.86151 0.0795659C6.52313 0.654502 5.65652 2.27838 5.31733 4.34017C2.81083 4.637 0.813514 5.50524 0.0917013 5.85308C-0.0305671 5.91196 -0.0305671 6.08777 0.0917013 6.14665C0.813514 6.49476 2.81083 7.36273 5.3176 7.65983H5.31733Z" fill="currentColor"></path></svg></div>`;

const VIEW_PROJECT = `<div class="work-list_cms-index_action">
<div class="u-text-button u-text-font-quaternary u-text-transform-uppercase">
<div class="c-clickable_wrap">
<a class="c-clickable_link w-inline-block" href="" aria-label="View project"><span class="c-clickable_text u-sr-only">View Project</span></a>
</div>
<div class="u-text-button_label_wrap"><span data-button-animate-chars="" class="u-text-button_label">View Project</span></div>
</div>
</div>`;

export function indexItems(projects: Project[]) {
  return projects
    .map((project) => {
      const video = cardVideo(project);
      const image = coverImage(
        project,
        `${video ? "work-list_image_placeholder " : ""}u-cover-absolute`,
      );
      return `<div role="listitem" class="work-list_cms-index_item w-dyn-item">
<div data-prevent-flicker="true" data-card-reveal="true" class="work-list_cms-index_card u-grid-above">
<div class="work-list_cms-index_card_title">
<h3 class="work-list_heading u-text-style-h5">${escapeHtml(project.title)}</h3>
<div class="work-list_client_wrap u-mb-1"><div class="w-embed"><p>Format: ${escapeHtml(project.category)}</p></div></div>
${project.director ? `<div class="work-list_client_wrap"><div class="w-embed"><p>Director: ${escapeHtml(project.director)}</p></div></div>` : ""}
</div>
<div class="work-list_cms-index_card_image">
<a data-cursor-custom="active" href="${href(project)}" class="work-list_image_wrap w-inline-block">
<div class="work-list_image">${video}${image}</div>
</a>
</div>
<div class="work-list_cms-index_description">
${STAR_ICON}
<p class="u-text-style-main u-text-font-tertiary u-mb-6">${escapeHtml(project.description)}</p>
${VIEW_PROJECT.replace('href=""', `href="${href(project)}"`)}
</div>
</div>
</div>`;
    })
    .join("");
}

export function gridItems(projects: Project[]) {
  return projects
    .map((project) => {
      const video = cardVideo(project);
      const image = coverImage(
        project,
        `${video ? "work-list_image_placeholder " : ""}u-cover-absolute`,
      );
      return `<div role="listitem" class="work-list_cms-grid_item w-dyn-item">
<a data-cursor-custom="active" href="${href(project)}" class="featured-work_card w-inline-block">
<div class="featured-work_card_image"><div class="work-list_image"><div class="work-list_image">${video}${image}</div></div></div>
<div class="featured-work_card_content">
<div class="featured-work_card_title">
<h4 class="featured-work_card_heading u-text-style-h5">${escapeHtml(project.title)}</h4>
${project.director ? `<p class="u-text-style-extra-small u-text-font-tertiary">${escapeHtml(project.director)}</p>` : ""}
</div>
<div class="featured-work_card_subheading"><p>Format:</p><p>${escapeHtml(project.category)}</p></div>
</div>
</a>
</div>`;
    })
    .join("");
}

/**
 * Replaces the inner HTML of the first element whose class attribute matches,
 * using a balanced `<div>` scan so nested markup is handled correctly.
 */
export function replaceListInner(html: string, className: string, inner: string) {
  const marker = `class="${className}"`;
  const attributeIndex = html.indexOf(marker);
  if (attributeIndex < 0) return html;

  const openStart = html.lastIndexOf("<div", attributeIndex);
  const openEnd = html.indexOf(">", attributeIndex) + 1;
  if (openStart < 0 || openEnd <= 0) return html;

  let depth = 1;
  let cursor = openEnd;
  let closeStart = openEnd;

  while (cursor < html.length) {
    const nextOpen = html.indexOf("<div", cursor);
    const nextClose = html.indexOf("</div>", cursor);
    if (nextClose < 0) return html;

    if (nextOpen >= 0 && nextOpen < nextClose) {
      depth += 1;
      cursor = nextOpen + 4;
    } else {
      depth -= 1;
      closeStart = nextClose;
      cursor = nextClose + 6;
      if (depth === 0) break;
    }
  }

  return html.slice(0, openEnd) + inner + html.slice(closeStart);
}
