import { storage } from "@/firebase/firebaseClient";
import { deleteObject, listAll, ref } from "firebase/storage";

// Función para borrar todos los PDFs de una carpeta específica en Firebase Storage
const DeletePdf = async (folderName) => {
  console.log("Eliminando PDFs en la carpeta:", folderName);

  try {
    // Referencia a la carpeta en Firebase Storage
    const folderRef = ref(storage, folderName);

    // Listar todos los archivos en la carpeta
    const result = await listAll(folderRef);

    if (result.items.length === 0) {
      console.log("No se encontraron archivos para eliminar.");
      return;
    }

    // Eliminar cada archivo en la carpeta
    const deletePromises = result.items.map((itemRef) => {
      return deleteObject(itemRef)
        .then(() => {
          console.log(`Archivo eliminado: ${itemRef.fullPath}`);
        })
        .catch((error) => {
          console.error(
            `Error al eliminar el archivo: ${itemRef.fullPath}`,
            error
          );
        });
    });

    // Esperar a que todos los archivos sean eliminados
    await Promise.all(deletePromises);

    console.log("Todos los archivos PDF han sido eliminados.");
  } catch (error) {
    console.error("Error al listar o eliminar archivos:", error);
  }
};

export default DeletePdf;
