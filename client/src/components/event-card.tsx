import { Link } from "wouter";
import { Calendar, Clock, MapPin, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Event } from "@shared/schema";

interface EventCardProps {
  event: Event;
}

const categoryColors: Record<string, string> = {
  exhibitions: "bg-pink-500",
  concerts: "bg-indigo-500",
  workshops: "bg-green-500",
  festivals: "bg-yellow-500",
  theater: "bg-purple-500",
  community: "bg-blue-500",
};

export default function EventCard({ event }: EventCardProps) {
  const categoryColor = categoryColors[event.category] || "bg-gray-500";

  return (
    <Card className="group cursor-pointer overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <Link href={`/events/${event.id}`}>
        <div className="relative h-48 overflow-hidden">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
          <div className="absolute top-3 left-3">
            <Badge className={`${categoryColor} text-white capitalize`}>
              {event.category}
            </Badge>
          </div>
          <div className="absolute top-3 right-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-red-400 hover:bg-black/20"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Toggle favorite functionality would go here
              }}
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Link>
      
      <CardContent className="p-4">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <Calendar className="h-4 w-4 mr-1" />
          <span>
            {new Date(event.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
          <span className="mx-2">•</span>
          <Clock className="h-4 w-4 mr-1" />
          <span>{event.time}</span>
        </div>
        
        <Link href={`/events/${event.id}`}>
          <h3 className="font-semibold text-lg text-gray-800 mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {event.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {event.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="truncate">{event.venue}</span>
          </div>
          <div className="text-primary font-semibold">
            {event.price}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
