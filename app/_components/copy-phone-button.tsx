'use client';

import { useState } from 'react';
import { Button } from '@/app/_components/ui/button';

interface CopyPhoneButtonProps {
  phone: string;
}

const CopyPhoneButton = ({ phone }: CopyPhoneButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleCopy}
      className="text-primary hover:text-primary"
    >
      {copied ? 'Copiado!' : 'Copiar'}
    </Button>
  );
};

export default CopyPhoneButton;
