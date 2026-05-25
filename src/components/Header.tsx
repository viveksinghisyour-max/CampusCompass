'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, GitCompare, Bookmark, LogOut, Menu, X, User } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useCompareStore } from '@/store/useCompareStore';
import { Button } from './ui/Button';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuthStore();
  const { selectedIds } = useCompareStore();
  const [hydrated, setHydrated] = useState(false);

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => {
    setHydrated(true);
  }, []);

  // Close mobile menu on path changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Explore Colleges', href: '/colleges', icon: Compass },
    {
      name: 'Compare',
      href: '/compare',
      icon: GitCompare,
      badge: hydrated && selectedIds.length > 0 ? selectedIds.length : undefined
    },
    { name: 'Dashboard', href: '/dashboard', icon: Bookmark, protected: true }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="p-2 rounded-xl bg-primary text-white group-hover:scale-105 transition-transform duration-200 shadow-md shadow-primary/10">
              <Compass className="w-5 h-5 stroke-[2.2px]" />
            </div>
            <span className="text-lg font-black tracking-tight text-slate-800 bg-clip-text">
              CampusCompass
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navLinks.map((link) => {
              if (link.protected && !(hydrated && isAuthenticated)) return null;
              const LinkIcon = link.icon;
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/');

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold tracking-wide transition-all",
                    isActive
                      ? "bg-primary/5 text-primary"
                      : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
                  )}
                >
                  <LinkIcon className="w-4 h-4" />
                  <span>{link.name}</span>
                  {link.badge !== undefined && (
                    <span className="ml-1 px-1.5 py-0.5 rounded-full text-xs font-bold bg-primary text-white leading-none">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTA / User Panel */}
          <div className="hidden md:flex items-center gap-3">
            {hydrated && isAuthenticated && user ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 group cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200/60 flex items-center justify-center text-slate-600 group-hover:bg-slate-200 transition-colors">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-slate-700 leading-tight">
                      {user.name}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium leading-none">
                      Student
                    </span>
                  </div>
                </Link>
                <Button
                  variant="ghost"
                  onClick={logout}
                  className="h-9 px-3 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 shrink-0"
                >
                  <LogOut className="w-4 h-4 mr-1.5" />
                  <span className="text-xs font-bold">Logout</span>
                </Button>
              </div>
            ) : (
              <Link href="/auth/login">
                <Button variant="primary" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer shrink-0"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 flex flex-col gap-3 shadow-inner">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              if (link.protected && !(hydrated && isAuthenticated)) return null;
              const LinkIcon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                    isActive ? "bg-primary/5 text-primary" : "text-slate-600 hover:bg-slate-50"
                  )}
                >
                  <LinkIcon className="w-4 h-4" />
                  <span>{link.name}</span>
                  {link.badge !== undefined && (
                    <span className="ml-auto px-2 py-0.5 rounded-full text-xs font-black bg-primary text-white leading-none">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <hr className="border-slate-100" />

          {hydrated && isAuthenticated && user ? (
            <div className="flex flex-col gap-4 px-4 py-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                  <User className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-700">{user.name}</span>
                  <span className="text-xs text-slate-400">{user.email}</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="w-full text-slate-600 border-slate-200"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/auth/login" className="w-full">
              <Button variant="primary" size="sm" className="w-full">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
