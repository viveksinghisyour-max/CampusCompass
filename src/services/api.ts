import { College } from '@/types/college';
import { FilterState, SortField, SortOrder } from '@/types/filter';
import { MOCK_COLLEGES } from './mockData';

// Simulated delay helper
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface CollegesResponse {
  colleges: College[];
  hasMore: boolean;
  totalCount: number;
}

export const api = {
  /**
   * Fetches list of colleges with search, filters, sorting and pagination
   */
  fetchColleges: async (
    filters: FilterState,
    sortField: SortField,
    sortOrder: SortOrder,
    page: number = 1,
    limit: number = 6
  ): Promise<CollegesResponse> => {
    await delay(600); // Simulate network latency

    let filtered = [...MOCK_COLLEGES];

    // 1. Text Search (Name, Location, topCourses)
    if (filters.search.trim()) {
      const searchLower = filters.search.toLowerCase().trim();
      filtered = filtered.filter(
        (college) =>
          college.name.toLowerCase().includes(searchLower) ||
          college.location.toLowerCase().includes(searchLower) ||
          college.topCourses.some((c) => c.toLowerCase().includes(searchLower))
      );
    }

    // 2. Location filter
    if (filters.locations.length > 0) {
      filtered = filtered.filter((college) =>
        filters.locations.includes(college.location)
      );
    }

    // 3. Courses filter
    if (filters.courses.length > 0) {
      filtered = filtered.filter((college) =>
        college.topCourses.some((c) => filters.courses.includes(c))
      );
    }

    // 4. College Type filter (Public/Private)
    if (filters.collegeTypes.length > 0) {
      filtered = filtered.filter((college) =>
        filters.collegeTypes.includes(college.collegeType)
      );
    }

    // 5. Fee Range filter
    const [minFee, maxFee] = filters.feeRange;
    filtered = filtered.filter(
      (college) => college.averageFees >= minFee && college.averageFees <= maxFee
    );

    // 6. Ratings filter (any rating matching >= criteria)
    if (filters.ratings.length > 0) {
      filtered = filtered.filter((college) =>
        filters.ratings.some((ratingThreshold) => college.rating >= ratingThreshold)
      );
    }

    // 7. Sorting
    filtered.sort((a, b) => {
      let valA: number = 0;
      let valB: number = 0;

      if (sortField === 'rating') {
        valA = a.rating;
        valB = b.rating;
      } else if (sortField === 'fees') {
        valA = a.averageFees;
        valB = b.averageFees;
      } else if (sortField === 'placements') {
        valA = a.placements.averagePackage;
        valB = b.placements.averagePackage;
      }

      if (sortOrder === 'asc') {
        return valA - valB;
      } else {
        return valB - valA;
      }
    });

    // 8. Pagination
    const totalCount = filtered.length;
    const startIndex = (page - 1) * limit;
    const paginatedColleges = filtered.slice(startIndex, startIndex + limit);
    const hasMore = startIndex + limit < totalCount;

    return {
      colleges: paginatedColleges,
      hasMore,
      totalCount
    };
  },

  /**
   * Fetches single college by ID
   */
  fetchCollegeById: async (id: string): Promise<College | null> => {
    await delay(400); // Simulate network latency
    const college = MOCK_COLLEGES.find((c) => c.id === id) || null;
    return college;
  },

  /**
   * Fetches multiple colleges by their IDs (useful for comparison and dashboard)
   */
  fetchCollegesByIds: async (ids: string[]): Promise<College[]> => {
    await delay(400);
    return MOCK_COLLEGES.filter((c) => ids.includes(c.id));
  }
};
