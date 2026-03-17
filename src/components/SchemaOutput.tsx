import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-medium text-foreground">Generated Collections</h3>
      {collections.map((col, i) => (
        <div key={i} className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-border px-4 py-2">
            <span className="font-mono text-sm text-primary">{col.name}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(col.schema, i)}
              className="h-7 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              {copiedIdx === i ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
              {copiedIdx === i ? "Copied" : "Copy"}
            </Button>
          </div>
          <pre className="code-block overflow-x-auto border-0 p-4 text-foreground/90">
            <code>{col.schema}</code>
          </pre>
          {col.mongoose_model && (
            <>
              <div className="flex items-center justify-between border-t border-border px-4 py-2">
                <span className="text-xs text-muted-foreground">Mongoose Model</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(col.mongoose_model!, i + 1000)}
                  className="h-7 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                >
                  {copiedIdx === i + 1000 ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
                  {copiedIdx === i + 1000 ? "Copied" : "Copy"}
                </Button>
              </div>
              <pre className="code-block overflow-x-auto border-0 p-4 text-foreground/90">
                <code>{col.mongoose_model}</code>
              </pre>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
