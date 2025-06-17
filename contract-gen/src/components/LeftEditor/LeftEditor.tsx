import React from "react";
import MonacoEditor from "@monaco-editor/react";

interface LeftEditorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
  success?: string | null;
}

const LeftEditor: React.FC<LeftEditorProps> = ({ value, onChange, error, success }) => (
  <div className="relative flex flex-col flex-1 h-full bg-white border border-black rounded-lg p-4 overflow-hidden shadow-[2px_2px_8px_rgba(0,0,0,0.1)]">
    <h2 className="text-lg font-bold mb-2 uppercase tracking-wider text-black">Paste JSON HERE</h2>
    <MonacoEditor
      height="100%"
      defaultLanguage="json"
      value={value}
      onChange={(val) => onChange(val ?? "")}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: "on",
        scrollBeyondLastLine: false,
        wordWrap: "on",
        automaticLayout: true,
      }}
      theme="vs-light"
    />
    {(error || success) && (
      <div className={`
        absolute left-0 bottom-0 w-full max-h-1/3 min-h-[80px] overflow-y-auto z-20
        bg-white border-t border-x border-black rounded-b-lg shadow-lg p-4
        flex items-start
      `}>
        {error && (
          <pre className="text-red-600 font-semibold whitespace-pre-wrap break-words m-0">{error}</pre>
        )}
        {success && (
          <pre className="text-green-600 font-semibold whitespace-pre-wrap break-words m-0">{success}</pre>
        )}
      </div>
    )}
  </div>
);

export default LeftEditor;