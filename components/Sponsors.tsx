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

export type Sponsor = { name: string; logo: string; url: string; tone: LogoTone; scale?: number };

export const SPONSORS: Sponsor[] = [
  { name: 'GitHub', logo: '/images/sponsors/github.png', url: 'https://github.com/', tone: 'mono', scale: 1.15 },
  { name: 'Peerlist', logo: '/images/sponsors/peerlist.png', url: 'https://peerlist.io/', tone: 'mono' },
  { name: 'Azure Developer Community', logo: '/images/sponsors/adc.jpg', url: 'https://azdev.reskilll.com/', tone: 'blend' },
  { name: 'Cloud Native Day Pune', logo: '/images/sponsors/cnd.jpg', url: 'https://www.cloudnativepune.com/', tone: 'blend', scale: 1.2 },
  { name: 'Moneylancer Investments', logo: '/images/sponsors/moneylancer.png', url: 'https://mymoneylancer.com/', tone: 'blend', scale: 0.85 },
  { name: 'Securityium', logo: '/images/sponsors/securityium.png', url: 'https://www.securityium.com/', tone: 'mono', scale: 1.3 },
  { name: 'GeeksforGeeks', logo: '/images/sponsors/gfg.png', url: 'https://www.geeksforgeeks.org/', tone: 'blend' },
  { name: 'Daftar', logo: '/images/sponsors/daftar.png', url: 'https://www.instagram.com/thedaftar/', tone: 'blend', scale: 1.2 },
  { name: 'Hack2Skill', logo: '/images/sponsors/h2s.png', url: 'https://hack2skill.com/', tone: 'mono' },
  { name: 'BSides Pune', logo: '/images/sponsors/bsidespune.png', url: 'https://www.linkedin.com/company/bsides-pune/', tone: 'blend', scale: 0.9 },
  { name: 'Give My Certificate', logo: '/images/sponsors/gmc.png', url: 'https://givemycertificate.com/', tone: 'blend', scale: 0.85 },
  { name: 'Aeka Coffee', logo: '/images/sponsors/aeka.png', url: 'https://www.instagram.com/aekascoffee/', tone: 'blend' },
  { name: 'Zeeve', logo: '/images/sponsors/zeeve.png', url: 'https://www.zeeve.io/', tone: 'blend' },
  { name: 'Hack This Fall', logo: '/images/sponsors/htf.png', url: 'https://hackthisfall.tech/', tone: 'mono' },
  { name: 'Hack The Mountains', logo: '/images/sponsors/htm.png', url: 'https://hackthemountain.tech/', tone: 'blend' },
  { name: 'Hack The League', logo: '/images/sponsors/htl.png', url: 'https://hacktheleague.com/', tone: 'blend', scale: 0.85 },
  { name: 'Pune FOSS 3.0', logo: '/images/sponsors/punefoss3.png', url: 'https://fossunited.org/c/pune/punefoss3', tone: 'invert' },
];

const toneClass: Record<LogoTone, string> = {
  mono: 'brightness-0 opacity-70 group-hover:opacity-100',
  blend: 'grayscale mix-blend-multiply opacity-70 group-hover:grayscale-0 group-hover:opacity-100',
  invert: 'invert grayscale mix-blend-multiply opacity-70 group-hover:opacity-100',
};

/** A sponsor logo flattened onto paper; place inside a `group` element. */
export function LogoMark({ sponsor: s }: { sponsor: Sponsor }) {
  return (
    // size via box dimensions, not transform: a transform would isolate the
    // blend layer and stop mix-blend-multiply from reaching the paper
    <div
      className="relative w-full"
      style={{ height: 48 * (s.scale ?? 1), maxWidth: 140 * (s.scale ?? 1) }}
    >
      <Image
        src={s.logo}
        alt={s.name}
        fill
        sizes="140px"
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
              <span className="font-serif font-normal italic tracking-normal text-ember">these folks.</span>
            </h2>
          </div>
          <p className="max-w-sm text-ink-soft">
            TechThrusters is free and open for everyone, made possible by these wonderful sponsors
            and partners who support our events, programs and members.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 border-l border-t border-ink/10 lg:grid-cols-6">
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
            className="group flex h-20 flex-col items-start justify-between border-b border-r border-ink/10 bg-ink p-3 sm:h-28 sm:p-4 text-paper transition-colors hover:bg-ember md:h-32 md:p-5"
          >
            <span className="text-xs font-semibold leading-tight sm:text-sm">Your logo here?</span>
            <span className="inline-flex items-center gap-1 text-[11px] text-paper/70 group-hover:text-paper sm:text-xs">
              Partner with us
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Sponsors;
