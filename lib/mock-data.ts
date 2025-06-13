import { User, Job, Application, Connection } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Marcus Johnson',
    email: 'marcus.johnson@email.com',
    location: 'Oakland, CA',
    jobSkills: ['Construction', 'Carpentry', 'Project Management'],
    formerFacility: 'San Quentin State Prison',
    yearsIncarcerated: 5,
    connections: ['2', '3'],
    applications: ['1', '2']
  },
  {
    id: '2',
    name: 'Sarah Williams',
    email: 'sarah.williams@email.com',
    location: 'Los Angeles, CA',
    jobSkills: ['Customer Service', 'Food Service', 'Team Leadership'],
    formerFacility: 'California Institution for Women',
    yearsIncarcerated: 3,
    connections: ['1', '4'],
    applications: ['3']
  },
  {
    id: '3',
    name: 'David Rodriguez',
    email: 'david.rodriguez@email.com',
    location: 'Oakland, CA',
    jobSkills: ['Warehouse Operations', 'Forklift Operation', 'Inventory Management'],
    formerFacility: 'San Quentin State Prison',
    yearsIncarcerated: 4,
    connections: ['1'],
    applications: []
  },
  {
    id: '4',
    name: 'Jennifer Davis',
    email: 'jennifer.davis@email.com',
    location: 'San Francisco, CA',
    jobSkills: ['Data Entry', 'Office Administration', 'Computer Skills'],
    formerFacility: 'California Institution for Women',
    yearsIncarcerated: 2,
    connections: ['2'],
    applications: ['4']
  }
];

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Construction Worker',
    company: 'Bay Area Builders',
    description: 'Looking for experienced construction workers. We provide training and are committed to second chance employment.',
    location: 'Oakland, CA',
    openToFormerlyIncarcerated: true,
    postedDate: '2024-01-15'
  },
  {
    id: '2',
    title: 'Warehouse Associate',
    company: 'Supply Chain Solutions',
    description: 'Full-time warehouse position with benefits. No experience required - we provide training.',
    location: 'San Francisco, CA',
    openToFormerlyIncarcerated: true,
    postedDate: '2024-01-12'
  },
  {
    id: '3',
    title: 'Customer Service Representative',
    company: 'Community Support Center',
    description: 'Help community members with various services. Great opportunity for those looking to give back.',
    location: 'Los Angeles, CA',
    openToFormerlyIncarcerated: true,
    postedDate: '2024-01-10'
  },
  {
    id: '4',
    title: 'Administrative Assistant',
    company: 'Fresh Start Legal Services',
    description: 'Administrative support role at a legal aid organization focused on reentry services.',
    location: 'San Francisco, CA',
    openToFormerlyIncarcerated: true,
    postedDate: '2024-01-08'
  },
  {
    id: '5',
    title: 'Food Service Worker',
    company: 'Second Chance Catering',
    description: 'Kitchen and serving staff needed. Flexible hours and advancement opportunities.',
    location: 'Oakland, CA',
    openToFormerlyIncarcerated: true,
    postedDate: '2024-01-05'
  }
];

export const mockApplications: Application[] = [
  {
    id: '1',
    userId: '1',
    jobId: '1',
    appliedDate: '2024-01-16',
    status: 'pending'
  },
  {
    id: '2',
    userId: '1',
    jobId: '2',
    appliedDate: '2024-01-13',
    status: 'reviewed'
  },
  {
    id: '3',
    userId: '2',
    jobId: '3',
    appliedDate: '2024-01-11',
    status: 'pending'
  },
  {
    id: '4',
    userId: '4',
    jobId: '4',
    appliedDate: '2024-01-09',
    status: 'accepted'
  }
];

export const mockConnections: Connection[] = [
  {
    id: '1',
    userId: '1',
    connectedUserId: '2',
    connectedDate: '2024-01-10'
  },
  {
    id: '2',
    userId: '1',
    connectedUserId: '3',
    connectedDate: '2024-01-08'
  },
  {
    id: '3',
    userId: '2',
    connectedUserId: '4',
    connectedDate: '2024-01-07'
  }
]; 