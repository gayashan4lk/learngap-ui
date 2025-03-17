import ReactMarkdown from "react-markdown";
import { promises as fs } from "fs";
import path from "path";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Components } from "react-markdown";
import { TabsContent } from "@/components/ui/tabs";
import { DetailedHTMLProps, HTMLAttributes } from "react";

async function getMarkdownContent() {
  const markdownPath = path.join(process.cwd(), "mock_data/digital-persona.md");
  return await fs.readFile(markdownPath, "utf8");
}

export async function DigitalPersona() {
  const markdownContent = await getMarkdownContent();

  const components: Components = {
    h1: (props) => (
      <h1 className="text-3xl font-bold text-primary">{props.children}</h1>
    ),
    h2: (props) => (
      <h2 className="text-2xl font-semibold mt-6">{props.children}</h2>
    ),
    table: (props) => (
      <div className="overflow-x-auto">
        <table className="table-auto w-full">{props.children}</table>
      </div>
    ),
    strong: (props) => <Badge variant="outline">{props.children}</Badge>,
  };

  return (
    <TabsContent value="digital-persona">
      <Card>
        <CardContent>
          <div className="prose max-w-none">
            <ReactMarkdown
              components={components}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {markdownContent}
            </ReactMarkdown>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
