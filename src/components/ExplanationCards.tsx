import { Lightbulb, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Explanation {
  title: string;
  decision: string;
  reasoning: string;
  alternatives?: string;
}

interface ExplanationCardsProps {
  explanations: Explanation[];
}

export function ExplanationCards({ explanations }: ExplanationCardsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-foreground">Design Decisions</h3>
      {explanations.map((exp, i) => (
        <Card key={i} className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Lightbulb className="h-4 w-4 text-primary" />
              {exp.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <div className="mb-1 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary">
                <ArrowRight className="h-3 w-3" /> Decision
              </div>
              <p className="text-foreground/90">{exp.decision}</p>
            </div>
            <div>
              <div className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Reasoning
              </div>
              <p className="text-muted-foreground">{exp.reasoning}</p>
            </div>
            {exp.alternatives && (
              <div>
                <div className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Alternatives Considered
                </div>
                <p className="text-muted-foreground/80">{exp.alternatives}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
