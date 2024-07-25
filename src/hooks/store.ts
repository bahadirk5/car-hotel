import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Business {
  id: number;
  vendor_id: number;
  type: "car_rental" | "hotel" | "villa_apart" | "transfer";
  car_rental?: {
    name: string;
  } | null;
}

interface BusinessState {
  selected_business: Business | null;
  updateSelectedBusiness: (business: Business | null) => void;
}

export const useBusinessStore = create<BusinessState>()(
  persist(
    (set) => ({
      selected_business: null,
      updateSelectedBusiness: (business) => set({ selected_business: business }),
    }),
    {
      name: "selected_business",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
