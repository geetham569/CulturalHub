import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar, Clock, MapPin, DollarSign, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/header";
import Footer from "@/components/footer";
import type { Event } from "@shared/schema";

export default function EventDetail() {
  const { id } = useParams();
  
  const { data: event, isLoading, error } = useQuery<Event>({
    queryKey: [`/api/events/${id}`],
  });

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header searchQuery="" onSearchChange={() => {}} />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <h1 className="text-2xl font-bold text-red-600 mb-2">Event Not Found</h1>
              <p className="text-gray-600 mb-4">
                The event you're looking for doesn't exist or has been removed.
              </p>
              <Link href="/">
                <Button>Back to Events</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header searchQuery="" onSearchChange={() => {}} />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Button>
        </Link>

        {isLoading ? (
          <Card>
            <div className="aspect-video">
              <Skeleton className="h-full w-full rounded-t-lg" />
            </div>
            <CardContent className="p-6 space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-20 w-full" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            </CardContent>
          </Card>
        ) : event ? (
          <Card>
            <div className="aspect-video overflow-hidden rounded-t-lg">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Badge 
                  variant="secondary" 
                  className="capitalize"
                >
                  {event.category}
                </Badge>
                {event.isFeatured && (
                  <Badge variant="default">Featured</Badge>
                )}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {event.title}
              </h1>

              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                {event.description}
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Date</div>
                      <div className="text-gray-600">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Time</div>
                      <div className="text-gray-600">{event.time}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Venue</div>
                      <div className="text-gray-600">{event.venue}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Price</div>
                      <div className="text-gray-600 font-semibold">{event.price}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {event.bookingUrl && (
                  <Button size="lg" asChild>
                    <a href={event.bookingUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Book Tickets
                    </a>
                  </Button>
                )}
                
                {event.contactEmail && (
                  <Button variant="outline" size="lg" asChild>
                    <a href={`mailto:${event.contactEmail}`}>
                      <Mail className="h-4 w-4 mr-2" />
                      Contact Organizer
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : null}
      </div>
      
      <Footer />
    </div>
  );
}
