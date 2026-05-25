'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Search, MapPin, SlidersHorizontal, Trash2, ArrowUpDown, ChevronLeft, ChevronRight, Bookmark, GitCompare } from 'lucide-react';
import { useFilterStore } from '@/store/useFilterStore';
import { useCompareStore } from '@/store/useCompareStore';
import { useAuthStore } from '@/store/useAuthStore';
import { api } from '@/services/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { Slider } from '@/components/ui/Slider';
import { RatingBadge } from '@/components/ui/RatingBadge';
import { SkeletonLoader } from '@/components/ui/SkeletonLoader';
import { EmptyState } from '@/components/ui/EmptyState';
import { toast } from '@/components/ui/Toast';
import { LOCATIONS, COURSES, COLLEGE_TYPES, RATINGS_OPTIONS, FEE_LIMITS } from '@/constants';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';

// Helper to debounce state values
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

function CollegesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State stores
  const { filters, sort, setSearch, toggleLocation, toggleCourse, toggleCollegeType, setFeeRange, toggleRating, setSortField, toggleSortOrder, resetFilters } = useFilterStore();
  const { selectedIds, addCollege, removeCollege, clearCompare, isCompared } = useCompareStore();
  const { toggleSaveCollege, isCollegeSaved, isAuthenticated } = useAuthStore();

  const [localSearch, setLocalSearch] = useState(filters.search);
  const debouncedSearch = useDebounce(localSearch, 400);
  const [page, setPage] = useState(1);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Sync debounced search to Zustand
  useEffect(() => {
    setSearch(debouncedSearch);
    setPage(1);
  }, [debouncedSearch, setSearch]);

  // Avoid hydration errors
  useEffect(() => {
    setHydrated(true);
  }, []);

  // Parse URL Search Params on mount to initialize filters
  useEffect(() => {
    const paramSearch = searchParams.get('search');
    const paramLoc = searchParams.get('location');
    const paramCourse = searchParams.get('course');

    if (paramSearch || paramLoc || paramCourse) {
      resetFilters();
      if (paramSearch) setSearch(paramSearch);
      if (paramLoc) toggleLocation(paramLoc);
      if (paramCourse) toggleCourse(paramCourse);
    }
  }, [searchParams, resetFilters, setSearch, toggleLocation, toggleCourse]);

  // Reset page to 1 when any filter changes
  useEffect(() => {
    setPage(1);
  }, [filters.locations, filters.courses, filters.collegeTypes, filters.feeRange, filters.ratings, sort]);

  // TanStack Query for filtering, sorting and paginating
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['colleges', filters, sort.field, sort.order, page],
    queryFn: () => api.fetchColleges(filters, sort.field, sort.order, page, 6),
    placeholderData: (previousData) => previousData
  });

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

  const handleCompareToggle = (id: string, name: string) => {
    if (isCompared(id)) {
      removeCollege(id);
      toast.info(`Removed ${name} from compare checklist.`);
    } else {
      const result = addCollege(id);
      if (result.success) {
        toast.success(`Added ${name} to compare list!`);
      } else {
        toast.error(result.message || 'Failed to add college.');
      }
    }
  };

  const totalPages = data ? Math.ceil(data.totalCount / 6) : 1;

  // Render Filter Form block (reusable for desktop & mobile)
  const renderFiltersForm = () => (
    <div className="flex flex-col gap-6 text-left">
      {/* Active filters count + Clear */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-100">
        <span className="text-sm font-bold text-slate-700">Filters</span>
        <button
          onClick={resetFilters}
          className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear All
        </button>
      </div>

      {/* College Type */}
      <div className="flex flex-col gap-3">
        <h4 className="text-sm font-bold text-slate-700">College Type</h4>
        <div className="flex flex-col gap-2">
          {COLLEGE_TYPES.map((type) => (
            <Checkbox
              key={type}
              checked={filters.collegeTypes.includes(type)}
              onChange={() => toggleCollegeType(type)}
              label={`${type} University`}
            />
          ))}
        </div>
      </div>

      {/* Locations */}
      <div className="flex flex-col gap-3">
        <h4 className="text-sm font-bold text-slate-700">Location Hubs</h4>
        <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-1">
          {LOCATIONS.map((loc) => (
            <Checkbox
              key={loc}
              checked={filters.locations.includes(loc)}
              onChange={() => toggleLocation(loc)}
              label={loc}
            />
          ))}
        </div>
      </div>

      {/* Courses */}
      <div className="flex flex-col gap-3">
        <h4 className="text-sm font-bold text-slate-700">Streams & Courses</h4>
        <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-1">
          {COURSES.map((c) => (
            <Checkbox
              key={c}
              checked={filters.courses.includes(c)}
              onChange={() => toggleCourse(c)}
              label={c}
            />
          ))}
        </div>
      </div>

      {/* Fees Limits Slider */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-sm font-bold text-slate-700">
          <span>Annual Fees Range</span>
        </div>
        <Slider
          min={FEE_LIMITS[0]}
          max={FEE_LIMITS[1]}
          step={50000}
          value={filters.feeRange}
          onChange={setFeeRange}
        />
        <div className="flex justify-between text-xs font-bold text-slate-500 mt-1">
          <span>{formatCurrency(filters.feeRange[0])}</span>
          <span>{formatCurrency(filters.feeRange[1])}</span>
        </div>
      </div>

      {/* Ratings */}
      <div className="flex flex-col gap-3">
        <h4 className="text-sm font-bold text-slate-700">Student Ratings</h4>
        <div className="flex flex-col gap-2">
          {RATINGS_OPTIONS.map((opt) => (
            <Checkbox
              key={opt.value}
              checked={filters.ratings.includes(opt.value)}
              onChange={() => toggleRating(opt.value)}
              label={opt.label}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 w-full relative">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8 text-left">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">Explore Accredited Colleges</h1>
          <p className="text-sm text-slate-400 font-semibold mt-1">
            {isLoading ? 'Searching...' : `${data?.totalCount || 0} premium colleges matched your active filters`}
          </p>
        </div>

        {/* Global search in page header */}
        <div className="w-full md:w-80">
          <Input
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search by name, location, courses..."
            className="h-10 text-sm rounded-xl pr-10"
            icon={<Search className="w-4.5 h-4.5 text-slate-400" />}
          />
        </div>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* A. Sticky Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-fit sticky top-20">
          {renderFiltersForm()}
        </aside>

        {/* B. Listings + Sorting Grid */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          
          {/* Sorting / Controls Ribbon */}
          <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
            {/* Mobile filter button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMobileDrawerOpen(true)}
              className="lg:hidden h-9 px-3 rounded-lg text-slate-600 border-slate-200"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>

            <span className="hidden sm:inline text-xs font-bold text-slate-400 uppercase tracking-widest">
              Sort Colleges By
            </span>

            {/* Sorters group */}
            <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
              {(['rating', 'fees', 'placements'] as const).map((field) => (
                <button
                  key={field}
                  onClick={() => {
                    if (sort.field === field) {
                      toggleSortOrder();
                    } else {
                      setSortField(field);
                    }
                  }}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer",
                    sort.field === field
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  )}
                >
                  <span className="capitalize">{field === 'fees' ? 'Fees' : field === 'placements' ? 'Placements' : 'Rating'}</span>
                  {sort.field === field && (
                    <ArrowUpDown className="w-3.5 h-3.5 stroke-[2.2px]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Results Block */}
          {isLoading ? (
            <SkeletonLoader count={3} />
          ) : isError ? (
            <EmptyState
              title="Oops! Something went wrong"
              description="We encountered an issue downloading the colleges list. Please try reloading the database."
              actionText="Retry Database Fetch"
              onAction={refetch}
            />
          ) : !data || data.colleges.length === 0 ? (
            <EmptyState
              title="No Colleges Found"
              description="No universities matched your selected search query or range limits. Try widening your filters or clearing them."
              actionText="Reset All Filters"
              onAction={resetFilters}
            />
          ) : (
            <div className="flex flex-col gap-6">
              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.colleges.map((college) => {
                  const isSaved = hydrated && isCollegeSaved(college.id);
                  const isChecked = hydrated && isCompared(college.id);

                  return (
                    <div
                      key={college.id}
                      className="flex flex-col border border-slate-100 rounded-3xl bg-white shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 h-full text-left"
                    >
                      {/* Thumbnail with overlay badges */}
                      <div className="relative aspect-16/10 bg-slate-100 overflow-hidden shrink-0">
                        <img
                          src={college.image}
                          alt={college.name}
                          className="w-full h-full object-cover"
                        />
                        {/* Type overlay */}
                        <span className="absolute top-4 left-4 z-10 px-2.5 py-0.5 bg-slate-900/60 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-wider rounded-md">
                          {college.collegeType}
                        </span>

                        {/* Top action overlays */}
                        <div className="absolute top-4 right-4 z-10 flex gap-2">
                          <button
                            onClick={() => handleSaveToggle(college.id, college.name)}
                            className="w-8.5 h-8.5 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center border border-slate-200/40 text-slate-500 hover:text-red-500 hover:bg-white active:scale-95 transition-all shadow-md cursor-pointer"
                          >
                            <svg
                              className={cn("w-4 h-4 stroke-[2.2px] fill-current", isSaved ? "text-red-500" : "text-transparent")}
                              viewBox="0 0 24 24"
                            >
                              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Content block */}
                      <div className="p-5 flex-grow flex flex-col gap-3">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-base font-black text-slate-800 line-clamp-1 hover:text-primary transition-colors">
                            <Link href={`/colleges/${college.id}`}>{college.name}</Link>
                          </h3>
                          <RatingBadge rating={college.rating} />
                        </div>

                        <div className="flex items-center gap-1 text-xs font-bold text-slate-500">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{college.location}, {college.state}</span>
                        </div>

                        <hr className="border-slate-100" />

                        {/* Salary and Fees block */}
                        <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100/50">
                          <div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Average Fees</span>
                            <span className="text-xs font-black text-slate-700">{formatCurrency(college.averageFees)}/yr</span>
                          </div>
                          <div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Median Placement</span>
                            <span className="text-xs font-black text-emerald-600">{college.placements.averagePackage} LPA</span>
                          </div>
                        </div>

                        {/* Top Courses listing */}
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {college.topCourses.map((c) => (
                            <span key={c} className="px-2 py-0.5 bg-slate-100 text-slate-500 border border-slate-200/30 text-[10px] font-bold rounded-md">
                              {c}
                            </span>
                          ))}
                        </div>

                        {/* Footer comparison + details links */}
                        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                          {/* Comparison Checkbox */}
                          <Checkbox
                            checked={isChecked}
                            onChange={() => handleCompareToggle(college.id, college.name)}
                            label="Add to Compare"
                          />

                          <Link href={`/colleges/${college.id}`}>
                            <Button variant="outline" size="sm" className="h-8 px-3 rounded-lg text-xs font-bold">
                              View details
                            </Button>
                          </Link>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

              {/* Standard Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="h-9 w-9 p-0 rounded-lg"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <Button
                      key={idx}
                      variant={page === idx + 1 ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setPage(idx + 1)}
                      className="h-9 w-9 p-0 rounded-lg text-xs font-bold"
                    >
                      {idx + 1}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="h-9 w-9 p-0 rounded-lg"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}

            </div>
          )}

        </div>

      </div>

      {/* C. Mobile sliding drawer overlay for filters */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            onClick={() => setMobileDrawerOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          {/* Drawer sheet */}
          <div className="relative w-80 max-w-sm bg-white h-full shadow-2xl flex flex-col p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <span className="text-base font-black text-slate-800">Advanced Filters</span>
              <Button
                variant="ghost"
                onClick={() => setMobileDrawerOpen(false)}
                className="h-8 w-8 p-0 rounded-lg text-slate-400 hover:text-slate-600"
              >
                ✕
              </Button>
            </div>
            {renderFiltersForm()}
          </div>
        </div>
      )}

      {/* D. Floating Sticky Comparison Footer Bar */}
      {hydrated && selectedIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900 text-white rounded-2xl shadow-2xl p-4 flex items-center justify-between gap-6 border border-slate-800 w-[90%] max-w-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary text-white">
              <GitCompare className="w-4.5 h-4.5" />
            </div>
            <div className="text-left">
              <span className="text-xs font-black block leading-none">Comparator Active</span>
              <span className="text-[10px] text-slate-400 font-semibold mt-1 block">
                {selectedIds.length === 1
                  ? 'Select at least 1 more college'
                  : `${selectedIds.length} of 3 colleges chosen`}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={clearCompare}
              className="text-xs font-bold text-slate-400 hover:text-slate-200 hover:underline px-2.5 py-1.5 cursor-pointer"
            >
              Clear
            </button>
            <Link href="/compare">
              <Button
                variant="primary"
                size="sm"
                disabled={selectedIds.length < 2}
                className="h-9 px-4 rounded-xl text-xs font-bold leading-none disabled:bg-slate-800 disabled:text-slate-600"
              >
                Compare Now
              </Button>
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}

export default function CollegesPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading College Listings...</div>}>
      <CollegesContent />
    </Suspense>
  );
}
