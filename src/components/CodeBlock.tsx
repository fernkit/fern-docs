import React, { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Copy } from 'lucide-react';
import { useToast } from "../hooks/use-toast";
import Prism from 'prismjs';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-bash';
import { useLanguageContext } from '../hooks/useLanguageContext';
import '../prism-style.css';

interface CodeBlockProps {
  code: string;
  language?: string;
  fileName?: string;
}

const CodeBlock = ({ code, language = 'c', fileName }: CodeBlockProps) => {
  const { toast } = useToast();
  const codeRef = useRef<HTMLElement>(null);
  const { language: contextLanguage } = useLanguageContext();
  
  // Use contextLanguage to determine the actual language if the current language is 'auto'
  const effectiveLanguage = language === 'auto' ? contextLanguage : language;
  
  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, effectiveLanguage]);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied to clipboard",
      description: "Code has been copied to your clipboard",
      duration: 2000,
    });
  };

  return (
    <div className="relative group my-4 code-block-wrapper">
      {fileName && (
        <div className="text-xs font-mono bg-[#1a1b26] text-gray-300 px-4 py-1 rounded-t-md border border-b-0 border-[#292e42]">
          {fileName}
        </div>
      )}
      <div className="relative">
        <pre className={`${fileName ? 'rounded-t-none' : ''} rounded-md p-4 bg-[#1a1b26] border border-[#292e42] overflow-x-auto`}>
          <code ref={codeRef} className={`language-${effectiveLanguage} font-mono text-sm`}>
            {code}
          </code>
        </pre>
        <Button 
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity bg-[#292e42]/50 hover:bg-[#292e42] text-white"
          onClick={copyToClipboard}
        >
          <Copy className="h-4 w-4" />
          <span className="sr-only">Copy code</span>
        </Button>
      </div>
    </div>
  );
};

export default CodeBlock;