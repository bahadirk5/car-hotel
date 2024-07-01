export const amenitiesData = [
  { id: "freeWiFi", name: "Free Wi-Fi" },
  { id: "swimmingPool", name: "Swimming Pool" },
  { id: "fitnessCenter", name: "Fitness Center" },
  { id: "spa", name: "Spa" },
  { id: "restaurant", name: "Restaurant" },
  { id: "bar", name: "Bar" },
  { id: "roomService", name: "Room Service" },
  { id: "parking", name: "Parking" },
  { id: "airConditioning", name: "Air Conditioning" },
  { id: "petFriendly", name: "Pet Friendly" },
  { id: "businessCenter", name: "Business Center" },
  { id: "meetingRooms", name: "Meeting Rooms" },
  { id: "laundryService", name: "Laundry Service" },
  { id: "airportShuttle", name: "Airport Shuttle" },
  { id: "conciergeService", name: "Concierge Service" },
  { id: "childrenPlayground", name: "Children's Playground" },
  { id: "beachAccess", name: "Beach Access" },
  { id: "24HourFrontDesk", name: "24-Hour Front Desk" },
];

export const hotelFormData = [
  {
    title: "Hotel Info",
    description:
      "Basic information about the hotel including name, rating, and description.",
    data: [
      {
        title: "Hotel Name",
        type: "text",
        name: "hotelName",
        description: "Enter the hotel name",
      },
      {
        title: "Rating",
        type: "number",
        name: "rating",
        description: "Enter the hotel rating",
        min: 1,
        max: 5,
      },
      {
        title: "Description",
        type: "textarea",
        name: "description",
        description: "Enter a brief description of the hotel",
      },
    ],
  },
  {
    title: "Location Info",
    description:
      "Details about the hotel's location including address and map coordinates.",
    data: [
      {
        title: "Address",
        type: "text",
        name: "address",
        description: "Enter the full address",
      },
      {
        title: "Location",
        type: "mapJson",
        name: "latitude",
        description: "Put a mark to your hotel location",
      },
    ],
  },
  {
    title: "Policies",
    description:
      "Hotel policies including check-in and check-out times and policies.",
    data: [
      {
        title: "Check-in Time",
        type: "time",
        name: "checkinTime",
        description: "Enter the check-in time",
      },
      {
        title: "Check-out Time",
        type: "time",
        name: "checkoutTime",
        description: "Enter the check-out time",
      },
      {
        title: "Check-in Policy",
        type: "textarea",
        name: "checkinPolicy",
        description: "Enter the check-in policy",
      },
      {
        title: "Check-out Policy",
        type: "textarea",
        name: "checkoutPolicy",
        description: "Enter the check-out policy",
      },
    ],
  },
  {
    title: "Additional Info",
    description:
      "Additional information about the hotel including amenities, nearby attractions, special features, dining options, wellness services, and business services.",
    data: [
      {
        title: "Amenities",
        type: "checkbox",
        name: "amenities",
        description: "Select the amenities available at the hotel",
        options: amenitiesData,
      },
      {
        title: "Nearby Attractions",
        type: "dynamicList",
        name: "nearbyAttractions",
        fieldNames: ["Place", "Distance"],
        fieldDescriptions: ["Place Name", "Distance from Hotel"],
        description: "List nearby attractions",
      },
      {
        title: "Special Features",
        type: "textarea",
        name: "specialFeatures",
        description: "Describe any special features or facilities of the hotel",
      },
      {
        title: "Dining Options",
        type: "dynamicList",
        name: "diningOptions",
        fieldNames: ["Cuisine", "Hours"],
        fieldDescriptions: ["Cuisine Type", "Operating Hours"],
        description: "List the dining options available at the hotel",
      },
      {
        title: "Wellness Services",
        type: "textarea",
        name: "wellnessServices",
        description: "Describe the wellness services offered at the hotel",
      },
      {
        title: "Business Services",
        type: "textarea",
        name: "businessServices",
        description: "Describe the business services available at the hotel",
      },
    ],
  },
  {
    title: "Images",
    description: "Upload images for the hotel",
    data: [
      {
        title: "Room Images",
        type: "file",
        name: "roomImages",
        description: "Upload images of the rooms",
        multiple: true,
      },
      {
        title: "Restaurant Images",
        type: "file",
        name: "restaurantImages",
        description: "Upload images of the restaurant",
        multiple: true,
      },
      {
        title: "Exterior Images",
        type: "file",
        name: "exteriorImages",
        description: "Upload images of the hotel's exterior",
        multiple: true,
      },
      {
        title: "Recreational Facilities Images",
        type: "file",
        name: "recreationalImages",
        description:
          "Upload images of recreational facilities like pool, spa, gym",
        multiple: true,
      },
      {
        title: "Meeting and Event Spaces Images",
        type: "file",
        name: "eventImages",
        description: "Upload images of meeting and event spaces",
        multiple: true,
      },
      {
        title: "Service and Other Areas Images",
        type: "file",
        name: "serviceImages",
        description:
          "Upload images of services and other areas like reception, business center, parking",
        multiple: true,
      },
    ],
  },
];
