import TitleSection from "@/app/TitleSection";

import { Card, CardContent } from "@/components/ui/card";
import { dbAdmin } from "@/firebase/firebaseAdmin";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

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

const Saludo = async () => {
  const marcas = await obtenerMarcasActivas();
  if (!marcas?.length) {
    return notFound();
  }
  return (
    <div className="-mt-[72px] md:-mt-[90px] lg:-mt-[72px] bg-gray-50 w-full h-full">
      <TitleSection
        title={`Marcas Disponbiles`}
        image="/Banners/Bannersmarcas.webp"
      />

      <div className="container mx-auto  my-6 lg:my-5">
        <Card className="shadow-xl   ">
          <CardContent className="py-4">
            <div className=" bg-white p-5 md:p-10 rounded-lg w-full h-full grid grid-cols-1 md:grid-cols-2  gap-4">
              {marcas?.map((marca) => (
                <Link key={marca?.id} href={`/Marcas/${marca?.id}`}>
                  <div className=" flex w-full max-w-[48rem] flex-row rounded-xl border  text-gray-700 shadow-md ">
                    <div
                      className="relative m-0 w-[15rem] shrink-0 overflow-hidden rounded-xl rounded-r-none  bg-clip-border text-gray-700"
                      style={{
                        backgroundColor: marca?.ColorMarca || "black",
                      }}
                    >
                      <Image
                        src={marca?.Imagenes[0] || ""}
                        alt="image"
                        className="h-full w-full object-cover"
                        fill
                      />
                    </div>
                    <div className="p-6">
                      <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                        {marca?.NombreMarca}
                      </h4>
                      <p className="mb-8 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
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
  );
};

export default Saludo;