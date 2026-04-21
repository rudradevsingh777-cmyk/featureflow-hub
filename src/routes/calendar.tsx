import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchTasks } from "@/lib/api";

export const Route = createFileRoute("/calendar")({
  component: CalendarPage,
});

function CalendarPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    fetchTasks().then((data) => {
      setTasks(data ?? []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const monthName = currentDate.toLocaleString("default", { month: "long", year: "numeric" });
  const today = new Date();

  const days = Array.from({ length: 42 }, (_, i) => {
    const dayNum = i - firstDay + 1;
    return dayNum >= 1 && dayNum <= daysInMonth ? dayNum : null;
  });

  const getTasksForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return tasks.filter((t: any) => t.due_date === dateStr);
  };

  if (loading) {
    return <div className="flex h-96 items-center justify-center"><div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>;
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader title="Calendar" description="View tasks by due date." />
      <div className="rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))} className="rounded-md p-1 hover:bg-accent"><ChevronLeft className="h-4 w-4" /></button>
          <span className="text-sm font-semibold">{monthName}</span>
          <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))} className="rounded-md p-1 hover:bg-accent"><ChevronRight className="h-4 w-4" /></button>
        </div>
        <div className="grid grid-cols-7">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="border-b border-border px-2 py-2 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{d}</div>
          ))}
          {days.map((day, i) => {
            const dayTasks = day ? getTasksForDay(day) : [];
            const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            return (
              <div key={i} className={`min-h-[90px] border-b border-r border-border p-1.5 ${!day ? "bg-surface/50" : "hover:bg-accent/30"}`}>
                {day && (
                  <>
                    <div className={`mb-1 inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-medium ${isToday ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>{day}</div>
                    {dayTasks.slice(0, 2).map((t: any) => (
                      <div key={t.id} className="mb-0.5 truncate rounded bg-primary/10 px-1 py-0.5 text-[9px] text-primary">{t.title}</div>
                    ))}
                    {dayTasks.length > 2 && <div className="text-[9px] text-muted-foreground">+{dayTasks.length - 2} more</div>}
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
