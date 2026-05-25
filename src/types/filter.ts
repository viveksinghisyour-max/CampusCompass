export type SortField = 'rating' | 'fees' | 'placements';
export type SortOrder = 'asc' | 'desc';

export interface FilterState {
  search: string;
  locations: string[];
  courses: string[];
  collegeTypes: ('Public' | 'Private')[];
  feeRange: [number, number]; // [minFees, maxFees] in INR
  ratings: number[]; // e.g. [4, 3] representing >= 4.0, >= 3.0 etc.
}

export interface SortState {
  field: SortField;
  order: SortOrder;
}
