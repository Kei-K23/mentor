"use client";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type CodeBlockProps = {
  code: string;
};

const CodeBlock = ({ code }: CodeBlockProps) => {
  return (
    <SyntaxHighlighter style={oneDark} showLineNumbers showInlineLineNumbers>
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
