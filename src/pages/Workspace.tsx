import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Database, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "@/components/ChatMessage";
import { SchemaOutput } from "@/components/SchemaOutput";
import { ExplanationCards } from "@/components/ExplanationCards";
import { IndexRecommendations } from "@/components/IndexRecommendations";
import { useSchemaChat } from "@/hooks/useSchemaChat";

export default function Workspace() {
  const { messages, isLoading, schemaResult, sendMessage } = useSchemaChat();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage(input.trim());
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-border px-4">
        <Link to="/" className="flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          <span className="text-sm font-semibold text-foreground">
            Next<span className="text-primary">Craft</span>
          </span>
        </Link>
        <span className="text-xs text-muted-foreground font-mono">Schema Workspace</span>
      </header>

      {/* Main content: Responsive Stack (Mobile) / Side-by-Side (Desktop) */}
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        
        {/* Top/Left: Chat Panel */}
        <div className="flex h-[45dvh] shrink-0 w-full flex-col border-b border-border md:h-auto md:w-[420px] lg:w-[480px] md:border-b-0 md:border-r">
          <div className="border-b border-border px-4 py-2.5 shrink-0">
            <h2 className="text-sm font-medium text-foreground">Describe Your Application</h2>
            <p className="text-xs text-muted-foreground">Tell me about your entities, relationships, and query patterns</p>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.length === 0 && (
                <div className="py-12 text-center">
                  <Database className="mx-auto mb-4 h-10 w-10 text-muted-foreground/30" />
                  <p className="text-sm text-muted-foreground">
                    Describe your app to get started.
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground/60">
                    Example: "I'm building a blog with users, posts, comments, and tags..."
                  </p>
                </div>
              )}
              {messages.map((msg, i) => (
                <ChatMessage key={i} role={msg.role} content={msg.content} />
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  Analyzing your requirements...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <form onSubmit={handleSubmit} className="border-t border-border p-4 shrink-0 bg-background">
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe your application data model..."
                className="min-h-[60px] resize-none bg-secondary/50 text-sm"
                rows={2}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading}
                className="shrink-0 self-end"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>

        {/* Bottom/Right: Output Panel */}
        <div className="flex flex-1 flex-col overflow-hidden bg-muted/10 md:bg-transparent">
          {!schemaResult ? (
            <div className="flex flex-1 items-center justify-center p-6">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/5 text-primary">
                  <Database className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-medium text-foreground">No Schema Yet</h3>
                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                  Describe your application in the chat panel, and your optimized MongoDB schema will appear here.
                </p>
              </div>
            </div>
          ) : (
            <Tabs defaultValue="schema" className="flex flex-1 flex-col overflow-hidden">
              <div className="border-b border-border px-4 shrink-0 bg-background">
                <TabsList className="h-10 bg-transparent">
                  <TabsTrigger value="schema" className="data-[state=active]:bg-secondary">
                    Schema
                  </TabsTrigger>
                  <TabsTrigger value="explanation" className="data-[state=active]:bg-secondary">
                    Explanation
                  </TabsTrigger>
                  <TabsTrigger value="indexes" className="data-[state=active]:bg-secondary">
                    Indexes
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="schema" className="mt-0 flex-1 overflow-y-auto p-4">
                <SchemaOutput collections={schemaResult.collections} />
              </TabsContent>

              <TabsContent value="explanation" className="mt-0 flex-1 overflow-y-auto p-4">
                <ExplanationCards explanations={schemaResult.explanations} />
              </TabsContent>

              <TabsContent value="indexes" className="mt-0 flex-1 overflow-y-auto p-4">
                <IndexRecommendations indexes={schemaResult.indexes} />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
}