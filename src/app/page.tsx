'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, MapPin, GraduationCap, ArrowRight, TrendingUp, Landmark, Award } from 'lucide-react';
import { MOCK_COLLEGES } from '@/services/mockData';
import { RatingBadge } from '@/components/ui/RatingBadge';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from '@/components/ui/Toast';
import { formatCurrency, cn } from '@/lib/utils';

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { toggleSaveCollege, isCollegeSaved, isAuthenticated } = useAuthStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Filter top 3 featured colleges by rating
  const featuredColleges = MOCK_COLLEGES.slice(0, 3);

  // Auto-suggestions on search
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const query = searchQuery.toLowerCase();
      const matchedNames = MOCK_COLLEGES.filter(
        (c) => c.name.toLowerCase().includes(query) || c.location.toLowerCase().includes(query)
      )
        .map((c) => c.name)
        .slice(0, 4);
      setSuggestions(matchedNames);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/colleges?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSuggestionClick = (name: string) => {
    setSearchQuery(name);
    setSuggestions([]);
    router.push(`/colleges?search=${encodeURIComponent(name)}`);
  };

  const handleSaveToggle = (id: string, name: string) => {
    if (!isAuthenticated) {
      toast.info('Please sign in to save your favorite colleges.');
      router.push('/auth/login');
      return;
    }
    toggleSaveCollege(id);
    const saved = isCollegeSaved(id);
    if (!saved) {
      toast.success(`Bookmarked ${name}!`);
    } else {
      toast.info(`Removed ${name} from saved list.`);
    }
  };

  const popularLocations = [
    { name: 'Bangalore', count: 2, image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=150' },
    { name: 'Mumbai', count: 3, image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80&w=150' },
    { name: 'Delhi NCR', count: 2, image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=150' },
    { name: 'Pune', count: 2, image: 'https://images.unsplash.com/photo-1601999109332-542b18dbec57?auto=format&fit=crop&q=80&w=150' }
  ];

  const popularStreams = [
    { name: 'Engineering', icon: GraduationCap, degree: 'B.Tech / BE', bg: 'bg-blue-50 text-blue-600 border-blue-100' },
    { name: 'Management', icon: Landmark, degree: 'MBA / PGP', bg: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { name: 'Medical', icon: Award, degree: 'MBBS / MD', bg: 'bg-rose-50 text-rose-600 border-rose-100' },
    { name: 'Design & Arts', icon: TrendingUp, degree: 'B.Des / M.Des', bg: 'bg-amber-50 text-amber-600 border-amber-100' }
  ];

  return (
    <div className="flex flex-col w-full pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative w-full py-20 lg:py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center">
          <Badge variant="outline" className="text-indigo-300 border-indigo-500/30 bg-indigo-950/40 px-3.5 py-1 text-xs font-bold uppercase tracking-widest mb-6">
            🎓 Discover Your Future Campus
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] max-w-3xl mb-6">
            Find the Perfect College <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-primary">
              Backed by Real Data
            </span>
          </h1>
          
          <p className="text-base sm:text-lg text-slate-300 max-w-xl mb-10 leading-relaxed font-medium">
            Explore 100+ accredited universities, compare tuition fees side-by-side, check placement packages, and browse honest student reviews.
          </p>

          {/* Search Bar Wrapper */}
          <form onSubmit={handleSearchSubmit} className="w-full max-w-2xl relative mb-12">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by college name, city, or courses offered..."
                  className="bg-white/95 text-slate-800 placeholder-slate-400 border-slate-700/20 shadow-xl h-12 rounded-xl text-base pr-12 focus:ring-primary/30"
                  icon={<Search className="w-5 h-5 text-slate-400" />}
                />
              </div>
              <Button type="submit" className="h-12 rounded-xl text-base font-bold sm:w-40 shrink-0">
                Search Colleges
              </Button>
            </div>

            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-100 text-slate-800 text-left overflow-hidden z-20">
                {suggestions.map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => handleSuggestionClick(name)}
                    className="w-full px-5 py-3 hover:bg-slate-50 border-b border-slate-50 last:border-0 flex items-center gap-2.5 font-semibold text-sm transition-colors text-slate-700"
                  >
                    <Search className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{name}</span>
                  </button>
                ))}
              </div>
            )}
          </form>

          {/* Core Analytics Quick stats */}
          <div className="grid grid-cols-3 gap-6 sm:gap-12 text-center border-t border-slate-700/40 pt-8 w-full max-w-xl">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white">12+</div>
              <div className="text-xs sm:text-sm text-slate-400 font-bold mt-1">Detailed Colleges</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white">100%</div>
              <div className="text-xs sm:text-sm text-slate-400 font-bold mt-1">Verified Placements</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white">8+</div>
              <div className="text-xs sm:text-sm text-slate-400 font-bold mt-1">Major Hubs</div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Popular Locations */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-20">
        <div className="flex flex-col items-center text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mb-2">
            Explore Popular Education Hubs
          </h2>
          <p className="text-slate-500 text-sm sm:text-base font-semibold">
            Choose from the most vibrant university environments across India
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {popularLocations.map((loc) => (
            <Link
              key={loc.name}
              href={`/colleges?location=${encodeURIComponent(loc.name)}`}
              className="group relative rounded-2xl overflow-hidden aspect-16/10 shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300"
            >
              {/* Overlay Image */}
              <img
                src={loc.image}
                alt={loc.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent flex flex-col justify-end p-4">
                <h3 className="text-base font-bold text-white leading-tight">{loc.name}</h3>
                <span className="text-xs font-semibold text-slate-300 mt-0.5">
                  {loc.count} {loc.count === 1 ? 'College' : 'Colleges'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Trending Course Streams */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-20">
        <div className="flex flex-col items-center text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mb-2">
            Trending Course Streams
          </h2>
          <p className="text-slate-500 text-sm sm:text-base font-semibold">
            Discover top colleges filtered by popular professional degree clusters
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {popularStreams.map((stream) => {
            const StreamIcon = stream.icon;
            return (
              <Link
                key={stream.name}
                href={`/colleges?course=${encodeURIComponent(stream.name === 'Design & Arts' ? 'B.Des' : stream.name === 'Engineering' ? 'B.Tech' : stream.name === 'Management' ? 'MBA' : 'MBBS')}`}
                className={cn(
                  "p-6 rounded-2xl border flex flex-col items-center justify-center text-center gap-4 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 bg-white"
                )}
              >
                <div className={cn("p-4 rounded-xl border flex items-center justify-center transition-colors group-hover:scale-105 duration-200", stream.bg)}>
                  <StreamIcon className="w-6 h-6 stroke-[2px]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800 leading-tight">{stream.name}</h3>
                  <p className="text-xs font-semibold text-slate-400 mt-1">{stream.degree}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. Featured Colleges */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-20">
        <div className="flex items-end justify-between mb-10 gap-4">
          <div className="text-left">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mb-2">
              Featured Premium Colleges
            </h2>
            <p className="text-slate-500 text-sm sm:text-base font-semibold">
              Highly rated campuses with outstanding placement records
            </p>
          </div>
          <Link href="/colleges" className="shrink-0 flex items-center gap-1.5 text-primary text-sm font-bold hover:underline">
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Featured Colleges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredColleges.map((college) => {
            const isSaved = hydrated && isCollegeSaved(college.id);
            return (
              <div
                key={college.id}
                className="flex flex-col border border-slate-100 rounded-3xl bg-white shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full"
              >
                {/* Header Image */}
                <div className="relative aspect-16/10 overflow-hidden w-full bg-slate-100 shrink-0">
                  <img
                    src={college.image}
                    alt={college.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Rating Overlay */}
                  <div className="absolute top-4 left-4 z-10">
                    <RatingBadge rating={college.rating} />
                  </div>
                  {/* Bookmark Overlay */}
                  <button
                    onClick={() => handleSaveToggle(college.id, college.name)}
                    className="absolute top-4 right-4 z-10 w-9 h-9 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center border border-slate-200/40 text-slate-500 hover:text-red-500 hover:bg-white active:scale-95 transition-all shadow-md cursor-pointer"
                  >
                    <svg
                      className={cn("w-4.5 h-4.5 stroke-[2.2px] fill-current", isSaved ? "text-red-500" : "text-transparent")}
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                    </svg>
                  </button>
                </div>

                {/* Body Details */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Meta tag */}
                  <div className="flex gap-2 items-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    <span>{college.collegeType}</span>
                    <span>•</span>
                    <span>Established {college.established}</span>
                  </div>

                  <h3 className="text-base font-black text-slate-800 line-clamp-1 hover:text-primary transition-colors mb-2">
                    <Link href={`/colleges/${college.id}`}>{college.name}</Link>
                  </h3>

                  <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 mb-4">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{college.location}, {college.state}</span>
                  </div>

                  {/* Highlights section */}
                  <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100/50 mb-5">
                    <div className="text-left">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Average Fees</span>
                      <span className="text-sm font-extrabold text-slate-700">{formatCurrency(college.averageFees)}/yr</span>
                    </div>
                    <div className="text-left">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Avg Placement</span>
                      <span className="text-sm font-extrabold text-emerald-600">{college.placements.averagePackage} LPA</span>
                    </div>
                  </div>

                  {/* Footer Courses */}
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {college.topCourses.slice(0, 2).map((c) => (
                        <span key={c} className="px-2 py-0.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-500 border border-slate-200/30">
                          {c}
                        </span>
                      ))}
                    </div>
                    <Link href={`/colleges/${college.id}`}>
                      <Button variant="outline" size="sm" className="h-8 px-3 rounded-lg text-xs font-bold">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-24">
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-primary to-indigo-600 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="text-center md:text-left space-y-3 z-10 max-w-lg">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
              Compare Multiple Campuses?
            </h2>
            <p className="text-sm sm:text-base text-indigo-100 font-semibold leading-relaxed">
              Use our high-powered comparison dashboard to compare up to 3 colleges side-by-side on metrics like average fees, ratings, and packages.
            </p>
          </div>

          <div className="z-10 flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/compare">
              <Button variant="secondary" size="md" className="w-full sm:w-auto font-black shadow-md">
                Launch Comparator
              </Button>
            </Link>
            <Link href="/colleges">
              <Button variant="outline" size="md" className="w-full sm:w-auto text-white border-white/30 bg-transparent hover:bg-white/10 font-bold">
                Explore Listings
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
