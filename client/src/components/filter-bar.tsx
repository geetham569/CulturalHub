import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Grid, Calendar } from "lucide-react";

interface FilterBarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  dateFilter: string;
  onDateFilterChange: (date: string) => void;
  locationFilter: string;
  onLocationFilterChange: (location: string) => void;
  sortOrder: string;
  onSortOrderChange: (sort: string) => void;
}

export default function FilterBar({
  selectedCategory,
  onCategoryChange,
  dateFilter,
  onDateFilterChange,
  locationFilter,
  onLocationFilterChange,
  sortOrder,
  onSortOrderChange,
}: FilterBarProps) {
  return (
    <section className="bg-white border-b border-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <Label className="text-sm font-medium text-gray-700">Category:</Label>
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Events" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Events</SelectItem>
                <SelectItem value="exhibitions">Art Exhibitions</SelectItem>
                <SelectItem value="concerts">Concerts</SelectItem>
                <SelectItem value="festivals">Festivals</SelectItem>
                <SelectItem value="workshops">Workshops</SelectItem>
                <SelectItem value="theater">Theater</SelectItem>
                <SelectItem value="community">Community</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Filter */}
          <div className="flex items-center space-x-2">
            <Label className="text-sm font-medium text-gray-700">Date:</Label>
            <Select value={dateFilter} onValueChange={onDateFilterChange}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Any Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="tomorrow">Tomorrow</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Location Filter */}
          <div className="flex items-center space-x-2">
            <Label className="text-sm font-medium text-gray-700">Location:</Label>
            <Select value={locationFilter} onValueChange={onLocationFilterChange}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="All Areas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Areas</SelectItem>
                <SelectItem value="downtown">Downtown</SelectItem>
                <SelectItem value="arts-district">Arts District</SelectItem>
                <SelectItem value="waterfront">Waterfront</SelectItem>
                <SelectItem value="university">University Area</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort Order */}
          <div className="flex items-center space-x-2">
            <Label className="text-sm font-medium text-gray-700">Sort:</Label>
            <Select value={sortOrder} onValueChange={onSortOrderChange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">By Date</SelectItem>
                <SelectItem value="title">By Title</SelectItem>
                <SelectItem value="venue">By Venue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* View Toggle */}
          <div className="ml-auto flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
            <Button
              variant="ghost"
              size="sm"
              className="bg-white shadow-sm text-primary"
            >
              <Grid className="h-4 w-4 mr-1" />
              Grid
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-primary"
            >
              <Calendar className="h-4 w-4 mr-1" />
              Calendar
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
