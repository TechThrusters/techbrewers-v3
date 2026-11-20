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
      <span className="inline-flex h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
      {index && <span className="opacity-60">{index} —</span>}
      <span>{children}</span>
    </p>
  );
}

/**
 * Decorative orbit system: three rings (one dashed) with "satellites" that
 * travel along them. Pure SVG; rotation is disabled by the global
 * prefers-reduced-motion rule.
 */
export function Orbits({ className, tone = 'ink' }: { className?: string; tone?: 'ink' | 'paper' }) {
  const ink = tone === 'ink';
  const ring = ink ? 'rgba(26,18,11,0.22)' : 'rgba(245,240,230,0.22)';
  const ringStrong = ink ? 'rgba(26,18,11,0.32)' : 'rgba(245,240,230,0.3)';
  const body = ink ? '#1A120B' : '#F5F0E6';
  const bg = ink ? '#F5F0E6' : '#2B1209';
  return (
    <div aria-hidden className={cn('pointer-events-none select-none', className)}>
      {/* outer ring */}
      <svg viewBox="0 0 600 600" className="absolute inset-0 h-full w-full animate-orbit">
        <circle cx="300" cy="300" r="292" fill="none" stroke={ring} strokeWidth="1.25" strokeDasharray="3 9" strokeLinecap="round" />
        <circle cx="300" cy="8" r="9" fill={bg} stroke="#C54F0E" strokeWidth="2" />
        <circle cx="300" cy="8" r="4" fill="#C54F0E" />
        <circle cx="47" cy="446" r="5" fill={body} />
      </svg>
      {/* middle ring */}
      <svg viewBox="0 0 600 600" className="absolute inset-0 h-full w-full animate-orbit-slow">
        <circle cx="300" cy="300" r="218" fill="none" stroke={ringStrong} strokeWidth="1.25" />
        <circle cx="518" cy="300" r="7" fill="#F6B44B" />
        <circle cx="146" cy="146" r="3.5" fill={body} />
      </svg>
      {/* inner ring */}
      <svg viewBox="0 0 600 600" className="absolute inset-0 h-full w-full animate-orbit">
        <circle cx="300" cy="300" r="144" fill="none" stroke={ring} strokeWidth="1.25" strokeDasharray="1 6" strokeLinecap="round" />
        <circle cx="300" cy="444" r="5" fill="#C54F0E" />
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
      <Orbits className="absolute -right-56 -top-40 h-[440px] w-[440px] opacity-70 sm:-right-24 sm:-top-16 sm:opacity-100 md:h-[600px] md:w-[600px] lg:right-0 lg:top-0" />
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
              <span className="trail font-serif font-normal italic tracking-normal text-ember">
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
