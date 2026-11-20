import { getProjects } from "@/lib/projects";
import {
  gridItems,
  heroBackgrounds,
  heroCards,
  heroTabs,
  indexItems,
  replaceListInner,
} from "@/lib/workMarkup";
import { html } from "@/site-content/work";

export const dynamic = "force-dynamic";

export default async function WorkPage() {
  const projects = await getProjects();
  const featured = projects.slice(0, 3);

  let page = html;
  page = replaceListInner(page, "work-hero_content_cms_list w-dyn-items", heroCards(featured));
  page = replaceListInner(page, "work-hero_bg_cms_list u-cover-absolute w-dyn-items", heroBackgrounds(featured));
  page = replaceListInner(page, "work-hero_tabs_cms_list w-dyn-items", heroTabs(featured));
  page = replaceListInner(page, "work-list_cms-index_list w-dyn-items", indexItems(projects));
  page = replaceListInner(page, "work-list_cms-grid_list u-grid-above w-dyn-items", gridItems(projects));

  return <div dangerouslySetInnerHTML={{ __html: page }} />;
}
