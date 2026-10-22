import React from 'react';
import { SupportedLocale } from '../../core/contracts/types';
export interface LanguageDropdownProps {
    locale: SupportedLocale;
    onSelectLocale: (locale: SupportedLocale) => void;
    compact?: boolean;
}
export declare const LanguageDropdown: React.FC<LanguageDropdownProps>;
//# sourceMappingURL=LanguageDropdown.d.ts.map