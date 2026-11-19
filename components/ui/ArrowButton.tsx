import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type Tone = 'ember' | 'ink' | 'paper';

const tones: Record<Tone, { label: string; arrow: string }> = {
  ember: {
    label: 'bg-ember text-paper group-hover:bg-ember-bright',
    arrow: 'bg-ink text-paper',
  },
  ink: {
    label: 'bg-ink text-paper group-hover:bg-ink/90',
    arrow: 'bg-ember text-paper',
  },
  paper: {
    label: 'bg-paper text-ink group-hover:bg-white',
    arrow: 'bg-ember text-paper',
  },
};

type ArrowButtonProps = {
  href: string;
  children: React.ReactNode;
  tone?: Tone;
  external?: boolean;
  className?: string;
  'aria-label'?: string;
};

/**
 * Label + square arrow "tab" button. The arrow nudges up-right on hover.
 */
export function ArrowButton({
  href,
  children,
  tone = 'ember',
  external,
  className,
  ...rest
}: ArrowButtonProps) {
  const t = tones[tone];
  const content = (
    <>
      <span
        className={cn(
          'inline-flex h-11 items-center rounded-l-md px-5 text-sm font-semibold transition-colors duration-200',
          t.label
        )}
      >
        {children}
      </span>
      <span
        className={cn(
          'inline-flex h-11 w-11 items-center justify-center rounded-r-md transition-colors duration-200',
          t.arrow
        )}
        aria-hidden
      >
        <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </>
  );

  const cls = cn(
    'group inline-flex items-stretch focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 rounded-md',
    className
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {content}
    </Link>
  );
}
