"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
const CarrouslProductosImagenes = ({ Variantes }) => {
  return (
    <>
      {Variantes?.map((image, i) => (
        <Carousel
          key={i}
          infiniteLoop
          autoPlay
          showThumbs={false}
          showStatus={false}
        >
          <div className="h-48 w-full">
            <img
              className="w-full h-full object-cover object-center"
              src={image?.url}
              alt={i}
            />
          </div>
        </Carousel>
      ))}
    </>
  );
};

export default CarrouslProductosImagenes;
