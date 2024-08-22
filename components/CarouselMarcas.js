"use client";
import "./Carousel.css";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/firebaseClient";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const BrandCarousel = () => {
  const [marcas, setMarcas] = useState([]);
  const [isPaused, setIsPaused] = useState(false);

  console.log(marcas);

  const handleHoverStart = () => {
    setIsPaused(true);
  };

  const handleHoverEnd = () => {
    setIsPaused(false);
  };

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

  return (
    <div>
      {/* <div
        className={`scroll ${isPaused ? "paused" : ""}`}
        style={{ "--time": "20s" }}
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
      >
        {marcas.length > 0 &&
          marcas.concat(marcas).map((marca) => (
            <Link href={`/Marcas/${marca.id}`} key={marca.id}>
              <div className="uppercase">
                <span>{marca?.NombreMarca}</span>
              </div>
            </Link>
          ))}
      </div> */}

      {/* Repite lo mismo para las otras filas del carrusel */}
      {/* <div
        className={`scroll ${isPaused ? "paused" : ""}`}
        style={{ "--time": "30s" }}
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
      ></div> */}

      {/* Repite lo mismo para la fila de imágenes */}
      <div
        className={`scroll imgBox ${isPaused ? "paused" : ""}`}
        style={{ "--time": "25s" }}
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
      >
        <div>
          {marcas?.length > 0 &&
            marcas.map((marca) => (
              <Link
                className="w-full h-full  "
                href={`/Marcas/${marca.id}`}
                key={marca.id}
              >
                <div
                  style={{
                    backgroundColor: marca?.ColorMarca || "#f0f0f0",
                    width: "200px",
                    height: "100px",
                    borderRadius: "10px",
                  }}
                >
                  <img src="" alt="" />
                  <Image
                    src={marca.Imagenes[0]}
                    alt={marca.NombreMarca}
                    width={300}
                    height={150}
                  />
                </div>
              </Link>
            ))}
        </div>
        <div className="pl-[20px]">
          {marcas?.length > 0 &&
            marcas.map((marca) => (
              <Link
                className="w-full h-full  "
                href={`/Marcas/${marca.id}`}
                key={marca.id}
              >
                <div
                  className="hover:scale-90"
                  style={{
                    backgroundColor: marca?.ColorMarca || "#f0f0f0",
                    width: "200px",
                    height: "100px",
                    borderRadius: "10px",
                  }}
                >
                  <Image
                    src={marca.Imagenes[0]}
                    alt={marca.NombreMarca}
                    width={300}
                    height={150}
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BrandCarousel;
