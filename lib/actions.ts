'use server';

import { mockUsers, mockJobs, mockApplications, mockConnections } from './mock-data';
import { User, Job, Application } from '@/types';
import { redirect } from 'next/navigation';

// Simple in-memory storage for demo (in real app, this would be a database)
let users = [...mockUsers];
let jobs = [...mockJobs];
let applications = [...mockApplications];
let connections = [...mockConnections];

export async function signUpUser(formData: FormData) {
  const email = formData.get('email') as string;
  const name = formData.get('name') as string;
  const location = formData.get('location') as string;
  const formerFacility = formData.get('formerFacility') as string;
  const jobSkills = (formData.get('jobSkills') as string).split(',').map(skill => skill.trim());
  const yearsIncarcerated = formData.get('yearsIncarcerated') ? parseInt(formData.get('yearsIncarcerated') as string) : undefined;

  const newUser: User = {
    id: (users.length + 1).toString(),
    email,
    name,
    location,
    formerFacility,
    jobSkills,
    yearsIncarcerated,
    connections: [],
    applications: []
  };

  users.push(newUser);
  console.log('New user signed up:', newUser);
  
  redirect('/dashboard');
}

export async function signInUser(formData: FormData) {
  const email = formData.get('email') as string;
  const user = users.find(u => u.email === email);
  
  if (user) {
    console.log('User signed in:', user);
    redirect('/dashboard');
  } else {
    throw new Error('User not found');
  }
}

export async function getJobs(): Promise<Job[]> {
  return jobs.filter(job => job.openToFormerlyIncarcerated);
}

export async function getCurrentUser(): Promise<User> {
  // In a real app, this would get the current user from session/auth
  return users[0]; // For demo, return first user
}

export async function getUsersByFacility(facility: string): Promise<User[]> {
  const currentUser = await getCurrentUser();
  return users.filter(user => 
    user.formerFacility === facility && user.id !== currentUser.id
  );
}

export async function getUserConnections(): Promise<User[]> {
  const currentUser = await getCurrentUser();
  return users.filter(user => currentUser.connections.includes(user.id));
}

export async function applyToJob(jobId: string) {
  const currentUser = await getCurrentUser();
  const job = jobs.find(j => j.id === jobId);
  
  if (!job) {
    throw new Error('Job not found');
  }

  const newApplication: Application = {
    id: (applications.length + 1).toString(),
    userId: currentUser.id,
    jobId,
    appliedDate: new Date().toISOString().split('T')[0],
    status: 'pending'
  };

  applications.push(newApplication);
  
  // Update user's applications
  const userIndex = users.findIndex(u => u.id === currentUser.id);
  users[userIndex].applications.push(newApplication.id);

  console.log(`User ${currentUser.name} applied to ${job.title} at ${job.company}`);
  console.log('Application details:', newApplication);
}

export async function connectWithUser(userId: string) {
  const currentUser = await getCurrentUser();
  const targetUser = users.find(u => u.id === userId);
  
  if (!targetUser) {
    throw new Error('User not found');
  }

  // Add connection for current user
  const currentUserIndex = users.findIndex(u => u.id === currentUser.id);
  if (!users[currentUserIndex].connections.includes(userId)) {
    users[currentUserIndex].connections.push(userId);
  }

  // Add connection for target user
  const targetUserIndex = users.findIndex(u => u.id === userId);
  if (!users[targetUserIndex].connections.includes(currentUser.id)) {
    users[targetUserIndex].connections.push(currentUser.id);
  }

  console.log(`${currentUser.name} connected with ${targetUser.name}`);
}

export async function getUserApplications(): Promise<{ application: Application; job: Job }[]> {
  const currentUser = await getCurrentUser();
  const userApplications = applications.filter(app => app.userId === currentUser.id);
  
  return userApplications.map(application => ({
    application,
    job: jobs.find(job => job.id === application.jobId)!
  }));
}

export async function updateUserProfile(formData: FormData) {
  const currentUser = await getCurrentUser();
  const userIndex = users.findIndex(u => u.id === currentUser.id);
  
  const updatedUser = {
    ...users[userIndex],
    name: formData.get('name') as string,
    location: formData.get('location') as string,
    jobSkills: (formData.get('jobSkills') as string).split(',').map(skill => skill.trim()),
    formerFacility: formData.get('formerFacility') as string,
    yearsIncarcerated: formData.get('yearsIncarcerated') ? parseInt(formData.get('yearsIncarcerated') as string) : undefined
  };

  users[userIndex] = updatedUser;
  console.log('User profile updated:', updatedUser);
} 