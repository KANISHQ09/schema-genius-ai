import { Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Index {
  collection: string;
  fields: string;
  type: string;
  reasoning: string;
}

interface IndexRecommendationsProps {
  indexes: Index[];
}

export function IndexRecommendations({ indexes }: IndexRecommendationsProps) {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-foreground">Recommended Indexes</h3>
      {indexes.map((idx, i) => {
        const command = `db.${idx.collection}.createIndex(${idx.fields})`;
        return (
          <Card key={i} className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-base">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  <span className="font-mono text-sm">{idx.collection}</span>
                </div>
                <Badge variant="secondary" className="text-xs font-mono">
                  {idx.type}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex-1 overflow-x-auto rounded bg-secondary/50 px-3 py-2">
                  <code className="font-mono text-xs text-foreground whitespace-nowrap">
                    {command}
                  </code>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 shrink-0"
                  onClick={() => handleCopy(command, i)}
                >
                  {copiedIdx === i ? (
                    <Check className="h-3.5 w-3.5 text-primary" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">{idx.reasoning}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
