import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Badge } from "./ui/badge";

const ShowProducto = ({ product, CategoriaName, Empresa }) => {
  console.log(" product", product);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2  gap-2 lg:gap-x-4">
        <div className=" w-[80%] mx-auto h-full">
          {/* <div className="hidden lg:inline space-y-4">
              {product?.Variantes?.map((image, i) => (
                <Image
                  key={image.key}
                  src={image.url}
                  alt={product.title}
                  width={90}
                  height={90}
                  className="border rounded-sm"
                />
              ))}
            </div> */}

          <Carousel
            opts={{
              loop: true,
            }}
            className="w-full h-full  "
          >
            <CarouselContent className="  ">
              {product?.Variantes?.map((image, i) => (
                <CarouselItem key={i} className="">
                  <div className="p-1">
                    <div className="flex aspect-auto lg:aspect-square items-center justify-center p-2 relative">
                      <Image
                        key={image?.key}
                        src={image?.url}
                        alt={product.title}
                        width={300}
                        height={300}
                        style={{
                          objectFit: "contain",
                        }}
                        className="border rounded-sm"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className=" flex justify-center flex-col items-center lg:items-start lg:justify-start mx-auto border w-full  uppercase rounded-md  p-5  space-y-2 ">
          <h1 className="font-semibold">
            {product?.NombreProducto || "Title Producto"}
          </h1>
          <div className=" space-x-2 ">
            <Badge variant="outline">
              {Empresa || "Empresa no disponible"}
            </Badge>
            <Badge variant="outline">
              {CategoriaName || "Categoria no disponible"}
            </Badge>
          </div>

          <div className="space-y-2 ">
            <h1 className="font-semibold text-xl">Variantes</h1>
            <div className="grid grid-cols-2 gap-4  ">
              {product?.Variantes?.map((image, i) => (
                <div
                  key={i}
                  className="w-full h-full p-2 cursor-pointer  rounded-md hover:shadow-md hover:scale-105"
                >
                  <h1 className="capitalize ">{image?.Nombre || ""}</h1>
                  <Image
                    src={image.url}
                    alt={product.title}
                    width={100}
                    height={100}
                    className="border rounded-sm"
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: product.Description || "Description no dispinible",
            }}
            className="py-2"
          />
          {/* 
          <p className="text-yellow-500 text-sm flex space-x-0.5">
            <span>1</span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4  "
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span className="text-gray-400 ml-2">3</span>
          </p> */}

          {/* <p className="text-2xl font-bold mt-2">
          {product.currency} {product.price}
        </p> */}
        </div>
      </div>
    </>
  );
};

export default ShowProducto;
