import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { getJobs, getCurrentUser, getUsersByFacility, getUserConnections, applyToJob, connectWithUser } from "@/lib/actions";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

async function ApplyButton({ jobId }: { jobId: string }) {
  return (
    <form action={applyToJob.bind(null, jobId)}>
      <Button type="submit" className="w-full">
        Apply Now
      </Button>
    </form>
  );
}

async function ConnectButton({ userId }: { userId: string }) {
  return (
    <form action={connectWithUser.bind(null, userId)}>
      <Button type="submit" variant="outline" size="sm">
        Connect
      </Button>
    </form>
  );
}

export default async function Dashboard() {
  const [jobs, currentUser, facilityUsers, connections] = await Promise.all([
    getJobs(),
    getCurrentUser(),
    getCurrentUser().then(user => getUsersByFacility(user.formerFacility)),
    getUserConnections()
  ]);

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
              <Link href="/profile" className="text-gray-700 hover:text-blue-600 font-medium">
                Profile
              </Link>
              <Avatar>
                <AvatarFallback>{currentUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main content - Job listings */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Job Opportunities</h2>
              <Badge variant="secondary">{jobs.length} open positions</Badge>
            </div>
            
            <div className="space-y-4">
              {jobs.map((job) => (
                <Card key={job.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        <CardDescription className="text-lg font-medium text-blue-600">
                          {job.company}
                        </CardDescription>
                        <p className="text-sm text-gray-500">{job.location}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        Second Chance Friendly
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">{job.description}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500">
                        Posted {formatDate(job.postedDate)}
                      </p>
                      <ApplyButton jobId={job.id} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* User profile summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarFallback>{currentUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <span>{currentUser.name}</span>
                </CardTitle>
                <CardDescription>{currentUser.location}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">Skills</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {currentUser.jobSkills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Former Facility</p>
                  <p className="text-sm text-gray-600">{currentUser.formerFacility}</p>
                </div>
                <Link href="/profile">
                  <Button variant="outline" className="w-full mt-4">
                    View Full Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Connections */}
            <Card>
              <CardHeader>
                <CardTitle>Your Network</CardTitle>
                <CardDescription>
                  {connections.length} connection{connections.length !== 1 ? 's' : ''}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {connections.length > 0 ? (
                  <div className="space-y-3">
                    {connections.slice(0, 3).map((connection) => (
                      <div key={connection.id} className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {connection.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {connection.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {connection.location}
                          </p>
                        </div>
                      </div>
                    ))}
                    {connections.length > 3 && (
                      <p className="text-xs text-gray-500 text-center pt-2">
                        +{connections.length - 3} more connections
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No connections yet</p>
                )}
              </CardContent>
            </Card>

            {/* People from same facility */}
            <Card>
              <CardHeader>
                <CardTitle>From Your Facility</CardTitle>
                <CardDescription>
                  Connect with others from {currentUser.formerFacility}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {facilityUsers.length > 0 ? (
                  <div className="space-y-3">
                    {facilityUsers.slice(0, 3).map((user) => (
                      <div key={user.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {user.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {user.location}
                            </p>
                          </div>
                        </div>
                        {!currentUser.connections.includes(user.id) && (
                          <ConnectButton userId={user.id} />
                        )}
                      </div>
                    ))}
                    {facilityUsers.length > 3 && (
                      <p className="text-xs text-gray-500 text-center pt-2">
                        +{facilityUsers.length - 3} more from your facility
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No other users from your facility yet</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 