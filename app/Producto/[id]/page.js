import TitleSection from "@/app/TitleSection";
import ShowProducto from "@/components/ShowProducto";
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

const Producto = async ({
  params: { id },
  searchParams: {
    CategoriaId,
    CategoriaName,
    ProductoNombre,
    Empresa,
    LinkEmpresa,
  },
}) => {
  if (!id) {
    return notFound();
  }

  const docRef = await dbAdmin?.collection("Productos").doc(id);
  const doc = await docRef?.get();
  const product = doc.data();

  if (!product) return notFound();

  return (
    <div className="-mt-[72px] md:-mt-[90px] lg:-mt-[72px] bg-gray-50 w-full h-full">
      <TitleSection
        title={`${ProductoNombre}`}
        image="/Banners/BannersProductos.webp"
      />

      <div className="container mx-auto  my-6 lg:my-5">
        <Card className="shadow-xl   ">
          <CardContent className="py-4">
            <Breadcrumb>
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
                    {ProductoNombre}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <ShowProducto
              product={product}
              CategoriaName={CategoriaName}
              Empresa={Empresa}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Producto;
