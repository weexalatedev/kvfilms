import { html } from "@/site-content/home";

export default function HomePage() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
