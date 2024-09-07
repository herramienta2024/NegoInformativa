import TitleSection from "@/app/TitleSection";

import { Card, CardContent } from "@/components/ui/card";
import { dbAdmin } from "@/firebase/firebaseAdmin";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import MenuPrincipal from "../MenuPrincipal";

// export const revalidate = 3600; // revalidate at most every hour

async function obtenerMarcasActivas() {
  try {
    const MarcasRef = dbAdmin.collection("Marcas");
    const snapshot = await MarcasRef.where("Estado", "==", "Activo").get();

    if (snapshot.empty) {
      console.log("No hay marcas activas.");
      return [];
    }

    const marcasActivas = [];
    snapshot.forEach((doc) => {
      marcasActivas.push({ id: doc.id, ...doc.data() });
    });

    return marcasActivas;
  } catch (error) {
    console.error("Error al obtener marcas activas:", error);
    throw error;
  }
}

const Marcas = async () => {
  const marcas = await obtenerMarcasActivas();
  if (!marcas?.length) {
    return notFound();
  }
  return (
    <nav>
      <MenuPrincipal />
      <div className="-mt-[84px] md:-mt-[96px] lg:-mt-[91.09px] bg-gray-50 w-full h-full">
        <TitleSection
          title={`Marcas Disponbiles`}
          image="/Banners/BannerMarcas.webp"
        />

        <div className="container mx-auto    ">
          <Card className="shadow-xl   ">
            <CardContent className="">
              <div className=" bg-white p-5  rounded-lg w-full h-full grid grid-cols-1 lg:grid-cols-2  gap-5">
                {marcas?.map((marca) => (
                  <Link
                    key={marca?.id}
                    href={`/Marcas/${marca?.id}`}
                    className="rounded-xl border  text-gray-700 shadow-md hover:-translate-y-2 bg-gray-50 overflow-hidden"
                  >
                    <div className="md:flex">
                      <div
                        style={{
                          backgroundColor: marca?.ColorMarca || "black",
                        }}
                        className="md:flex-shrink-0 p-3  "
                      >
                        <img
                          className="h-48 w-full object-contain md:w-52"
                          src={marca?.Imagenes[0] || ""}
                          alt="Event image"
                        />
                      </div>
                      <div className="py-8 px-4">
                        <div className="uppercase tracking-wide text-lg text-black font-semibold">
                          {marca?.NombreMarca}
                        </div>
                        <p className="block mt-1 text-sm leading-tight font-medium text-gray-800 ">
                          {marca?.Descripcion}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </nav>
  );
};

export default Marcas;
