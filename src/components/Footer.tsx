import React from 'react';
import Link from 'next/link';
import { Compass, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-400 border-t border-slate-800 shrink-0">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & About */}
          <div className="flex flex-col gap-4 md:col-span-1.5">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="p-2 rounded-xl bg-primary text-white shadow-md shadow-primary/10">
                <Compass className="w-5 h-5 stroke-[2.2px]" />
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                CampusCompass
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mt-2">
              Empowering students to navigate their higher education journey with confidence, clarity, and deep data-driven insights. Compare top colleges, evaluate fees, and review placements side-by-side.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-slate-200 tracking-wider uppercase">
              Discovery Tools
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link href="/colleges" className="hover:text-white transition-colors">
                  Explore All Colleges
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-white transition-colors">
                  Compare Colleges Tool
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="hover:text-white transition-colors">
                  Sign In / Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Featured Courses */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-slate-200 tracking-wider uppercase">
              Trending Streams
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link href="/colleges?stream=B.Tech" className="hover:text-white transition-colors">
                  Engineering (B.Tech / BE)
                </Link>
              </li>
              <li>
                <Link href="/colleges?stream=MBA" className="hover:text-white transition-colors">
                  Management (MBA / PGP)
                </Link>
              </li>
              <li>
                <Link href="/colleges?stream=MBBS" className="hover:text-white transition-colors">
                  Medical (MBBS / MD)
                </Link>
              </li>
              <li>
                <Link href="/colleges?stream=B.Des" className="hover:text-white transition-colors">
                  Design (B.Des / M.Des)
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-slate-200 tracking-wider uppercase">
              Connect With Us
            </h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span className="truncate">support@campuscompass.in</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+91 80 4910 2200</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
                <span>IIT Bangalore Campus, Outer Ring Rd, Bangalore, KA, 560103</span>
              </li>
            </ul>
          </div>

        </div>

        <hr className="border-slate-800 my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-500">
            CampusCompass © 2026. Built by a senior product team. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white transition-colors">
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/>
              </svg>
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
