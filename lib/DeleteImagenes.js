import { storage } from "@/firebase/firebaseClient";
import { deleteObject, listAll, ref } from "firebase/storage";

const DeletePdf = async (Nombre, Collection) => {
  // Borrar las imágenes antiguas
  const ImgRef = ref(storage, `${Collection}/${Nombre}/`);
  listAll(ImgRef)
    .then((res) => {
      res.items.forEach((itemRef) => {
        // Ahora debes borrar cada objeto (archivo)
        deleteObject(itemRef).catch((error) => {
          // Maneja cualquier error
          alert(` Error al eliminar ${itemRef.fullPath}`);
          console.log(`Error al eliminar ${itemRef.fullPath}`, error);
        });
      });
    })
    .catch((error) => {
      // Maneja cualquier error
      console.error("Error al listar los objetos", error);
    });
};

export default DeletePdf;
