import { events, venues, users, type Event, type InsertEvent, type Venue, type InsertVenue, type User, type InsertUser } from "@shared/schema";

export interface IStorage {
  // Event methods
  getEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: number, event: Partial<InsertEvent>): Promise<Event | undefined>;
  deleteEvent(id: number): Promise<boolean>;
  searchEvents(query: string): Promise<Event[]>;
  filterEvents(category?: string, date?: string, location?: string): Promise<Event[]>;
  getFeaturedEvents(): Promise<Event[]>;
  
  // Venue methods
  getVenues(): Promise<Venue[]>;
  getVenue(id: number): Promise<Venue | undefined>;
  createVenue(venue: InsertVenue): Promise<Venue>;
  
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class MemStorage implements IStorage {
  private events: Map<number, Event>;
  private venues: Map<number, Venue>;
  private users: Map<number, User>;
  private currentEventId: number;
  private currentVenueId: number;
  private currentUserId: number;

  constructor() {
    this.events = new Map();
    this.venues = new Map();
    this.users = new Map();
    this.currentEventId = 1;
    this.currentVenueId = 1;
    this.currentUserId = 1;
    
    this.initializeData();
  }

  private initializeData() {
    // Initialize venues
    const initialVenues: InsertVenue[] = [
      {
        name: "Downtown Gallery",
        address: "123 Art Street",
        district: "downtown",
        eventCount: 12,
        icon: "fa-palette",
        color: "#6366F1"
      },
      {
        name: "Blue Moon Jazz Lounge",
        address: "456 Music Avenue",
        district: "arts-district",
        eventCount: 8,
        icon: "fa-music",
        color: "#EC4899"
      },
      {
        name: "Community Theater",
        address: "789 Stage Road",
        district: "university",
        eventCount: 6,
        icon: "fa-theater-masks",
        color: "#10B981"
      },
      {
        name: "Artisan Studio",
        address: "321 Craft Lane",
        district: "downtown",
        eventCount: 4,
        icon: "fa-hammer",
        color: "#F59E0B"
      },
      {
        name: "Central Park",
        address: "555 Park Drive",
        district: "waterfront",
        eventCount: 3,
        icon: "fa-tree",
        color: "#8B5CF6"
      },
      {
        name: "Vision Gallery",
        address: "987 Photo Street",
        district: "arts-district",
        eventCount: 5,
        icon: "fa-camera",
        color: "#EF4444"
      }
    ];

    initialVenues.forEach(venue => this.createVenue(venue));

    // Initialize events
    const initialEvents: InsertEvent[] = [
      {
        title: "Modern Art Collective: Spring Showcase",
        description: "Discover emerging artists and their latest works in this curated exhibition featuring contemporary paintings, sculptures, and digital art.",
        category: "exhibitions",
        venue: "Downtown Gallery",
        location: "downtown",
        date: "2024-03-15",
        time: "7:00 PM",
        price: "Free",
        imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isFeatured: true,
        contactEmail: "info@downtowngallery.com",
        bookingUrl: "https://downtowngallery.com/events"
      },
      {
        title: "Jazz Night: The Blue Notes Quartet",
        description: "An intimate evening of smooth jazz featuring local musicians in a cozy venue. Perfect for music lovers and date nights.",
        category: "concerts",
        venue: "Blue Moon Jazz Lounge",
        location: "arts-district",
        date: "2024-03-18",
        time: "8:30 PM",
        price: "$25",
        imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isFeatured: false,
        contactEmail: "bookings@bluemoonjazz.com",
        bookingUrl: "https://bluemoonjazz.com/tickets"
      },
      {
        title: "Traditional Pottery Making Workshop",
        description: "Learn the ancient art of pottery making in this hands-on workshop. All materials provided, suitable for beginners.",
        category: "workshops",
        venue: "Artisan Studio",
        location: "downtown",
        date: "2024-03-20",
        time: "2:00 PM",
        price: "$45",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isFeatured: false,
        contactEmail: "workshops@artisanstudio.com",
        bookingUrl: "https://artisanstudio.com/workshops"
      },
      {
        title: "Spring Community Festival",
        description: "Join neighbors for a day of food, music, and activities. Local vendors, live performances, and kids' activities all day.",
        category: "festivals",
        venue: "Central Park",
        location: "waterfront",
        date: "2024-03-22",
        time: "11:00 AM",
        price: "Free",
        imageUrl: "https://images.unsplash.com/photo-1561489396-888724a1543d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isFeatured: false,
        contactEmail: "events@cityparks.gov",
        bookingUrl: ""
      },
      {
        title: "\"Urban Stories\" Photography Exhibition",
        description: "Street photography capturing the essence of city life. Opening reception with wine and artist meet-and-greet.",
        category: "exhibitions",
        venue: "Vision Gallery",
        location: "arts-district",
        date: "2024-03-25",
        time: "6:00 PM",
        price: "$15",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isFeatured: false,
        contactEmail: "info@visiongallery.com",
        bookingUrl: "https://visiongallery.com/exhibitions"
      },
      {
        title: "\"A Midsummer Night's Dream\"",
        description: "Shakespeare's beloved comedy performed by the local theater company. A magical evening of romance and humor.",
        category: "theater",
        venue: "Community Theater",
        location: "university",
        date: "2024-03-28",
        time: "7:30 PM",
        price: "$30",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isFeatured: false,
        contactEmail: "tickets@communitytheater.org",
        bookingUrl: "https://communitytheater.org/tickets"
      }
    ];

    initialEvents.forEach(event => this.createEvent(event));
  }

  // Event methods
  async getEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = this.currentEventId++;
    const event: Event = { ...insertEvent, id };
    this.events.set(id, event);
    return event;
  }

  async updateEvent(id: number, updates: Partial<InsertEvent>): Promise<Event | undefined> {
    const existingEvent = this.events.get(id);
    if (!existingEvent) return undefined;
    
    const updatedEvent: Event = { ...existingEvent, ...updates };
    this.events.set(id, updatedEvent);
    return updatedEvent;
  }

  async deleteEvent(id: number): Promise<boolean> {
    return this.events.delete(id);
  }

  async searchEvents(query: string): Promise<Event[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.events.values()).filter(event =>
      event.title.toLowerCase().includes(lowerQuery) ||
      event.description.toLowerCase().includes(lowerQuery) ||
      event.venue.toLowerCase().includes(lowerQuery) ||
      event.category.toLowerCase().includes(lowerQuery)
    );
  }

  async filterEvents(category?: string, date?: string, location?: string): Promise<Event[]> {
    let filteredEvents = Array.from(this.events.values());

    if (category) {
      filteredEvents = filteredEvents.filter(event => event.category === category);
    }

    if (location) {
      filteredEvents = filteredEvents.filter(event => event.location === location);
    }

    if (date) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      
      switch (date) {
        case 'today':
          filteredEvents = filteredEvents.filter(event => 
            event.date === today.toISOString().split('T')[0]
          );
          break;
        case 'tomorrow':
          filteredEvents = filteredEvents.filter(event => 
            event.date === tomorrow.toISOString().split('T')[0]
          );
          break;
        case 'week':
          const weekFromNow = new Date(today);
          weekFromNow.setDate(today.getDate() + 7);
          filteredEvents = filteredEvents.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate >= today && eventDate <= weekFromNow;
          });
          break;
        case 'month':
          const monthFromNow = new Date(today);
          monthFromNow.setMonth(today.getMonth() + 1);
          filteredEvents = filteredEvents.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate >= today && eventDate <= monthFromNow;
          });
          break;
      }
    }

    return filteredEvents;
  }

  async getFeaturedEvents(): Promise<Event[]> {
    return Array.from(this.events.values()).filter(event => event.isFeatured);
  }

  // Venue methods
  async getVenues(): Promise<Venue[]> {
    return Array.from(this.venues.values());
  }

  async getVenue(id: number): Promise<Venue | undefined> {
    return this.venues.get(id);
  }

  async createVenue(insertVenue: InsertVenue): Promise<Venue> {
    const id = this.currentVenueId++;
    const venue: Venue = { ...insertVenue, id };
    this.venues.set(id, venue);
    return venue;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
}

export const storage = new MemStorage();
