import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Database, Brain, Zap, MessageSquare, Code2, Shield } from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Natural Language Input",
    description: "Describe your app's data needs in plain English. NextCraft understands entities, relationships, and access patterns.",
  },
  {
    icon: Brain,
    title: "AI-Powered Decisions",
    description: "Smart embedding vs. referencing choices based on cardinality, update frequency, and query patterns.",
  },
  {
    icon: Code2,
    title: "Copyable Schemas",
    description: "Get production-ready MongoDB collection schemas and Mongoose models you can paste directly into your project.",
  },
  {
    icon: Zap,
    title: "Index Recommendations",
    description: "Automatic index suggestions based on your described query patterns for optimal read performance.",
  },
  {
    icon: Shield,
    title: "Explainable Reasoning",
    description: "Every design decision comes with a clear explanation of why it was made and what alternatives were considered.",
  },
  {
    icon: Database,
    title: "Iterative Refinement",
    description: "Chat back and forth to refine your schema. Add new entities, change relationships, or adjust for new query patterns.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold text-foreground">
              Next<span className="text-primary">Craft</span>
            </span>
          </div>
          <Link to="/workspace">
            <Button size="sm" className="font-medium">
              Start Designing
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden pt-16">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
          <div className="absolute right-1/4 top-2/3 h-64 w-64 rounded-full bg-accent/5 blur-[100px]" />
        </div>

        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
              <Zap className="h-3.5 w-3.5" />
              AI-Powered Schema Design
            </div>

            <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Design MongoDB Schemas{" "}
              <span className="text-primary glow-text">with AI</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Describe your application in natural language. Get optimized collection structures,
              embedding strategies, and index recommendations — with full explanations.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link to="/workspace">
                <Button size="lg" className="gap-2 px-8 text-base font-semibold glow-primary">
                  <Database className="h-5 w-5" />
                  Start Designing
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Terminal preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-16 max-w-3xl"
          >
            <div className="rounded-lg border border-border bg-card p-1">
              <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
                <div className="h-3 w-3 rounded-full bg-destructive/60" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                <div className="h-3 w-3 rounded-full bg-primary/60" />
                <span className="ml-3 text-xs text-muted-foreground font-mono">nextcraft — schema workspace</span>
              </div>
              <div className="p-5 font-mono text-sm leading-relaxed text-left">
                <p className="text-muted-foreground">
                  <span className="text-primary">→</span> "I'm building an e-commerce app with users, products, orders, and reviews..."
                </p>
                <p className="mt-3 text-muted-foreground/60">
                  <span className="text-accent">✓</span> Generating collections: <span className="text-foreground">users</span>, <span className="text-foreground">products</span>, <span className="text-foreground">orders</span>, <span className="text-foreground">reviews</span>
                </p>
                <p className="text-muted-foreground/60">
                  <span className="text-accent">✓</span> Embedding reviews in products <span className="text-muted-foreground/40">(low cardinality, read-heavy)</span>
                </p>
                <p className="text-muted-foreground/60">
                  <span className="text-accent">✓</span> Referencing orders → users <span className="text-muted-foreground/40">(high cardinality, independent lifecycle)</span>
                </p>
                <p className="text-muted-foreground/60">
                  <span className="text-accent">✓</span> Suggested indexes: <span className="text-foreground">{"{ userId: 1, createdAt: -1 }"}</span>
                </p>
                <span className="inline-block h-4 w-2 animate-pulse-glow bg-primary" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border/50 py-24">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Everything you need for{" "}
              <span className="text-primary">schema design</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From natural language to production-ready MongoDB schemas in seconds.
            </p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={item}
                className="group rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/30 hover:bg-card/80"
              >
                <div className="mb-4 inline-flex rounded-md bg-primary/10 p-2.5 text-primary">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/50 py-20">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-foreground">Ready to design smarter?</h2>
          <p className="mt-3 text-muted-foreground">Stop guessing. Let AI handle the schema complexity.</p>
          <Link to="/workspace" className="mt-8 inline-block">
            <Button size="lg" className="gap-2 px-8 font-semibold glow-primary">
              <Database className="h-5 w-5" />
              Launch Workspace
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-primary" />
            <span>NextCraft</span>
          </div>
          <p>AI-Powered MongoDB Schema Designer</p>
        </div>
      </footer>
    </div>
  );
}
