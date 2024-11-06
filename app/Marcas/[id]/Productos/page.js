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
import StoreComponent from "./StoreComponent";

// export const revalidate = 3600; // revalidate at most every hour

const Producto = async ({ params: { id } }) => {
  if (!id) {
    return notFound();
  }

  const docRef = await dbAdmin?.collection("Marcas").doc(id);
  const doc = await docRef?.get();
  const marca = doc.data() || null;
  // const Productos = await ProductosMarca(id);
  // const Categorias = await CategoriasMarcas(id);
  const [Productos, Categorias] = await Promise.all([
    ProductosMarca(id),
    CategoriasMarcas(id),
  ]);

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

        {/* <section className=" bg-gray-50">
          <div className="container px-6 py-8 mx-auto w-full">
            <div className="lg:flex lg:-mx-2 w-full">
              <div className="mt-6 lg:mt-0 lg:px-2 w-full ">
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
                          <div className="flex gap-2">
                            <p className=" flex space text-gray-900">
                              {ProductosSee.length}
                            </p>
                            <span>Productos</span>
                          </div>
                          <div className="pt-2 w-full h-full mx-auto text-gray-800">
                            <InputBuscarProducto Productos={Productos} />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 ">
                          {ProductosSee?.map((producto) => {
                            const Imagenes =
                              producto?.ImagenesGenerales.concat(
                                producto?.Variantes
                              ) || [];

                            const ImagenesFormated = Imagenes.filter(
                              (imagen) => imagen.url || imagen.length > 0
                            );

                            return (
                              <Link
                                href={`/Marcas/${producto?.marcaId}/show?idProducto=${producto?.id}&idCategoria=${producto?.Categoria}`}
                                key={producto?.id}
                                className="bg-white rounded-xl p-3 shadow-lg hover:shadow-2xl   hover:transform hover:scale-105 duration-300 hover:cursor-pointer"
                              >
                                <article className="">
                                  <div className="relative flex items-end overflow-hidden rounded-xl ">
                                    <CarrouslProductosImagenes
                                      Variantes={ImagenesFormated}
                                    />
                                  </div>

                                  <div className="mt-1 p-2">
                                    <h2 className="text-gray-700 font-semibold uppercase">
                                      {producto?.NombreProducto}
                                    </h2>

                                    <div
                                      className="line-clamp-4 mt-1 text-sm text-gray-500 "
                                      dangerouslySetInnerHTML={{
                                        __html: producto?.Description || "",
                                      }}
                                    />
                                  </div>
                                </article>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section> */}
        <StoreComponent
          products={JSON.parse(JSON.stringify(Productos))}
          categories={JSON.parse(JSON.stringify(Categorias))}
          marca={JSON.parse(JSON.stringify(marca))}
        />
      </div>
    </main>
  );
};

export default Producto;
