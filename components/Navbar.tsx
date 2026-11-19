'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDescope, useSession, useUser } from '@descope/nextjs-sdk/client';
import { DISCORD_URL } from '@/lib/constants';

const COMMUNITY_PATHS = ['/community', '/talks'] as const;
const EVENTS_PATHS = ['/events'] as const;

const isCommunityPath = (path: string) =>
  COMMUNITY_PATHS.some((p) => path === p || path.startsWith(`${p}/`));

const isEventsPath = (path: string) =>
  EVENTS_PATHS.some((p) => path === p || path.startsWith(`${p}/`));

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileCommunityOpen, setMobileCommunityOpen] = useState(false);
  const [mobileEventsOpen, setMobileEventsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Descope hooks
  const { isAuthenticated, isSessionLoading } = useSession();
  const { user } = useUser();
  const sdk = useDescope();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      setMobileCommunityOpen(false);
      setMobileEventsOpen(false);
    }
  }, [isMobileMenuOpen]);

  const handleLogout = useCallback(() => {
    sdk.logout();
    router.push('/');
  }, [sdk, router]);

  const navItems = [
    { name: 'Home', link: '/' },
    { name: 'Meetups', link: '/meetup' },
  ];

  const communitySubLinks = [
    { name: 'Community', link: '/community', description: 'Story, values & FAQ' },
    { name: 'TechThrusters Talks', link: '/talks', description: 'Apply to speak' },
  ] as const;

  const eventsSubLinks = [
    { name: 'Partner events', link: '/events/partners', description: 'Community partner meetups' },
    { name: 'Upcoming', link: '/events/upcoming', description: 'TechThrusters sessions' },
    { name: 'Livestreams', link: '/events/livestreams', description: 'Past talks on YouTube' },
  ] as const;

  return (
    <nav
      className={cn(
        'fixed z-50 transition-all duration-300 ease-in-out',
        'left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-6xl',
        isScrolled ? 'top-3' : 'top-5'
      )}
    >
      <div
        className={cn(
          'border border-ink/10 backdrop-blur-md transition-all duration-300 pl-5 pr-2 py-2',
          isMobileMenuOpen ? 'rounded-3xl bg-paper shadow-[0_20px_40px_-16px_rgba(26,18,11,0.35)]' : 'rounded-full bg-paper/85',
          isScrolled && 'shadow-[0_10px_30px_-12px_rgba(26,18,11,0.25)]'
        )}
      >
        <div className={cn(
          'flex items-center justify-between'
        )}>
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/images/logo/blacktrans.png"
              alt="TechThrusters Logo"
              width={180}
              height={54}
              className={cn(
                'w-auto object-contain transition-all duration-300',
                'h-9'
              )}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8 flex-1 justify-center">
            {navItems[0] && (
              <Link
                href={navItems[0].link}
                className={cn(
                  'transition-colors text-sm',
                  pathname === navItems[0].link
                    ? 'text-ember font-semibold'
                    : 'text-ink/75 hover:text-ink'
                )}
              >
                {navItems[0].name}
              </Link>
            )}

            {/* Community + Talks (nested under Community) */}
            <div className="relative group">
              <button
                type="button"
                className={cn(
                  'flex items-center gap-1 transition-colors text-sm outline-none',
                  isCommunityPath(pathname)
                    ? 'text-ember font-semibold'
                    : 'text-ink/75 hover:text-ink'
                )}
                aria-haspopup="true"
                aria-label="Community menu"
              >
                Community
                <ChevronDown className="h-4 w-4 opacity-80 transition-transform duration-200 group-hover:rotate-180" aria-hidden />
              </button>
              <div
                className="absolute left-1/2 top-full z-50 min-w-[240px] -translate-x-1/2 pt-2 opacity-0 invisible transition-[opacity,visibility] duration-150 group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible"
                role="menu"
                aria-label="Community links"
              >
                <div className="rounded-2xl border border-ink/10 bg-paper p-1.5 shadow-[0_20px_40px_-16px_rgba(26,18,11,0.3)]">
                  {communitySubLinks.map((item) => (
                    <Link
                      key={item.link}
                      href={item.link}
                      role="menuitem"
                      className={cn(
                        'block rounded-xl px-4 py-2.5 text-sm transition-colors',
                        pathname === item.link
                          ? 'bg-ember/10 text-ember'
                          : 'text-ink/80 hover:bg-ink/5 hover:text-ink'
                      )}
                    >
                      <span className="font-medium">{item.name}</span>
                      <span className="mt-0.5 block text-xs font-normal text-ink/50">
                        {item.description}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Events */}
            <div className="relative group">
              <button
                type="button"
                className={cn(
                  'flex items-center gap-1 transition-colors text-sm outline-none',
                  isEventsPath(pathname)
                    ? 'text-ember font-semibold'
                    : 'text-ink/75 hover:text-ink'
                )}
                aria-haspopup="true"
                aria-label="Events menu"
              >
                Events
                <ChevronDown className="h-4 w-4 opacity-80 transition-transform duration-200 group-hover:rotate-180" aria-hidden />
              </button>
              <div
                className="absolute left-1/2 top-full z-50 min-w-[240px] -translate-x-1/2 pt-2 opacity-0 invisible transition-[opacity,visibility] duration-150 group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible"
                role="menu"
                aria-label="Events links"
              >
                <div className="rounded-2xl border border-ink/10 bg-paper p-1.5 shadow-[0_20px_40px_-16px_rgba(26,18,11,0.3)]">
                  {eventsSubLinks.map((item) => (
                    <Link
                      key={item.link}
                      href={item.link}
                      role="menuitem"
                      className={cn(
                        'block rounded-xl px-4 py-2.5 text-sm transition-colors',
                        pathname === item.link
                          ? 'bg-ember/10 text-ember'
                          : 'text-ink/80 hover:bg-ink/5 hover:text-ink'
                      )}
                    >
                      <span className="font-medium">{item.name}</span>
                      <span className="mt-0.5 block text-xs font-normal text-ink/50">
                        {item.description}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {navItems.slice(1).map((item) => (
              <Link
                key={item.link}
                href={item.link}
                className={cn(
                  'transition-colors text-sm',
                  pathname === item.link
                    ? 'text-ember font-semibold'
                    : 'text-ink/75 hover:text-ink'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            {!isSessionLoading && (
              <>
                {isAuthenticated && user ? (
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className={cn(
                        'bg-ink/5 hover:bg-ink/10 text-ink rounded-full transition-all duration-300 flex items-center gap-2 flex-shrink-0 border border-ink/10 px-3',
                        showUserMenu && 'bg-ink/10 border-ink/20',
                        'h-10'
                      )}
                      aria-expanded={showUserMenu}
                      aria-haspopup="true"
                    >
                      <svg
                        className={cn('flex-shrink-0 w-4 h-4')}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className={cn('hidden md:block font-medium truncate max-w-[120px] text-sm')}>
                        {user.name?.split(' ')[0] || user.email?.split('@')[0] || 'Account'}
                      </span>
                    </button>
                    
                    {showUserMenu && (
                      <div className="absolute top-full right-0 mt-2 bg-paper border border-ink/10 rounded-2xl overflow-hidden z-50 min-w-[180px] shadow-[0_20px_40px_-16px_rgba(26,18,11,0.3)] transform transition-all duration-200 ease-out origin-top-right">
                        <div className="py-1">
                          <div className="px-4 py-2 border-b border-ink/10">
                            <p className="text-xs text-ink/50 uppercase tracking-wider">Account</p>
                            <p className="text-sm text-ink font-medium mt-1 truncate">
                              {user.name || user.email || 'User'}
                            </p>
                          </div>
                          <Link
                            href="/profile"
                            onClick={() => setShowUserMenu(false)}
                            className="w-full px-4 py-3 text-left text-ink hover:bg-ink/5 active:bg-ink/10 transition-colors flex items-center gap-3 group"
                          >
                            <svg className="w-5 h-5 text-ink/50 group-hover:text-ink transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="font-medium">Profile</span>
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full px-4 py-3 text-left text-ink hover:bg-ink/5 active:bg-ink/10 transition-colors flex items-center gap-3 group"
                          >
                            <svg className="w-5 h-5 text-ink/50 group-hover:text-ink transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span className="font-medium">Logout</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href="/sign-up"
                    className={cn(
                      'hidden sm:flex h-10 px-4 text-sm font-medium text-ink/80 hover:text-ink rounded-full transition-colors items-center justify-center flex-shrink-0'
                    )}
                  >
                    <span>Sign Up</span>
                  </Link>
                )}
              </>
            )}
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'group bg-ink hover:bg-ember text-paper rounded-full transition-colors duration-300 flex items-center justify-center gap-2 flex-shrink-0 h-10 w-10 sm:w-auto sm:px-4'
              )}
              aria-label="Join the TechThrusters Discord"
            >
              <svg className="flex-shrink-0 w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              <span className="hidden sm:inline text-sm font-semibold">Join Discord</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-ink p-2 transition-transform duration-300"
              aria-label="Toggle menu"
            >
              <svg
                className={cn(
                  "w-6 h-6 transition-transform duration-300",
                  isMobileMenuOpen && "rotate-90"
                )}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isMobileMenuOpen
              ? "max-h-[500px] opacity-100 mt-3 pt-3 pb-2 border-t border-ink/10"
              : "max-h-0 opacity-0 mt-0 pt-0 border-t-0"
          )}
        >
          <div className="flex flex-col space-y-3">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                'transition-all duration-300 text-base py-2 px-4 rounded-lg',
                pathname === '/'
                  ? 'text-ember font-semibold bg-ember/10'
                  : 'text-ink/80 hover:text-ink hover:bg-ink/5',
                isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
              )}
              style={{ transitionDelay: isMobileMenuOpen ? '0ms' : `${navItems.length * 30}ms` }}
            >
              Home
            </Link>

            <div
              className={cn(
                'transition-all duration-300 rounded-lg',
                isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
              )}
              style={{ transitionDelay: isMobileMenuOpen ? '50ms' : `${(navItems.length - 0) * 30}ms` }}
            >
              <button
                type="button"
                onClick={() => setMobileCommunityOpen((o) => !o)}
                className={cn(
                  'flex w-full items-center justify-between text-base py-2 px-4 rounded-lg text-left transition-colors',
                  isCommunityPath(pathname)
                    ? 'text-ember font-semibold bg-ember/10'
                    : 'text-ink/80 hover:text-ink hover:bg-ink/5'
                )}
                aria-expanded={mobileCommunityOpen}
                aria-controls="mobile-community-submenu"
              >
                <span>Community</span>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 shrink-0 transition-transform duration-200',
                    mobileCommunityOpen && 'rotate-180'
                  )}
                  aria-hidden
                />
              </button>
              <div
                id="mobile-community-submenu"
                className={cn(
                  'overflow-hidden transition-all duration-300',
                  mobileCommunityOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                )}
              >
                <div className="ml-2 mt-1 space-y-1 border-l border-ink/10 pl-3">
                  {communitySubLinks.map((item) => (
                    <Link
                      key={item.link}
                      href={item.link}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setMobileCommunityOpen(false);
                      }}
                      className={cn(
                        'block rounded-lg py-2 pl-2 pr-4 text-sm transition-colors',
                        pathname === item.link
                          ? 'text-ember font-semibold'
                          : 'text-ink/75 hover:text-ember'
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div
              className={cn(
                'transition-all duration-300 rounded-lg',
                isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
              )}
              style={{ transitionDelay: isMobileMenuOpen ? '100ms' : `${(navItems.length - 0) * 30}ms` }}
            >
              <button
                type="button"
                onClick={() => setMobileEventsOpen((o) => !o)}
                className={cn(
                  'flex w-full items-center justify-between text-base py-2 px-4 rounded-lg text-left transition-colors',
                  isEventsPath(pathname)
                    ? 'text-ember font-semibold bg-ember/10'
                    : 'text-ink/80 hover:text-ink hover:bg-ink/5'
                )}
                aria-expanded={mobileEventsOpen}
                aria-controls="mobile-events-submenu"
              >
                <span>Events</span>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 shrink-0 transition-transform duration-200',
                    mobileEventsOpen && 'rotate-180'
                  )}
                  aria-hidden
                />
              </button>
              <div
                id="mobile-events-submenu"
                className={cn(
                  'overflow-hidden transition-all duration-300',
                  mobileEventsOpen ? 'max-h-52 opacity-100' : 'max-h-0 opacity-0'
                )}
              >
                <div className="ml-2 mt-1 space-y-1 border-l border-ink/10 pl-3">
                  {eventsSubLinks.map((item) => (
                    <Link
                      key={item.link}
                      href={item.link}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setMobileEventsOpen(false);
                      }}
                      className={cn(
                        'block rounded-lg py-2 pl-2 pr-4 text-sm transition-colors',
                        pathname === item.link
                          ? 'text-ember font-semibold'
                          : 'text-ink/75 hover:text-ember'
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {navItems.slice(1).map((item, index) => (
              <Link
                key={item.link}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'transition-all duration-300 text-base py-2 px-4 rounded-lg',
                  pathname === item.link
                    ? 'text-ember font-semibold bg-ember/10'
                    : 'text-ink/80 hover:text-ink hover:bg-ink/5',
                  isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
                )}
                style={{
                  transitionDelay: isMobileMenuOpen
                    ? `${(index + 3) * 50}ms`
                    : `${(navItems.length - index - 1) * 30}ms`
                }}
              >
                {item.name}
              </Link>
            ))}
            {isAuthenticated && user && (
              <div
                className={cn(
                  "pt-2 border-t border-ink/10 transition-all duration-300",
                  isMobileMenuOpen
                    ? 'translate-y-0 opacity-100'
                    : '-translate-y-2 opacity-0'
                )}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${navItems.length * 50}ms` : '0ms'
                }}
              >
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-ink hover:bg-ink/5 transition-colors flex items-center gap-3 rounded-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
