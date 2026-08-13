// MIS anomalies detection scaffold
import type { MISMetric } from './metrics';

export type Anomaly = {
  metric: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
};

export function detectAnomalies(metrics: MISMetric[]): Anomaly[] {
  // Placeholder: return empty array
  return [];
}
