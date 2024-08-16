import { storage } from "@/firebase/firebaseClient";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const uploadImages = async (images, name, collection) => {
  const urlLinks = await Promise.all(
    images.map(async (image, index) => {
      const extension = image.name.split(".").pop(); // Extrae la extensión del archivo
      const imageRef = ref(
        storage,
        `${collection}/${name}/image-${index}.${extension}`
      );
      await uploadBytes(imageRef, image);
      const url = await getDownloadURL(imageRef);
      return url;
    })
  );
  return urlLinks;
};

export default uploadImages;
