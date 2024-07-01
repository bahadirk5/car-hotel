import { Badge } from "@/components/ui/badge";
import { Fuel, Info, User } from "lucide-react";
import Image from "next/image";

export function CarList() {
  const CAR_DATA = [
    {
      id: 1,
      brand: "Toyota",
      model: "Corolla",
      year: 2018,
      price: 40,
      totalPrice: 300,
      km_limit: 2000,
      transmition: "Manual",
      seat: 4,
      fuel: "Gasoline",
      imageUrl: "/eco.png",
    },
    {
      id: 2,
      brand: "BMW",
      model: "X5",
      year: 2018,
      price: 60,
      totalPrice: 600,
      km_limit: 2000,
      transmition: "Automatic",
      seat: 5,
      fuel: "Diesel",
      imageUrl: "/lux.png",
    },
    {
      id: 3,
      brand: "Volvo",
      model: "XC90",
      year: 2018,
      price: 70,
      totalPrice: 800,
      km_limit: 2000,
      transmition: "Automatic",
      seat: 7,
      fuel: "Diesel",
      imageUrl: "/suv.png",
    },
  ];

  return (
    <div className="mt-5 grid grid-cols-3 gap-4">
      {CAR_DATA.map((car) => (
        <div className="rounded border p-4" key={car.id}>
          <div className="flex items-end gap-1">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              {car.brand}
            </h3>
            <p className="text-sm text-muted-foreground">{car.model}</p>
          </div>
          <Badge variant="outline" className="my-1 text-muted-foreground">
            Or similar car
            <Info className="ml-1 h-4 w-4" />
          </Badge>
          <div className="my-4">
            <Image src={car.imageUrl} alt="car" width={300} height={300} />
          </div>
          <div>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              {car.price}€ / day
            </h4>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold tracking-tighter text-muted-foreground">
                {car.totalPrice}€ TOTAL PRICE
              </p>
              <p className="text-sm font-semibold tracking-tighter text-muted-foreground">
                {car.km_limit} km per rental
              </p>
            </div>
            <div className="mt-2 flex gap-2">
              <Badge>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M4.252 20q-1.04 0-1.771-.73q-.731-.728-.731-1.77q0-.898.572-1.586t1.428-.854V8.94q-.856-.165-1.428-.853Q1.75 7.398 1.75 6.5q0-1.042.729-1.77Q3.207 4 4.248 4t1.771.73t.731 1.77q0 .898-.572 1.587q-.572.688-1.428.854V11.5h6.75V8.94q-.856-.165-1.428-.853Q9.5 7.398 9.5 6.5q0-1.042.729-1.77q.728-.73 1.769-.73t1.771.73t.731 1.77q0 .898-.572 1.587q-.572.688-1.428.854V11.5h5.27q.617 0 1.058-.441q.441-.442.441-1.059V8.94q-.855-.165-1.428-.853q-.572-.689-.572-1.587q0-1.042.729-1.77q.728-.73 1.769-.73t1.772.73t.73 1.77q0 .898-.572 1.587q-.572.688-1.428.854V10q0 1.042-.729 1.77q-.729.73-1.77.73H12.5v2.56q.856.165 1.428.853q.572.689.572 1.587q0 1.042-.728 1.77q-.729.73-1.77.73t-1.771-.73T9.5 17.5q0-.898.572-1.586t1.428-.854V12.5H4.75v2.56q.856.165 1.428.853q.572.689.572 1.587q0 1.042-.728 1.77q-.729.73-1.77.73"
                  ></path>
                </svg>
                <span className="ml-1">{car.transmition}</span>
              </Badge>
              <Badge>
                <User className="mr-1 h-3 w-3" />
                {car.seat}
              </Badge>
              <Badge>
                <Fuel className="mr-1 h-3 w-3" />
                {car.fuel}
              </Badge>
            </div>
          </div>
        </div>
      ))}
      {CAR_DATA.map((car) => (
        <div className="rounded border p-4" key={car.id}>
          <div className="flex items-end gap-1">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              {car.brand}
            </h3>
            <p className="text-sm text-muted-foreground">{car.model}</p>
          </div>
          <Badge variant="outline" className="my-1 text-muted-foreground">
            Or similar car
            <Info className="ml-1 h-4 w-4" />
          </Badge>
          <div className="my-4">
            <Image src={car.imageUrl} alt="car" width={300} height={300} />
          </div>
          <div>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              {car.price}€ / day
            </h4>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold tracking-tighter text-muted-foreground">
                {car.totalPrice}€ TOTAL PRICE
              </p>
              <p className="text-sm font-semibold tracking-tighter text-muted-foreground">
                {car.km_limit} km per rental
              </p>
            </div>
            <div className="mt-2 flex gap-2">
              <Badge>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M4.252 20q-1.04 0-1.771-.73q-.731-.728-.731-1.77q0-.898.572-1.586t1.428-.854V8.94q-.856-.165-1.428-.853Q1.75 7.398 1.75 6.5q0-1.042.729-1.77Q3.207 4 4.248 4t1.771.73t.731 1.77q0 .898-.572 1.587q-.572.688-1.428.854V11.5h6.75V8.94q-.856-.165-1.428-.853Q9.5 7.398 9.5 6.5q0-1.042.729-1.77q.728-.73 1.769-.73t1.771.73t.731 1.77q0 .898-.572 1.587q-.572.688-1.428.854V11.5h5.27q.617 0 1.058-.441q.441-.442.441-1.059V8.94q-.855-.165-1.428-.853q-.572-.689-.572-1.587q0-1.042.729-1.77q.728-.73 1.769-.73t1.772.73t.73 1.77q0 .898-.572 1.587q-.572.688-1.428.854V10q0 1.042-.729 1.77q-.729.73-1.77.73H12.5v2.56q.856.165 1.428.853q.572.689.572 1.587q0 1.042-.728 1.77q-.729.73-1.77.73t-1.771-.73T9.5 17.5q0-.898.572-1.586t1.428-.854V12.5H4.75v2.56q.856.165 1.428.853q.572.689.572 1.587q0 1.042-.728 1.77q-.729.73-1.77.73"
                  ></path>
                </svg>
                <span className="ml-1">{car.transmition}</span>
              </Badge>
              <Badge>
                <User className="mr-1 h-3 w-3" />
                {car.seat}
              </Badge>
              <Badge>
                <Fuel className="mr-1 h-3 w-3" />
                {car.fuel}
              </Badge>
            </div>
          </div>
        </div>
      ))}
      {CAR_DATA.map((car) => (
        <div className="rounded border p-4" key={car.id}>
          <div className="flex items-end gap-1">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              {car.brand}
            </h3>
            <p className="text-sm text-muted-foreground">{car.model}</p>
          </div>
          <Badge variant="outline" className="my-1 text-muted-foreground">
            Or similar car
            <Info className="ml-1 h-4 w-4" />
          </Badge>
          <div className="my-4">
            <Image src={car.imageUrl} alt="car" width={300} height={300} />
          </div>
          <div>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              {car.price}€ / day
            </h4>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold tracking-tighter text-muted-foreground">
                {car.totalPrice}€ TOTAL PRICE
              </p>
              <p className="text-sm font-semibold tracking-tighter text-muted-foreground">
                {car.km_limit} km per rental
              </p>
            </div>
            <div className="mt-2 flex gap-2">
              <Badge>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M4.252 20q-1.04 0-1.771-.73q-.731-.728-.731-1.77q0-.898.572-1.586t1.428-.854V8.94q-.856-.165-1.428-.853Q1.75 7.398 1.75 6.5q0-1.042.729-1.77Q3.207 4 4.248 4t1.771.73t.731 1.77q0 .898-.572 1.587q-.572.688-1.428.854V11.5h6.75V8.94q-.856-.165-1.428-.853Q9.5 7.398 9.5 6.5q0-1.042.729-1.77q.728-.73 1.769-.73t1.771.73t.731 1.77q0 .898-.572 1.587q-.572.688-1.428.854V11.5h5.27q.617 0 1.058-.441q.441-.442.441-1.059V8.94q-.855-.165-1.428-.853q-.572-.689-.572-1.587q0-1.042.729-1.77q.728-.73 1.769-.73t1.772.73t.73 1.77q0 .898-.572 1.587q-.572.688-1.428.854V10q0 1.042-.729 1.77q-.729.73-1.77.73H12.5v2.56q.856.165 1.428.853q.572.689.572 1.587q0 1.042-.728 1.77q-.729.73-1.77.73t-1.771-.73T9.5 17.5q0-.898.572-1.586t1.428-.854V12.5H4.75v2.56q.856.165 1.428.853q.572.689.572 1.587q0 1.042-.728 1.77q-.729.73-1.77.73"
                  ></path>
                </svg>
                <span className="ml-1">{car.transmition}</span>
              </Badge>
              <Badge>
                <User className="mr-1 h-3 w-3" />
                {car.seat}
              </Badge>
              <Badge>
                <Fuel className="mr-1 h-3 w-3" />
                {car.fuel}
              </Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
