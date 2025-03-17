import { TabsContent } from "@/components/ui/tabs";
import ReactMarkdown from "react-markdown";
import { promises as fs } from "fs";
import path from "path";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Components } from "react-markdown";
import { DetailedHTMLProps, HTMLAttributes } from "react";

async function getMarkdownContent() {
  const markdownPath = path.join(process.cwd(), "mock_data/gap-analysis.md");
  return await fs.readFile(markdownPath, "utf8");
}

export async function GapAnalysis() {
  const markdownContent = await getMarkdownContent();

  const components: Components = {
    h1: (props) => (
      <h1 className="text-3xl font-bold text-primary mb-4 pb-4 border-b">
        {props.children}
      </h1>
    ),
    h2: (props) => (
      <h2 className="text-2xl font-semibold text-primary/80 mt-4 mb-4">
        {props.children}
      </h2>
    ),
    h3: (props) => (
      <h3 className="text-xl font-medium text-primary/70 mt-4 mb-3">
        {props.children}
      </h3>
    ),
    p: (props) => (
      <p className="my-4 leading-7 text-gray-700">{props.children}</p>
    ),
    ul: (props) => (
      <ul className="my-6 ml-6 list-disc space-y-3">{props.children}</ul>
    ),
    ol: (props) => (
      <ol className="my-6 ml-6 list-decimal space-y-3">{props.children}</ol>
    ),
    li: (props) => <li className="leading-7">{props.children}</li>,
    a: (props) => (
      <a
        href={props.href}
        className="text-blue-600 hover:text-blue-800 underline underline-offset-2 font-medium"
      >
        {props.children}
      </a>
    ),
    blockquote: (props) => (
      <blockquote className="border-l-4 border-primary/20 pl-4 italic my-6 text-gray-600 bg-gray-50 p-3 rounded-r">
        {props.children}
      </blockquote>
    ),
    table: (props) => (
      <div className="my-8 overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full divide-y divide-gray-200">
          {props.children}
        </table>
      </div>
    ),
    thead: (props) => <thead className="bg-gray-50">{props.children}</thead>,
    tbody: (props) => (
      <tbody className="divide-y divide-gray-200 bg-white">
        {props.children}
      </tbody>
    ),
    tr: (props) => <tr className="hover:bg-gray-50">{props.children}</tr>,
    th: (props) => (
      <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
        {props.children}
      </th>
    ),
    td: (props) => (
      <td className="px-4 py-3 text-sm text-gray-700 w-6">{props.children}</td>
    ),
    strong: (props) => (
      <Badge
        variant="outline"
        className="font-medium bg-primary/5 text-primary border-primary/20 px-2 py-0.5 mx-0.5"
      >
        {props.children}
      </Badge>
    ),
    hr: () => <div className="my-8 h-px bg-gray-200" />,
    code: (props) => (
      <code className="relative rounded bg-gray-100 py-[0.2rem] px-[0.3rem] font-mono text-sm text-gray-800">
        {props.children}
      </code>
    ),
    pre: (props) => (
      <pre className="my-6 overflow-x-auto rounded-lg bg-gray-900 p-4 text-white">
        {props.children}
      </pre>
    ),
  };

  return (
    <TabsContent value="gap-analysis">
      <Card className="border-gray-200 shadow-sm">
        <CardContent className="p-6">
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
