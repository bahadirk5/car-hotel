import { getSegments } from "./actions";
import { CarForm } from "./form";

export default async function CarFormPage() {
  const segments = await getSegments();
  return <CarForm segments={segments} />;
}
