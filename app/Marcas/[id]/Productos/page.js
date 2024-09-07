import MenuPrincipalMarcas from "@/app/MenuMarcas";
import TitleSection from "@/app/TitleSection";
import CarrouslProductosImagenes from "@/components/CarrouslProductosImagenes";
import InputBuscarProducto from "@/components/InputBuscarProducto";

import { dbAdmin } from "@/firebase/firebaseAdmin";
import {
  CategoriasMarcas,
  ProductosMarca,
} from "@/lib/ObtejerColeccionBackend";
import Link from "next/link";

import { notFound } from "next/navigation";

// export const revalidate = 3600; // revalidate at most every hour

const Producto = async ({
  params: { id },
  searchParams: { Categoriaid, search },
}) => {
  if (!id) {
    return notFound();
  }

  let ProductosSee = [];
  const docRef = await dbAdmin?.collection("Marcas").doc(id);
  const doc = await docRef?.get();
  const marca = doc.data() || null;
  const Productos = await ProductosMarca(id);
  const Categorias = await CategoriasMarcas(id);

  if (Categoriaid) {
    ProductosSee = Productos.filter(
      (producto) => producto?.Categoria === Categoriaid
    );
  }
  if (search) {
    ProductosSee = Productos?.filter((producto) =>
      producto?.NombreProducto?.toLowerCase().includes(search.toLowerCase())
    );
  } else {
    ProductosSee = Productos;
  }

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

      <div className="-mt-[84px] md:-mt-[96px] lg:-mt-[91.09px] bg-gray-50 w-full h-full">
        {/* <CarrouselComponent
          NombreMarca={marca?.NombreMarca}
          Carrousel={marca?.Carrousel || []}
          ColorMarca={marca?.ColorContraste || marca?.ColorMarca}
          Slogan={marca?.Slogan}
          idMarca={id}
        /> */}
        <TitleSection title={`Productos`} image="/Banners/BannerMarcas.webp" />

        <section className=" bg-gray-50">
          <div className="container px-6 py-8 mx-auto">
            <div className="lg:flex lg:-mx-2">
              <div className="mt-6 lg:mt-0 lg:px-2 lg:w-4/5 ">
                <section className=" bg-gray-50">
                  <div className="container px-6 py-8 mx-auto">
                    <div className="lg:flex lg:-mx-2">
                      <div className="space-y-3 lg:w-1/5 lg:px-2 lg:space-y-4 border-r border-gray-200 ">
                        <h1 className="text-black text-lg uppercase">
                          Categorías
                        </h1>
                        <Link
                          href={`/Marcas/${id}/Productos`}
                          className="block font-medium  text-gray-900 hover:underline sm:pl-2"
                        >
                          Todos
                        </Link>

                        {Categorias?.map((categoria) => (
                          <Link
                            href={`/Marcas/${id}/Productos?Categoriaid=${categoria.id}`}
                            key={categoria.id}
                            className="block font-medium  text-gray-900 hover:underline sm:pl-2"
                          >
                            {categoria?.NombreCategoria}{" "}
                          </Link>
                        ))}
                      </div>
                      <div className="mt-6 lg:mt-0 lg:px-2 lg:w-4/5 ">
                        <div className="lg:flex items-center justify-around text-sm tracking-widest uppercase -z-10">
                          <p className=" text-gray-900">
                            {ProductosSee.length} Productos
                          </p>
                          <div className="pt-2 z-50 mx-auto text-gray-800">
                            {/* <input
                              className="border-2 border-sky-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                              type="search"
                              name="search"
                              onChange={(e) => {
                                e.preventDefault();
                              }}
                              placeholder="Buscar Productos"
                            /> */}
                            <InputBuscarProducto Productos={Productos} />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 ">
                          {ProductosSee?.map((producto) => (
                            <Link
                              href={`/Marcas/${producto?.marcaId}/show?idProducto=${producto?.id}&idCategoria=${producto?.Categoria}`}
                              key={producto?.id}
                              className="bg-white rounded-xl p-3 shadow-lg hover:shadow-2xl   hover:transform hover:scale-105 duration-300 hover:cursor-pointer"
                            >
                              <article className="">
                                <div className="relative flex items-end overflow-hidden rounded-xl ">
                                  <CarrouslProductosImagenes
                                    Variantes={
                                      producto?.ImagenesGenerales.concat(
                                        producto?.Variantes
                                      ) || []
                                    }
                                  />
                                  {/* <img className="h-48 w-full object-cover" /> */}
                                </div>

                                <div className="mt-1 p-2">
                                  <h2 className="text-gray-700 font-semibold uppercase">
                                    {producto?.NombreProducto}
                                  </h2>
                                  {/* <p className="mt-1 text-sm text-gray-500 line-clamp-3">
                                    
                                  </p> */}
                                  <div
                                    className="line-clamp-4 mt-1 text-sm text-gray-500 "
                                    dangerouslySetInnerHTML={{
                                      __html: producto?.Description || "",
                                    }}
                                  />
                                  {/* 
                        <div className="mt-3 flex items-end justify-between">
                          <p className="text-lg font-bold text-blue-500">$850</p>

                          <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-black duration-100 hover:bg-blue-600">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="h-4 w-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                              />
                            </svg>
                          </div>
                        </div> */}
                                </div>
                              </article>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Producto;
