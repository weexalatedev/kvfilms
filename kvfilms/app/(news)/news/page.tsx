import { html } from "@/site-content/news";

export default function NewsPage() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
