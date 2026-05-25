export interface Ranking {
  agency: string;
  rank: number;
  year: number;
}

export interface Placements {
  averagePackage: number; // in LPA (Lakhs Per Annum)
  highestPackage: number; // in LPA
  placementRate: number; // percentage (e.g. 95 for 95%)
  topRecruiters: string[];
}

export interface Course {
  name: string;
  fees: number; // Annual fee in INR
  duration: string; // e.g., "4 Years"
  eligibility: string;
  seats: number;
}

export interface Review {
  id: string;
  author: string;
  role: string; // e.g., "B.Tech Student, 3rd Year"
  rating: number;
  title: string;
  content: string;
  date: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface College {
  id: string;
  name: string;
  rating: number;
  location: string;
  state: string;
  averageFees: number; // Representative avg fee in INR
  topCourses: string[]; // List of popular courses e.g., ["B.Tech", "M.Tech"]
  collegeType: 'Public' | 'Private';
  image: string; // Main thumbnail/card image
  bannerImage: string; // Detail header banner image
  gallery: string[]; // List of campus images
  rankings: Ranking[];
  placements: Placements;
  courses: Course[];
  reviews: Review[];
  faqs: FAQ[];
  established: number; // Year established
  accreditation: string; // NAAC A++, NBA etc.
  campusSize: string; // e.g. "120 Acres"
  totalStudents: number; // Enrollment size
}
