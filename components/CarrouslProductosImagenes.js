"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
const CarrouslProductosImagenes = ({ Variantes }) => {
  return (
    <>
      <Carousel infiniteLoop autoPlay showThumbs={false} showStatus={false}>
        {Variantes?.map((image, i) => (
          <div key={i} className="h-48 w-full">
            <img
              className="w-full h-full object-contain object-center"
              src={image?.url || image}
              alt={i}
            />
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default CarrouslProductosImagenes;
