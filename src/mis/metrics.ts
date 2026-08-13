// MIS metrics scaffolding
export type MISMetric = {
  name: string;
  value: number;
  timestamp?: string;
  unit?: string;
};

export function computeMISMetrics(data: any): MISMetric[] {
  // Placeholder: return empty metrics for now
  return [];
}
