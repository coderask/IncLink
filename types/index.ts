export interface User {
  id: string;
  name: string;
  email: string;
  location: string;
  jobSkills: string[];
  formerFacility: string;
  yearsIncarcerated?: number;
  connections: string[]; // User IDs
  applications: string[]; // Application IDs
}

export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  location: string;
  openToFormerlyIncarcerated: boolean;
  postedDate: string;
}

export interface Application {
  id: string;
  userId: string;
  jobId: string;
  appliedDate: string;
  status: 'pending' | 'reviewed' | 'rejected' | 'accepted';
}

export interface Connection {
  id: string;
  userId: string;
  connectedUserId: string;
  connectedDate: string;
} 