import React, { useState } from "react";
import { z } from "zod";
import ControlPanelSVG from "./components/ControlPanelSVG";
import LeftEditor from './components/LeftEditor';
import RightEditor from './components/RightEditor';
import { v2ContractSchema } from "./schemas/v2ContractSchema";

export default function JSONFormatterApp() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input);
      v2ContractSchema.parse(parsed); // throws if invalid
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError(null);
    } catch (err) {
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
    <div className="flex h-screen w-screen bg-black text-white p-6 gap-6 overflow-hidden font-['Helvetica','sans-serif']">
      <LeftEditor value={input} onChange={e => setInput(e.target.value)} error={error} />
      {/* Control Panel */}
      <div className="relative flex flex-col items-center justify-center gap-4 w-40 h-full border border-black rounded-lg p-4 shadow-[2px_2px_8px_rgba(0,0,0,0.1)] overflow-hidden">
        <ControlPanelSVG className="absolute inset-0 w-full h-full z-0" />
        <div className="z-10 w-full flex flex-col items-center gap-4">
          <button
            onClick={handleFormat}
            className="w-full px-4 py-2 bg-black text-white uppercase font-semibold text-xs tracking-wide rounded-md hover:bg-[#333] transition"
          >
            Format JSON
          </button>
          <div className="h-px w-full bg-black/10" />
          <button className="w-full px-4 py-2 bg-white border border-black text-black uppercase font-semibold text-xs rounded-md hover:bg-gray-100 transition">
            *Validate V2 Contract*
          </button>
          <button className="w-full px-4 py-2 bg-white border border-black text-black uppercase font-semibold text-xs rounded-md hover:bg-gray-100 transition">
            *Apply Test Data*
          </button>
          <button className="w-full px-4 py-2 bg-white border border-black text-black uppercase font-semibold text-xs rounded-md hover:bg-gray-100 transition">
            *Convert to V2 Contract*
          </button>
        </div>
      </div>
      <RightEditor value={output}/>
    </div>
  );
}