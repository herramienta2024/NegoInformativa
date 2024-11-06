import MenuPrincipalMarcas from "@/app/MenuMarcas";
import CarrouselComponent from "@/components/CarrouselComponent";
import { Button } from "@/components/ui/button";

import { dbAdmin } from "@/firebase/firebaseAdmin";
import { ProductosBackendRecomendados } from "@/lib/ObtejerColeccionBackend";
import Link from "next/link";

import { notFound } from "next/navigation";
import ListProductos from "../ListProductos";

// export const revalidate = 3600; // revalidate at most every hour

const MarcaId = async ({ params: { id } }) => {
  if (!id) {
    return notFound();
  }

  const docRef = await dbAdmin?.collection("Marcas").doc(id);
  const doc = await docRef?.get();

  const Productos = await ProductosBackendRecomendados({
    collectionName: "Productos",
    variable: "Recomendado",
    idMarca: id,
  });

  const marca = doc.data() || null;

  if (!marca) return notFound();

  console.log("Productos", Productos);

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
        <CarrouselComponent
          NombreMarca={marca?.NombreMarca}
          Carrousel={marca?.Carrousel || []}
          ColorMarca={marca?.ColorContraste || marca?.ColorMarca}
          Slogan={marca?.Slogan}
          idMarca={id}
          VideoCarrousel={marca?.VideoCarrousel || []}
          TiempoVideo={marca?.TiempoVideo || 0}
        />

        <div
          style={{
            backgroundColor: marca?.ColorMarca || "black",
          }}
          className="text-center py-10 space-y-3"
        >
          <div className="text-center max-w-4xl mx-auto space-y-2">
            <h1 className="text-4xl text font-bold leading-9 text-white uppercase">
              Explore nuestros productos destacados
            </h1>
            <h2 className="text-lg leading-9 text-white">
              Descubra nuestras últimas innovaciones en las herramientas que más
              le gustan.{" "}
            </h2>
          </div>
          <div className=" container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-8  gap-3 ">
            <ListProductos Productos={Productos} />
          </div>

          <Link href={`/Marcas/${id}/Productos`}>
            <Button className="text-2xl uppercase ">Ver Más</Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default MarcaId;
