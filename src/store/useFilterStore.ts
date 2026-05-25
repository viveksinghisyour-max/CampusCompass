import { create } from 'zustand';
import { FilterState, SortState, SortField, SortOrder } from '@/types/filter';
import { DEFAULT_FEE_RANGE } from '@/constants';

interface FilterStore {
  filters: FilterState;
  sort: SortState;

  // Search & Filter Setters
  setSearch: (search: string) => void;
  toggleLocation: (location: string) => void;
  toggleCourse: (course: string) => void;
  toggleCollegeType: (type: 'Public' | 'Private') => void;
  setFeeRange: (range: [number, number]) => void;
  toggleRating: (rating: number) => void;

  // Sorting Setters
  setSortField: (field: SortField) => void;
  setSortOrder: (order: SortOrder) => void;
  toggleSortOrder: () => void;

  // Global Actions
  resetFilters: () => void;
}

const initialFilters: FilterState = {
  search: '',
  locations: [],
  courses: [],
  collegeTypes: [],
  feeRange: DEFAULT_FEE_RANGE,
  ratings: []
};

const initialSort: SortState = {
  field: 'rating',
  order: 'desc'
};

export const useFilterStore = create<FilterStore>((set) => ({
  filters: { ...initialFilters },
  sort: { ...initialSort },

  setSearch: (search) =>
    set((state) => ({
      filters: { ...state.filters, search }
    })),

  toggleLocation: (location) =>
    set((state) => {
      const locations = state.filters.locations.includes(location)
        ? state.filters.locations.filter((loc) => loc !== location)
        : [...state.filters.locations, location];
      return { filters: { ...state.filters, locations } };
    }),

  toggleCourse: (course) =>
    set((state) => {
      const courses = state.filters.courses.includes(course)
        ? state.filters.courses.filter((c) => c !== course)
        : [...state.filters.courses, course];
      return { filters: { ...state.filters, courses } };
    }),

  toggleCollegeType: (type) =>
    set((state) => {
      const collegeTypes = state.filters.collegeTypes.includes(type)
        ? state.filters.collegeTypes.filter((t) => t !== type)
        : [...state.filters.collegeTypes, type];
      return { filters: { ...state.filters, collegeTypes } };
    }),

  setFeeRange: (feeRange) =>
    set((state) => ({
      filters: { ...state.filters, feeRange }
    })),

  toggleRating: (rating) =>
    set((state) => {
      const ratings = state.filters.ratings.includes(rating)
        ? state.filters.ratings.filter((r) => r !== rating)
        : [...state.filters.ratings, rating];
      return { filters: { ...state.filters, ratings } };
    }),

  setSortField: (field) =>
    set((state) => ({
      sort: { ...state.sort, field }
    })),

  setSortOrder: (order) =>
    set((state) => ({
      sort: { ...state.sort, order }
    })),

  toggleSortOrder: () =>
    set((state) => ({
      sort: {
        ...state.sort,
        order: state.sort.order === 'asc' ? 'desc' : 'asc'
      }
    })),

  resetFilters: () =>
    set(() => ({
      filters: { ...initialFilters },
      sort: { ...initialSort }
    }))
}));
