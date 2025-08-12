import { Code2, Droplet, Sparkles } from "lucide-react";

const VisualStep1 = () => (
  <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-4">
    <div className="flex w-full items-center gap-2 rounded-lg border border-border bg-muted/50 p-3">
      <Sparkles className="h-5 w-5 text-primary" />
      <span className="text-sm font-medium text-foreground">AI Prompt</span>
    </div>
    <div className="flex w-full items-center gap-2 rounded-lg border border-border bg-muted/50 p-3">
      <Droplet className="h-5 w-5 text-secondary" />
      <span className="text-sm font-medium text-foreground">Color Picker</span>
    </div>
    <div className="flex w-full items-center gap-2 rounded-lg border border-border bg-muted/50 p-3">
      <Code2 className="h-5 w-5 text-accent" />
      <span className="text-sm font-medium text-foreground">From Keywords</span>
    </div>
  </div>
);

export default VisualStep1;