import React, { useState } from "react";
import {
  FormatButton,
  ValidateButton,
  HydrateButton,
  ControlPanelSVG,
} from './components/ControlPanel';
import LeftEditor from './components/LeftEditor';
import RightEditor from './components/RightEditor';

export default function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  return (
    <div className="flex h-screen w-screen bg-black text-white p-6 gap-6 overflow-hidden font-['Helvetica','sans-serif']">
      <LeftEditor
        value={input}
        onChange={setInput}
        error={error}
        success={success}
      />
      <div className="relative flex flex-col items-center justify-center gap-4 w-60 h-full border border-black rounded-lg p-4 shadow-[2px_2px_8px_rgba(0,0,0,0.1)] overflow-hidden">
        <ControlPanelSVG className="absolute inset-0 w-full h-full z-0" />
        <div className="z-10 w-full flex flex-col items-center gap-4">
          <FormatButton
            input={input}
            setOutput={setOutput}
            setError={setError}
          />
          <div className="h-px w-full bg-black/10" />
          <ValidateButton
            input={input}
            setOutput={setOutput}
            setError={setError}
            setSuccess={setSuccess}
          />
          <HydrateButton
            input={input}
            setOutput={setOutput}
            setError={setError}
            setSuccess={setSuccess}
          />
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
