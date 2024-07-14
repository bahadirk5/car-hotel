import { getCar } from "../../actions";
import { CarForm } from "../../components/form";

export default async function CarEditPage({
  params,
}: {
  params: { carId: string };
}) {
  const car = await getCar(Number(params.carId));

  return <CarForm data={car} />;
}
