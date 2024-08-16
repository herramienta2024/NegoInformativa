import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import TitleSection from "@/app/TitleSection";

function ProductSkeleton() {
  return (
    <div className="-mt-[72px] md:-mt-[90px] lg:-mt-[72px] bg-gray-50 w-full h-full">
      <TitleSection
        title={`Cargando ...`}
        image="/Banners/BannersProductos.webp"
      />
      <div className="container mx-auto my-6">
        <Card className="shadow-xl p-4">
          <CardContent className=" ">
            <Breadcrumb>
              <BreadcrumbList className="capitalize">
                <BreadcrumbItem>
                  <Skeleton className="w-40 h-6 rounded-full" />
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <Skeleton className="w-40 h-6 rounded-full" />
                <BreadcrumbSeparator />
                <Skeleton className="w-40 h-6 rounded-full" />
                <BreadcrumbSeparator />
                <Skeleton className="w-40 h-6 rounded-full" />
              </BreadcrumbList>
            </Breadcrumb>
          </CardContent>
          <div className="grid lg:grid-cols-2 gap-3">
            <Skeleton className="w-full h-64 rounded-md" />
            <Skeleton className="w-full h-64 rounded-md" />
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ProductSkeleton;
