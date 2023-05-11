import React, { FunctionComponent, useState, useEffect, useRef } from "react";

const btnLayout = [["7", "8", "9", "SLET"], ["4", "5", "6", "ENTER"], ["1", "2", "3"], ["0"]];

interface Props {
  onClick: (id?: string | number, kolli?: string) => void;
  placeholder?: string;
  label?: string;
}

export const Numpad: FunctionComponent<Props> = ({ onClick, placeholder, label }) => {
  let [number, setNumber] = useState({
    num: "",
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const { key } = e;
      if (key === "Enter") {
        enterClick();
      } else if (key === "Backspace") {
        removeLastClick();
      } else if (/\d/.test(key)) {
        setNumber({
          ...number,
          num: number.num + key,
        });
      }
    };

    inputRef.current?.addEventListener("keydown", handleKeyDown);
    return () => {
      inputRef.current?.removeEventListener("keydown", handleKeyDown);
    };
  }, [number]);

  const numClick = (e: any) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setNumber({
      ...number,
      num: number.num + value,
    });
  };

  const removeLastClick = () => {
    setNumber({
      ...number,
      num: number.num.slice(0, -1),
    });
  };

  const enterClick = () => {
    if (number.num.length == 0) {
      alert("Værdi mangler");
      return;
    }
    onClick(number.num);
  };

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
      <input
        type="number"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={number.num}
        required
        placeholder={placeholder}
        ref={inputRef}
      />
      <div className="grid grid-cols-4 text-black text-md text-center font-bold leading-6 pt-4 gap-2">
        {btnLayout.flat().map((btn, i) => {
          return (
            <button
              className={`bg-slate-100 hover:bg-slate-200 p-10 rounded grid place-content-center ${
                btn === "0" ? "col-span-3" : btn === "ENTER" ? "row-span-3" : ""
              }`}
              key={i}
              onClick={btn === "SLET" ? removeLastClick : btn === "ENTER" ? enterClick : numClick}
            >
              {btn}
            </button>
          );
        })}
      </div>
    </div>
  );
};
