import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Collection {
  name: string;
  schema: string;
  mongoose_model?: string;
}

interface SchemaOutputProps {
  collections: Collection[];
}

export function SchemaOutput({ collections }: SchemaOutputProps) {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const formatJSONSchema = (code: string) => {
    if (!code) return "";
    let text = code.replace(/\\n/g, '\n').replace(/\\"/g, '"');
    
    try {
      if (text.startsWith('"') && text.endsWith('"')) {
        text = JSON.parse(text);
      }
      const parsed = typeof text === 'string' ? JSON.parse(text) : text;
      return JSON.stringify(parsed, null, 2);
    } catch (e) {
      if (!text.includes('\n')) {
        return text
          .replace(/{\s*/g, '{\n  ')
          .replace(/,\s*/g, ',\n  ')
          .replace(/\s*}/g, '\n}');
      }
      return text;
    }
  };

  const formatMongooseCode = (code: string) => {
    if (!code) return "";
    let text = code.replace(/\\n/g, '\n');
    
    if (text.split('\n').length <= 2) {
      text = text
        .replace(/;/g, ';\n\n')
        .replace(/{/g, '{\n  ')
        .replace(/(?<!\s)}/g, '\n}')
        .replace(/, /g, ',\n  ')
        .trim();
    }
    return text;
  };

  return (
    <div className="space-y-6">
      <h3 className="text-base font-medium text-foreground">Generated Collections</h3>
      {collections.map((col, i) => {
        const formattedSchema = formatJSONSchema(col.schema);
        const formattedMongoose = col.mongoose_model ? formatMongooseCode(col.mongoose_model) : "";
        
        return (
          <div key={i} className="rounded-lg border border-border overflow-hidden bg-[#1E1E1E] shadow-sm">
            
            {/* --- JSON SCHEMA HEADER --- */}
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 bg-black/40">
              <span className="font-mono text-base font-semibold text-primary">{col.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(formattedSchema, i)}
                className="h-8 gap-1.5 text-xs text-gray-400 hover:text-white hover:bg-white/10"
              >
                {copiedIdx === i ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                {copiedIdx === i ? "Copied" : "Copy"}
              </Button>
            </div>
            
            {/* --- JSON SCHEMA CODE BLOCK --- */}
            <div>
              <SyntaxHighlighter
                language="json"
                style={vscDarkPlus}
                // customStyle controls the outer <pre> wrapper box
                customStyle={{ margin: 0, padding: '1.5rem', background: 'transparent' }}
                // codeTagProps forces the inner syntax tokens to adopt this massive font size
                codeTagProps={{ style: { fontSize: '15px', lineHeight: '1.7', fontFamily: 'monospace' } }}
              >
                {formattedSchema}
              </SyntaxHighlighter>
            </div>
            
            {formattedMongoose && (
              <>
                {/* --- MONGOOSE MODEL HEADER --- */}
                <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 bg-black/40">
                  <span className="font-mono text-base font-medium text-gray-300">Mongoose Model</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(formattedMongoose, i + 1000)}
                    className="h-8 gap-1.5 text-xs text-gray-400 hover:text-white hover:bg-white/10"
                  >
                    {copiedIdx === i + 1000 ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                    {copiedIdx === i + 1000 ? "Copied" : "Copy"}
                  </Button>
                </div>
                
                {/* --- MONGOOSE MODEL CODE BLOCK --- */}
                <div className="border-t border-white/5">
                  <SyntaxHighlighter
                    language="javascript"
                    style={vscDarkPlus}
                    customStyle={{ margin: 0, padding: '1.5rem', background: 'transparent' }}
                    // Forcing the inner text size
                    codeTagProps={{ style: { fontSize: '15px', lineHeight: '1.7', fontFamily: 'monospace' } }}
                  >
                    {formattedMongoose}
                  </SyntaxHighlighter>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}