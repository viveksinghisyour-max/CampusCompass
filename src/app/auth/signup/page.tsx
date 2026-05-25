'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Compass, Mail, Lock, User, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { toast } from '@/components/ui/Toast';

export default function SignupPage() {
  const router = useRouter();
  const { signup, isAuthenticated, loading } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Already logged in? Direct to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      toast.error('Please input details in all fields.');
      return;
    }

    if (name.trim().length < 2) {
      toast.error('Name must be at least 2 characters long.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please provide a valid email format.');
      return;
    }

    if (password.length < 6) {
      toast.error('Passwords must contain at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match. Please verify your entries.');
      return;
    }

    try {
      const success = await signup(email, name.trim());
      if (success) {
        toast.success(`Account created! Welcome, ${name.trim()}! Your discovery profile is fully activated.`);
        router.push('/dashboard');
      }
    } catch {
      toast.error('Failed to create account. Email may already be in use.');
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-slate-50/50 relative overflow-hidden">
      {/* Decorative background filters */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-6 z-10 text-left">
        
        {/* Header branding block */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group mb-2">
            <div className="p-2 rounded-xl bg-primary text-white shadow-md shadow-primary/10 group-hover:scale-105 transition-transform duration-200">
              <Compass className="w-5 h-5 stroke-[2.2px]" />
            </div>
            <span className="text-lg font-black tracking-tight text-slate-800">
              CampusCompass
            </span>
          </Link>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
            Create Discovery Profile
          </h2>
          <p className="text-xs text-slate-400 font-semibold leading-relaxed">
            Personalize your higher education research, bookmark colleges, and sync comparison listings
          </p>
        </div>

        {/* Main form card container */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">
                Full Name
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Aravind Swamy"
                icon={<User className="w-4 h-4" />}
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">
                Email Address
              </label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="name@university.com"
                icon={<Mail className="w-4 h-4" />}
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">
                Password Code
              </label>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Minimum 6 characters"
                icon={<Lock className="w-4 h-4" />}
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">
                Confirm Password
              </label>
              <Input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="Re-enter password"
                icon={<Lock className="w-4 h-4" />}
              />
            </div>

            <Button
              type="submit"
              isLoading={loading}
              className="w-full text-sm font-black shadow-lg shadow-primary/10 mt-2 animate-pulse-once"
            >
              Register Discovery Account
            </Button>

            {/* SSO Connectors UI */}
            <div className="relative flex items-center justify-center my-5">
              <div className="absolute inset-x-0 h-px bg-slate-100" />
              <span className="relative px-3 text-[10px] font-black text-slate-400 uppercase tracking-wider bg-white">
                Or SignUp With
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => toast.info('Google Sign-up is simulated on frontends.')}
                className="flex items-center justify-center h-10 border border-slate-200 hover:bg-slate-50 transition-colors rounded-xl cursor-pointer"
              >
                <svg className="w-4.5 h-4.5 text-[#ea4335]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-6.887 4.114-4.68 0-8.498-3.818-8.498-8.498S7.56 1.518 12.24 1.518c2.25 0 4.154.818 5.618 2.185l3.232-3.232C18.673.914 15.655 0 12.24 0 5.48 0 0 5.48 0 12.24s5.48 12.24 12.24 12.24c7.058 0 11.727-4.966 11.727-11.948 0-.806-.073-1.425-.218-2.25H12.24z"/>
                </svg>
              </button>
              <button
                type="button"
                onClick={() => toast.info('GitHub Sign-up is simulated on frontends.')}
                className="flex items-center justify-center h-10 border border-slate-200 hover:bg-slate-50 transition-colors rounded-xl cursor-pointer"
              >
                <svg className="w-4.5 h-4.5 text-slate-800" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </button>
              <button
                type="button"
                onClick={() => toast.info('Apple Sign-up is simulated on frontends.')}
                className="flex items-center justify-center h-10 border border-slate-200 hover:bg-slate-50 transition-colors rounded-xl cursor-pointer"
              >
                <svg className="w-4.5 h-4.5 text-slate-800" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.2.67-2.92 1.49-.62.71-1.16 1.85-1.01 2.96 1.11.09 2.24-.55 2.94-1.39z"/>
                </svg>
              </button>
            </div>

          </form>
        </div>

        {/* Back navigation option link */}
        <p className="text-center text-xs font-bold text-slate-400">
          Already registered?{' '}
          <Link href="/auth/login" className="text-primary hover:underline flex items-center justify-center gap-1 mt-2">
            <ArrowLeft className="w-3.5 h-3.5 inline" />
            <span>Go to account Sign In</span>
          </Link>
        </p>

      </div>
    </div>
  );
}
