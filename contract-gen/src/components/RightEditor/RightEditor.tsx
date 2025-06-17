import React from "react";
import Editor from "@monaco-editor/react";

interface RightEditorProps {
  value: string;
}

const RightEditor: React.FC<RightEditorProps> = ({ value }) => (
  <div className="flex flex-col flex-1 h-full bg-white border border-black rounded-lg p-4 overflow-hidden shadow-[2px_2px_8px_rgba(0,0,0,0.1)]">
        <h2 className="text-lg font-bold mb-2 uppercase tracking-wider text-black">YOUR V2 CONTRACT</h2>
        <div className="flex-1 w-full rounded-md overflow-hidden">
          <Editor
            height="100%"
            defaultLanguage="json"
            value={value}
            options={{
              readOnly: true,
              minimap: { enabled: false },
              fontSize: 14,
              scrollBeyondLastLine: false,
              theme: "vs-dark",
              wordWrap: "on",
            }}
          />
        </div>
      </div>
);

export default RightEditor;