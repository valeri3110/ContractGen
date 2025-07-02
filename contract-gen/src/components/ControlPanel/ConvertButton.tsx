import React from "react";
import { v2ContractPassthroughSchema } from "../../schemas/v2ContractPassthroughSchema";
import { mapV1toV2Contract } from "../../map/mapV1toV2Contract";

interface Props {
  input: string;
  setOutput: (v: string) => void;
  setError: (v: string | null) => void;
}

export default function ConvertButton({ input, setOutput, setError }: Props) {
  const handleClick = () => {
    try {
      const parsedV1Contract = JSON.parse(input);
      const convertedToV2Contract = mapV1toV2Contract(parsedV1Contract);
      v2ContractPassthroughSchema.parse(convertedToV2Contract);
      setOutput(JSON.stringify(convertedToV2Contract, null, 2));
      setError(null);
    } catch (err) {
      setError("❌ " + err);
      setOutput("");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full px-4 py-2 bg-white border border-black text-black uppercase font-semibold text-xs rounded-md hover:bg-gray-100 transition"
    >
      Convert to V2 Contract
      <span className="block text-xs font-normal">(In Development)</span>
    </button>
  );
}