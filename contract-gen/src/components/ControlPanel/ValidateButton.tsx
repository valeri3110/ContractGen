import React from "react";
import { z, ZodSchema } from "zod";

interface Props {
  input: string;
  setOutput: (v: string) => void;
  setError: (v: string | null) => void;
  setSuccess: (v: string | null) => void;
  schema: ZodSchema<any>;
  label?: string;
}

export default function ValidateButton({
  input,
  setOutput,
  setError,
  setSuccess,
  schema,
  label = "Validate",
}: Props) {
  const handleClick = () => {
    try {
      const parsed = JSON.parse(input);
      schema.parse(parsed);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError(null);
      setSuccess("✅ Looks correct to me!");
    } catch (err) {
      setSuccess(null);
      if (err instanceof z.ZodError) {
        const details = err.errors
          .map(e => `• ${e.path.join('.')}: ${e.message}`)
          .join('\n');
        setError(`❌ Schema validation failed:\n${details}`);
      } else if (err instanceof SyntaxError) {
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
      className="w-full px-4 py-2 bg-white border border-black text-black uppercase font-semibold text-xs rounded-md hover:bg-gray-100 transition"
    >
      {label}
    </button>
  );
}