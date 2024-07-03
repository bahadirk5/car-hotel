import { getSegments } from "../actions";
import { CarForm } from "../components/form";

export default async function CarCreatePage() {
  const segments = await getSegments();
  return <CarForm segments={segments} />;
}
