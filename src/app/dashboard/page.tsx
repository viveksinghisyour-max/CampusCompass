'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Bookmark, GitCompare, History, Trash2, MapPin, ExternalLink, ArrowRight, User } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useCompareStore } from '@/store/useCompareStore';
import { api } from '@/services/api';
import { Button } from '@/components/ui/Button';
import { RatingBadge } from '@/components/ui/RatingBadge';
import { EmptyState } from '@/components/ui/EmptyState';
import { toast } from '@/components/ui/Toast';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, toggleSaveCollege, deleteComparison } = useAuthStore();
  const { selectedIds, clearCompare, addCollege } = useCompareStore();
  const [activeTab, setActiveTab] = useState<'saved' | 'comparisons' | 'history'>('saved');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Protect Route: Redirect if not logged in
  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      toast.info('Access denied. Please sign in to view your dashboard.');
      router.push('/auth/login');
    }
  }, [isAuthenticated, hydrated, router]);

  // Fetch Saved Colleges
  const savedIds = user?.savedColleges || [];
  const { data: savedColleges = [], isLoading: loadingSaved } = useQuery({
    queryKey: ['dashboard-saved', savedIds],
    queryFn: () => api.fetchCollegesByIds(savedIds),
    enabled: hydrated && isAuthenticated && savedIds.length > 0
  });

  // Fetch Recently Viewed
  const historyIds = user?.recentlyViewed || [];
  const { data: historyColleges = [], isLoading: loadingHistory } = useQuery({
    queryKey: ['dashboard-history', historyIds],
    queryFn: () => api.fetchCollegesByIds(historyIds),
    enabled: hydrated && isAuthenticated && historyIds.length > 0
  });

  const handleRemoveBookmark = (id: string, name: string) => {
    toggleSaveCollege(id);
    toast.success(`Removed ${name} from saved colleges list.`);
  };

  const handleLaunchComparison = (collegeIds: string[]) => {
    clearCompare();
    let successCount = 0;
    collegeIds.forEach((id) => {
      const res = addCollege(id);
      if (res.success) successCount++;
    });
    
    if (successCount > 0) {
      toast.success(`Loaded comparison list. Redirecting...`);
      router.push('/compare');
    } else {
      toast.error('Failed to load comparison.');
    }
  };

  const handleDeleteComparison = (id: string, name: string) => {
    deleteComparison(id);
    toast.info(`Deleted comparison checklist "${name}".`);
  };

  if (!hydrated || !isAuthenticated || !user) {
    return <div className="p-16 text-center text-slate-500 font-semibold">Redirecting to login...</div>;
  }

  const tabItems = [
    { id: 'saved' as const, name: 'Saved Colleges', count: savedIds.length, icon: Bookmark },
    { id: 'comparisons' as const, name: 'Saved Comparisons', count: user.savedComparisons.length, icon: GitCompare },
    { id: 'history' as const, name: 'Recently Viewed', count: historyIds.length, icon: History }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 w-full text-left">
      
      {/* Dashboard Greetings Header */}
      <div className="p-6 md:p-8 border border-slate-100 rounded-3xl bg-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4 text-left">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 shadow-inner">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight leading-snug">
              Welcome, {user.name}!
            </h1>
            <p className="text-xs text-slate-400 font-bold tracking-wide mt-0.5">
              {user.email} • Student Discovery Account
            </p>
          </div>
        </div>

        <div className="flex gap-3 w-full sm:w-auto shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/colleges')}
            className="h-10 text-xs font-bold leading-none border-slate-200 w-full sm:w-auto"
          >
            Explore Listings
          </Button>
        </div>
      </div>

      {/* Tabs list navigation */}
      <div className="flex border-b border-slate-100 gap-2 mb-8 overflow-x-auto pb-px">
        {tabItems.map((tab) => {
          const TabIcon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-5 py-3 border-b-2 font-bold tracking-wide text-sm shrink-0 transition-all cursor-pointer leading-none",
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              )}
            >
              <TabIcon className="w-4 h-4 shrink-0" />
              <span>{tab.name}</span>
              <span className={cn(
                "ml-1.5 px-2 py-0.5 text-[10px] font-black leading-none rounded-full",
                isActive ? "bg-primary text-white" : "bg-slate-100 text-slate-500"
              )}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* A. SAVED COLLEGES TAB CONTENT */}
      {activeTab === 'saved' && (
        <div>
          {loadingSaved ? (
            <div className="text-center p-8 text-slate-500">Retrieving bookmarked list...</div>
          ) : savedColleges.length === 0 ? (
            <EmptyState
              icon={<Bookmark className="w-12 h-12 text-slate-400 stroke-[1.5px]" />}
              title="No Bookmarked Colleges"
              description="You have not saved any colleges yet. Explore the listings directory and tap the bookmark ribbon to save them here."
              actionText="Search Colleges"
              onAction={() => router.push('/colleges')}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedColleges.map((college) => (
                <div
                  key={college.id}
                  className="flex flex-col border border-slate-100 rounded-3xl bg-white shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 h-full text-left"
                >
                  <div className="relative aspect-16/10 shrink-0">
                    <img
                      src={college.image}
                      alt={college.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <RatingBadge rating={college.rating} />
                    </div>
                    {/* Delete bookmark overlay */}
                    <button
                      onClick={() => handleRemoveBookmark(college.id, college.name)}
                      className="absolute top-4 right-4 z-10 w-9 h-9 rounded-xl bg-white/95 backdrop-blur-sm flex items-center justify-center border border-slate-200/40 text-slate-400 hover:text-red-500 active:scale-95 transition-all shadow-md cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-5 flex-grow flex flex-col gap-3">
                    <h3 className="text-sm sm:text-base font-black text-slate-800 line-clamp-1">
                      {college.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs font-semibold text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{college.location}, {college.state}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 border border-slate-100/50 rounded-xl mt-2 text-xs">
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Average Fees</span>
                        <span className="font-extrabold text-slate-700 block mt-0.5">{formatCurrency(college.averageFees)}/yr</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Median Placement</span>
                        <span className="font-extrabold text-emerald-600 block mt-0.5">{college.placements.averagePackage} LPA</span>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                      <Link href={`/colleges/${college.id}`}>
                        <Button variant="outline" size="sm" className="h-8 px-3 rounded-lg text-xs font-bold leading-none border-slate-200">
                          View details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* B. SAVED COMPARISONS TAB CONTENT */}
      {activeTab === 'comparisons' && (
        <div>
          {user.savedComparisons.length === 0 ? (
            <EmptyState
              icon={<GitCompare className="w-12 h-12 text-slate-400 stroke-[1.5px]" />}
              title="No Saved Comparisons"
              description="No comparison combinations are saved in your account. You can save comparison lists directly from the comparator dashboard."
              actionText="Open Comparator"
              onAction={() => router.push('/compare')}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {user.savedComparisons.map((item) => (
                <div
                  key={item.id}
                  className="p-5 border border-slate-100 rounded-3xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col gap-4 text-left"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="text-sm sm:text-base font-black text-slate-800 leading-tight">
                        {item.name}
                      </h3>
                      <span className="text-[10px] text-slate-400 font-bold block mt-1">
                        Saved on {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteComparison(item.id, item.name)}
                      className="p-1.5 rounded-lg border border-slate-100 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 p-3 bg-slate-50 rounded-2xl border border-slate-100/50">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest block shrink-0">Colleges:</div>
                    <div className="flex flex-wrap gap-1">
                      {item.collegeIds.map((id) => (
                        <span key={id} className="px-2 py-0.5 bg-white text-slate-600 border border-slate-200/50 text-[10px] font-bold rounded-md">
                          {id.replace(/-/g, ' ')}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleLaunchComparison(item.collegeIds)}
                    className="w-full text-xs font-black shadow-md mt-auto leading-none h-10"
                  >
                    Launch Comparison Matrix
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* C. RECENTLY VIEWED TAB CONTENT */}
      {activeTab === 'history' && (
        <div>
          {loadingHistory ? (
            <div className="text-center p-8 text-slate-500">Retrieving history ledger...</div>
          ) : historyColleges.length === 0 ? (
            <EmptyState
              icon={<History className="w-12 h-12 text-slate-400 stroke-[1.5px]" />}
              title="No Browsing History"
              description="Your recently viewed history ledger is empty. Click on details of any college profile to log them here."
              actionText="Search Colleges"
              onAction={() => router.push('/colleges')}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {historyColleges.map((college) => (
                <div
                  key={college.id}
                  className="flex flex-col border border-slate-100 rounded-3xl bg-white shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 h-full text-left"
                >
                  <div className="relative aspect-16/10 shrink-0">
                    <img
                      src={college.image}
                      alt={college.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <RatingBadge rating={college.rating} />
                    </div>
                  </div>

                  <div className="p-5 flex-grow flex flex-col gap-3">
                    <h3 className="text-sm sm:text-base font-black text-slate-800 line-clamp-1">
                      {college.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs font-semibold text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{college.location}, {college.state}</span>
                    </div>

                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                      <Link href={`/colleges/${college.id}`} className="w-full">
                        <Button variant="outline" size="sm" className="h-9 w-full rounded-xl text-xs font-bold leading-none border-slate-200">
                          Revisit Profile
                          <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
