// Document repository with clause search scaffold
import type { Clause } from './clauses';

export interface Document {
  id: string;
  name: string;
  type?: string;
  content?: string;
  clauses?: Clause[];
}

export class DocRepository {
  private docs: Document[] = [];

  addDocument(doc: Document): void {
    this.docs.push(doc);
  }

  search(query: string): Document[] {
    const q = query.toLowerCase();
    return this.docs.filter((d) => (d.name + (d.content ?? '')).toLowerCase().includes(q));
  }
}

// Singleton repository for simple in-memory demos. Replace with a persistent store in production.
export const docRepo = new DocRepository();

export function addDocument(doc: Document) {
  return docRepo.addDocument(doc);
}

export function searchDocuments(q: string) {
  return docRepo.search(q);
}

// Auto-load sample docs when available (Vite import.meta.globEager for dev/demo)
try {
  const meta: any = (import.meta as any);
  if (meta && typeof meta.globEager === 'function') {
    const modules = meta.globEager('./sample-docs/*.txt?raw') as Record<string, { default: string }>;
    for (const path in modules) {
      try {
        const mod = modules[path];
        const content = (mod && (mod.default ?? mod)) || '';
        const name = path.split('/').pop() || path;
        docRepo.addDocument({ id: name, name, content, type: 'text' });
      } catch (e) {
        // ignore individual file errors in demo loader
      }
    }
  }
} catch (e) {
  // import.meta may not be available in some runtimes; ignore for demo
}
