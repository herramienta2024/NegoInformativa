import ShowInfoProducto from "@/components/ComponentProducto";
import { dbAdmin } from "@/firebase/firebaseAdmin";

const Show = async ({
  params: { id },
  searchParams: { idProducto, idCategoria },
}) => {
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

  return (
    <>
      <ShowInfoProducto
        product={product}
        CategoriaName={categoria?.NombreCategoria}
        Empresa={Marca?.NombreMarca}
      />
    </>
  );
};

export default Show;
