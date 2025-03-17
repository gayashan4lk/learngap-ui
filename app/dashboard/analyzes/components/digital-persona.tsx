import ReactMarkdown from "react-markdown";
import { promises as fs } from "fs";
import path from "path";

import { TabsContent } from "@/components/ui/tabs";

async function getMarkdownContent() {
  const markdownPath = path.join(process.cwd(), "mock_data/digital-persona.md");
  return await fs.readFile(markdownPath, "utf8");
}

export async function DigitalPersona() {
  const markdownContent = await getMarkdownContent();

  return (
    <TabsContent value="digital-persona">
      <div className="prose prose-headings:text-primary prose-a:text-blue-600 prose-strong:text-accent max-w-none">
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      </div>
    </TabsContent>
  );
}
