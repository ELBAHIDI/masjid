import React from 'react';
import { LanguageProvider } from '@site/src/contexts/LanguageContext';

export default function Root({ children }): JSX.Element {
  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  );
} 