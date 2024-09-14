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

const media = {
  display: "block",
  width: "auto",
  height: "100%",
};

const FileUpploadVideos = ({ setFiles, files, Modal }) => {
  console.log("Modal", Modal);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "video/mp4": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const renderMedia = (file, key) => {
    if (file?.type?.startsWith("video/")) {
      return (
        <div style={thumb} key={key}>
          <div style={thumbInner}>
            <video
              src={file.preview}
              style={media}
              controls
              // Revoke data uri after video is loaded
              onLoadedData={() => {
                URL.revokeObjectURL(file.preview);
              }}
            />
          </div>
        </div>
      );
    }

    return (
      <div style={thumb} key={key}>
        <div style={thumbInner}>
          <img
            src={file.preview}
            style={media}
            // Revoke data uri after image is loaded
            onLoad={() => {
              URL.revokeObjectURL(file.preview);
            }}
          />
        </div>
      </div>
    );
  };

  const thumbsEditar = Modal?.InfoEditar?.VideoCarrousel?.map((file, key) =>
    renderMedia(file, key)
  );

  const thumbs = files?.map((file, key) => renderMedia(file, key));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="container border border-gray-200 border-dashed rounded">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p className="text-center">
          Arrastre y suelte algunos archivos aquí, o haga clic para seleccionar
          archivos
        </p>
      </div>
      {files?.length > 0 ? (
        <aside style={thumbsContainer}>{thumbs}</aside>
      ) : (
        <>
          {Modal?.InfoEditar?.VideoCarrousel?.length > 0 && (
            <aside style={thumbsContainer}>{thumbsEditar}</aside>
          )}
        </>
      )}
    </section>
  );
};

export default FileUpploadVideos;
