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

const Producto = async ({
  params: { id, idCategoria, idProducto },
  searchParams: { NombreCategoria },
}) => {
  console.log(id, idCategoria, idProducto, NombreCategoria);

  const docRef = await dbAdmin?.collection("Productos").doc(idProducto);
  const doc = await docRef?.get();

  const docCategoriaRef = await dbAdmin
    ?.collection("Categorias")
    .doc(idCategoria);
  const CategoriaDoc = await docCategoriaRef?.get();

  const categoria = CategoriaDoc.data();

  const MarcaRef = await dbAdmin?.collection("Marcas").doc(id);
  const MarcaDoc = await MarcaRef?.get();
  const Marca = MarcaDoc.data();

  const product = doc.data();

  if (!product) return notFound();

  console.log(product);

  return (
    <div className="-mt-[72px] md:-mt-[88px] lg:-mt-[79.09px] bg-gray-50 w-full h-full">
      <TitleSection
        title={`${product?.NombreProducto}`}
        image="/Banners/BannerMarcas.webp"
      />

      <div className="container mx-auto  my-6 lg:my-5">
        <Card className="shadow-xl   ">
          <CardContent className="py-4">
            <Breadcrumb>
              <BreadcrumbList className="capitalize">
                <Link href={"/"}>
                  <BreadcrumbItem>
                    <BreadcrumbLink>NEGO</BreadcrumbLink>
                  </BreadcrumbItem>
                </Link>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <Link href={`/Marcas/${id}`}>
                    <BreadcrumbLink>{Marca?.NombreMarca}</BreadcrumbLink>
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <Link href={`/Marcas/${id}/${idCategoria}`}>
                    <BreadcrumbLink className="uppercase">
                      {categoria?.NombreCategoria}
                    </BreadcrumbLink>
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="capitalize">
                    {product.NombreProducto}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <ShowProducto
              product={product}
              CategoriaName={categoria?.NombreCategoria}
              Empresa={Marca?.NombreMarca}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Producto;
