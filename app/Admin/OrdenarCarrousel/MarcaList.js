"use client";

import Image from "next/image";
import React from "react";
import { useDrag, useDrop } from "react-dnd";

const ItemType = "PRODUCT";

const DraggableProduct = ({ product, index, moveProduct }) => {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      moveProduct(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: "16px",
        marginBottom: "8px",
        backgroundColor: "white",
        border: "1px solid #ccc",
        cursor: "move",
        color: "#000",
      }}
    >
      {/* <img
        src={product?.Imagen ? product?.Imagen : product}
        width={200}
        height={300}
      /> */}
      <Image
        src={product?.Imagen ? product?.Imagen : product}
        width={300}
        height={300}
        alt={product?.Imagen ? product?.Imagen : product}
      />
    </div>
  );
};

const ListMarcasList = ({ ListMarcas, setListMarcas }) => {
  const moveProduct = (fromIndex, toIndex) => {
    const updatedListMarcas = [...ListMarcas];
    const [movedProduct] = updatedListMarcas.splice(fromIndex, 1);
    updatedListMarcas.splice(toIndex, 0, movedProduct);
    setListMarcas(updatedListMarcas);
  };

  return (
    <div className="grid grid-cols-4 gap-3">
      {ListMarcas?.map((product, index) => (
        <DraggableProduct
          key={product.id}
          index={index}
          product={product}
          moveProduct={moveProduct}
        />
      ))}
    </div>
  );
};

export default ListMarcasList;
