'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Navbar from './Navbar';
import { ArrowButton } from './ui/ArrowButton';
import { DISCORD_URL } from '@/lib/constants';

const ease = [0.22, 1, 0.36, 1] as const;

const stats = [
  { value: '1,900+', label: 'Members', tile: 'bg-[#F4C64E] text-ink', avatar: '/images/header/1.png' },
  { value: '50+', label: 'Events & workshops', tile: 'bg-[#F2A07B] text-ink', avatar: '/images/header/2.png' },
  { value: '10', label: 'Countries', tile: 'bg-[#1F5C55] text-paper', avatar: '/images/header/3.png' },
  { value: '4 yrs', label: 'And growing', tile: 'bg-ember text-paper', avatar: '/images/header/5.png' },
];

const HeroNew = () => {
  const reduce = useReducedMotion();
  const fadeUp = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease },
        };

  return (
    <section className="relative overflow-hidden paper-grid text-ink">
      {/* soften the grid towards the edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_30%_40%,transparent_0%,#F5F0E6_85%)]"
      />

      <Navbar />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 pb-20 pt-36 md:pt-44 lg:grid-cols-[1.15fr_1fr] lg:gap-10 lg:pb-28">
        {/* Copy */}
        <div>
          <motion.div {...fadeUp(0)}>
            <Link
              href="/talks"
              className="group mb-8 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 py-1 pl-1 pr-3 text-sm text-ink/80 shadow-sm backdrop-blur transition-colors hover:border-ember/40 hover:text-ink"
            >
              <span className="rounded-full bg-ember px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-paper">
                New
              </span>
              Apply to speak at TechThrusters Talks
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </motion.div>

          <motion.h1
            {...fadeUp(0.08)}
            className="display text-[3.4rem] sm:text-7xl lg:text-[6.5rem]"
          >
            Learn. Connect.
            <br />
            Build{' '}
            <span className="swoosh font-serif text-[1.08em] font-normal italic tracking-normal text-ember">
              together.
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.16)}
            className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft md:text-xl"
          >
            TechThrusters is a free, open community of developers, designers and makers.
            Join workshops, ship projects and meet people shaping what&apos;s next in tech.
          </motion.p>

          <motion.div {...fadeUp(0.24)} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <ArrowButton href={DISCORD_URL} external>
              Join the Discord
            </ArrowButton>
            <Link
              href="/events/upcoming"
              className="group inline-flex items-center gap-1 text-sm font-semibold text-ink/80 transition-colors hover:text-ink"
            >
              Explore upcoming events
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </motion.div>
        </div>

        {/* Stat tiles */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              {...(reduce
                ? {}
                : {
                    initial: { opacity: 0, y: 24, rotate: i % 2 ? 1.5 : -1.5 },
                    animate: { opacity: 1, y: 0, rotate: 0 },
                    transition: { duration: 0.7, delay: 0.2 + i * 0.08, ease },
                  })}
              className={`relative flex aspect-[5/4] flex-col justify-between overflow-hidden rounded-2xl p-5 sm:p-6 ${s.tile} ${
                i % 2 ? 'translate-y-6' : ''
              }`}
            >
              <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-white/70 sm:h-14 sm:w-14">
                <Image src={s.avatar} alt="" fill sizes="56px" className="scale-110 object-cover" />
              </div>
              <div>
                <div className="display text-4xl sm:text-5xl">{s.value}</div>
                <div className="mt-1 text-sm font-medium opacity-80">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroNew;
