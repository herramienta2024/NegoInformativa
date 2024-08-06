"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import Image from "next/image";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/firebaseClient";
import { forwardRef, useEffect, useState } from "react";

export function NegoGarden() {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [data, setData] = useState([]);

  console.log("data", data);

  useEffect(() => {
    const unsubscribeCategorias = onSnapshot(
      collection(db, "Categorias"),
      (snapshot) => {
        const categoriasData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategorias(categoriasData);
      }
    );

    const unsubscribeProductos = onSnapshot(
      collection(db, "Productos"),
      (snapshot) => {
        const productosData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProductos(productosData);
      }
    );

    // Cleanup subscriptions on unmount
    return () => {
      unsubscribeCategorias();
      unsubscribeProductos();
    };
  }, []);

  useEffect(() => {
    if (categorias.length && productos.length) {
      const newData = categorias.map((categoria) => {
        const productosCate = productos.filter(
          (producto) => producto.Categoria === categoria.id
        );
        return {
          ...categoria,
          Productos: productosCate,
        };
      });
      setData(newData);
    }
  }, [categorias, productos]);

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent hover:border-Secundario hover:border-b-2">
            <div className="mx-3 my-6 lg:my-0 md:mx-1 lg:mx-3  uppercase md:text-base lg:text-lg font-medium w-full h-full">
              Garden
            </div>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[650px] lg:grid-cols-[.75fr_1fr_1fr] ">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-center items-center rounded-md bg-[#F26B37] p-6 no-underline outline-none focus:shadow-md"
                    href="/Garden"
                    title="Ir a inicio"
                  >
                    <Image
                      src="/Logos/GardenBlaco.svg"
                      width={130}
                      height={60}
                      alt="Logotype"
                      className="object-contain"
                    />
                    {/* <div className="mb-2 mt-4 text-lg font-medium">
                      Nego Garden{" "}
                    </div> */}
                  </Link>

                  {/* 
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components built with Radix UI and
                      Tailwind CSS.
                    </p> */}
                </NavigationMenuLink>
              </li>

              {data?.map((info) => (
                <ListItem
                  key={info?.id}
                  Categoria={info || ""}
                  title={`${info?.NombreCategoria || ""}`}
                  productos={info?.Productos}
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/* <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem> */}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = forwardRef(
  ({ className, title, productos, Categoria, link }, ref) => {
    return (
      <li className="w-full h-full flex">
        <NavigationMenuLink asChild className="w-full h-full">
          <HoverCard className="w-full h-full ">
            <HoverCardTrigger className=" bg-gray-100 p-1  w-full h-full rounded-lg hover:bg-gray-200 focus:bg-gray-200 uppercase">
              {title}
            </HoverCardTrigger>

            {productos?.length > 0 && (
              <HoverCardContent className="grid grid-cols-1 gap-y-1">
                {productos?.map((prod) => (
                  <Link
                    className=" py-1  select-none space-y-1 rounded-md  leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground w-full h-full"
                    key={prod.id}
                    href={`/Producto/${prod.id}?CategoriaId=${Categoria?.id}&ProductoNombre=${prod?.NombreProducto}&CategoriaName=${Categoria?.NombreCategoria}`}
                  >
                    <div className="w-full h-full ">{prod?.NombreProducto}</div>
                  </Link>
                ))}
              </HoverCardContent>
            )}
          </HoverCard>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
