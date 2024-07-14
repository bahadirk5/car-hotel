export const FUEL_TYPES = {
  id: "fuel_type",
  name: "Fuel Types",
  options: [
    { id: "1", name: "gasoline" },
    { id: "2", name: "diesel" },
    { id: "3", name: "electric" },
    { id: "4", name: "hybrid" },
  ],
};

export const TRANSMISSION_TYPES = {
  id: "transmission",
  name: "Transmission Types",
  options: [
    { id: "5", name: "automatic" },
    { id: "6", name: "manual" },
  ],
};

export const SEAT_COUNTS = {
  id: "seat_count",
  name: "Seat Counts",
  options: [
    { id: "7", name: "2" },
    { id: "8", name: "3" },
    { id: "9", name: "5" },
    { id: "10", name: "7" },
  ],
};

export const SEGMENTS = {
  id: "segments",
  name: "Segments",
  options: [
    { id: "11", name: "Compact" },
    { id: "12", name: "SUV" },
    { id: "13", name: "Luxury" },
    { id: "14", name: "Van" },
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
