"use client";

import { useState } from "react";

export default function QuyDinhPage() {
  const [filteredData, setFilteredData] = useState([]);

  return (
    <>
      {filteredData.length === 0 ? (
        <div className="flex justify-center items-center w-full h-full">
          <p className="uppercase font-light text-lg md:text-2xl text-[var(--color-gray)] text-center">Trống</p>
        </div>
      ) : null}
    </>
  );
}
