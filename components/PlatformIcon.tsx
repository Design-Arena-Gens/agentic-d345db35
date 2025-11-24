import { Facebook, Instagram, LucideProps } from 'lucide-react';
import type { ComponentType } from 'react';
import type { Platform } from '../lib/types';

type IconComponent = ComponentType<LucideProps>;

const iconMap: Record<Platform, IconComponent> = {
  instagram: Instagram,
  facebook: Facebook,
  pinterest: PinterestGlyph
};

const colorMap: Record<Platform, string> = {
  instagram: 'from-[#feda75] via-[#d62976] to-[#4f5bd5]',
  facebook: 'from-[#3b5998] to-[#1d3c78]',
  pinterest: 'from-[#e60023] to-[#a3081a]'
};

interface PlatformIconProps {
  platform: Platform;
  className?: string;
}

export function PlatformIcon({ platform, className }: PlatformIconProps) {
  const Icon = iconMap[platform];
  return (
    <span
      className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-soft ${
        colorMap[platform]
      }`}
    >
      <Icon className={className ?? 'h-5 w-5'} strokeWidth={1.5} />
    </span>
  );
}

function PinterestGlyph({ className, strokeWidth, ...rest }: LucideProps) {
  return (
    <svg
      className={className ?? 'h-5 w-5'}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M12 2C6.49 2 2 6.26 2 11.66c0 3.61 2.21 6.72 5.37 7.97-.07-.63-.13-1.6.03-2.29.14-.6.94-3.81.94-3.81s-.24-.48-.24-1.19c0-1.12.65-1.95 1.46-1.95.69 0 1.02.52 1.02 1.15 0 .7-.44 1.75-.67 2.72-.19.8.41 1.45 1.22 1.45 1.47 0 2.6-1.55 2.6-3.79 0-1.98-1.42-3.36-3.44-3.36-2.34 0-3.72 1.74-3.72 3.54 0 .7.27 1.45.6 1.86a.24.24 0 01.06.23l-.23.92c-.04.16-.17.21-.32.13-1.18-.55-1.91-2.3-1.91-3.7 0-3.01 2.19-5.77 6.31-5.77 3.31 0 5.89 2.36 5.89 5.52 0 3.29-2.07 5.94-4.95 5.94-.97 0-1.88-.51-2.19-1.11l-.6 2.29c-.22.83-.82 1.87-1.22 2.5.92.29 1.89.45 2.9.45 5.51 0 10-4.26 10-9.66C22 6.26 17.51 2 12 2z"
        fill="currentColor"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}
