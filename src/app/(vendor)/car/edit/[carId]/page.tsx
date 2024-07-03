import { getSegments, getCar } from "../../actions";
import { CarForm } from "../../components/form";

export default async function CarEditPage({
  params,
}: {
  params: { carId: string };
}) {
  const segments = await getSegments();
  const car = await getCar(Number(params.carId));

  return <CarForm segments={segments} data={car} />;
}
