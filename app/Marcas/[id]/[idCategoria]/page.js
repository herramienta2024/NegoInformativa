import TitleColor from "@/app/TitleColor";
import TitleSection from "@/app/TitleSection";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { dbAdmin } from "@/firebase/firebaseAdmin";
import ObtejerColeccionBackend from "@/lib/ObtejerColeccionBackend";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 3600; // revalidate at most every hour

const CategoriaId = async ({
  params: { id, idCategoria },
  searchParams: { NombreCategoria },
}) => {
  if (!id) {
    return notFound();
  }

  const docRef = await dbAdmin?.collection("Marcas").doc(id);
  const doc = await docRef?.get();
  const marca = doc.data();

  const Productos = await ObtejerColeccionBackend({
    collectionName: "Productos",
    variable: "Categoria",
    idCondition: `${idCategoria}`,
  });

  if (!marca) return notFound();

  return (
    <div className="-mt-[72px] md:-mt-[90px] lg:-mt-[72px] bg-gray-50 w-full h-full">
      <TitleColor
        title={`${marca?.NombreMarca || "Marca no disponble"}`}
        ColorMarca={marca?.ColorMarca}
      />

      <div className="container mx-auto  my-6 lg:my-5">
        <Card className="shadow-xl   ">
          <CardContent className="py-4">
            <Breadcrumb>
              <BreadcrumbList className="capitalize">
                <Link href={"/Marcas"}>
                  <BreadcrumbItem>
                    <BreadcrumbLink>Nego</BreadcrumbLink>
                  </BreadcrumbItem>
                </Link>
                <BreadcrumbSeparator />
                <Link href={`/Marcas/${id}`}>
                  <BreadcrumbItem>
                    <BreadcrumbLink>{marca?.NombreMarca}</BreadcrumbLink>
                  </BreadcrumbItem>
                </Link>
                <BreadcrumbSeparator />

                <BreadcrumbItem>
                  <BreadcrumbPage className="capitalize">
                    {NombreCategoria}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-center px-2 mx-auto">
              {Productos?.map((producto) => (
                <Link
                  href={`/Marcas/${id}/${idCategoria}?NombreCategoria=${NombreCategoria}/${producto.id}`}
                  key={producto.id}
                >
                  <div className="flex  items-center justify-center ">
                    <div className="mx-auto px-5">
                      <div className="max-w-xs cursor-pointer rounded-lg bg-white p-2 shadow duration-150 hover:scale-105 hover:shadow-md">
                        <img
                          className="w-full rounded-lg object-cover object-center"
                          src={producto?.Variantes[0]?.url}
                          alt="product"
                        />
                        <p className="my-4 pl-4 font-bold text-gray-500">
                          {producto?.NombreProducto}{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CategoriaId;
