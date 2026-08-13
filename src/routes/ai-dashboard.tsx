import { createFileRoute } from "@tanstack/react-router";
import AiDashboardPage from "@/pages/ai-dashboard";

export const Route = createFileRoute("/ai-dashboard")({
  head: () => ({
    meta: [
      { title: "AI Dashboard | Portfolio Intelligence" },
      {
        name: "description",
        content:
          "AI governance, templates, MIS, governance, and document repository dashboard for portfolio intelligence.",
      },
    ],
  }),
  component: AiDashboardPage,
});
