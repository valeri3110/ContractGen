import React from "react";

interface LeftEditorProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string | null;
}

const LeftEditor: React.FC<LeftEditorProps> = ({ value, onChange, error }) => (
  <div className="flex flex-col flex-1 h-full bg-white border border-black rounded-lg p-4 overflow-hidden shadow-[2px_2px_8px_rgba(0,0,0,0.1)]">
    <h2 className="text-lg font-bold mb-2 uppercase tracking-wider text-black">Paste JSON</h2>
    <textarea
      value={value}
      onChange={onChange}
      placeholder="Enter JSON here..."
      className="flex-1 w-full p-3 rounded-md border border-gray-300 bg-[#fcfcfc] text-black font-mono text-sm resize-none overflow-auto focus:outline-none focus:ring-2 focus:ring-black/30"
    />
    {error && <p className="text-red-600 mt-2 font-semibold">{error}</p>}
  </div>
);

export default LeftEditor;