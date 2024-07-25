export type Price = {
  id: number;
  start: string;
  end: string;
  price: number;
};

export type Room = {
  id: number;
  name: string;
  status: "Clean" | "Needs Cleaning";
};

export type RoomType = {
  id: number;
  name: string;
  rooms: Room[];
  prices: Price[];
};

export type Booking = {
  id: number;
  roomId: number;
  startDate: string;
  endDate: string;
  guestName: string;
  status: "confirmed" | "checked-in" | "checked-out";
};

export const bookings: Booking[] = [
  {
    id: 1,
    roomId: 1,
    startDate: "2024-06-01",
    endDate: "2024-06-03",
    guestName: "Cemile Korkmazer",
    status: "confirmed",
  },
  {
    id: 2,
    roomId: 1,
    startDate: "2024-06-03",
    endDate: "2024-06-06",
    guestName: "Alparslan Korkmazer",
    status: "checked-in",
  },
  {
    id: 6,
    roomId: 1,
    startDate: "2024-06-06",
    endDate: "2024-06-08",
    guestName: "Alparslan Korkmazer",
    status: "confirmed",
  },
  {
    id: 3,
    roomId: 1,
    startDate: "2024-06-28",
    endDate: "2024-07-01",
    guestName: "Alparslan Korkmazer",
    status: "checked-in",
  },
  {
    id: 33,
    roomId: 1,
    startDate: "2024-07-01",
    endDate: "2024-07-03",
    guestName: "Alparslan Korkmazer",
    status: "checked-in",
  },
  {
    id: 5,
    roomId: 3,
    startDate: "2024-06-05",
    endDate: "2024-06-10",
    guestName: "Bahadır Korkazer",
    status: "checked-out",
  },
  {
    id: 51,
    roomId: 10,
    startDate: "2024-06-05",
    endDate: "2024-06-10",
    guestName: "Bahadır Korkazer",
    status: "checked-out",
  },
];

export const rooms: RoomType[] = [
  {
    id: 1,
    name: "Single Room",
    rooms: [
      { id: 1, name: "Room 101", status: "Needs Cleaning" },
      { id: 2, name: "Room 102", status: "Needs Cleaning" },
      { id: 3, name: "Room 103", status: "Clean" },
      { id: 4, name: "Room 104", status: "Clean" },
    ],
    prices: [
      { id: 1, start: "2024-06-01", end: "2024-06-10", price: 255 },
      { id: 2, start: "2024-06-10", end: "2024-06-20", price: 300 },
      { id: 3, start: "2024-06-20", end: "2024-06-30", price: 155 },
    ],
  },
  {
    id: 2,
    name: "Suite",
    rooms: [
      { id: 5, name: "Room 105", status: "Clean" },
      { id: 6, name: "Room 106", status: "Needs Cleaning" },
      { id: 7, name: "Room 107", status: "Clean" },
      { id: 8, name: "Room 108", status: "Clean" },
    ],
    prices: [
      { id: 1, start: "2024-06-01", end: "2024-06-10", price: 400 },
      { id: 2, start: "2024-06-10", end: "2024-06-20", price: 425 },
      { id: 3, start: "2024-06-20", end: "2024-06-30", price: 445 },
    ],
  },
  {
    id: 3,
    name: "Deluxe Room",
    rooms: [
      { id: 9, name: "Room 109", status: "Clean" },
      { id: 10, name: "Room 110", status: "Clean" },
      { id: 11, name: "Room 111", status: "Needs Cleaning" },
      { id: 12, name: "Room 112", status: "Clean" },
    ],
    prices: [
      { id: 1, start: "2024-06-01", end: "2024-06-10", price: 400 },
      { id: 2, start: "2024-06-10", end: "2024-06-20", price: 425 },
      { id: 3, start: "2024-06-20", end: "2024-06-30", price: 445 },
    ],
  },
];
