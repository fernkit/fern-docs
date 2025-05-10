
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

  // Basic syntax highlighting for C
  const highlightC = (code: string) => {
    return code
      .replace(/(\/\/.*)/g, '<span class="comment">$1</span>')
      .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>')
      .replace(/\b(if|else|for|while|do|switch|case|break|continue|return|void|static|const|struct|typedef|extern|inline|sizeof)\b/g, '<span class="keyword">$1</span>')
      .replace(/\b(int|char|float|double|long|short|unsigned|size_t|uint32_t)\b/g, '<span class="type">$1</span>')
      .replace(/\b(Point_create|ButtonWidget|Container|CircleWidget|LineWidget|TextWidget|runApp|fern_start_render_loop)\b/g, '<span class="function">$1</span>')
      .replace(/\b(0x[a-fA-F0-9]+|\d+)\b/g, '<span class="number">$1</span>')
      .replace(/(#\w+)/g, '<span class="preprocessor">$1</span>')
      .replace(/(".*?")/g, '<span class="string">$1</span>')
      .replace(/('.')/g, '<span class="string">$1</span>');
  };

  return (
    <div className="relative group">
      {fileName && (
        <div className="text-xs font-mono bg-muted/70 text-muted-foreground px-4 py-1 rounded-t-md border border-b-0 border-border">
          {fileName}
        </div>
      )}
      <div className="relative">
        <pre className={`language-${language} ${fileName ? 'rounded-t-none' : ''} code-${language}`}>
          {language === 'c' ? (
            <code dangerouslySetInnerHTML={{ __html: highlightC(code) }} />
          ) : (
            <code>{code}</code>
          )}
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
