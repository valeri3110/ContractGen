import React, { useState } from "react";
import { z } from "zod";
import ControlPanelSVG from "./components/ControlPanelSVG";
import LeftEditor from './components/LeftEditor';
import RightEditor from './components/RightEditor';
import { v2ContractPassthroughSchema } from "./schemas/v2ContractPassthroughSchema";
import { v2ContractSchema } from "./schemas/v2ContractSchema";
import { mapV1toV2Contract } from "./map/mapV1toV2Contract";

export default function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFormat = () => {
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

  const handleValidation = () => {
    try {
      const parsed = JSON.parse(input);
      v2ContractSchema.parse(parsed);
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

  const handleConvert = () => {
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
    <div className="flex h-screen w-screen bg-black text-white p-6 gap-6 overflow-hidden font-['Helvetica','sans-serif']">
      <LeftEditor
        value={input}
        onChange={setInput}
        error={error}
        success={success}
      />
      {/* Control Panel */}
      <div className="relative flex flex-col items-center justify-center gap-4 w-60 h-full border border-black rounded-lg p-4 shadow-[2px_2px_8px_rgba(0,0,0,0.1)] overflow-hidden">
        <ControlPanelSVG className="absolute inset-0 w-full h-full z-0" />
        <div className="z-10 w-full flex flex-col items-center gap-4">
          <button
            onClick={handleFormat}
            className="w-full px-4 py-2 bg-black text-white uppercase font-semibold text-xs tracking-wide rounded-md hover:bg-[#333] transition"
          >
            Format JSON
          </button>
          <div className="h-px w-full bg-black/10" />
          <button
            onClick={handleValidation}
            className="w-full px-4 py-2 bg-white border border-black text-black uppercase font-semibold text-xs rounded-md hover:bg-gray-100 transition"
          >
            Validate V2 Contract
          </button>
          <button
            onClick={handleConvert}
            className="w-full px-4 py-2 bg-white border border-black text-black uppercase font-semibold text-xs rounded-md hover:bg-gray-100 transition"
          >
            Convert to V2 Contract
          </button>
          {/* <button className="w-full px-4 py-2 bg-white border border-black text-black uppercase font-semibold text-xs rounded-md hover:bg-gray-100 transition">
            Apply Test Data (Soon)
          </button> */}
          <div className="h-px w-full bg-black/10" />
          <button
            onClick={() => window.open("https://thd.atlassian.net/wiki/spaces/CC/pages/2540208796/CCAPI+V2+Data+Dictionary", "_blank")}
            className="w-full px-4 py-2 bg-black text-white uppercase font-semibold text-xs tracking-wide rounded-md hover:bg-[#333] transition"
          >
            Data Dictionary
          </button>
        </div>
      </div>
      <RightEditor value={output} />
    </div>
  );
}
