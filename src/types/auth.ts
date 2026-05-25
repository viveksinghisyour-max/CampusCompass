export interface SavedComparison {
  id: string;
  name: string;
  collegeIds: string[]; // List of 2 or 3 college IDs being compared
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  savedColleges: string[]; // Array of college IDs
  savedComparisons: SavedComparison[];
  recentlyViewed: string[]; // Array of college IDs representing history
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}
