import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { getCurrentUser, getUserApplications, updateUserProfile } from "@/lib/actions";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export default async function Profile() {
  const [currentUser, userApplications] = await Promise.all([
    getCurrentUser(),
    getUserApplications()
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'accepted':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-blue-600">IncLink</h1>
            </div>
            <nav className="flex items-center space-x-6">
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
                Dashboard
              </Link>
              <Link href="/profile" className="text-blue-600 font-medium">
                Profile
              </Link>
              <Avatar>
                <AvatarFallback>{currentUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your information to help employers and connections learn about you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form action={updateUserProfile} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" name="name" defaultValue={currentUser.name} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" name="location" defaultValue={currentUser.location} required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="formerFacility">Former Facility</Label>
                    <Input id="formerFacility" name="formerFacility" defaultValue={currentUser.formerFacility} required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="jobSkills">Job Skills</Label>
                    <Input 
                      id="jobSkills" 
                      name="jobSkills" 
                      defaultValue={currentUser.jobSkills.join(', ')} 
                      placeholder="Construction, Customer Service, etc. (comma-separated)" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="yearsIncarcerated">Years Incarcerated (Optional)</Label>
                    <Input 
                      id="yearsIncarcerated" 
                      name="yearsIncarcerated" 
                      type="number" 
                      defaultValue={currentUser.yearsIncarcerated || ''} 
                      placeholder="Enter number of years" 
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Update Profile
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Job Applications */}
            <Card>
              <CardHeader>
                <CardTitle>Your Applications</CardTitle>
                <CardDescription>
                  Track the status of your job applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userApplications.length > 0 ? (
                  <div className="space-y-4">
                    {userApplications.map(({ application, job }) => (
                      <div key={application.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <h3 className="font-semibold text-lg">{job.title}</h3>
                            <p className="text-blue-600 font-medium">{job.company}</p>
                            <p className="text-sm text-gray-500">{job.location}</p>
                            <p className="text-sm text-gray-600">
                              Applied on {formatDate(application.appliedDate)}
                            </p>
                          </div>
                          <Badge className={getStatusColor(application.status)}>
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">You haven't applied to any jobs yet</p>
                    <Link href="/dashboard">
                      <Button>Browse Job Opportunities</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Profile Summary Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="text-lg">
                      {currentUser.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{currentUser.name}</p>
                    <p className="text-sm text-gray-500">{currentUser.location}</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {currentUser.jobSkills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <p className="text-sm font-medium text-gray-900">Former Facility</p>
                  <p className="text-sm text-gray-600 mt-1">{currentUser.formerFacility}</p>
                </div>
                
                {currentUser.yearsIncarcerated && (
                  <>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Years Incarcerated</p>
                      <p className="text-sm text-gray-600 mt-1">{currentUser.yearsIncarcerated} years</p>
                    </div>
                  </>
                )}
                
                <Separator />
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{currentUser.connections.length}</p>
                    <p className="text-xs text-gray-500">Connections</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">{userApplications.length}</p>
                    <p className="text-xs text-gray-500">Applications</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/dashboard">
                  <Button variant="outline" className="w-full justify-start">
                    🔍 Browse Jobs
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" className="w-full justify-start">
                    👥 Find Connections
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 