"use client";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

import { useEffect, useRef } from "react";

type CodeBlockProps = {
  code: string;
};

const CodeBlock = ({ code }: CodeBlockProps) => {
  const codeRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!codeRef.current) return;
    hljs.highlightElement(codeRef?.current);
  }, []);

  return (
    <pre>
      <code ref={codeRef}>{code}</code>
    </pre>
  );
};

export default CodeBlock;
