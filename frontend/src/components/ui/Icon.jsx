import { icons } from '@/icons/registry';

/**
 * Lucide icon resolved by name. Decorative by default (aria-hidden).
 * @param {{ name: string, size?: number, strokeWidth?: number, label?: string, className?: string }} props
 */
export default function Icon({ name, size = 20, strokeWidth = 1.5, label, className }) {
  const Component = icons[name];
  if (!Component) {
    if (import.meta.env.DEV) console.warn(`[Icon] Unknown icon name: ${name}`);
    return null;
  }
  return (
    <Component
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true, focusable: false })}
    />
  );
}
