import React, { useEffect, useState } from 'react';
import { analyzeGovernance } from '@/ai/governance';
import { ReviewQueue } from '@/review/queue';
import { extractKPIs, KPI } from '@/mis/kpis';
import { computeMISMetrics, MISMetric } from '@/mis/metrics';
import { docRepo, addDocument, searchDocuments } from '@/governance/docRepository';
import { PageHeader } from '@/components/app-shell';
import { Panel, KpiCard } from '@/components/kit';

export default function AiDashboardPage(): JSX.Element {
  const [governanceSummary, setGovernanceSummary] = useState({ clauses: 0, obligations: 0, risks: 0, summary: '' });
  const [templates] = useState([
    { name: 'Term Sheet', status: 'ready', lastRun: '2026-08-12' },
    { name: 'SHA / SSA', status: 'draft', lastRun: '2026-07-20' },
    { name: 'Cap Table Extraction', status: 'ready', lastRun: '2026-08-01' },
  ]);
  const [reviewItems, setReviewItems] = useState<any[]>([]);
  const [misKpis, setMisKpis] = useState<KPI[]>([]);
  const [misMetrics, setMisMetrics] = useState<MISMetric[]>([]);
  const [documents, setDocuments] = useState<number>(0);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<any | null>(null);

  useEffect(() => {
    const ga = analyzeGovernance({ source: 'demo' });
    setGovernanceSummary({ clauses: ga.clauses?.length ?? 0, obligations: 0, risks: ga.risks?.length ?? 0, summary: ga.summary ?? '' });

    const q = new ReviewQueue();
    q.enqueue({ id: 'rq-1', source: 'Term Sheet', status: 'pending', createdAt: new Date().toISOString() });
    setReviewItems([q.peek()]);

    const raw = { demo: true };
    const kpis = extractKPIs(raw);
    const metrics = computeMISMetrics(raw);
    setMisKpis(kpis.length ? kpis : [{ name: 'Revenue', value: 1250000 }, { name: 'Burn', value: 32000 }, { name: 'Runway (months)', value: 12 }]);
    setMisMetrics(metrics.length ? metrics : [{ name: 'Revenue', value: 1250000 }]);

    // Seed shared in-memory repo if empty
    if (docRepo.search('').length === 0) {
      addDocument({ id: 'd1', name: 'Sample SHA', content: 'Shareholders agreement sample...' });
      addDocument({ id: 'd2', name: 'Cap Table 2026', content: 'Cap table export CSV content' });
      addDocument({ id: 'd3', name: 'Board Minutes 2026-06', content: 'Board discussed valuation and approvals.' });
    }
    setDocuments(docRepo.search('').length);
  }, []);

  return (
    <div>
      <PageHeader
        title="AI Pipeline & Governance"
        subtitle="Presentation view: AI templates, extraction, governance analysis, MIS KPIs and review queue (demo data)."
      />

      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-8">
        <KpiCard label="Clauses Extracted" value={String(governanceSummary.clauses)} sub="Detected by AI" />
        <KpiCard label="Obligations" value={String(governanceSummary.obligations)} sub="Action items tracked" />
        <KpiCard label="In Review" value={String(reviewItems.length)} sub="Queued for human check" />
        <KpiCard label="Documents" value={String(documents)} sub="In repository" />
      </div>

      <div className="mb-4 grid gap-4 lg:grid-cols-3">
        <Panel title="AI Templates & Pipelines" subtitle="Classification and extraction templates">
          <ul className="space-y-2 text-[13px]">
            {templates.map((t) => (
              <li key={t.name} className="flex items-center justify-between">
                <span className="text-foreground">{t.name}</span>
                <span className="text-[12px] text-muted-foreground">{t.status} • last run {t.lastRun}</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Cross-validation & Review Queue" subtitle="Human-in-the-loop validation">
          <ul className="space-y-2 text-[13px]">
            {reviewItems.map((r) => (
              <li key={r?.id} className="flex items-center justify-between">
                <span>{r?.source}</span>
                <span className="text-[12px] text-muted-foreground">{r?.status}</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="MIS KPIs" subtitle="Extracted KPIs and metrics" className="xl:col-span-1">
          <ul className="space-y-2 text-[13px]">
            {misKpis.map((k) => (
              <li key={k.name} className="flex items-center justify-between">
                <span>{k.name}</span>
                <span className="num text-foreground">{k.value}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="mb-4 grid gap-4 lg:grid-cols-2">
        <Panel title="Governance & Compliance" subtitle="Obligation calendar & risk summary">
          <div className="text-[13px] text-muted-foreground">{governanceSummary.summary || 'AI analyses agreements and surfaces risks, reserved matters and obligation timelines.'}</div>
        </Panel>

        <Panel title="Document Repository" subtitle="Search and clause indexing">
          <div className="flex gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const r = searchDocuments(query || '');
                  setResults(r);
                }
              }}
              placeholder="Search documents or clauses"
              className="h-8 w-full rounded-sm border border-input bg-surface px-2 text-[12.5px] outline-none focus:border-ring"
            />
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const r = searchDocuments(query || '');
                  setResults(r);
                }}
                className="inline-flex items-center rounded-sm bg-primary px-3 py-1 text-sm font-medium text-primary-foreground"
              >
                Search
              </button>
              <button
                onClick={() => {
                  const r = searchDocuments('');
                  setResults(r);
                }}
                className="inline-flex items-center rounded-sm border border-input bg-surface px-3 py-1 text-sm text-foreground"
              >
                List all
              </button>
            </div>
          </div>

          <div className="mt-3 max-h-48 overflow-auto text-[13px]">
            {results.length === 0 ? (
              <div className="text-muted-foreground">No documents matched. Try "Sample" or leave blank to list all.</div>
            ) : (
              <ul className="space-y-2">
                {results.map((d) => (
                  <li key={d.id} className="border-b border-border py-2 last:border-0">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{d.name}</div>
                      <button
                        onClick={() => setSelectedDoc(d)}
                        className="text-[12px] text-muted-foreground hover:underline"
                      >
                        Preview
                      </button>
                    </div>
                    <div className="text-[12px] text-muted-foreground truncate">{d.content}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Panel>
      </div>
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-[min(900px,96%)] max-h-[80vh] overflow-auto rounded-lg bg-white p-4">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold">{selectedDoc.name}</h3>
              <button onClick={() => setSelectedDoc(null)} className="text-sm text-muted-foreground">Close</button>
            </div>
            <div className="mt-3 whitespace-pre-wrap text-[13px] text-foreground">{selectedDoc.content}</div>
          </div>
        </div>
      )}
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  border: '1px solid #e5e7eb',
  borderRadius: 12,
  padding: 16,
  background: '#fff',
  display: 'flex',
  flexDirection: 'column',
  minHeight: 140,
};

const sectionTitle: React.CSSProperties = { margin: 0, fontSize: 18 };

const inputStyle: React.CSSProperties = { width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #cbd5e1' };
