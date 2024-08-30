import { dbAdmin } from "@/firebase/firebaseAdmin";

async function ProductosBackendRecomendados({
  collectionName,
  variable,
  idMarca,
}) {
  try {
    const colectionRef = dbAdmin.collection(`${collectionName}`);

    let snapshot = null;
    if (variable?.length > 0) {
      snapshot = await colectionRef
        .where("marcaId", "==", `${idMarca}`)
        .where(`${variable}`, "==", true)
        .get();
    } else {
      snapshot = await colectionRef.get();
    }

    if (snapshot.empty) {
      console.log("No hay marcas activas.");
      return [];
    }

    const Data = [];
    snapshot.forEach((doc) => {
      Data.push({ id: doc.id, ...doc.data() });
    });

    return Data;
  } catch (error) {
    console.error("Error al obtener marcas activas:", error);
    throw error;
  }
}

const ProductosMarca = async (idMarca) => {
  try {
    const colectionRef = dbAdmin.collection(`Productos`);

    let snapshot = null;

    snapshot = await colectionRef
      .where("marcaId", "==", `${idMarca}`)
      .where(`Estado`, "==", "Activo")
      .get();

    if (snapshot.empty) {
      console.log("No hay marcas activas.");
      return [];
    }

    const Data = [];
    snapshot.forEach((doc) => {
      Data.push({ id: doc.id, ...doc.data() });
    });

    return Data;
  } catch (error) {
    console.error("Error al obtener marcas activas:", error);
    throw error;
  }
};

const CategoriasMarcas = async (idMarca) => {
  try {
    const colectionRef = dbAdmin.collection(`Categorias`);

    let snapshot = null;

    snapshot = await colectionRef.where("marcaId", "==", `${idMarca}`).get();

    if (snapshot.empty) {
      console.log("No hay Categorias activas.");
      return [];
    }

    const Data = [];
    snapshot.forEach((doc) => {
      Data.push({ id: doc.id, ...doc.data() });
    });

    return Data;
  } catch (error) {
    console.error("Error al obtener marcas activas:", error);
    throw error;
  }
};
export { ProductosBackendRecomendados, ProductosMarca, CategoriasMarcas };
