import React, { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Numpad } from "../shared/Numpad";
import axios from "axios";

export const Return: FunctionComponent = () => {
  const navigate = useNavigate();

  const x = (id: number) => {
    axios
      .get(`http://localhost:8000/order/${id}`)
      .then((res) => {
        navigate("/return/kolli", { state: res.data });
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error, "error");
      });
  };

  return (
    <div className="pt-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl mt-10 mb-10">
        Indsats order-nummer og tryk ENTER
      </h1>
      <Numpad
        placeholder={"Indsæt ordrenummer"}
        label={"Order-nummer"}
        onClick={x}
      />
    </div>
  );
};
