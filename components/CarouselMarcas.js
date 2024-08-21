"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import { db } from "@/firebase/firebaseClient";
import { motion } from "framer-motion";
import Link from "next/link";

const BrandCarousel = () => {
  const [marcas, setMarcas] = useState([]);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "Marcas"),
      (snapshot) => {
        const marcasData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMarcas(marcasData);
      },
      (error) => {
        console.error("Error fetching marcas:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  const itemWidth = 150; // Ancho de cada elemento
  const itemMargin = 16; // Espacio entre elementos
  const totalWidth = (itemWidth + itemMargin) * marcas.length; // Ancho total de los elementos
  const doubledWidth = totalWidth * 2; // Ancho del carrusel para la animación continua

  const containerStyle = {
    overflow: "hidden",
    position: "relative",
    width: "100%",
    height: "120px", // Ajusta la altura según tus necesidades
  };

  const carouselStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: `${doubledWidth}px`, // Ancho del carrusel
    whiteSpace: "nowrap", // Asegura que los elementos no se rompan en múltiples líneas
  };

  const itemStyle = {
    flex: "0 0 auto",
    marginRight: `${itemMargin}px`,
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
    padding: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div
      style={containerStyle}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.div
        style={carouselStyle}
        animate={{ x: isHovering ? "0%" : `-${totalWidth}px` }}
        transition={{
          duration: isHovering ? 0 : 8, // Ajusta la duración para una transición suave
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        }}
      >
        {marcas
          .concat(marcas)
          .concat(marcas)
          .map((marca) => (
            <Link href={`/Marcas/${marca.id}`} key={marca.id}>
              <div
                style={{
                  ...itemStyle,
                  backgroundColor: marca?.ColorMarca || "#f0f0f0",
                  width: `${itemWidth}px`,
                  height: "100px",
                }}
              >
                <Image
                  src={marca.Imagenes[0]}
                  alt={marca.NombreMarca}
                  width={itemWidth}
                  height={100}
                />
              </div>
            </Link>
          ))}
      </motion.div>
    </div>
  );
};

export default BrandCarousel;
