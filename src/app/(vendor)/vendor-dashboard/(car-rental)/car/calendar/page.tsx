import { TimelineCalendar } from "@/components/timeline-calendar/calendar";
import { getCarsWithAvailability } from "../actions";

export default async function CarCalendarPage() {
  const carWithAvailability = await getCarsWithAvailability();
  console.log(carWithAvailability);

  return <TimelineCalendar />;
}
