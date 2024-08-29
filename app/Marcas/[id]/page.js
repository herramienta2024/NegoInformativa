import MenuPrincipalMarcas from "@/app/MenuMarcas";
import CarrouselComponent from "@/components/CarrouselComponent";
import CarrouslProductosImagenes from "@/components/CarrouslProductosImagenes";
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
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 3600; // revalidate at most every hour

const MarcaId = async ({ params: { id } }) => {
  if (!id) {
    return notFound();
  }

  const docRef = await dbAdmin?.collection("Marcas").doc(id);
  const doc = await docRef?.get();

  const Productos = await ObtejerColeccionBackend({
    collectionName: "Productos",
    variable: "Recomendado",
    idMarca: id,
  });

  console.log("Productos", Productos);

  const marca = doc.data() || null;

  console.log("marca", marca);

  if (!marca) return notFound();

  return (
    <main>
      <MenuPrincipalMarcas
        Icono={
          (marca?.SubLogo?.length && marca.SubLogo?.[0]) ||
          marca.Imagenes[0] ||
          ""
        }
        marcaId={id}
        ColorMarca={marca?.ColorContraste || marca?.ColorMarca}
      />

      <div className="-mt-[72px] md:-mt-[79.09px] lg:-mt-[79.09px] bg-gray-50 w-full h-full">
        <CarrouselComponent
          NombreMarca={marca?.NombreMarca}
          Carrousel={marca?.Carrousel || []}
          ColorMarca={marca?.ColorContraste || marca?.ColorMarca}
        />

        <div
          style={{
            backgroundColor: marca?.ColorMarca || "black",
          }}
          className="text-center py-5"
        >
          <h1 className="text-4xl font-semibold text-white ">
            Explore our Featured Products
          </h1>
          <h2 className="text-3xl text-white">
            Check out our latest innovations on the tools you love.
          </h2>
          <div className=" container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
            {Productos?.map((producto) => (
              <div
                key={producto.id}
                className="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg"
              >
                <CarrouslProductosImagenes
                  Variantes={producto?.Variantes || []}
                />

                <div className="p-4">
                  <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900 uppercase">
                    {producto?.NombreProducto}
                  </h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: producto?.Description || "",
                    }}
                    className="mb-2 text-base dark:text-gray-300 text-gray-700 line-clamp-4"
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="container mx-auto  my-6 lg:my-5">
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

                  <BreadcrumbItem>
                    <BreadcrumbPage className="uppercase">
                      {marca?.NombreMarca}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <div className="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-center px-2 mx-auto">
                {Categorias?.map((categoria) => (
                  <article
                    key={categoria?.id}
                    className="bg-white  p-6 mb-6 shadow transition duration-300 group transform hover:-translate-y-2 hover:shadow-2xl rounded-2xl cursor-pointer border"
                  >
                    <Link
                      href={`/Marcas/${id}/${categoria?.id}?NombreCategoria=${categoria?.NombreCategoria}`}
                      className="absolute opacity-0 top-0 right-0 left-0 bottom-0"
                    />
                    <div className="relative mb-4 rounded-2xl">
                      <img
                        className="max-h-80 rounded-2xl w-full object-cover transition-transform duration-300 transform group-hover:scale-105"
                        src={categoria?.Imagenes[0]}
                        alt="CategoriaImagen"
                      />
                      <div
                        className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md"
                        style={{
                          backgroundColor: marca?.ColorMarca || "black",
                        }}
                      >
                        <Image
                          src={marca?.Imagenes[0]}
                          width={40}
                          height={40}
                          style={{
                            objectFit: "contain",
                          }}
                        />
                      </div>
                      <Link
                        href={`/Marcas/${id}/${categoria?.id}?NombreCategoria=${categoria?.NombreCategoria}`}
                        className="flex justify-center items-center  bg-black bg-opacity-80  z-10 absolute top-0 left-0 w-full h-full text-white rounded-2xl opacity-0 transition-all duration-300 transform group-hover:scale-105 text-xl group-hover:opacity-100"
                      >
                        Productos
                        <svg
                          className="ml-2 w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 5l7 7-7 7M5 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </div>

                    <h3 className="font-medium text-xl leading-8">
                      <Link
                        href={`/Marcas/${id}/${categoria?.id}?NombreCategoria=${categoria?.NombreCategoria}`}
                        className="block relative group-hover:text-black-700 transition-colors duration-200 "
                      >
                        {categoria?.NombreCategoria}
                      </Link>
                    </h3>
                    <div></div>
                  </article>
                ))}
              </div>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </main>
  );
};

export default MarcaId;
