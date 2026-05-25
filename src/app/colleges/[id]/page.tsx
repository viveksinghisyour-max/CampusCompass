'use client';

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { MapPin, Calendar, Award, Compass, Users, CheckCircle2, Bookmark, GitCompare, ArrowLeft, Phone, Mail, Globe, Sparkles } from 'lucide-react';
import { api } from '@/services/api';
import { useAuthStore } from '@/store/useAuthStore';
import { useCompareStore } from '@/store/useCompareStore';
import { Button } from '@/components/ui/Button';
import { RatingBadge } from '@/components/ui/RatingBadge';
import { SkeletonLoader } from '@/components/ui/SkeletonLoader';
import { EmptyState } from '@/components/ui/EmptyState';
import { toast } from '@/components/ui/Toast';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface CollegeDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function CollegeDetailPage({ params }: CollegeDetailPageProps) {
  const router = useRouter();
  const { id } = use(params);

  // Zustand stores
  const { toggleSaveCollege, isCollegeSaved, addToRecentlyViewed, isAuthenticated } = useAuthStore();
  const { addCollege, removeCollege, isCompared } = useCompareStore();

  const [activeTab, setActiveTab] = useState('overview');
  const [applyLoading, setApplyLoading] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setHydrated(true);
  }, []);

  // Fetch college details
  const { data: college, isLoading, isError } = useQuery({
    queryKey: ['college-detail', id],
    queryFn: () => api.fetchCollegeById(id)
  });

  // Track viewing history when loaded
  useEffect(() => {
    if (college) {
      addToRecentlyViewed(college.id);
    }
  }, [college, addToRecentlyViewed]);

  const handleSaveToggle = () => {
    if (!college) return;
    if (!isAuthenticated) {
      toast.info('Please sign in to save your favorite colleges.');
      router.push('/auth/login');
      return;
    }
    toggleSaveCollege(college.id);
    const saved = isCollegeSaved(college.id);
    if (!saved) {
      toast.success(`Bookmarked ${college.name}!`);
    } else {
      toast.info(`Removed ${college.name} from saved list.`);
    }
  };

  const handleCompareToggle = () => {
    if (!college) return;
    const isChecked = isCompared(college.id);
    if (isChecked) {
      removeCollege(college.id);
      toast.info(`Removed ${college.name} from comparison.`);
    } else {
      const result = addCollege(college.id);
      if (result.success) {
        toast.success(`Added ${college.name} to compare checklist.`);
      } else {
        toast.error(result.message || 'Failed to add college.');
      }
    }
  };

  const handleApplyNow = () => {
    setApplyLoading(true);
    setTimeout(() => {
      setApplyLoading(false);
      toast.success('Congratulations! Your application form has been generated and submitted successfully. An expert academic counselor will contact you shortly!');
    }, 1200);
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 w-full text-left">
        <SkeletonLoader variant="detail" />
      </div>
    );
  }

  if (isError || !college) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 w-full">
        <EmptyState
          title="College Profile Not Found"
          description="The requested university identifier does not exist or has been removed from our directories."
          actionText="Back to Discovery Grid"
          onAction={() => router.push('/colleges')}
        />
      </div>
    );
  }

  const isSaved = hydrated && isCollegeSaved(college.id);
  const isComparedChecked = hydrated && isCompared(college.id);

  // Sub-navigation navigation tabs definition
  const tabItems = [
    { id: 'overview', name: 'Overview' },
    { id: 'courses', name: 'Courses & Fees' },
    { id: 'placements', name: 'Placements' },
    { id: 'rankings', name: 'Rankings' },
    { id: 'reviews', name: 'Reviews' },
    { id: 'faqs', name: 'FAQs' }
  ];

  return (
    <div className="w-full flex flex-col pb-20 text-left">
      
      {/* 1. Hero Image Banner Header */}
      <section className="relative w-full h-[320px] sm:h-[400px] bg-slate-900 overflow-hidden shrink-0">
        <img
          src={college.bannerImage}
          alt={college.name}
          className="w-full h-full object-cover filter brightness-[0.65]"
        />
        
        {/* Navigation back and overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-full max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
          <button
            onClick={() => router.push('/colleges')}
            className="flex items-center gap-2 text-white hover:text-indigo-200 transition-colors font-bold text-sm bg-slate-900/40 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Explorer</span>
          </button>
        </div>

        {/* Banner Details (Absolute overlay at bottom) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-7xl px-4 sm:px-6 lg:px-8 z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl text-left">
            <div className="flex flex-wrap gap-2 items-center text-xs font-black uppercase tracking-wider text-indigo-300">
              <span className="px-2 py-0.5 rounded-md bg-indigo-950/60 border border-indigo-500/25">
                {college.collegeType}
              </span>
              <span>•</span>
              <span>Established {college.established}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5" />
                {college.accreditation}
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
              {college.name}
            </h1>

            <div className="flex items-center gap-1.5 text-sm sm:text-base font-semibold text-slate-300">
              <MapPin className="w-4.5 h-4.5 text-slate-400 shrink-0" />
              <span>{college.location}, {college.state}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <RatingBadge rating={college.rating} className="px-3.5 py-1.5 text-base rounded-xl" showText />
          </div>
        </div>
      </section>

      {/* 2. Sticky Subnavigation Ribbon */}
      <div className="sticky top-16 z-30 w-full border-b border-slate-100 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-1 overflow-x-auto py-2 pr-4 scrollbar-none">
            {tabItems.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  // Dynamic jump scroll to section header
                  const element = document.getElementById(`sect-${tab.id}`);
                  if (element) {
                    const offset = 120; // sticky header padding
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = element.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
                className={cn(
                  "px-4 py-2 text-sm font-semibold tracking-wide rounded-xl shrink-0 transition-all cursor-pointer",
                  activeTab === tab.id
                    ? "bg-primary/5 text-primary"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                )}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* 3. Core Page Content (Listing Sidebar layout grid) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Tab contents */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* A. OVERVIEW SECTION */}
          <div id="sect-overview" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <Compass className="w-5 h-5 text-primary stroke-[2.2px]" />
              Campus Overview
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              Located in the heart of {college.location}, {college.name} is a premier {college.collegeType.toLowerCase()} institution that has consistently served as a hub for academic excellence, cutting-edge research, and high-impact placement achievements since its establishment in {college.established}. Spanning an impressive {college.campusSize} campus, the university caters to over {college.totalStudents.toLocaleString()} enrolled students with state-of-the-art laboratory networks, world-class lecture halls, and premium residential hostels.
            </p>
            
            {/* Quick credentials cards grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                <Calendar className="w-5 h-5 text-slate-400 mx-auto mb-2" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Established</span>
                <span className="text-sm font-extrabold text-slate-700 mt-0.5 block">{college.established}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                <Award className="w-5 h-5 text-slate-400 mx-auto mb-2" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Accredited</span>
                <span className="text-sm font-extrabold text-slate-700 mt-0.5 block">{college.accreditation}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                <Compass className="w-5 h-5 text-slate-400 mx-auto mb-2" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Campus Size</span>
                <span className="text-sm font-extrabold text-slate-700 mt-0.5 block">{college.campusSize}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                <Users className="w-5 h-5 text-slate-400 mx-auto mb-2" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Students</span>
                <span className="text-sm font-extrabold text-slate-700 mt-0.5 block">{college.totalStudents.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* B. COURSES & FEES SECTION */}
          <div id="sect-courses" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary stroke-[2.2px]" />
              Courses Offered & Fee Structure
            </h2>
            <div className="overflow-x-auto border border-slate-100 rounded-2xl">
              <table className="min-w-full divide-y divide-slate-100 text-sm">
                <thead className="bg-slate-50 font-bold text-slate-500 uppercase tracking-wider text-xs">
                  <tr>
                    <th className="px-6 py-4 text-left">Course Name</th>
                    <th className="px-6 py-4 text-left">Annual Fees</th>
                    <th className="px-6 py-4 text-left">Duration</th>
                    <th className="px-6 py-4 text-left">Eligibility</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600 font-semibold bg-white">
                  {college.courses.map((course, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-slate-800 font-bold">{course.name}</td>
                      <td className="px-6 py-4 text-slate-700">{formatCurrency(course.fees)}/yr</td>
                      <td className="px-6 py-4">{course.duration}</td>
                      <td className="px-6 py-4 text-xs text-slate-500 font-medium max-w-xs">{course.eligibility}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* C. PLACEMENTS SECTION */}
          <div id="sect-placements" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary stroke-[2.2px]" />
              Placement Performance
            </h2>
            
            {/* Visual package cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl border border-emerald-100 bg-emerald-50/30 flex flex-col text-left">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Median Salary</span>
                <span className="text-2xl font-black text-emerald-600">{college.placements.averagePackage} LPA</span>
                <span className="text-xs text-slate-500 font-semibold mt-2">Lakhs Per Annum average package</span>
              </div>
              <div className="p-5 rounded-2xl border border-indigo-100 bg-indigo-50/30 flex flex-col text-left">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Highest Package</span>
                <span className="text-2xl font-black text-primary">{college.placements.highestPackage} LPA</span>
                <span className="text-xs text-slate-500 font-semibold mt-2">Premium tier global placement offer</span>
              </div>
              <div className="p-5 rounded-2xl border border-purple-100 bg-purple-50/30 flex flex-col text-left">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Placement Rate</span>
                <span className="text-2xl font-black text-purple-700">{college.placements.placementRate}%</span>
                <span className="text-xs text-slate-500 font-semibold mt-2">Accredited student placement ratio</span>
              </div>
            </div>

            {/* Recruiters marquee */}
            <div className="space-y-3 pt-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Featured Top Recruiters</h3>
              <div className="flex flex-wrap gap-2">
                {college.placements.topRecruiters.map((recruiter) => (
                  <span
                    key={recruiter}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 text-slate-700 border border-slate-200/60 rounded-xl text-xs font-bold shadow-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    {recruiter}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* D. RANKINGS SECTION */}
          <div id="sect-rankings" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary stroke-[2.2px]" />
              National & Global Rankings
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {college.rankings.map((ranking, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl bg-slate-50/50">
                  <div className="text-left">
                    <span className="text-xs font-extrabold text-slate-700 block">{ranking.agency}</span>
                    <span className="text-[10px] text-slate-400 font-bold block mt-0.5">Year {ranking.year}</span>
                  </div>
                  <div className="px-3.5 py-2 rounded-xl bg-primary/10 text-primary border border-primary/20 text-center font-black text-base">
                    #{ranking.rank}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* E. REVIEWS SECTION */}
          <div id="sect-reviews" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary stroke-[2.2px]" />
              Student Reviews
            </h2>
            <div className="flex flex-col gap-6">
              {college.reviews.map((rev) => (
                <div key={rev.id} className="p-5 border border-slate-100 rounded-2xl bg-slate-50/50 text-left flex flex-col gap-3">
                  <div className="flex justify-between items-start gap-4 flex-wrap">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">{rev.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold mt-1">
                        <span>By {rev.author}</span>
                        <span>•</span>
                        <span>{rev.role}</span>
                      </div>
                    </div>
                    <RatingBadge rating={rev.rating} className="scale-90" />
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    "{rev.content}"
                  </p>
                  <span className="text-[10px] text-slate-400 font-bold self-end mt-1">Reviewed on {rev.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* F. FAQs SECTION */}
          <div id="sect-faqs" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <Compass className="w-5 h-5 text-primary stroke-[2.2px]" />
              Frequently Asked Questions (FAQs)
            </h2>
            <div className="flex flex-col gap-4 text-left">
              {college.faqs.map((faq, idx) => (
                <div key={idx} className="p-4 border border-slate-100 rounded-xl space-y-2">
                  <h4 className="text-sm font-bold text-slate-700 flex items-start gap-2.5">
                    <span className="text-primary font-black shrink-0">Q.</span>
                    <span>{faq.question}</span>
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed pl-5 font-semibold">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Sticky Action Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-slate-100 rounded-3xl shadow-sm p-6 space-y-6 h-fit sticky top-20 text-left">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Average Annual Tuition</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-slate-800">{formatCurrency(college.averageFees)}</span>
                <span className="text-xs text-slate-400 font-bold">/ year</span>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Core credentials checklist */}
            <div className="space-y-3.5 text-xs text-slate-600 font-bold">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Affiliation</span>
                <span>{college.collegeType} University</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Campus Area</span>
                <span>{college.campusSize}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Accreditations</span>
                <span>{college.accreditation}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Enrollment</span>
                <span>{college.totalStudents.toLocaleString()} Students</span>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Main Action CTAs */}
            <div className="flex flex-col gap-3">
              <Button
                variant="primary"
                onClick={handleApplyNow}
                isLoading={applyLoading}
                className="w-full text-sm font-black shadow-lg shadow-primary/10"
              >
                Apply Now
              </Button>

              <div className="grid grid-cols-2 gap-3">
                {/* Save Toggle */}
                <Button
                  variant="outline"
                  onClick={handleSaveToggle}
                  className="h-10 text-xs font-bold leading-none border-slate-200"
                >
                  <Bookmark className={cn("w-4 h-4 mr-1.5", isSaved && "text-red-500 fill-current")} />
                  {isSaved ? 'Saved' : 'Bookmark'}
                </Button>
                
                {/* Compare Checkbox */}
                <Button
                  variant="outline"
                  onClick={handleCompareToggle}
                  className="h-10 text-xs font-bold leading-none border-slate-200"
                >
                  <GitCompare className={cn("w-4 h-4 mr-1.5", isComparedChecked && "text-primary")} />
                  {isComparedChecked ? 'Added' : 'Compare'}
                </Button>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Admissions support hotline details */}
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Admissions Support Hotline</span>
              <ul className="space-y-2.5 text-xs font-semibold text-slate-500">
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>+91 80 4910 2201</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">admission@{college.id}.edu.in</span>
                </li>
                <li className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate text-primary hover:underline">www.{college.id}.edu.in</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
}
