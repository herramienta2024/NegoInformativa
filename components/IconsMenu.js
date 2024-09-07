import { MapPinCheckIcon, PhoneCallIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const IconsMenu = ({ setOpenModalSearch }) => {
  return (
    <div className="hidden lg:flex justify-center items-center gap-x-4">
      <SearchIcon className="h-7 w-7 text-white" />
      <MapPinCheckIcon
        onClick={(e) => {
          e.preventDefault();
          setOpenModalSearch(true);
        }}
        className="h-7 w-7 text-white cursor-pointer"
      />

      <Link href={"/Contacto"}>
        <PhoneCallIcon className="h-6 w-6 text-white" />
      </Link>
    </div>
  );
};

export default IconsMenu;
