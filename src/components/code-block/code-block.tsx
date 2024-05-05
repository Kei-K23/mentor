"use client";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type CodeBlockProps = {
  code: string;
  language?: string;
};

const CodeBlock = ({ code, language }: CodeBlockProps) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={oneDark}
      showLineNumbers
      showInlineLineNumbers
    >
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
