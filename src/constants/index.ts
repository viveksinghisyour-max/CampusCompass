export const LOCATIONS = [
  'Bangalore',
  'Delhi NCR',
  'Mumbai',
  'Pune',
  'Chennai',
  'Hyderabad',
  'Kolkata',
  'Ahmedabad'
];

export const COURSES = [
  'B.Tech',
  'MBA',
  'MBBS',
  'B.Des',
  'B.Arch',
  'M.Tech',
  'MCA',
  'B.Sc'
];

export const COLLEGE_TYPES = ['Public', 'Private'] as const;

export const RATINGS_OPTIONS = [
  { label: '4.5 & above', value: 4.5 },
  { label: '4.0 & above', value: 4.0 },
  { label: '3.5 & above', value: 3.5 },
  { label: '3.0 & above', value: 3.0 }
];

export const FEE_LIMITS: [number, number] = [0, 1500000]; // 0 to 15 Lakhs INR
export const DEFAULT_FEE_RANGE: [number, number] = [0, 1500000];
