import { html } from "@/site-content/why";

export default function WhyPage() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
