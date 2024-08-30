import MenuPrincipalMarcas from "@/app/MenuMarcas";
import TitleSection from "@/app/TitleSection";
import CarrouslProductosImagenes from "@/components/CarrouslProductosImagenes";

import { dbAdmin } from "@/firebase/firebaseAdmin";
import {
  CategoriasMarcas,
  ProductosMarca,
} from "@/lib/ObtejerColeccionBackend";
import Link from "next/link";

import { notFound } from "next/navigation";

// export const revalidate = 3600; // revalidate at most every hour

const Producto = async ({ params: { id } }) => {
  if (!id) {
    return notFound();
  }

  const docRef = await dbAdmin?.collection("Marcas").doc(id);
  const doc = await docRef?.get();
  const marca = doc.data() || null;
  const Productos = await ProductosMarca(id);
  const Categorias = await CategoriasMarcas(id);

  console.log(Productos);

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
                        <button className="block font-medium  text-gray-900 hover:underline sm:pl-2">
                          Todos
                        </button>

                        {Categorias?.map((categoria) => (
                          <button
                            key={categoria.id}
                            className="block font-medium  text-gray-900 hover:underline sm:pl-2"
                          >
                            {categoria?.NombreCategoria}{" "}
                          </button>
                        ))}
                      </div>
                      <div className="mt-6 lg:mt-0 lg:px-2 lg:w-4/5 ">
                        <div className="lg:flex items-center justify-around text-sm tracking-widest uppercase ">
                          <p className=" text-gray-900">
                            {Productos.length} Productos
                          </p>
                          <div className="pt-2 relative mx-auto text-gray-800">
                            <input
                              className="border-2 border-sky-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                              type="search"
                              name="search"
                              placeholder="Buscar Productos"
                            />
                            <div className="absolute right-0 top-0 mt-5 mr-4">
                              <svg
                                className="text-gray-600 h-4 w-4 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                version="1.1"
                                id="Capa_1"
                                x="0px"
                                y="0px"
                                viewBox="0 0 56.966 56.966"
                                style={{
                                  enableBackground: "new 0 0 56.966 56.966",
                                }}
                                xmlSpace="preserve"
                                width="512px"
                                height="512px"
                              >
                                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 ">
                          {Productos?.map((producto) => (
                            <Link
                              href={`/Marcas/${producto?.marcaId}/show?idProducto=${producto?.id}&idCategoria=${producto?.Categoria}`}
                              key={producto?.id}
                            >
                              <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-2xl   hover:transform hover:scale-105 duration-300 hover:cursor-pointer">
                                <div className="relative flex items-end overflow-hidden rounded-xl ">
                                  <CarrouslProductosImagenes
                                    Variantes={producto?.Variantes || []}
                                  />
                                  {/* <img className="h-48 w-full object-cover" /> */}
                                </div>

                                <div className="mt-1 p-2">
                                  <h2 className="text-gray-700 font-semibold uppercase">
                                    {producto?.NombreProducto}
                                  </h2>
                                  <p className="mt-1 text-sm text-gray-500 line-clamp-3">
                                    {producto?.Descripcion}
                                  </p>
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
