import { db, storage } from "@/firebase/firebaseClient";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { useState } from "react";
const UploadPDF = ({ InfoCondomain, setModalUploadPdf }) => {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [uploading, setUploading] = useState(false);

  const allowedTypes = [
    "application/pdf",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
    } else {
      alert("Tipo de archivo no permitido.");
      setFile(null);
    }
  };

  const handleUpload = async (e) => {
    setUploading(true);
    e.preventDefault();
    const storagePath = `files/${InfoCondomain.id}/${file.name}`;
    const storageRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snap) => {
        // Puedes agregar aquí un rastreador del progreso de la carga si lo deseas
      },
      (err) => {
        console.error(err);
        setUploading(false);
      },
      async () => {
        const url = await getDownloadURL(storageRef);
        await addDoc(
          collection(db, "Condominios", `${InfoCondomain.id}`, "Documentos"),
          {
            name: filename,
            url: url,
            fileType: file.type,
            NamePDF: file.name,
          }
        );
        setFile(null);
        setFilename("");
        setUploading(false);
      }
    );
  };

  return (
    <div>
      <form
        className="grid grid-cols-1  justify-center items-center gap-4"
        onSubmit={handleUpload}
      >
        <input
          type="text"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          placeholder="Nombre del archivo"
          required
          className="InputStyle2"
        />
        <label className="w-64 mx-auto flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
          <svg
            className="w-8 h-8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <span className="mt-2 text-base leading-normal">
            {file?.name || "Selecciona tu archivo"}
          </span>
          <input
            type="file"
            onChange={handleChange}
            accept=".pdf,.doc,.docx,.xls,.xlsx"
            required
            className="hidden"
          />
        </label>
        <Button
          title="Subir archivo"
          disabled={uploading || !file || !filename}
        >
          {uploading ? "Subiendo..." : "Subir Archivo"}
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            setModalUploadPdf(false);
          }}
        >
          Cerrar
        </Button>
      </form>
    </div>
  );
};

export default UploadPDF;
