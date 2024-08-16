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
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 3600; // revalidate at most every hour

function hexToRgba(hex, opacity) {
  // Remove the leading '#' if it's there
  hex = hex.replace(/^#/, "");

  // Parse the hex color
  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;

  // Return the rgba string
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

const MarcaId = async ({ params: { id } }) => {
  if (!id) {
    return notFound();
  }

  const docRef = await dbAdmin?.collection("Marcas").doc(id);
  const doc = await docRef?.get();

  const Categorias = await ObtejerColeccionBackend({
    collectionName: "Categorias",
    variable: "marcaId",
    idCondition: `${id}`,
  });

  const marca = doc.data();

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
                      {/* <span className="ml-1 text-sm text-slate-400">
                        {marca?.NombreMarca}
                      </span> */}
                    </div>
                    <Link
                      href={`/Marcas/${id}/${categoria?.id}?NombreCategoria=${categoria?.NombreCategoria}`}
                      className="flex justify-center items-center  bg-black bg-opacity-80  z-10 absolute top-0 left-0 w-full h-full text-white rounded-2xl opacity-0 transition-all duration-300 transform group-hover:scale-105 text-xl group-hover:opacity-100"
                      // style={{
                      //   backgroundColor: marca?.ColorMarca / 30 || "black",
                      // }}
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
      </div>
    </div>
  );
};

export default MarcaId;
