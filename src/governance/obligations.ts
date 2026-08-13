// Obligation tracking scaffold
import type { Clause } from './clauses';

export interface Obligation {
  id: string;
  dueDate?: string;
  description: string;
}

export function mapObligations(clauses: Clause[]): Obligation[] {
  // Placeholder: convert clauses to basic obligations if possible
  return clauses.map((c, idx) => ({ id: `ob-${idx}`, dueDate: undefined, description: c.text || 'Obligation' }));
}
