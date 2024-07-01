export const FUEL_TYPES = {
  id: "fuel_types",
  name: "Fuel Types",
  options: [
    { id: "1", name: "Petrol" },
    { id: "2", name: "Diesel" },
    { id: "3", name: "Electric" },
    { id: "4", name: "Hybrid" },
  ],
};

export const TRANSMISSION_TYPES = {
  id: "transmission_types",
  name: "Transmission Types",
  options: [
    { id: "1", name: "Automatic" },
    { id: "2", name: "Manual" },
  ],
};

export const SEAT_COUNTS = {
  id: "seat_counts",
  name: "Seat Counts",
  options: [
    { id: "1", name: "2" },
    { id: "2", name: "4" },
    { id: "3", name: "5" },
    { id: "4", name: "7" },
  ],
};

export const SEGMENTS = {
  id: "segments",
  name: "Segments",
  options: [
    { id: "1", name: "Compact" },
    { id: "2", name: "SUV" },
    { id: "3", name: "Luxury" },
    { id: "4", name: "Van" },
  ],
};

export const PRICE_FILTERS = {
  id: 'price',
  name: 'Price',
  options: [
    { value: [0, 100], label: 'Any price' },
    {
      value: [0, 20],
      label: 'Under 20€',
    },
    {
      value: [0, 40],
      label: 'Under 40€',
    },
    // custom option defined in JSX
  ],
} as const
