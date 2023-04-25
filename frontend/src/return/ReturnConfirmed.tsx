import React, { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Numpad } from "../shared/Numpad";

export const ReturnConfirmed: FunctionComponent = () => {
  return (
    <div className="pt-4 flex flex-col items-center justify-center">
      <ol type="1">
        <li className="text-2xl">1. Sæt en label på hver kolli du har.</li>
        <li className="text-2xl">
          2. Placere dem i returområet. (Kasse/Palle)
        </li>
      </ol>
      <p className="text-2xl mt-8">
        Der er nu sendt en kvittering på din indlevering til din mail og inden
        for 24 timer vil vi behandle din retursag.
      </p>
    </div>
  );
};
