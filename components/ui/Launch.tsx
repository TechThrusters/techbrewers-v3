import { cn } from '@/lib/utils';

/** Mono section label, e.g. "01 — Why TechThrusters". */
export function SectionLabel({
  index,
  children,
  className,
  tone = 'ember',
}: {
  index?: string;
  children: React.ReactNode;
  className?: string;
  tone?: 'ember' | 'light';
}) {
  return (
    <p
      className={cn(
        'eyebrow flex items-center gap-2',
        tone === 'ember' ? 'text-ember' : 'text-flare',
        className
      )}
    >
      <span className="relative flex h-1.5 w-1.5" aria-hidden>
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-40" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
      </span>
      {index && <span className="opacity-60">{index} —</span>}
      <span>{children}</span>
    </p>
  );
}

/**
 * Decorative orbit rings with a few "satellites". Pure SVG, slowly rotating
 * (motion is disabled by the global prefers-reduced-motion rule).
 */
export function Orbits({ className, tone = 'ink' }: { className?: string; tone?: 'ink' | 'paper' }) {
  const stroke = tone === 'ink' ? 'rgba(26,18,11,0.14)' : 'rgba(245,240,230,0.14)';
  return (
    <div aria-hidden className={cn('pointer-events-none select-none', className)}>
      <svg viewBox="0 0 600 600" className="h-full w-full animate-orbit">
        <circle cx="300" cy="300" r="290" fill="none" stroke={stroke} strokeDasharray="2 7" />
        <circle cx="300" cy="300" r="215" fill="none" stroke={stroke} />
        <circle cx="300" cy="10" r="5" fill="#C54F0E" />
        <circle cx="85" cy="300" r="3.5" fill={tone === 'ink' ? '#1A120B' : '#F5F0E6'} />
      </svg>
      <svg viewBox="0 0 600 600" className="absolute inset-0 h-full w-full animate-orbit-slow">
        <circle cx="300" cy="300" r="140" fill="none" stroke={stroke} strokeDasharray="1 5" />
        <circle cx="440" cy="300" r="4" fill="#F6B44B" />
      </svg>
    </div>
  );
}

/**
 * Shared page header for inner pages: star field, mono label, big display
 * title with an optional serif accent, intro copy and optional actions.
 */
export function PageHeader({
  label,
  title,
  accent,
  intro,
  children,
  align = 'left',
}: {
  label: string;
  title: React.ReactNode;
  accent?: React.ReactNode;
  intro?: React.ReactNode;
  children?: React.ReactNode;
  align?: 'left' | 'center';
}) {
  const center = align === 'center';
  return (
    <section className="relative overflow-hidden bg-paper text-ink">
      <div aria-hidden className="absolute inset-0 star-field fade-edges" />
      <Orbits className="absolute -right-40 -top-24 hidden h-[560px] w-[560px] md:block" />
      <div
        className={cn(
          'relative mx-auto max-w-7xl px-6 pb-16 pt-32 md:pb-24 md:pt-44',
          center && 'text-center'
        )}
      >
        <SectionLabel className={cn(center && 'justify-center')}>{label}</SectionLabel>
        <h1 className={cn('display mt-5 max-w-4xl text-5xl sm:text-6xl md:text-7xl', center && 'mx-auto')}>
          {title}
          {accent && (
            <>
              {' '}
              <span className="trail font-serif text-[1.08em] font-normal italic tracking-normal text-ember">
                {accent}
              </span>
            </>
          )}
        </h1>
        {intro && (
          <p className={cn('mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl', center && 'mx-auto')}>
            {intro}
          </p>
        )}
        {children && (
          <div className={cn('mt-9 flex flex-wrap items-center gap-x-6 gap-y-4', center && 'justify-center')}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
