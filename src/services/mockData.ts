import { College } from '@/types/college';

export const MOCK_COLLEGES: College[] = [
  {
    id: 'iit-bangalore',
    name: 'Indian Institute of Technology (IIT) Bangalore',
    rating: 4.9,
    location: 'Bangalore',
    state: 'Karnataka',
    averageFees: 220000,
    topCourses: ['B.Tech', 'M.Tech', 'M.Sc'],
    collegeType: 'Public',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=600'
    ],
    established: 1999,
    accreditation: 'NAAC A++',
    campusSize: '180 Acres',
    totalStudents: 8500,
    rankings: [
      { agency: 'NIRF (Engineering)', rank: 2, year: 2025 },
      { agency: 'QS India', rank: 3, year: 2025 },
      { agency: 'India Today', rank: 1, year: 2025 }
    ],
    placements: {
      averagePackage: 24.5,
      highestPackage: 82.0,
      placementRate: 98,
      topRecruiters: ['Google', 'Microsoft', 'NVIDIA', 'Apple', 'Amazon', 'Goldman Sachs']
    },
    courses: [
      { name: 'B.Tech Computer Science & Engineering', fees: 220000, duration: '4 Years', eligibility: 'Class 12 with 75% + JEE Advanced', seats: 120 },
      { name: 'B.Tech Electronics & Communication', fees: 210000, duration: '4 Years', eligibility: 'Class 12 with 75% + JEE Advanced', seats: 100 },
      { name: 'B.Tech Mechanical Engineering', fees: 200000, duration: '4 Years', eligibility: 'Class 12 with 75% + JEE Advanced', seats: 80 },
      { name: 'M.Tech Data Science & AI', fees: 150000, duration: '2 Years', eligibility: 'B.Tech/BE + GATE Qualified', seats: 45 },
      { name: 'M.Sc Physics', fees: 80000, duration: '2 Years', eligibility: 'B.Sc Physics with 60%', seats: 30 }
    ],
    reviews: [
      {
        id: 'rev-iitb-1',
        author: 'Rohan Sharma',
        role: 'B.Tech CSE Student, 4th Year',
        rating: 5,
        title: 'Outstanding academic environment and top-tier placements',
        content: 'IIT Bangalore is a dream. The curriculum is rigorous but extremely satisfying. Placements are exceptional, with almost all premium companies visiting. The campus culture is vibrant, and professors are world-class.',
        date: '2026-04-12'
      },
      {
        id: 'rev-iitb-2',
        author: 'Ananya Goel',
        role: 'M.Tech AI Alumna',
        rating: 4.8,
        title: 'Excellent research focus and tech ecosystem access',
        content: 'Doing my M.Tech here gave me immense exposure. Being in Bangalore, the tech capital, helps with internships and industry collaborations. The lab facilities are top-notch.',
        date: '2025-11-20'
      }
    ],
    faqs: [
      { question: 'What is the cutoff rank for CSE?', answer: 'The cutoff for B.Tech CSE is typically within the top 200 ranks in JEE Advanced.' },
      { question: 'Are hostels compulsory?', answer: 'Yes, IIT Bangalore is a fully residential campus. All undergraduate students must reside in campus hostels.' },
      { question: 'Is there a fee waiver?', answer: 'Yes, 100% tuition fee waiver for SC/ST/PH students, and various merit-cum-means scholarships are available based on family income.' }
    ]
  },
  {
    id: 'iim-ahmedabad',
    name: 'Indian Institute of Management (IIM) Ahmedabad',
    rating: 4.9,
    location: 'Ahmedabad',
    state: 'Gujarat',
    averageFees: 1150000,
    topCourses: ['MBA', 'Executive MBA', 'PhD'],
    collegeType: 'Public',
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1607237138185-eedd996e5b09?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600'
    ],
    established: 1961,
    accreditation: 'EQUIS, AACSB Accredited',
    campusSize: '102 Acres',
    totalStudents: 1200,
    rankings: [
      { agency: 'NIRF (Management)', rank: 1, year: 2025 },
      { agency: 'Financial Times Global MBA', rank: 25, year: 2025 },
      { agency: 'QS Global MBA', rank: 22, year: 2025 }
    ],
    placements: {
      averagePackage: 32.8,
      highestPackage: 115.0,
      placementRate: 100,
      topRecruiters: ['McKinsey & Co', 'Boston Consulting Group', 'Bain & Co', 'Goldman Sachs', 'Morgan Stanley', 'HUL']
    },
    courses: [
      { name: 'Post Graduate Programme in Management (MBA)', fees: 1150000, duration: '2 Years', eligibility: 'Graduation + CAT Cutoff (typically 99.5+ percentile)', seats: 385 },
      { name: 'PGP in Food & Agri-Business Management', fees: 1050000, duration: '2 Years', eligibility: 'Graduation in Agri/Allied fields + CAT', seats: 50 },
      { name: 'PGPX (Executive MBA)', fees: 1500000, duration: '1 Year', eligibility: 'Graduation + 4+ Years Experience + GMAT/GRE', seats: 140 }
    ],
    reviews: [
      {
        id: 'rev-iima-1',
        author: 'Siddharth Mehta',
        role: 'MBA Student, 2nd Year',
        rating: 5,
        title: 'The WIMWI experience is unparalleled',
        content: 'The case-study pedagogy forces you to think like a CEO from day one. Peers are incredibly smart, and recruiters include global strategy consultancies and investment banks.',
        date: '2026-03-01'
      }
    ],
    faqs: [
      { question: 'What is the absolute CAT cutoff?', answer: 'While the minimum qualifying percentile is 85, final calls for interviews are rarely issued below 99.0 percentile for general category.' },
      { question: 'How is the campus hostel accommodation?', answer: 'The legendary red-brick hostels designed by Louis Kahn are iconic. Single occupancy rooms are provided with high-speed internet and excellent mess food.' }
    ]
  },
  {
    id: 'bits-hyderabad',
    name: 'BITS Pilani - Hyderabad Campus',
    rating: 4.7,
    location: 'Hyderabad',
    state: 'Telangana',
    averageFees: 510000,
    topCourses: ['B.Tech', 'B.Pharma', 'M.Tech'],
    collegeType: 'Private',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600'
    ],
    established: 2008,
    accreditation: 'NAAC A',
    campusSize: '200 Acres',
    totalStudents: 5500,
    rankings: [
      { agency: 'NIRF (Engineering)', rank: 20, year: 2025 },
      { agency: 'NIRF (Overall)', rank: 25, year: 2025 }
    ],
    placements: {
      averagePackage: 19.8,
      highestPackage: 60.0,
      placementRate: 96,
      topRecruiters: ['Microsoft', 'Salesforce', 'Uber', 'DEShaw', 'JPMorgan Chase', 'Qualcomm']
    },
    courses: [
      { name: 'B.Tech Computer Science', fees: 510000, duration: '4 Years', eligibility: 'Class 12 with 75% in PCM + BITSAT Score', seats: 150 },
      { name: 'B.Tech Electronics & Instrumentation', fees: 490000, duration: '4 Years', eligibility: 'Class 12 with 75% in PCM + BITSAT Score', seats: 120 },
      { name: 'B.Tech Chemical Engineering', fees: 450000, duration: '4 Years', eligibility: 'Class 12 with 75% in PCM + BITSAT Score', seats: 80 },
      { name: 'M.Tech Microelectronics', fees: 280000, duration: '2 Years', eligibility: 'BE/B.Tech with 60% + GATE/BITS Entrance', seats: 30 }
    ],
    reviews: [
      {
        id: 'rev-bits-1',
        author: 'Varun K.',
        role: 'B.Tech EEE Graduate',
        rating: 4.7,
        title: 'Zero attendance policy and excellent peer learning',
        content: 'No mandatory attendance gives you the freedom to pursue projects, coding, and startup ideas. Practice School (PS-II) internships guarantee full-time offers for many students.',
        date: '2026-02-15'
      }
    ],
    faqs: [
      { question: 'What is BITSAT?', answer: 'BITSAT is the computer-based online admission test conducted by BITS Pilani for all campus admissions.' },
      { question: 'What is the Practice School system?', answer: 'It is a structured internship programme. PS-1 is conducted for 2 months after Year 2, and PS-2 is a full-semester 6-month internship in Year 4.' }
    ]
  },
  {
    id: 'delhi-school-of-management',
    name: 'Delhi School of Management (DSM)',
    rating: 4.6,
    location: 'Delhi NCR',
    state: 'Delhi',
    averageFees: 450000,
    topCourses: ['MBA', 'Executive MBA'],
    collegeType: 'Public',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=600'
    ],
    established: 2009,
    accreditation: 'AICTE Approved',
    campusSize: '165 Acres (DTU Campus)',
    totalStudents: 500,
    rankings: [
      { agency: 'NIRF (Management)', rank: 62, year: 2025 },
      { agency: 'Business Today', rank: 45, year: 2025 }
    ],
    placements: {
      averagePackage: 15.2,
      highestPackage: 36.0,
      placementRate: 95,
      topRecruiters: ['EY', 'KPMG', 'PwC', 'Deloitte', 'ICICI Bank', 'Amazon']
    },
    courses: [
      { name: 'Master of Business Administration (MBA)', fees: 450000, duration: '2 Years', eligibility: 'Graduation with 60% + CAT Percentile', seats: 120 },
      { name: 'MBA in Financial Technology', fees: 480000, duration: '2 Years', eligibility: 'Graduation + CAT', seats: 40 },
      { name: 'Executive MBA', fees: 380000, duration: '2 Years', eligibility: 'Graduation + 2 Years Job + Written Test', seats: 60 }
    ],
    reviews: [
      {
        id: 'rev-dsm-1',
        author: 'Priyal Vats',
        role: 'MBA Year 2',
        rating: 4.5,
        title: 'Very high ROI management course in North India',
        content: 'Since the fees are very low compared to private colleges, the return on investment is stellar. Being inside the Delhi Technological University (DTU) campus also gives great cross-disciplinary networking.',
        date: '2026-05-10'
      }
    ],
    faqs: [
      { question: 'Are DTU students given weightage in admissions?', answer: 'Yes, 85% of seats are reserved for students from the Delhi Region, which includes DTU alumni.' }
    ]
  },
  {
    id: 'symbiosis-design-pune',
    name: 'Symbiosis Institute of Design (SID) Pune',
    rating: 4.5,
    location: 'Pune',
    state: 'Maharashtra',
    averageFees: 320000,
    topCourses: ['B.Des', 'M.Des'],
    collegeType: 'Private',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200',
    gallery: [],
    established: 2004,
    accreditation: 'UGC Approved',
    campusSize: '80 Acres',
    totalStudents: 1500,
    rankings: [
      { agency: 'India Today (Design)', rank: 8, year: 2025 },
      { agency: 'Outlook iCare', rank: 5, year: 2025 }
    ],
    placements: {
      averagePackage: 9.2,
      highestPackage: 22.0,
      placementRate: 90,
      topRecruiters: ['Tata Motors', 'Infosys UX', 'Cognizant', 'L&T Elixir', 'Autodesk', 'Myntra']
    },
    courses: [
      { name: 'B.Des Communication Design', fees: 320000, duration: '4 Years', eligibility: 'Class 12 with 50% + SEED Exam', seats: 80 },
      { name: 'B.Des Industrial Design', fees: 320000, duration: '4 Years', eligibility: 'Class 12 + SEED Exam', seats: 60 },
      { name: 'B.Des Fashion Design', fees: 330000, duration: '4 Years', eligibility: 'Class 12 + SEED Exam', seats: 60 }
    ],
    reviews: [
      {
        id: 'rev-sid-1',
        author: 'Meera Chawla',
        role: 'B.Des 3rd Year',
        rating: 4.6,
        title: 'Creative freedom, amazing studio culture',
        content: 'SID Pune is highly creative. The studios are fully equipped, and the student community is friendly. The SEED entrance focuses on design thinking rather than dry memorization.',
        date: '2026-01-22'
      }
    ],
    faqs: [
      { question: 'What is SEED?', answer: 'Symbiosis Entrance Exam for Design (SEED) is a design aptitude test measuring creative ability, lateral thinking, and visualization.' }
    ]
  },
  {
    id: 'madras-medical-college',
    name: 'Madras Medical College',
    rating: 4.8,
    location: 'Chennai',
    state: 'Tamil Nadu',
    averageFees: 80000,
    topCourses: ['MBBS', 'MD', 'MS'],
    collegeType: 'Public',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200',
    gallery: [],
    established: 1835,
    accreditation: 'NMC Approved, NAAC A',
    campusSize: '35 Acres',
    totalStudents: 2200,
    rankings: [
      { agency: 'NIRF (Medical)', rank: 11, year: 2025 },
      { agency: 'India Today Medical', rank: 4, year: 2025 }
    ],
    placements: {
      averagePackage: 12.0,
      highestPackage: 28.0,
      placementRate: 99,
      topRecruiters: ['Apollo Hospitals', 'Fortis Healthcare', 'Government Medical Services', 'Max Health', 'AIIMS']
    },
    courses: [
      { name: 'Bachelor of Medicine & Bachelor of Surgery (MBBS)', fees: 80000, duration: '5.5 Years', eligibility: 'Class 12 Biology + NEET UG Cutoff', seats: 250 },
      { name: 'MD General Medicine', fees: 60000, duration: '3 Years', eligibility: 'MBBS + NEET PG Score', seats: 35 },
      { name: 'MS General Surgery', fees: 60000, duration: '3 Years', eligibility: 'MBBS + NEET PG Score', seats: 30 }
    ],
    reviews: [
      {
        id: 'rev-mmc-1',
        author: 'Dr. Arjun K.',
        role: 'MD Resident',
        rating: 4.9,
        title: 'Incredible clinical exposure and historic legacy',
        content: 'One of the oldest medical colleges in India. The patient load at General Hospital Chennai gives you unmatched practical diagnostic experience. Highly respected nationwide.',
        date: '2026-03-18'
      }
    ],
    faqs: [
      { question: 'Is rural service compulsory?', answer: 'Yes, as per Tamil Nadu government norms, a 1-year rural medical service bond is mandatory for MBBS graduates.' }
    ]
  },
  {
    id: 'st-xaviers-mumbai',
    name: "St. Xavier's Professional College",
    rating: 4.4,
    location: 'Mumbai',
    state: 'Maharashtra',
    averageFees: 180000,
    topCourses: ['B.Sc', 'MBA', 'MCA'],
    collegeType: 'Private',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1607237138185-eedd996e5b09?auto=format&fit=crop&q=80&w=1200',
    gallery: [],
    established: 1869,
    accreditation: 'NAAC A+++ (Autonomous)',
    campusSize: '15 Acres',
    totalStudents: 3200,
    rankings: [
      { agency: 'India Today (Arts)', rank: 2, year: 2025 },
      { agency: 'India Today (Commerce)', rank: 4, year: 2025 }
    ],
    placements: {
      averagePackage: 7.8,
      highestPackage: 18.0,
      placementRate: 88,
      topRecruiters: ['Morgan Stanley', 'CitiBank', 'Accenture', 'DeShaw', 'Deloitte', 'HDFC Bank']
    },
    courses: [
      { name: 'B.Sc Information Technology', fees: 180000, duration: '3 Years', eligibility: 'Class 12 with Math (min 60%)', seats: 60 },
      { name: 'Master of Computer Applications (MCA)', fees: 220000, duration: '2 Years', eligibility: 'B.Sc/BCA + MAH MCA CET Score', seats: 60 },
      { name: 'MBA Finance (Integrated)', fees: 350000, duration: '5 Years', eligibility: 'Class 12 with 65%', seats: 60 }
    ],
    reviews: [
      {
        id: 'rev-sxc-1',
        author: 'Jessica Dsouza',
        role: 'B.Sc IT Graduate',
        rating: 4.3,
        title: 'Lovely gothic campus, great exposure and festivals',
        content: 'The campus in South Mumbai has unmatched heritage charm. The cultural festival Malhar is famous all over. Recruiters for finance and commerce roles are excellent.',
        date: '2026-04-05'
      }
    ],
    faqs: [
      { question: 'Is there an autonomous syllabus?', answer: 'Yes, St. Xavier’s is fully autonomous, allowing it to design its own curriculum and grading systems.' }
    ]
  },
  {
    id: 'christ-university-bangalore',
    name: 'Christ University Bangalore',
    rating: 4.3,
    location: 'Bangalore',
    state: 'Karnataka',
    averageFees: 195000,
    topCourses: ['MBA', 'MCA', 'B.Des', 'B.Sc'],
    collegeType: 'Private',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200',
    gallery: [],
    established: 1969,
    accreditation: 'NAAC A+',
    campusSize: '75 Acres',
    totalStudents: 18000,
    rankings: [
      { agency: 'India Today (BBA)', rank: 3, year: 2025 },
      { agency: 'NIRF (Overall)', rank: 67, year: 2025 }
    ],
    placements: {
      averagePackage: 7.2,
      highestPackage: 20.0,
      placementRate: 92,
      topRecruiters: ['Wipro', 'HP', 'EY', 'KPMG', 'HSBC', 'Cisco']
    },
    courses: [
      { name: 'MBA International Business', fees: 380000, duration: '2 Years', eligibility: 'Graduation + CAT/MAT/GMAT + CUET Selection', seats: 240 },
      { name: 'MCA Computer Applications', fees: 195000, duration: '2 Years', eligibility: 'BCA/B.Sc CS + Written & Interview', seats: 120 },
      { name: 'B.Des Product Design', fees: 280000, duration: '4 Years', eligibility: 'Class 12 with 50%', seats: 60 }
    ],
    reviews: [
      {
        id: 'rev-christ-1',
        author: 'Akhil Mathew',
        role: 'MBA Student',
        rating: 4.2,
        title: 'Extremely professional and disciplined lifestyle',
        content: 'Strict dress codes and 85% attendance rule can be demanding, but it prepares you well for corporate life. The green campus is incredibly beautiful.',
        date: '2026-02-28'
      }
    ],
    faqs: [
      { question: 'Is the attendance policy very strict?', answer: 'Yes, a minimum of 85% attendance is strictly enforced. Below 75%, students are not allowed to sit for semester examinations.' }
    ]
  },
  {
    id: 'kolkata-university-eng',
    name: 'Kolkata University of Engineering',
    rating: 4.1,
    location: 'Kolkata',
    state: 'West Bengal',
    averageFees: 45000,
    topCourses: ['B.Tech', 'M.Tech', 'MCA'],
    collegeType: 'Public',
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=1200',
    gallery: [],
    established: 1920,
    accreditation: 'NAAC A, NBA',
    campusSize: '60 Acres',
    totalStudents: 4500,
    rankings: [
      { agency: 'NIRF (Engineering)', rank: 48, year: 2025 }
    ],
    placements: {
      averagePackage: 6.2,
      highestPackage: 14.0,
      placementRate: 85,
      topRecruiters: ['TCS', 'Cognizant', 'Wipro', 'Infosys', 'L&T Infotech', 'Capgemini']
    },
    courses: [
      { name: 'B.Tech IT', fees: 45000, duration: '4 Years', eligibility: 'Class 12 + WBJEE Ranks', seats: 60 },
      { name: 'B.Tech Electrical Engineering', fees: 40000, duration: '4 Years', eligibility: 'Class 12 + WBJEE Ranks', seats: 60 },
      { name: 'MCA', fees: 30000, duration: '2 Years', eligibility: 'Graduation + JECA rank', seats: 45 }
    ],
    reviews: [
      {
        id: 'rev-kue-1',
        author: 'Debasish Roy',
        role: 'B.Tech IT Student',
        rating: 4.0,
        title: 'Very cheap fees and solid placements in mass tech IT',
        content: 'The fees are practically negligible (less than 20k per semester). While facilities are historic and old, the placements are extremely stable with TCS and Cognizant hiring in large numbers.',
        date: '2026-03-09'
      }
    ],
    faqs: [
      { question: 'Do I get admitted through JEE Main?', answer: 'No, B.Tech admissions are primarily done based on West Bengal Joint Entrance Examination (WBJEE) ranks.' }
    ]
  },
  {
    id: 'mit-world-peace-pune',
    name: 'MIT World Peace University',
    rating: 4.2,
    location: 'Pune',
    state: 'Maharashtra',
    averageFees: 350000,
    topCourses: ['B.Tech', 'MBA', 'B.Des'],
    collegeType: 'Private',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=1200',
    gallery: [],
    established: 1983,
    accreditation: 'UGC Approved, NBA',
    campusSize: '65 Acres',
    totalStudents: 12000,
    rankings: [
      { agency: 'NIRF (Engineering)', rank: 110, year: 2025 },
      { agency: 'TOI Engineering', rank: 12, year: 2025 }
    ],
    placements: {
      averagePackage: 8.0,
      highestPackage: 25.0,
      placementRate: 90,
      topRecruiters: ['Infosys', 'IBM', 'Tech Mahindra', 'Accenture', 'Intel', 'Mercedes Benz']
    },
    courses: [
      { name: 'B.Tech CSE (Cloud Computing)', fees: 350000, duration: '4 Years', eligibility: 'JEE Main / MHT CET or MIT-WPU Test', seats: 180 },
      { name: 'MBA Marketing', fees: 420000, duration: '2 Years', eligibility: 'Graduation + CAT/MAT/CET Score', seats: 120 }
    ],
    reviews: [
      {
        id: 'rev-mit-1',
        author: 'Sameer Joshi',
        role: 'B.Tech 3rd Year',
        rating: 4.2,
        title: 'Modern campuses and high student involvement',
        content: 'Campus in Kothrud, Pune is beautiful and full of events. The laboratories are fully modern, and they host many technical national level competitions like Robocon.',
        date: '2025-12-05'
      }
    ],
    faqs: [
      { question: 'What is the MIT-WPU entrance test?', answer: 'MIT-WPU conducts its own university entrance test (WPU-MEE) for candidates who have not appeared for national engineering exams.' }
    ]
  },
  {
    id: 'nift-mumbai',
    name: 'National Institute of Fashion Technology (NIFT) Mumbai',
    rating: 4.3,
    location: 'Mumbai',
    state: 'Maharashtra',
    averageFees: 280000,
    topCourses: ['B.Des', 'M.Des'],
    collegeType: 'Public',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200',
    gallery: [],
    established: 1995,
    accreditation: 'Statutory Body (Ministry of Textiles)',
    campusSize: '10 Acres',
    totalStudents: 1100,
    rankings: [
      { agency: 'India Today Fashion', rank: 2, year: 2025 },
      { agency: 'Outlook iCare', rank: 2, year: 2025 }
    ],
    placements: {
      averagePackage: 6.5,
      highestPackage: 15.0,
      placementRate: 85,
      topRecruiters: ['Reliance Retail', 'Aditya Birla Fashion', 'Myntra', 'Raymonds', 'FabIndia', 'Arvind Lifestyle']
    },
    courses: [
      { name: 'B.Des Fashion Communication', fees: 280000, duration: '4 Years', eligibility: 'Class 12 + NIFT Entrance Exam (CAT & GAT)', seats: 45 },
      { name: 'B.Des Accessory Design', fees: 270000, duration: '4 Years', eligibility: 'Class 12 + NIFT CAT & GAT', seats: 40 },
      { name: 'Master of Fashion Management (MFM)', fees: 310000, duration: '2 Years', eligibility: 'Graduation + NIFT GAT', seats: 35 }
    ],
    reviews: [
      {
        id: 'rev-niftm-1',
        author: 'Sanya Gupta',
        role: 'B.Des 4th Year',
        rating: 4.4,
        title: 'Highly creative and premium fashion infrastructure',
        content: 'NIFT Mumbai is widely known for fashion journalism and luxury communications. The campus, located in Kharghar, is filled with creative spaces, textile labs, and pattern-making rooms.',
        date: '2026-05-02'
      }
    ],
    faqs: [
      { question: 'What is the structure of NIFT Entrance Exam?', answer: 'It is divided into Creative Ability Test (CAT), General Ability Test (GAT), followed by a Situation Test for B.Des candidates.' }
    ]
  },
  {
    id: 'sharda-university',
    name: 'Sharda University Greater Noida',
    rating: 3.8,
    location: 'Delhi NCR',
    state: 'Uttar Pradesh',
    averageFees: 210000,
    topCourses: ['B.Tech', 'MBA', 'MCA', 'B.Sc'],
    collegeType: 'Private',
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200',
    gallery: [],
    established: 2009,
    accreditation: 'NAAC B, UGC',
    campusSize: '63 Acres',
    totalStudents: 13000,
    rankings: [
      { agency: 'NIRF (Engineering)', rank: 164, year: 2025 }
    ],
    placements: {
      averagePackage: 5.5,
      highestPackage: 12.0,
      placementRate: 78,
      topRecruiters: ['Cognizant', 'Wipro', 'DXC Technology', 'Amazon Tech', 'Bosch', 'HCL']
    },
    courses: [
      { name: 'B.Tech CSE (Cyber Security)', fees: 210000, duration: '4 Years', eligibility: 'Class 12 with 60% + SUAT Test', seats: 120 },
      { name: 'MBA Marketing & HR', fees: 290000, duration: '2 Years', eligibility: 'Graduation with 55% + SUAT / MAT / CAT', seats: 180 }
    ],
    reviews: [
      {
        id: 'rev-sharda-1',
        author: 'John Doe',
        role: 'MBA Student',
        rating: 3.6,
        title: 'Huge campus with diverse international crowd',
        content: 'The campus is huge and modern with students from over 50 countries. Placements are decent for computer science and marketing streams, though crowd management is somewhat chaotic.',
        date: '2026-04-10'
      }
    ],
    faqs: [
      { question: 'What is SUAT?', answer: 'SUAT is the Sharda University Admission Test, a single-window home-proctored or center-proctored online exam.' }
    ]
  }
];
