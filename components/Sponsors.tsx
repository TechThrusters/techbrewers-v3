'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SOCIAL } from '@/lib/constants';
import { SectionLabel } from './ui/Launch';

/**
 * How each logo is flattened onto the cream background:
 * - "mono":   white/light artwork on transparency -> black silhouette
 * - "blend":  coloured artwork or white-background JPGs -> greyscale, multiplied
 *             into the paper so white boxes disappear; colour returns on hover
 * - "invert": light artwork on a dark box -> inverted, then multiplied
 */
export type LogoTone = 'mono' | 'blend' | 'invert';

/** Logos are pre-trimmed to their artwork (see public/images/sponsors/trimmed); w/h are the trimmed pixel sizes. */
export type Sponsor = { name: string; logo: string; url: string; tone: LogoTone; w: number; h: number };

export const SPONSORS: Sponsor[] = [
  { name: 'GitHub', logo: '/images/sponsors/trimmed/github.png', url: 'https://github.com/', tone: 'mono', w: 640, h: 190 },
  { name: 'Peerlist', logo: '/images/sponsors/trimmed/peerlist.png', url: 'https://peerlist.io/', tone: 'mono', w: 640, h: 164 },
  { name: 'Azure Developer Community', logo: '/images/sponsors/trimmed/adc.png', url: 'https://azdev.reskilll.com/', tone: 'blend', w: 580, h: 178 },
  { name: 'Cloud Native Day Pune', logo: '/images/sponsors/trimmed/cnd.png', url: 'https://www.cloudnativepune.com/', tone: 'blend', w: 381, h: 319 },
  { name: 'Moneylancer Investments', logo: '/images/sponsors/trimmed/moneylancer.png', url: 'https://mymoneylancer.com/', tone: 'blend', w: 640, h: 640 },
  { name: 'Securityium', logo: '/images/sponsors/trimmed/securityium.png', url: 'https://www.securityium.com/', tone: 'mono', w: 476, h: 181 },
  { name: 'GeeksforGeeks', logo: '/images/sponsors/trimmed/gfg.png', url: 'https://www.geeksforgeeks.org/', tone: 'blend', w: 388, h: 206 },
  { name: 'Daftar', logo: '/images/sponsors/trimmed/daftar.png', url: 'https://www.instagram.com/thedaftar/', tone: 'blend', w: 375, h: 130 },
  { name: 'Hack2Skill', logo: '/images/sponsors/trimmed/h2s.png', url: 'https://hack2skill.com/', tone: 'mono', w: 417, h: 168 },
  { name: 'BSides Pune', logo: '/images/sponsors/trimmed/bsidespune.png', url: 'https://www.linkedin.com/company/bsides-pune/', tone: 'blend', w: 484, h: 234 },
  { name: 'Give My Certificate', logo: '/images/sponsors/trimmed/gmc.png', url: 'https://givemycertificate.com/', tone: 'mono', w: 424, h: 453 },
  { name: 'Aeka Coffee', logo: '/images/sponsors/trimmed/aeka.png', url: 'https://www.instagram.com/aekascoffee/', tone: 'blend', w: 640, h: 291 },
  { name: 'Zeeve', logo: '/images/sponsors/trimmed/zeeve.png', url: 'https://www.zeeve.io/', tone: 'blend', w: 417, h: 287 },
  { name: 'Hack This Fall', logo: '/images/sponsors/trimmed/htf.png', url: 'https://hackthisfall.tech/', tone: 'mono', w: 500, h: 238 },
  { name: 'Hack The Mountains', logo: '/images/sponsors/trimmed/htm.png', url: 'https://hackthemountain.tech/', tone: 'blend', w: 472, h: 266 },
  { name: 'Hack The League', logo: '/images/sponsors/trimmed/htl.png', url: 'https://hacktheleague.com/', tone: 'blend', w: 409, h: 494 },
  { name: 'Pune FOSS 3.0', logo: '/images/sponsors/trimmed/punefoss3.png', url: 'https://fossunited.org/c/pune/punefoss3', tone: 'invert', w: 500, h: 132 },
];

const toneClass: Record<LogoTone, string> = {
  mono: 'brightness-0 opacity-70 group-hover:opacity-100',
  blend: 'grayscale mix-blend-multiply opacity-70 group-hover:grayscale-0 group-hover:opacity-100',
  invert: 'invert grayscale mix-blend-multiply opacity-70 group-hover:opacity-100',
};

/**
 * Optical sizing: every logo gets roughly the same visual area, so a wide
 * wordmark and a square badge read as equally important. Sizes scale with
 * the --logo-scale custom property set on the grid (not a transform, which
 * would isolate the blend layer and stop mix-blend-multiply working).
 */
const LOGO_AREA = 6400; // px² at --logo-scale: 1
const MAX_H = 64;
const MAX_W = 168;

function logoBox(s: Sponsor) {
  const ratio = s.w / s.h;
  let h = Math.sqrt(LOGO_AREA / ratio);
  let w = h * ratio;
  if (h > MAX_H) { h = MAX_H; w = h * ratio; }
  if (w > MAX_W) { w = MAX_W; h = w / ratio; }
  return { w: Math.round(w), h: Math.round(h) };
}

/** A sponsor logo flattened onto paper; place inside a `group` element. */
export function LogoMark({ sponsor: s }: { sponsor: Sponsor }) {
  const { w, h } = logoBox(s);
  return (
    <div
      className="relative"
      style={{ width: `calc(${w}px * var(--logo-scale, 1))`, height: `calc(${h}px * var(--logo-scale, 1))` }}
    >
      <Image
        src={s.logo}
        alt={s.name}
        fill
        sizes="200px"
        className={cn('object-contain transition duration-300', toneClass[s.tone])}
      />
    </div>
  );
}

function Sponsors() {
  return (
    <section id="partners" className="bg-paper text-ink">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <motion.div
          className="mb-12 flex flex-col justify-between gap-6 md:mb-14 md:flex-row md:items-end"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <SectionLabel index="01" className="mb-4">Sponsors &amp; partners</SectionLabel>
            <h2 className="display max-w-2xl text-4xl md:text-6xl">
              Free for everyone, thanks to{' '}
              <span className="accent text-ember">these folks.</span>
            </h2>
          </div>
          <p className="max-w-sm text-ink-soft">
            TechThrusters is free and open for everyone, made possible by these wonderful sponsors
            and partners who support our events, programs and members.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 border-l border-t border-ink/10 [--logo-scale:0.62] sm:[--logo-scale:0.85] lg:grid-cols-6 lg:[--logo-scale:1]">
          {SPONSORS.map((s, i) => (
            <motion.a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              title={s.name}
              className="group relative flex h-20 items-center justify-center border-b border-r border-ink/10 bg-paper px-3 sm:h-28 sm:px-6 transition-colors duration-200 hover:bg-white md:h-32"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.04 }}
            >
              <LogoMark sponsor={s} />
            </motion.a>
          ))}

          {/* Call-to-action cell */}
          <a
            href={SOCIAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Your logo here? Partner with us (opens LinkedIn)"
            className="group flex h-20 flex-col items-start justify-between border-b border-r border-ink/10 bg-ink p-3 sm:h-28 sm:p-4 text-paper transition-colors hover:bg-ember md:h-32 md:p-5"
          >
            <span className="text-xs font-semibold leading-tight sm:text-sm">Your logo here?</span>
            <span className="inline-flex items-center gap-1 text-[11px] text-paper/70 group-hover:text-paper sm:text-xs">
              <span className="hidden sm:inline">Partner with us</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Sponsors;
