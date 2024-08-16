"use client";
import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const FileUploaderProductos = ({
  setInputValues,
  index,
  InputValues,
  opcion,
}) => {
  console.log("opcion", opcion);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setInputValues((prevState) => {
        return {
          ...prevState,
          Variantes: prevState?.Variantes?.map((variante, i) => {
            if (i === index) {
              return {
                ...variante,
                Imagenes: acceptedFiles.map((file) =>
                  Object.assign(file, {
                    preview: URL.createObjectURL(file),
                  })
                ),
              };
            }
            return variante;
          }),
        };
      });
    },
  });

  const thumbsEditar = (
    <>
      {Object.keys(opcion).length > 0 && (
        <div style={thumb}>
          <div style={thumbInner}>
            <img
              src={opcion?.url}
              style={img}
              // Revoke data uri after image is loaded
              onLoad={() => {
                URL.revokeObjectURL(opcion?.url);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
  const thumbs = InputValues?.Variantes[index]?.Imagenes?.map((file, key) => (
    <div style={thumb} key={key}>
      <div style={thumbInner}>
        <img
          src={file.preview || file}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview || file);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      InputValues?.Variantes?.forEach((file) =>
        URL.revokeObjectURL(file.preview)
      );
  }, []);

  return (
    <section className="container border border-gray-800 border-dashed rounded">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p className="text-center">
          Arrastre y suelte algunos archivos aquí, o haga clic para seleccionar
          archivos
        </p>
      </div>
      {InputValues?.Variantes[index]?.Imagenes?.length > 0 ? (
        <aside style={thumbsContainer}>{thumbs}</aside>
      ) : (
        <aside style={thumbsContainer}>{thumbsEditar}</aside>
      )}
    </section>
  );
};

export default FileUploaderProductos;