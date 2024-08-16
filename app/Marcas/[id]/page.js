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
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 3600; // revalidate at most every hour

const MarcaId = async ({ params: { id } }) => {
  if (!id) {
    return notFound();
  }

  const docRef = await dbAdmin?.collection("Marcas").doc(id);
  const doc = await docRef?.get();
  const marca = doc.data();

  if (!marca) return notFound();

  return (
    <div className="-mt-[72px] md:-mt-[90px] lg:-mt-[72px] bg-gray-50 w-full h-full">
      <TitleSection
        title={`${marca?.NombreMarca || "hola"}`}
        image="/Banners/Bannersmarcas.webp"
      />

      <div className="container mx-auto  my-6 lg:my-5">
        <Card className="shadow-xl   ">
          <CardContent className="py-4">
            {/* <Breadcrumb>
              <BreadcrumbList className="capitalize">
                <Link href={"/"}>
                  <BreadcrumbItem>
                    <BreadcrumbLink>Inicio</BreadcrumbLink>
                  </BreadcrumbItem>
                </Link>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <Link href={`${LinkEmpresa}`}>
                    <BreadcrumbLink>{Empresa}</BreadcrumbLink>
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <Link
                    href={`/Categorias?CategoriaId=${CategoriaId}&NombreCategoria=${CategoriaName}`}
                  >
                    <BreadcrumbLink>{CategoriaName}</BreadcrumbLink>
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="capitalize">
                    {marcaNombre}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarcaId;
