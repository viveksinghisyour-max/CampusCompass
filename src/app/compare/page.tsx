'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { GitCompare, Plus, Trash2, ArrowLeft, Landmark, Award, Star, Compass, DollarSign, CheckCircle2, MapPin } from 'lucide-react';
import { useCompareStore } from '@/store/useCompareStore';
import { api } from '@/services/api';
import { MOCK_COLLEGES } from '@/services/mockData';
import { Button } from '@/components/ui/Button';
import { RatingBadge } from '@/components/ui/RatingBadge';
import { EmptyState } from '@/components/ui/EmptyState';
import { toast } from '@/components/ui/Toast';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';

export default function ComparePage() {
  const router = useRouter();
  const { selectedIds, addCollege, removeCollege, clearCompare } = useCompareStore();
  const [hydrated, setHydrated] = useState(false);
  const [showAddSelector, setShowAddSelector] = useState<number | null>(null); // Index of column where add is clicked

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Fetch compared colleges
  const { data: colleges = [], isLoading } = useQuery({
    queryKey: ['compare-colleges', selectedIds],
    queryFn: () => api.fetchCollegesByIds(selectedIds),
    enabled: hydrated
  });

  const handleRemove = (id: string, name: string) => {
    removeCollege(id);
    toast.info(`Removed ${name} from comparison.`);
  };

  const handleAddSelect = (id: string) => {
    const matched = MOCK_COLLEGES.find((c) => c.id === id);
    if (!matched) return;
    
    const res = addCollege(id);
    if (res.success) {
      toast.success(`Added ${matched.name} to comparison!`);
      setShowAddSelector(null);
    } else {
      toast.error(res.message || 'Failed to add.');
    }
  };

  // Find optimal values for highlighting
  const getHighlights = () => {
    if (colleges.length < 2) return { lowestFeesId: '', highestAvgPackageId: '', highestRatingId: '' };

    let lowestFees = Infinity;
    let lowestFeesId = '';
    let highestAvgPackage = -1;
    let highestAvgPackageId = '';
    let highestRating = -1;
    let highestRatingId = '';

    colleges.forEach((c) => {
      if (c.averageFees < lowestFees) {
        lowestFees = c.averageFees;
        lowestFeesId = c.id;
      }
      if (c.placements.averagePackage > highestAvgPackage) {
        highestAvgPackage = c.placements.averagePackage;
        highestAvgPackageId = c.id;
      }
      if (c.rating > highestRating) {
        highestRating = c.rating;
        highestRatingId = c.id;
      }
    });

    return { lowestFeesId, highestAvgPackageId, highestRatingId };
  };

  const { lowestFeesId, highestAvgPackageId, highestRatingId } = getHighlights();

  // Filter out colleges that are already added
  const remainingCollegesForAdd = MOCK_COLLEGES.filter((c) => !selectedIds.includes(c.id));

  if (!hydrated || isLoading) {
    return <div className="p-16 text-center text-slate-500 font-semibold">Loading Comparator Matrix...</div>;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 w-full relative text-left">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8 text-left">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight flex items-center gap-2.5">
            <GitCompare className="w-6 h-6 text-primary stroke-[2.2px]" />
            Side-by-Side Comparison
          </h1>
          <p className="text-sm text-slate-400 font-semibold mt-1">
            Compare and analyze key credentials of up to 3 selected universities
          </p>
        </div>

        <div className="flex gap-3 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/colleges')}
            className="h-10 text-xs font-bold leading-none border-slate-200"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Add More
          </Button>

          {colleges.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearCompare}
              className="h-10 text-xs font-bold leading-none text-slate-500 hover:text-red-500 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-1.5" />
              Clear All
            </Button>
          )}
        </div>
      </div>

      {/* Main comparator UI */}
      {colleges.length === 0 ? (
        <EmptyState
          icon={<GitCompare className="w-12 h-12 text-slate-400 stroke-[1.5px]" />}
          title="No Colleges Selected"
          description="Your comparison board is currently empty. Choose colleges from the Listings directory to perform a side-by-side analysis."
          actionText="Go to Listings Explorer"
          onAction={() => router.push('/colleges')}
        />
      ) : (
        <div className="border border-slate-100 rounded-3xl bg-white shadow-sm overflow-hidden flex flex-col w-full">
          
          {/* 1. Comparison Column Headers Grid (Sticky on top of table) */}
          <div className="sticky top-16 z-20 bg-slate-900 text-white border-b border-slate-800 grid grid-cols-4 gap-4 p-5 items-center">
            {/* Header Column 1: Labels placeholder */}
            <div className="col-span-1 text-left hidden md:block">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Metrics</span>
              <span className="text-xs text-slate-300 font-semibold mt-1 block">Parameters & Accreditations</span>
            </div>
            
            {/* Columns 2-4: Compared items or Add boxes */}
            {Array.from({ length: 3 }).map((_, idx) => {
              const college = colleges[idx];
              if (college) {
                return (
                  <div key={college.id} className="col-span-1 md:col-span-1 text-left relative flex flex-col gap-1 pr-4">
                    <button
                      onClick={() => handleRemove(college.id, college.name)}
                      className="absolute top-0 right-0 p-1 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                    <span className="text-[9px] font-black text-indigo-300 uppercase tracking-wider block">
                      College {idx + 1}
                    </span>
                    <Link
                      href={`/colleges/${college.id}`}
                      className="text-xs sm:text-sm font-black text-white hover:text-indigo-200 line-clamp-1 leading-tight mt-1"
                    >
                      {college.name}
                    </Link>
                    <span className="text-[10px] text-slate-400 font-semibold leading-none mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 shrink-0" />
                      {college.location}
                    </span>
                  </div>
                );
              }

              // Empty slot selector block
              return (
                <div key={idx} className="col-span-1 text-left border border-dashed border-slate-700/60 rounded-xl p-3 flex flex-col justify-center items-start gap-1 relative h-16 min-h-[64px]">
                  {showAddSelector === idx ? (
                    <select
                      onChange={(e) => handleAddSelect(e.target.value)}
                      defaultValue=""
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded-md text-xs p-1.5 focus:outline-none"
                    >
                      <option value="" disabled>Choose...</option>
                      {remainingCollegesForAdd.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  ) : (
                    <button
                      onClick={() => setShowAddSelector(idx)}
                      className="w-full h-full flex items-center justify-start gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer text-xs font-bold"
                    >
                      <Plus className="w-4 h-4 text-slate-500 shrink-0" />
                      <span>Add College</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* 2. Side-by-Side Parameter Rows (Comparison matrix body) */}
          <div className="divide-y divide-slate-100 text-sm">
            
            {/* ROW 1: RATING */}
            <div className="grid grid-cols-4 gap-4 p-5 items-center bg-slate-50/20 hover:bg-slate-50/50 transition-colors">
              <div className="col-span-1 font-bold text-slate-500 text-left">
                Student Rating
              </div>
              {Array.from({ length: 3 }).map((_, idx) => {
                const college = colleges[idx];
                if (!college) return <div key={idx} className="col-span-1 text-slate-400 text-left font-semibold text-xs">-</div>;
                const isBest = college.id === highestRatingId;

                return (
                  <div key={college.id} className="col-span-1 text-left flex items-center gap-2">
                    <RatingBadge rating={college.rating} />
                    {isBest && (
                      <span className="hidden sm:inline px-2 py-0.5 bg-amber-100 text-amber-800 text-[9px] font-black uppercase tracking-wider rounded-md border border-amber-200">
                        Best Rating
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ROW 2: ESTABLISHED */}
            <div className="grid grid-cols-4 gap-4 p-5 items-center hover:bg-slate-50/50 transition-colors">
              <div className="col-span-1 font-bold text-slate-500 text-left">
                Year Established
              </div>
              {Array.from({ length: 3 }).map((_, idx) => {
                const college = colleges[idx];
                if (!college) return <div key={idx} className="col-span-1 text-slate-400 text-left font-semibold text-xs">-</div>;

                return (
                  <div key={college.id} className="col-span-1 text-slate-700 font-semibold text-left">
                    Year {college.established}
                  </div>
                );
              })}
            </div>

            {/* ROW 3: TYPE */}
            <div className="grid grid-cols-4 gap-4 p-5 items-center bg-slate-50/20 hover:bg-slate-50/50 transition-colors">
              <div className="col-span-1 font-bold text-slate-500 text-left">
                Affiliation Type
              </div>
              {Array.from({ length: 3 }).map((_, idx) => {
                const college = colleges[idx];
                if (!college) return <div key={idx} className="col-span-1 text-slate-400 text-left font-semibold text-xs">-</div>;

                return (
                  <div key={college.id} className="col-span-1 text-left">
                    <span className={cn(
                      "px-2.5 py-0.5 rounded-lg text-xs font-bold border",
                      college.collegeType === 'Public'
                        ? "bg-slate-50 text-slate-700 border-slate-200"
                        : "bg-indigo-50 text-indigo-700 border-indigo-100"
                    )}>
                      {college.collegeType}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* ROW 4: AVERAGE ANNUAL FEES */}
            <div className="grid grid-cols-4 gap-4 p-5 items-center hover:bg-slate-50/50 transition-colors">
              <div className="col-span-1 font-bold text-slate-500 text-left">
                Average Annual Fees
              </div>
              {Array.from({ length: 3 }).map((_, idx) => {
                const college = colleges[idx];
                if (!college) return <div key={idx} className="col-span-1 text-slate-400 text-left font-semibold text-xs">-</div>;
                const isBestValue = college.id === lowestFeesId;

                return (
                  <div key={college.id} className="col-span-1 text-left space-y-1">
                    <span className="font-extrabold text-slate-800 block">
                      {formatCurrency(college.averageFees)}/yr
                    </span>
                    {isBestValue && (
                      <span className="inline-flex px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase tracking-wider rounded-md border border-emerald-200 leading-none">
                        Lowest Fees
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ROW 5: AVERAGE PLACEMENT PACKAGE */}
            <div className="grid grid-cols-4 gap-4 p-5 items-center bg-slate-50/20 hover:bg-slate-50/50 transition-colors">
              <div className="col-span-1 font-bold text-slate-500 text-left">
                Median Placements
              </div>
              {Array.from({ length: 3 }).map((_, idx) => {
                const college = colleges[idx];
                if (!college) return <div key={idx} className="col-span-1 text-slate-400 text-left font-semibold text-xs">-</div>;
                const isHighest = college.id === highestAvgPackageId;

                return (
                  <div key={college.id} className="col-span-1 text-left space-y-1">
                    <span className="font-black text-emerald-600 block">
                      {college.placements.averagePackage} LPA
                    </span>
                    {isHighest && (
                      <span className="inline-flex px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase tracking-wider rounded-md border border-emerald-200 leading-none">
                        Highest Avg
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ROW 6: HIGHEST PLACEMENT PACKAGE */}
            <div className="grid grid-cols-4 gap-4 p-5 items-center hover:bg-slate-50/50 transition-colors">
              <div className="col-span-1 font-bold text-slate-500 text-left">
                Highest Placements Offer
              </div>
              {Array.from({ length: 3 }).map((_, idx) => {
                const college = colleges[idx];
                if (!college) return <div key={idx} className="col-span-1 text-slate-400 text-left font-semibold text-xs">-</div>;

                return (
                  <div key={college.id} className="col-span-1 text-left font-extrabold text-slate-700">
                    {college.placements.highestPackage} LPA
                  </div>
                );
              })}
            </div>

            {/* ROW 7: NATIONAL NIRF RANKINGS */}
            <div className="grid grid-cols-4 gap-4 p-5 items-center bg-slate-50/20 hover:bg-slate-50/50 transition-colors">
              <div className="col-span-1 font-bold text-slate-500 text-left">
                NIRF Rankings (2025)
              </div>
              {Array.from({ length: 3 }).map((_, idx) => {
                const college = colleges[idx];
                if (!college) return <div key={idx} className="col-span-1 text-slate-400 text-left font-semibold text-xs">-</div>;
                const nirfRank = college.rankings.find((r) => r.agency.toLowerCase().includes('nirf'));

                return (
                  <div key={college.id} className="col-span-1 text-left font-extrabold text-slate-700">
                    {nirfRank ? `#${nirfRank.rank}` : 'Unranked'}
                  </div>
                );
              })}
            </div>

            {/* ROW 8: TOP ACCREDITED COURSES */}
            <div className="grid grid-cols-4 gap-4 p-5 items-center hover:bg-slate-50/50 transition-colors">
              <div className="col-span-1 font-bold text-slate-500 text-left">
                Top Courses
              </div>
              {Array.from({ length: 3 }).map((_, idx) => {
                const college = colleges[idx];
                if (!college) return <div key={idx} className="col-span-1 text-slate-400 text-left font-semibold text-xs">-</div>;

                return (
                  <div key={college.id} className="col-span-1 text-left flex flex-wrap gap-1">
                    {college.topCourses.map((c) => (
                      <span key={c} className="px-2 py-0.5 bg-slate-100 text-slate-500 border border-slate-200/30 text-[10px] font-bold rounded-md">
                        {c}
                      </span>
                    ))}
                  </div>
                );
              })}
            </div>

            {/* ROW 9: ACCREDITATIONS */}
            <div className="grid grid-cols-4 gap-4 p-5 items-center bg-slate-50/20 hover:bg-slate-50/50 transition-colors">
              <div className="col-span-1 font-bold text-slate-500 text-left">
                Accreditations
              </div>
              {Array.from({ length: 3 }).map((_, idx) => {
                const college = colleges[idx];
                if (!college) return <div key={idx} className="col-span-1 text-slate-400 text-left font-semibold text-xs">-</div>;

                return (
                  <div key={college.id} className="col-span-1 text-left font-bold text-slate-700 text-xs">
                    {college.accreditation}
                  </div>
                );
              })}
            </div>

            {/* ROW 10: ACTION TRIGGERS */}
            <div className="grid grid-cols-4 gap-4 p-5 items-center hover:bg-slate-50/50 transition-colors">
              <div className="col-span-1 text-slate-400" />
              {Array.from({ length: 3 }).map((_, idx) => {
                const college = colleges[idx];
                if (!college) return <div key={idx} className="col-span-1" />;

                return (
                  <div key={college.id} className="col-span-1 text-left">
                    <Link href={`/colleges/${college.id}`}>
                      <Button variant="primary" size="sm" className="h-9 px-4 rounded-xl text-xs font-bold leading-none shadow-md shadow-primary/5">
                        View Details
                      </Button>
                    </Link>
                  </div>
                );
              })}
            </div>

          </div>
          
        </div>
      )}

    </div>
  );
}
