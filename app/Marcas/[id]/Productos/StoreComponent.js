"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import ComponentProducto from "@/components/ComponentProducto";

export default function StoreComponent({ products, categories, marca }) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [ShowModalProductos, setShowModalProductos] = useState({
    Visible: false,
    Producto: {},
  });

  const productsPerPage = 6;

  // Filter products based on search term (name or code) and category
  const filteredProducts = products.filter(
    (product) =>
      (product?.NombreProducto?.toLowerCase()?.includes(search.toLowerCase()) ||
        product?.ITEM?.toLowerCase()?.includes(search.toLowerCase())) &&
      (selectedCategory === "Todos" || product.Categoria === selectedCategory)
  );

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="container mx-auto p-4">
      {ShowModalProductos?.Visible && (
        // <ModalShowProducto
        //   product={ShowModalProductos?.Producto}
        //   ShowModalProductos={ShowModalProductos}
        //   setShowModalProductos={setShowModalProductos}
        // />

        <ComponentProducto
          ShowModalProductos={ShowModalProductos}
          setShowModalProductos={setShowModalProductos}
          marca={marca}
        />
      )}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Categories Sidebar */}
        <div className="w-full md:w-1/4">
          <h2 className="text-xl font-semibold mb-4">CATEGORÍAS</h2>
          <ul className="space-y-2 uppercase">
            <li>
              <Button
                variant={selectedCategory === "Todos" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedCategory("Todos");
                  setCurrentPage(1);
                }}
              >
                TODOS
              </Button>
            </li>
            {categories.map((category) => (
              <li key={category.id}>
                <Button
                  variant={
                    selectedCategory === category.id ? "default" : "ghost"
                  }
                  className="w-full justify-start uppercase"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedCategory(category.id);
                    setCurrentPage(1);
                  }}
                >
                  {category.NombreCategoria || "CATEGORIA"}
                </Button>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4">
          {/* Search Bar */}
          <div className="mb-6 relative">
            <Input
              type="text"
              placeholder="Buscar por nombre o código..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10"
            />
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {currentProducts.map((product) => {
              const Categoria = categories.find(
                (categoria) => product.Categoria == categoria.id
              );
              return (
                <div
                  key={product.id}
                  className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowModalProductos({
                      Visible: true,
                      Producto: {
                        ...product,
                        Categoria: Categoria,
                      },
                    });
                  }}
                >
                  <img
                    src={product.ImagenesGenerales[0]}
                    alt={product.NombreProducto}
                    className="w-full h-48 object-contain mb-4"
                  />
                  <h3 className="font-bold text-lg">
                    {product?.NombreProducto}
                  </h3>
                  {/* <div className="text-sm text-gray-600 mt-2 flex justify-between items-center gap-x-3 flex-wrap">
  <p> {product.Empresa || ""}</p>
</div> */}

                  <div
                    className="line-clamp-3 mt-1 text-sm text-gray-600 "
                    dangerouslySetInnerHTML={{
                      __html: product?.Description || "",
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          <Pagination className="mt-8">
            <PaginationContent className="flex justify-center flex-wrap">
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage((prev) => Math.max(prev - 1, 1));
                  }}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i + 1}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === i + 1}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(i + 1);
                    }}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
