import { dbAdmin } from "@/firebase/firebaseAdmin";

async function ObtejerColeccionBackend({
  collectionName,
  variable,
  idCondition,
}) {
  try {
    const colectionRef = dbAdmin.collection(`${collectionName}`);

    let snapshot = null;
    if (variable?.length > 0) {
      snapshot = await colectionRef
        .where(`${variable}`, "==", `${idCondition}`)
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

export default ObtejerColeccionBackend;
