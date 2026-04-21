import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { tasks } from "@/lib/mock-data";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/calendar")({
  component: CalendarPage,
});

function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1)); // April 2026
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const monthName = currentDate.toLocaleString("default", { month: "long", year: "numeric" });

  const days = Array.from({ length: 42 }, (_, i) => {
    const dayNum = i - firstDay + 1;
    if (dayNum < 1 || dayNum > daysInMonth) return null;
    return dayNum;
  });

  const getTasksForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return tasks.filter((t) => t.dueDate === dateStr);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader title="Calendar" description="View tasks by their due dates." />

      <div className="rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <button
            onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
            className="rounded-md p-1 hover:bg-accent"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm font-semibold">{monthName}</span>
          <button
            onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
            className="rounded-md p-1 hover:bg-accent"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-7">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="border-b border-border px-2 py-2 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {d}
            </div>
          ))}
          {days.map((day, i) => {
            const dayTasks = day ? getTasksForDay(day) : [];
            const isToday = day === 21 && month === 3 && year === 2026;
            return (
              <div
                key={i}
                className={`min-h-[90px] border-b border-r border-border p-1.5 ${
                  !day ? "bg-surface/50" : "hover:bg-accent/30"
                }`}
              >
                {day && (
                  <>
                    <div
                      className={`mb-1 inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-medium ${
                        isToday ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {day}
                    </div>
                    {dayTasks.slice(0, 2).map((t) => (
                      <div
                        key={t.id}
                        className="mb-0.5 truncate rounded bg-primary/10 px-1 py-0.5 text-[9px] text-primary"
                      >
                        {t.title}
                      </div>
                    ))}
                    {dayTasks.length > 2 && (
                      <div className="text-[9px] text-muted-foreground">
                        +{dayTasks.length - 2} more
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
