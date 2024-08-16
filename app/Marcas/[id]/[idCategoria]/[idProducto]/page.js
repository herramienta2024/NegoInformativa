const Producto = ({
  params: { id, idCategoria, idProducto },
  searchParams: { NombreCategoria },
}) => {
  console.log(id, idCategoria, idProducto, NombreCategoria);

  return <div>Producto</div>;
};

export default Producto;
