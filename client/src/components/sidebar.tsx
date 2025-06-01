import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import type { Venue } from "@shared/schema";
import { initialVenues } from "../../../server/mockData"; // Assuming you have a local JSON file with initial venues

export default function Sidebar() {
  const { data: venuess = [], isLoading } = useQuery<Venue[]>({
    queryKey: ["/api/venues"],
  });
  const venues = initialVenues
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const renderCalendar = () => {
    const days = [];
    const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    
    // Week headers
    weekDays.forEach(day => (
      days.push(
        <div key={day} className="p-2 text-center text-xs font-medium text-gray-500">
          {day}
        </div>
      )
    ));

    // Empty cells for days before month starts
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Calendar days
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === currentDate.getDate();
      const hasEvent = [15, 18, 20, 22, 25, 28].includes(day); // Mock event days
      
      days.push(
        <div
          key={day}
          className={`p-2 text-center text-sm cursor-pointer hover:bg-gray-100 rounded ${
            isToday ? 'bg-primary text-white' : ''
          } ${hasEvent && !isToday ? 'bg-secondary text-white' : ''}`}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="lg:w-80 mt-8 lg:mt-0 space-y-6">
      {/* Quick Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1">
            {renderCalendar()}
          </div>
        </CardContent>
      </Card>

      {/* Popular Venues */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Popular Venues</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <Skeleton className="w-10 h-10 rounded-lg" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {venues.slice(0, 3).map((venue) => (
                <div
                  key={venue.id}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm"
                    style={{ backgroundColor: venue.color }}
                  >
                    <i className={`fas ${venue.icon}`}></i>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{venue.name}</div>
                    <div className="text-xs text-gray-500">
                      {venue.eventCount} upcoming events
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Submit Event CTA */}
      <Card className="bg-gradient-to-br from-primary to-secondary text-white">
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-2">Host Your Event</h3>
          <p className="text-sm mb-4 text-blue-100">
            Share your event with the community and connect with local culture enthusiasts.
          </p>
          <Link href="/submit">
            <Button className="w-full bg-white text-primary hover:bg-gray-100">
              Submit Event
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Newsletter Signup */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-2">Stay Updated</h3>
          <p className="text-sm text-gray-600 mb-4">
            Get weekly updates on the best local events and cultural activities.
          </p>
          <form className="space-y-3">
            <Input
              type="email"
              placeholder="Enter your email"
              className="text-sm"
            />
            <Button className="w-full text-sm">
              Subscribe
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
