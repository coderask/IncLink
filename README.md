# IncLink - Professional Network for Formerly Incarcerated Individuals

IncLink is a LinkedIn-esque platform designed to connect formerly incarcerated individuals with meaningful employment opportunities and build supportive professional networks for successful reentry.

## Features

### 1. **User Authentication & Profile Management**
- Simple signup with email, name, location, and skills
- Profile includes former facility information and years incarcerated (optional)
- Editable profile with job skills and personal information

### 2. **Job Listing Board**
- Curated job listings from "second chance" employers
- All jobs are flagged as "open to formerly incarcerated"
- One-click application process
- Job details include company, location, and description

### 3. **1-Click Job Applications**
- No resume uploads required
- Applications are sent to console/fake inbox for demo
- Track application status (pending, reviewed, accepted, rejected)
- View application history on profile page

### 4. **Prison-Based Referral Network**
- Connect with others from the same former facility
- View connections and network size
- Simple "Connect" button to build professional relationships
- Referral capabilities between connections

### 5. **Clean, Professional UI**
- Built with shadcn/ui components for modern design
- Responsive layout works on desktop and mobile
- Three main pages: Home, Dashboard, and Profile

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd inclink
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### For New Users:
1. Visit the home page
2. Fill out the "Get Started" form with your information
3. Submit to create your account and be redirected to the dashboard

### For Existing Users:
1. Use the "Sign In" form with your email
2. Access the dashboard to browse jobs and connections

### Demo Credentials:
You can sign in with any of these emails to test existing user functionality:
- `marcus.johnson@email.com`
- `sarah.williams@email.com`
- `david.rodriguez@email.com`
- `jennifer.davis@email.com`

## Application Architecture

### Server-Side Architecture
- **Next.js 15** with App Router
- **Server Actions** for all data operations (no client-side fetching)
- **TypeScript** for type safety
- **Tailwind CSS** with shadcn/ui components

### Data Management
- In-memory storage for demo purposes (simulates database)
- Mock data includes users, jobs, applications, and connections
- Server actions handle all CRUD operations

### Pages Structure
```
app/
├── page.tsx           # Home page with login/signup
├── dashboard/
│   └── page.tsx       # Job listings and connections
├── profile/
│   └── page.tsx       # Profile editing and applications
└── layout.tsx         # Root layout
```

### Key Components
- **Server Actions** (`lib/actions.ts`) - Handle all backend operations
- **Mock Data** (`lib/mock-data.ts`) - Simulate database records
- **Types** (`types/index.ts`) - TypeScript interfaces
- **UI Components** (`components/ui/`) - shadcn/ui components

## Features in Detail

### Dashboard
- **Job Listings**: Browse second chance employer opportunities
- **User Profile Summary**: Quick view of skills and facility
- **Network Section**: View current connections
- **Facility Connections**: Find others from the same former facility
- **One-click Apply**: Apply to jobs without complex forms

### Profile Page
- **Edit Profile**: Update personal information and skills
- **Application Tracking**: View all job applications and their status
- **Network Stats**: See connection count and application count
- **Quick Actions**: Easy navigation to browse jobs and find connections

### Authentication Flow
- **Sign Up**: Create new account with profile information
- **Sign In**: Simple email-based login
- **Server-side redirects**: Proper navigation after auth actions

## Technical Features

### Server-Side Rendering
- All pages are server-rendered for better performance
- Server Actions eliminate the need for API endpoints
- Proper data fetching without client-side loading states

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Clean, professional design suitable for job seekers
- Accessible UI components from shadcn/ui

### Type Safety
- Full TypeScript implementation
- Defined interfaces for all data structures
- Type-safe server actions and form handling

## Demo Data

The application comes pre-loaded with:
- 4 sample users from different facilities
- 5 job postings from second chance employers
- Sample applications and connections
- Realistic data for testing all features

## Development

### Adding New Features
1. Define types in `types/index.ts`
2. Create server actions in `lib/actions.ts`
3. Build UI components using shadcn/ui
4. Follow server-side rendering patterns

### Mock Data Management
- Update `lib/mock-data.ts` to add more sample data
- Server actions modify the in-memory arrays
- Console logging shows all user interactions

## Production Considerations

For a production version, you would need to:
1. Replace in-memory storage with a real database (PostgreSQL, MongoDB, etc.)
2. Implement proper user authentication and sessions
3. Add email notifications for applications
4. Implement file uploads for resumes/documents
5. Add job search and filtering capabilities
6. Implement real-time messaging between connections
7. Add employer dashboard for posting jobs and reviewing applications

## License

This project is created as an MVP demonstration for connecting formerly incarcerated individuals with employment opportunities and professional networks.
