import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Hero from "@/components/hero";
import FilterBar from "@/components/filter-bar";
import EventCard from "@/components/event-card";
import Sidebar from "@/components/sidebar";
import Footer from "@/components/footer";
import { Skeleton } from "@/components/ui/skeleton";
import type { Event } from "@shared/schema";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("date");

  const { data: events = [], isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events", { 
      search: searchQuery || undefined,
      category: selectedCategory || undefined,
      date: dateFilter || undefined,
      location: locationFilter || undefined 
    }],
  });

  const sortedEvents = [...events].sort((a, b) => {
    switch (sortOrder) {
      case "date":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "title":
        return a.title.localeCompare(b.title);
      case "venue":
        return a.venue.localeCompare(b.venue);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <Hero />
      <FilterBar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        dateFilter={dateFilter}
        onDateFilterChange={setDateFilter}
        locationFilter={locationFilter}
        onLocationFilterChange={setLocationFilter}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:flex lg:space-x-8">
          <div className="lg:flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {isLoading ? (
                  <Skeleton className="h-8 w-32" />
                ) : (
                  <span>{sortedEvents.length} Events Found</span>
                )}
              </h2>
            </div>

            {isLoading ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <Skeleton className="h-48 w-full" />
                    <div className="p-4 space-y-3">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : sortedEvents.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-2">No events found</div>
                <p className="text-gray-600">
                  Try adjusting your search criteria or browse all events.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {sortedEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </div>

          <Sidebar />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
