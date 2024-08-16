function TitleColor({ title, ColorMarca = "" }) {
  return (
    <section
      style={{
        backgroundColor: ColorMarca || "black",
      }}
    >
      <div className="py-7 flex h-full w-full items-center justify-center  mx-auto px-8 lg:w-full bg-black bg-opacity-50">
        <div className="max-w-2xl text-center">
          <h1 className=" py-28 text-white lg:text-6xl font-semibold uppercase">
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}

export default TitleColor;
