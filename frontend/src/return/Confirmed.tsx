import React, { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ReturnConfirmed: FunctionComponent = () => {
  const Navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => Navigate("/"), 20000);
  }, []);

  return (
    <div className="pt-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl mt-10 mb-10">Tak for din retur</h1>
      <ol type="1">
        <li className="text-2xl">1. Sæt en label på hver kolli du har.</li>
        <li className="text-2xl">2. Placere dem i returområet. (Kasse/Palle)</li>
      </ol>
      <p className="text-2xl mt-8">
        Der er nu sendt en kvittering på din indlevering til din mail og inden for 24 timer vil vi behandle din
        retursag.
      </p>
    </div>
  );
};
