import { Skeleton } from "@/components/ui/skeleton";
import TitleSection from "../TitleSection";

export default function MarcasSkeleton() {
  return (
    <div className="-mt-[72px] md:-mt-[90px] lg:-mt-[72px] bg-gray-50 w-full h-full">
      <TitleSection
        title={`Cargando ...`}
        image="/Banners/BannersProductos.webp"
      />
      <div className="bg-white p-5 md:p-10 rounded-lg w-full h-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3].map((_, index) => (
          <div
            key={index}
            className="flex w-full max-w-[48rem] flex-row rounded-xl border text-gray-700 shadow-md"
          >
            <div className="relative m-0 w-[15rem] shrink-0 overflow-hidden rounded-xl rounded-r-none bg-clip-border text-gray-700">
              <Skeleton className="h-full w-full object-cover" />
            </div>
            <div className="p-6 flex flex-col space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
