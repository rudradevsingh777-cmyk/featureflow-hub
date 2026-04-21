import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { Construction } from "lucide-react";

export const Route = createFileRoute("/goals")({
  component: () => (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader title="Goals" description="Track OKRs and key results." />
      <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card py-20">
        <Construction className="h-10 w-10 text-muted-foreground" />
        <h2 className="mt-4 text-lg font-semibold">Coming Soon</h2>
        <p className="mt-1 text-sm text-muted-foreground">This feature is under development.</p>
      </div>
    </motion.div>
  ),
});
