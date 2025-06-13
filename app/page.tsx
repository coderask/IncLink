import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { signUpUser, signInUser } from "@/lib/actions";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left side - Welcome content */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-gray-900">
              Welcome to <span className="text-blue-600">IncLink</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Connecting formerly incarcerated individuals with meaningful employment opportunities 
              and building supportive professional networks for successful reentry.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <p className="text-gray-700">Find employment opportunities with second-chance employers</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <p className="text-gray-700">Connect with others from your former facility</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <p className="text-gray-700">Build your professional network and get referrals</p>
            </div>
          </div>
        </div>

        {/* Right side - Auth forms */}
        <div className="space-y-6">
          
          {/* Sign Up Form */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Get Started</CardTitle>
              <CardDescription>
                Create your profile to start connecting with opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={signUpUser} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" placeholder="Enter your name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="your.email@example.com" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" name="location" placeholder="City, State" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="formerFacility">Former Facility</Label>
                  <Input id="formerFacility" name="formerFacility" placeholder="Enter facility name" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="jobSkills">Job Skills</Label>
                  <Input id="jobSkills" name="jobSkills" placeholder="Construction, Customer Service, etc. (comma-separated)" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="yearsIncarcerated">Years Incarcerated (Optional)</Label>
                  <Input id="yearsIncarcerated" name="yearsIncarcerated" type="number" placeholder="Enter number of years" />
                </div>
                
                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="flex items-center space-x-4">
            <Separator className="flex-1" />
            <span className="text-sm text-gray-500">Already have an account?</span>
            <Separator className="flex-1" />
          </div>

          {/* Sign In Form */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Welcome back! Enter your email to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={signInUser} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input id="signin-email" name="email" type="email" placeholder="your.email@example.com" required />
                </div>
                
                <Button type="submit" variant="outline" className="w-full">
                  Sign In
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
