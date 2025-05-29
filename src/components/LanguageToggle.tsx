import React from 'react';
import { Button } from "../components/ui/button";
import { useLanguageContext } from '../hooks/useLanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguageContext();

  return (
    <div className="flex items-center space-x-2 mb-4">
      <span className="text-sm text-muted-foreground">Implementation:</span>
      <div className="flex rounded-md overflow-hidden border border-input">
        <Button
          variant="ghost"
          size="sm"
          className={`rounded-none px-3 py-1 h-8 ${
            language === 'cpp' ? 'bg-primary text-primary-foreground' : ''
          }`}
          onClick={() => setLanguage('cpp')}
        >
          C++
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`rounded-none px-3 py-1 h-8 ${
            language === 'c' ? 'bg-primary text-primary-foreground' : ''
          }`}
          onClick={() => setLanguage('c')}
        >
          C
        </Button>
      </div>
    </div>
  );
};

export default LanguageToggle;
