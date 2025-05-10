
import React from 'react';
import { Button } from './ui/button';
import { Copy } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface CodeBlockProps {
  code: string;
  language?: string;
  fileName?: string;
}

const CodeBlock = ({ code, language = 'c', fileName }: CodeBlockProps) => {
  const { toast } = useToast();
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied to clipboard",
      description: "Code has been copied to your clipboard",
      duration: 2000,
    });
  };

  return (
    <div className="relative group">
      {fileName && (
        <div className="text-xs font-mono bg-muted/70 text-muted-foreground px-4 py-1 rounded-t-md border border-b-0 border-border">
          {fileName}
        </div>
      )}
      <div className="relative">
        <pre className={`language-${language} ${fileName ? 'rounded-t-none' : ''} code-${language} overflow-x-auto`}>
          <code>{code}</code>
        </pre>
        <Button 
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
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
