import React from "react";

interface Props {
  input: string;
  setOutput: (v: string) => void;
  setError: (v: string | null) => void;
}

export default function FormatButton({ input, setOutput, setError }: Props) {
  const handleClick = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError(null);
    } catch (err) {
      if (err instanceof SyntaxError) {
        setError("❌ Invalid JSON: " + err.message);
      } else {
        setError("❌ Unknown error during validation");
      }
      setOutput("");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full px-4 py-2 bg-black text-white uppercase font-semibold text-xs tracking-wide rounded-md hover:bg-[#333] transition"
    >
      Format JSON
    </button>
  );
}