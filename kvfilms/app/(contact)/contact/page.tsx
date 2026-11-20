import { html } from "@/site-content/contact";

export default function ContactPage() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
