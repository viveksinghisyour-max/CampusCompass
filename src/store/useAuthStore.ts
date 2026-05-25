import { create } from 'zustand';
import { User, SavedComparison } from '@/types/auth';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  
  // Auth Operations
  login: (email: string, name: string) => Promise<boolean>;
  signup: (email: string, name: string) => Promise<boolean>;
  logout: () => void;
  
  // Saved Colleges Operations (with Optimistic UI updates)
  toggleSaveCollege: (collegeId: string) => void;
  isCollegeSaved: (collegeId: string) => boolean;
  
  // Recently Viewed History
  addToRecentlyViewed: (collegeId: string) => void;
  
  // Saved Comparisons
  saveComparison: (name: string, collegeIds: string[]) => void;
  deleteComparison: (comparisonId: string) => void;
}

const DEFAULT_MOCK_USER: User = {
  id: 'usr-101',
  email: 'student@campuscompass.in',
  name: 'Aravind Swamy',
  savedColleges: ['iit-bangalore', 'bits-hyderabad'],
  savedComparisons: [
    {
      id: 'comp-1',
      name: 'Top Engineering B.Tech',
      collegeIds: ['iit-bangalore', 'bits-hyderabad'],
      createdAt: '2026-05-24T12:00:00.000Z'
    }
  ],
  recentlyViewed: ['iim-ahmedabad', 'delhi-school-of-management']
};

export const useAuthStore = create<AuthStore>((set, get) => {
  // Safe localStorage getter
  const getStoredUser = (): User | null => {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem('cc_user');
    if (!stored) {
      // Initialize with default mock user on first load
      localStorage.setItem('cc_user', JSON.stringify(DEFAULT_MOCK_USER));
      return DEFAULT_MOCK_USER;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  };

  const syncUser = (user: User | null) => {
    if (typeof window !== 'undefined') {
      if (user) {
        localStorage.setItem('cc_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('cc_user');
      }
    }
  };

  const initialUser = getStoredUser();

  return {
    user: initialUser,
    isAuthenticated: !!initialUser,
    loading: false,

    login: async (email, name) => {
      set({ loading: true });
      await new Promise((r) => setTimeout(r, 500)); // Latency
      const newUser: User = {
        id: `usr-${Math.random().toString(36).substr(2, 9)}`,
        email,
        name,
        savedColleges: [],
        savedComparisons: [],
        recentlyViewed: []
      };
      set({ user: newUser, isAuthenticated: true, loading: false });
      syncUser(newUser);
      return true;
    },

    signup: async (email, name) => {
      set({ loading: true });
      await new Promise((r) => setTimeout(r, 500));
      const newUser: User = {
        id: `usr-${Math.random().toString(36).substr(2, 9)}`,
        email,
        name,
        savedColleges: [],
        savedComparisons: [],
        recentlyViewed: []
      };
      set({ user: newUser, isAuthenticated: true, loading: false });
      syncUser(newUser);
      return true;
    },

    logout: () => {
      set({ user: null, isAuthenticated: false });
      if (typeof window !== 'undefined') {
        localStorage.removeItem('cc_user');
      }
    },

    toggleSaveCollege: (collegeId) => {
      const { user } = get();
      if (!user) return; // Must be authenticated to save

      const savedColleges = user.savedColleges.includes(collegeId)
        ? user.savedColleges.filter((id) => id !== collegeId)
        : [...user.savedColleges, collegeId];

      const updatedUser = { ...user, savedColleges };
      set({ user: updatedUser });
      syncUser(updatedUser);
    },

    isCollegeSaved: (collegeId) => {
      const { user } = get();
      return user ? user.savedColleges.includes(collegeId) : false;
    },

    addToRecentlyViewed: (collegeId) => {
      const { user } = get();
      if (!user) return;

      // Filter out existing and push to front, limit to 6 entries
      const recentlyViewed = [
        collegeId,
        ...user.recentlyViewed.filter((id) => id !== collegeId)
      ].slice(0, 6);

      const updatedUser = { ...user, recentlyViewed };
      set({ user: updatedUser });
      syncUser(updatedUser);
    },

    saveComparison: (name, collegeIds) => {
      const { user } = get();
      if (!user) return;

      const newComparison: SavedComparison = {
        id: `comp-${Math.random().toString(36).substr(2, 9)}`,
        name,
        collegeIds,
        createdAt: new Date().toISOString()
      };

      const savedComparisons = [newComparison, ...user.savedComparisons];
      const updatedUser = { ...user, savedComparisons };
      set({ user: updatedUser });
      syncUser(updatedUser);
    },

    deleteComparison: (comparisonId) => {
      const { user } = get();
      if (!user) return;

      const savedComparisons = user.savedComparisons.filter(
        (c) => c.id !== comparisonId
      );
      const updatedUser = { ...user, savedComparisons };
      set({ user: updatedUser });
      syncUser(updatedUser);
    }
  };
});
