import { Skeleton } from "@/components/ui/skeleton";

export default function MarcaIdSkeleton() {
  return (
    <main>
      {/* Menú superior */}
      <div className="bg-gray-50 w-full h-20 flex justify-center items-center">
        <Skeleton className="h-12 w-48" />
      </div>

      <div className="bg-gray-50 w-full h-full">
        {/* Carrousel */}
        <div className="mt-4 md:mt-6 lg:mt-8 bg-gray-200 h-72 w-full flex justify-center items-center">
          <Skeleton className="h-full w-full" />
        </div>

        {/* Texto principal */}
        <div className="text-center py-5 bg-gray-100">
          <Skeleton className="h-10 w-3/4 mx-auto mb-4" />
          <Skeleton className="h-8 w-1/2 mx-auto" />

          {/* Productos */}
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300"
              >
                <div className="w-full h-48 bg-gray-200">
                  <Skeleton className="h-full w-full" />
                </div>
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Breadcrumb Section */}
        <div className="container mx-auto my-6 lg:my-5">
          <Skeleton className="h-12 w-full mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-center">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="bg-white p-6 mb-6 shadow rounded-2xl border"
              >
                <Skeleton className="h-40 w-full rounded-2xl mb-4" />
                <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                <Skeleton className="h-4 w-2/3 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
