
    // Initialize venues
    export const initialVenues= [
      {
        id:1,
        name: "Downtown Gallery",
        address: "123 Art Street",
        district: "downtown",
        eventCount: 12,
        icon: "fa-palette",
        color: "#6366F1"
      },
      {
        id:2,
        name: "Blue Moon Jazz Lounge",
        address: "456 Music Avenue",
        district: "arts-district",
        eventCount: 8,
        icon: "fa-music",
        color: "#EC4899"
      },
      {
        id:3,
        name: "Community Theater",
        address: "789 Stage Road",
        district: "university",
        eventCount: 6,
        icon: "fa-theater-masks",
        color: "#10B981"
      },
      {
        id:4,
        name: "Artisan Studio",
        address: "321 Craft Lane",
        district: "downtown",
        eventCount: 4,
        icon: "fa-hammer",
        color: "#F59E0B"
      },
      {
        id:5,
        name: "Central Park",
        address: "555 Park Drive",
        district: "waterfront",
        eventCount: 3,
        icon: "fa-tree",
        color: "#8B5CF6"
      },
      {
        id:6,
        name: "Vision Gallery",
        address: "987 Photo Street",
        district: "arts-district",
        eventCount: 5,
        icon: "fa-camera",
        color: "#EF4444"
      }
    ]


    // Initialize events
    export const initialEvents = [
      {
        id:1,
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
        id:2,
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
        id:3,
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
        id:4,
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
        id:5,
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
        id:6,
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
    ]

