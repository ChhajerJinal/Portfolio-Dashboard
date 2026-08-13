// Dummy dataset for the portfolio intelligence prototype.
// All monetary amounts are in USD millions unless stated otherwise.

export type Status = "Active" | "Watchlist" | "Concern" | "Realised";
export type RagStatus = "green" | "amber" | "red";

export interface Company {
  id: string;
  name: string;
  sector: string;
  subsector: string;
  geography: string;
  assetClass: string;
  currency: string;
  investmentDate: string;
  round: string;
  instrument: string;
  cost: number;
  fmv: number;
  realised: number;
  ownership: number;
  fullyDiluted: number;
  moic: number;
  irr: number;
  status: Status;
  entityId: string;
  shares: number; // in thousands
  shareClass: string;
  entryValuation: number;
  entryMultiple: string;
  coInvestors: string[];
  kmp: string;
  boardSeat: boolean;
  description: string;
}

export const companies: Company[] = [
  {
    id: "aurex-health",
    name: "Aurex Health",
    sector: "Healthcare",
    subsector: "Diagnostics",
    geography: "India",
    assetClass: "Private Equity",
    currency: "USD",
    investmentDate: "2021-06-14",
    round: "Series B",
    instrument: "CCPS",
    cost: 12.0,
    fmv: 26.4,
    realised: 0,
    ownership: 14.2,
    fullyDiluted: 12.8,
    moic: 2.2,
    irr: 31.2,
    status: "Active",
    entityId: "meridian-spv-i",
    shares: 1420,
    shareClass: "Series B Preferred",
    entryValuation: 84.5,
    entryMultiple: "6.1x Revenue",
    coInvestors: ["Northbridge Capital", "Sequoia Growth", "IFC"],
    kmp: "R. Menon (Partner)",
    boardSeat: true,
    description: "Pan-India network of pathology and radiology diagnostic centres.",
  },
  {
    id: "nimbus-logistics",
    name: "Nimbus Logistics",
    sector: "Industrials",
    subsector: "Supply Chain Tech",
    geography: "Singapore",
    assetClass: "Growth Equity",
    currency: "SGD",
    investmentDate: "2020-02-03",
    round: "Series C",
    instrument: "Equity",
    cost: 18.5,
    fmv: 24.1,
    realised: 4.0,
    ownership: 9.6,
    fullyDiluted: 8.7,
    moic: 1.52,
    irr: 14.8,
    status: "Active",
    entityId: "atlas-holdco",
    shares: 960,
    shareClass: "Ordinary",
    entryValuation: 192.7,
    entryMultiple: "3.4x Revenue",
    coInvestors: ["Temasek Ventures", "GLP Capital"],
    kmp: "S. Iyer (MD)",
    boardSeat: true,
    description: "Cross-border freight orchestration platform across SE Asia.",
  },
  {
    id: "vantage-fintech",
    name: "Vantage Fintech",
    sector: "Financials",
    subsector: "Payments",
    geography: "UAE",
    assetClass: "Venture Capital",
    currency: "AED",
    investmentDate: "2022-09-21",
    round: "Series A",
    instrument: "CCPS",
    cost: 6.0,
    fmv: 15.9,
    realised: 0,
    ownership: 11.8,
    fullyDiluted: 10.5,
    moic: 2.65,
    irr: 44.1,
    status: "Active",
    entityId: "meridian-spv-ii",
    shares: 590,
    shareClass: "Series A Preferred",
    entryValuation: 50.8,
    entryMultiple: "11.2x ARR",
    coInvestors: ["Gulf Ventures", "Mubadala Seed"],
    kmp: "A. Rahman (Principal)",
    boardSeat: true,
    description: "Merchant acquiring and embedded payments across the GCC.",
  },
  {
    id: "terraflow-energy",
    name: "Terraflow Energy",
    sector: "Energy",
    subsector: "Renewables",
    geography: "India",
    assetClass: "Infrastructure",
    currency: "INR",
    investmentDate: "2019-11-08",
    round: "Growth",
    instrument: "Equity",
    cost: 25.0,
    fmv: 31.2,
    realised: 2.5,
    ownership: 22.4,
    fullyDiluted: 21.1,
    moic: 1.35,
    irr: 11.2,
    status: "Active",
    entityId: "atlas-holdco",
    shares: 2240,
    shareClass: "Ordinary",
    entryValuation: 111.6,
    entryMultiple: "9.8x EBITDA",
    coInvestors: ["Clean Energy Partners", "Actis"],
    kmp: "R. Menon (Partner)",
    boardSeat: true,
    description: "Utility-scale solar and hybrid generation assets, 1.4 GW pipeline.",
  },
  {
    id: "helios-foods",
    name: "Helios Foods",
    sector: "Consumer",
    subsector: "Packaged Foods",
    geography: "United Kingdom",
    assetClass: "Private Equity",
    currency: "GBP",
    investmentDate: "2021-03-30",
    round: "Buyout",
    instrument: "Equity",
    cost: 15.0,
    fmv: 13.2,
    realised: 0,
    ownership: 31.0,
    fullyDiluted: 29.4,
    moic: 0.88,
    irr: -5.4,
    status: "Watchlist",
    entityId: "kensington-trust",
    shares: 3100,
    shareClass: "Ordinary A",
    entryValuation: 48.4,
    entryMultiple: "8.2x EBITDA",
    coInvestors: ["Bridgepoint Development"],
    kmp: "C. Whitfield (Director)",
    boardSeat: true,
    description: "Premium chilled ready-meals manufacturer supplying UK grocers.",
  },
  {
    id: "cobalt-cyber",
    name: "Cobalt Cyber",
    sector: "Technology",
    subsector: "Cybersecurity",
    geography: "United States",
    assetClass: "Venture Capital",
    currency: "USD",
    investmentDate: "2021-08-19",
    round: "Series B",
    instrument: "Equity",
    cost: 9.5,
    fmv: 22.8,
    realised: 0,
    ownership: 8.4,
    fullyDiluted: 7.6,
    moic: 2.4,
    irr: 38.6,
    status: "Active",
    entityId: "meridian-spv-ii",
    shares: 840,
    shareClass: "Series B Preferred",
    entryValuation: 113.1,
    entryMultiple: "14.6x ARR",
    coInvestors: ["Lightbay", "Accel"],
    kmp: "D. Novak (Partner)",
    boardSeat: false,
    description: "Identity threat detection and response for mid-market enterprises.",
  },
  {
    id: "meridian-realty",
    name: "Meridian Realty",
    sector: "Real Estate",
    subsector: "Industrial Warehousing",
    geography: "India",
    assetClass: "Real Assets",
    currency: "INR",
    investmentDate: "2018-07-12",
    round: "Pre-IPO",
    instrument: "Equity",
    cost: 20.0,
    fmv: 22.5,
    realised: 6.0,
    ownership: 17.5,
    fullyDiluted: 16.9,
    moic: 1.43,
    irr: 13.0,
    status: "Active",
    entityId: "kensington-trust",
    shares: 1750,
    shareClass: "Ordinary",
    entryValuation: 114.3,
    entryMultiple: "11.0x EBITDA",
    coInvestors: ["Blackstone RE", "Embassy Group"],
    kmp: "S. Iyer (MD)",
    boardSeat: true,
    description: "Grade-A warehousing parks across six logistics corridors.",
  },
  {
    id: "skyline-mobility",
    name: "Skyline Mobility",
    sector: "Consumer",
    subsector: "Urban Mobility",
    geography: "Indonesia",
    assetClass: "Venture Capital",
    currency: "USD",
    investmentDate: "2022-01-25",
    round: "Seed",
    instrument: "CCD",
    cost: 4.0,
    fmv: 1.6,
    realised: 0,
    ownership: 6.2,
    fullyDiluted: 5.4,
    moic: 0.4,
    irr: -22.0,
    status: "Concern",
    entityId: "principal-personal",
    shares: 620,
    shareClass: "Seed Preferred",
    entryValuation: 64.5,
    entryMultiple: "18.0x GMV Take-rate",
    coInvestors: ["East Ventures"],
    kmp: "D. Novak (Partner)",
    boardSeat: false,
    description: "Two-wheeler ride hailing and last-mile delivery in Tier-1 Indonesia.",
  },
  {
    id: "orbit-saas",
    name: "Orbit SaaS",
    sector: "Technology",
    subsector: "Vertical SaaS",
    geography: "United States",
    assetClass: "Growth Equity",
    currency: "USD",
    investmentDate: "2020-10-05",
    round: "Series D",
    instrument: "Equity",
    cost: 14.0,
    fmv: 29.4,
    realised: 0,
    ownership: 7.1,
    fullyDiluted: 6.4,
    moic: 2.1,
    irr: 26.5,
    status: "Active",
    entityId: "atlas-holdco",
    shares: 710,
    shareClass: "Series D Preferred",
    entryValuation: 197.2,
    entryMultiple: "9.4x ARR",
    coInvestors: ["Insight Partners", "Bessemer"],
    kmp: "C. Whitfield (Director)",
    boardSeat: true,
    description: "Practice management software for speciality healthcare clinics.",
  },
  {
    id: "lumen-diagnostics",
    name: "Lumen Diagnostics",
    sector: "Healthcare",
    subsector: "Lab Services",
    geography: "United Kingdom",
    assetClass: "Private Equity",
    currency: "GBP",
    investmentDate: "2017-05-16",
    round: "Series C",
    instrument: "Equity",
    cost: 8.0,
    fmv: 0,
    realised: 21.6,
    ownership: 0,
    fullyDiluted: 0,
    moic: 2.7,
    irr: 33.0,
    status: "Realised",
    entityId: "meridian-spv-i",
    shares: 0,
    shareClass: "Ordinary",
    entryValuation: 61.5,
    entryMultiple: "7.5x EBITDA",
    coInvestors: ["Apposite Capital"],
    kmp: "R. Menon (Partner)",
    boardSeat: false,
    description: "Specialist clinical laboratory group; full exit to strategic buyer (2023).",
  },
];

export const companyById = (id: string) => companies.find((c) => c.id === id);

export interface Transaction {
  id: string;
  companyId: string;
  date: string;
  type: string;
  round: string;
  instrument: string;
  amount: number;
  shares: number; // thousands
  pricePerShare: number; // USD
  shareClass: string;
  ownership: number;
}

export const transactions: Transaction[] = [
  { id: "t1", companyId: "aurex-health", date: "2021-06-14", type: "Primary Investment", round: "Series B", instrument: "CCPS", amount: 8.0, shares: 1000, pricePerShare: 8.0, shareClass: "Series B Preferred", ownership: 11.5 },
  { id: "t2", companyId: "aurex-health", date: "2022-11-02", type: "Follow-on", round: "Series B+", instrument: "CCPS", amount: 3.0, shares: 300, pricePerShare: 10.0, shareClass: "Series B Preferred", ownership: 13.6 },
  { id: "t3", companyId: "aurex-health", date: "2024-04-18", type: "Pro-rata Follow-on", round: "Series C", instrument: "CCPS", amount: 1.0, shares: 120, pricePerShare: 8.33, shareClass: "Series B Preferred", ownership: 14.2 },
  { id: "t4", companyId: "nimbus-logistics", date: "2020-02-03", type: "Primary Investment", round: "Series C", instrument: "Equity", amount: 14.0, shares: 800, pricePerShare: 17.5, shareClass: "Ordinary", ownership: 8.9 },
  { id: "t5", companyId: "nimbus-logistics", date: "2021-09-14", type: "Secondary Purchase", round: "Series C", instrument: "Equity", amount: 4.5, shares: 220, pricePerShare: 20.45, shareClass: "Ordinary", ownership: 11.2 },
  { id: "t6", companyId: "nimbus-logistics", date: "2024-06-30", type: "Partial Exit", round: "Secondary", instrument: "Equity", amount: -4.0, shares: -60, pricePerShare: 66.67, shareClass: "Ordinary", ownership: 9.6 },
  { id: "t7", companyId: "vantage-fintech", date: "2022-09-21", type: "Primary Investment", round: "Series A", instrument: "CCPS", amount: 6.0, shares: 590, pricePerShare: 10.17, shareClass: "Series A Preferred", ownership: 11.8 },
  { id: "t8", companyId: "terraflow-energy", date: "2019-11-08", type: "Primary Investment", round: "Growth", instrument: "Equity", amount: 20.0, shares: 1800, pricePerShare: 11.11, shareClass: "Ordinary", ownership: 20.1 },
  { id: "t9", companyId: "terraflow-energy", date: "2022-03-11", type: "Rights Issue", round: "Growth II", instrument: "Equity", amount: 5.0, shares: 440, pricePerShare: 11.36, shareClass: "Ordinary", ownership: 22.4 },
  { id: "t10", companyId: "terraflow-energy", date: "2024-09-27", type: "Dividend / Distribution", round: "—", instrument: "Equity", amount: -2.5, shares: 0, pricePerShare: 0, shareClass: "Ordinary", ownership: 22.4 },
  { id: "t11", companyId: "helios-foods", date: "2021-03-30", type: "Buyout Equity", round: "Buyout", instrument: "Equity", amount: 15.0, shares: 3100, pricePerShare: 4.84, shareClass: "Ordinary A", ownership: 31.0 },
  { id: "t12", companyId: "cobalt-cyber", date: "2021-08-19", type: "Primary Investment", round: "Series B", instrument: "Equity", amount: 9.5, shares: 840, pricePerShare: 11.31, shareClass: "Series B Preferred", ownership: 8.4 },
  { id: "t13", companyId: "meridian-realty", date: "2018-07-12", type: "Primary Investment", round: "Pre-IPO", instrument: "Equity", amount: 20.0, shares: 1750, pricePerShare: 11.43, shareClass: "Ordinary", ownership: 17.5 },
  { id: "t14", companyId: "meridian-realty", date: "2023-02-20", type: "Dividend / Distribution", round: "—", instrument: "Equity", amount: -6.0, shares: 0, pricePerShare: 0, shareClass: "Ordinary", ownership: 17.5 },
  { id: "t15", companyId: "skyline-mobility", date: "2022-01-25", type: "Primary Investment", round: "Seed", instrument: "CCD", amount: 4.0, shares: 620, pricePerShare: 6.45, shareClass: "Seed Preferred", ownership: 6.2 },
  { id: "t16", companyId: "orbit-saas", date: "2020-10-05", type: "Primary Investment", round: "Series D", instrument: "Equity", amount: 14.0, shares: 710, pricePerShare: 19.72, shareClass: "Series D Preferred", ownership: 7.1 },
  { id: "t17", companyId: "lumen-diagnostics", date: "2017-05-16", type: "Primary Investment", round: "Series C", instrument: "Equity", amount: 8.0, shares: 900, pricePerShare: 8.89, shareClass: "Ordinary", ownership: 13.0 },
  { id: "t18", companyId: "lumen-diagnostics", date: "2023-10-11", type: "Full Exit", round: "Trade Sale", instrument: "Equity", amount: -21.6, shares: -900, pricePerShare: 24.0, shareClass: "Ordinary", ownership: 0 },
];

export interface CapRow {
  holder: string;
  type: "Founder" | "Firm" | "Investor" | "ESOP";
  current: number;
  diluted: number;
}

export interface CapTable {
  companyId: string;
  rows: CapRow[];
  rights: Record<string, string>;
}

const rightsFor = (o: Partial<Record<string, string>>): Record<string, string> => ({
  "Voting Rights": "Yes — as-converted basis",
  "Board Seat": "1 seat",
  "Board Observer": "1 observer",
  KMP: "Nominated CFO approval",
  "Anti-Dilution": "Broad-based weighted average",
  "Pro-Rata / Follow-on": "Yes — full pro-rata",
  "Information Rights": "Monthly MIS + quarterly board pack",
  "Liquidation Preference": "1x non-participating",
  "Drag / Tag": "Tag along; drag at 75% consent",
  "ROFR / ROFO": "ROFR on founder transfers",
  "Lock-in": "36 months from closing",
  "Consent / Reserved Matters": "18 reserved matters",
  "Founder Vesting": "4 years, 1 year cliff",
  "ESOP Dilution": "Pre-money pool top-up",
  ...o,
});

export const capTables: CapTable[] = [
  {
    companyId: "aurex-health",
    rows: [
      { holder: "Founders (2)", type: "Founder", current: 41.5, diluted: 37.8 },
      { holder: "Portfolio Intelligence Platform (Firm)", type: "Firm", current: 14.2, diluted: 12.8 },
      { holder: "Northbridge Capital", type: "Investor", current: 18.6, diluted: 16.9 },
      { holder: "Sequoia Growth", type: "Investor", current: 13.2, diluted: 12.0 },
      { holder: "IFC", type: "Investor", current: 6.5, diluted: 5.9 },
      { holder: "ESOP Pool", type: "ESOP", current: 6.0, diluted: 14.6 },
    ],
    rights: rightsFor({}),
  },
  {
    companyId: "nimbus-logistics",
    rows: [
      { holder: "Founders (3)", type: "Founder", current: 34.0, diluted: 31.2 },
      { holder: "Portfolio Intelligence Platform (Firm)", type: "Firm", current: 9.6, diluted: 8.7 },
      { holder: "Temasek Ventures", type: "Investor", current: 22.4, diluted: 20.5 },
      { holder: "GLP Capital", type: "Investor", current: 17.0, diluted: 15.6 },
      { holder: "Angels & Others", type: "Investor", current: 9.0, diluted: 8.2 },
      { holder: "ESOP Pool", type: "ESOP", current: 8.0, diluted: 15.8 },
    ],
    rights: rightsFor({ "Liquidation Preference": "1x participating (capped 2x)", "Lock-in": "Expired" }),
  },
  {
    companyId: "vantage-fintech",
    rows: [
      { holder: "Founders (2)", type: "Founder", current: 52.2, diluted: 47.0 },
      { holder: "Portfolio Intelligence Platform (Firm)", type: "Firm", current: 11.8, diluted: 10.5 },
      { holder: "Gulf Ventures", type: "Investor", current: 16.0, diluted: 14.4 },
      { holder: "Mubadala Seed", type: "Investor", current: 10.0, diluted: 9.0 },
      { holder: "ESOP Pool", type: "ESOP", current: 10.0, diluted: 19.1 },
    ],
    rights: rightsFor({ "Board Seat": "1 seat", "Anti-Dilution": "Full ratchet (Series A only)" }),
  },
  {
    companyId: "terraflow-energy",
    rows: [
      { holder: "Promoter Group", type: "Founder", current: 46.0, diluted: 44.1 },
      { holder: "Portfolio Intelligence Platform (Firm)", type: "Firm", current: 22.4, diluted: 21.1 },
      { holder: "Clean Energy Partners", type: "Investor", current: 15.6, diluted: 14.9 },
      { holder: "Actis", type: "Investor", current: 12.0, diluted: 11.5 },
      { holder: "ESOP Pool", type: "ESOP", current: 4.0, diluted: 8.4 },
    ],
    rights: rightsFor({ "Board Seat": "2 seats", "Liquidation Preference": "1x non-participating" }),
  },
  {
    companyId: "helios-foods",
    rows: [
      { holder: "Management Team", type: "Founder", current: 24.0, diluted: 22.1 },
      { holder: "Portfolio Intelligence Platform (Firm)", type: "Firm", current: 31.0, diluted: 29.4 },
      { holder: "Bridgepoint Development", type: "Investor", current: 38.0, diluted: 36.0 },
      { holder: "ESOP / MIP Pool", type: "ESOP", current: 7.0, diluted: 12.5 },
    ],
    rights: rightsFor({ "Drag / Tag": "Drag at 66% consent", "Founder Vesting": "MIP vesting over 5 years" }),
  },
  {
    companyId: "cobalt-cyber",
    rows: [
      { holder: "Founders (2)", type: "Founder", current: 38.6, diluted: 34.8 },
      { holder: "Portfolio Intelligence Platform (Firm)", type: "Firm", current: 8.4, diluted: 7.6 },
      { holder: "Accel", type: "Investor", current: 21.0, diluted: 19.0 },
      { holder: "Lightbay", type: "Investor", current: 17.0, diluted: 15.4 },
      { holder: "Angels & Others", type: "Investor", current: 4.0, diluted: 3.6 },
      { holder: "ESOP Pool", type: "ESOP", current: 11.0, diluted: 19.6 },
    ],
    rights: rightsFor({ "Board Seat": "None", "Board Observer": "1 observer", KMP: "No" }),
  },
  {
    companyId: "meridian-realty",
    rows: [
      { holder: "Promoter Group", type: "Founder", current: 44.5, diluted: 43.0 },
      { holder: "Portfolio Intelligence Platform (Firm)", type: "Firm", current: 17.5, diluted: 16.9 },
      { holder: "Blackstone RE", type: "Investor", current: 24.0, diluted: 23.2 },
      { holder: "Embassy Group", type: "Investor", current: 11.0, diluted: 10.6 },
      { holder: "ESOP Pool", type: "ESOP", current: 3.0, diluted: 6.3 },
    ],
    rights: rightsFor({ "Lock-in": "IPO lock-in 6 months post listing" }),
  },
  {
    companyId: "skyline-mobility",
    rows: [
      { holder: "Founders (3)", type: "Founder", current: 61.8, diluted: 55.4 },
      { holder: "Portfolio Intelligence Platform (Firm)", type: "Firm", current: 6.2, diluted: 5.4 },
      { holder: "East Ventures", type: "Investor", current: 20.0, diluted: 17.9 },
      { holder: "Angels & Others", type: "Investor", current: 4.0, diluted: 3.6 },
      { holder: "ESOP Pool", type: "ESOP", current: 8.0, diluted: 17.7 },
    ],
    rights: rightsFor({ "Board Seat": "None", "Pro-Rata / Follow-on": "Yes — under review", "Information Rights": "Quarterly only (overdue)" }),
  },
  {
    companyId: "orbit-saas",
    rows: [
      { holder: "Founders (2)", type: "Founder", current: 26.9, diluted: 24.2 },
      { holder: "Portfolio Intelligence Platform (Firm)", type: "Firm", current: 7.1, diluted: 6.4 },
      { holder: "Insight Partners", type: "Investor", current: 28.0, diluted: 25.2 },
      { holder: "Bessemer", type: "Investor", current: 22.0, diluted: 19.8 },
      { holder: "Angels & Others", type: "Investor", current: 6.0, diluted: 5.4 },
      { holder: "ESOP Pool", type: "ESOP", current: 10.0, diluted: 19.0 },
    ],
    rights: rightsFor({ "Liquidation Preference": "1x non-participating, senior" }),
  },
];

export const capTableFor = (id: string) => capTables.find((c) => c.companyId === id);

export interface Entity {
  id: string;
  name: string;
  type: "SPV" | "Trust" | "HoldCo" | "Personal";
  jurisdiction: string;
  formed: string;
}

export const entities: Entity[] = [
  { id: "meridian-spv-i", name: "Meridian SPV I", type: "SPV", jurisdiction: "Singapore", formed: "2017-02-01" },
  { id: "meridian-spv-ii", name: "Meridian SPV II", type: "SPV", jurisdiction: "DIFC, UAE", formed: "2021-05-12" },
  { id: "atlas-holdco", name: "Atlas HoldCo Pte Ltd", type: "HoldCo", jurisdiction: "Singapore", formed: "2016-08-22" },
  { id: "kensington-trust", name: "Kensington Family Trust", type: "Trust", jurisdiction: "Jersey", formed: "2014-04-09" },
  { id: "principal-personal", name: "Principal — Personal Account", type: "Personal", jurisdiction: "India", formed: "2012-01-01" },
];

export interface KpiPoint {
  metric: string;
  group: "Financial" | "Operational";
  unit: string;
  current: number | string;
  previous: number | string;
  budget?: number | string;
  trend: "up" | "down" | "flat";
  rag: RagStatus;
}

export const monitoring: Record<string, KpiPoint[]> = {
  "aurex-health": [
    { metric: "Revenue (LTM)", group: "Financial", unit: "$M", current: 21.4, previous: 16.8, budget: 20.5, trend: "up", rag: "green" },
    { metric: "Revenue Growth", group: "Financial", unit: "%", current: 27.4, previous: 22.1, budget: 22.0, trend: "up", rag: "green" },
    { metric: "Gross Margin", group: "Financial", unit: "%", current: 58.2, previous: 56.9, budget: 57.0, trend: "up", rag: "green" },
    { metric: "EBITDA", group: "Financial", unit: "$M", current: 3.9, previous: 2.4, budget: 3.6, trend: "up", rag: "green" },
    { metric: "EBITDA Margin", group: "Financial", unit: "%", current: 18.2, previous: 14.3, budget: 17.6, trend: "up", rag: "green" },
    { metric: "Cash", group: "Financial", unit: "$M", current: 9.1, previous: 10.4, trend: "down", rag: "amber" },
    { metric: "Monthly Burn", group: "Financial", unit: "$M", current: 0.32, previous: 0.28, trend: "up", rag: "amber" },
    { metric: "Cash Runway", group: "Financial", unit: "months", current: 28, previous: 37, trend: "down", rag: "green" },
    { metric: "Working Capital", group: "Financial", unit: "$M", current: 6.2, previous: 5.4, trend: "up", rag: "green" },
    { metric: "Customer Count", group: "Operational", unit: "#", current: "1.24M", previous: "0.98M", trend: "up", rag: "green" },
    { metric: "NPS", group: "Operational", unit: "score", current: 61, previous: 57, trend: "up", rag: "green" },
    { metric: "Headcount", group: "Operational", unit: "#", current: 1840, previous: 1620, trend: "up", rag: "green" },
    { metric: "Geographic Expansion", group: "Operational", unit: "cities", current: 34, previous: 28, trend: "up", rag: "green" },
    { metric: "Product Milestones", group: "Operational", unit: "on plan", current: "7 / 8", previous: "6 / 8", trend: "up", rag: "green" },
  ],
  "helios-foods": [
    { metric: "Revenue (LTM)", group: "Financial", unit: "$M", current: 44.6, previous: 47.9, budget: 51.0, trend: "down", rag: "red" },
    { metric: "Revenue Growth", group: "Financial", unit: "%", current: -6.9, previous: 2.4, budget: 6.5, trend: "down", rag: "red" },
    { metric: "Gross Margin", group: "Financial", unit: "%", current: 24.1, previous: 27.6, budget: 28.0, trend: "down", rag: "red" },
    { metric: "EBITDA", group: "Financial", unit: "$M", current: 2.1, previous: 4.3, budget: 4.9, trend: "down", rag: "red" },
    { metric: "EBITDA Margin", group: "Financial", unit: "%", current: 4.7, previous: 9.0, budget: 9.6, trend: "down", rag: "red" },
    { metric: "Cash", group: "Financial", unit: "$M", current: 3.4, previous: 5.9, trend: "down", rag: "amber" },
    { metric: "Monthly Burn", group: "Financial", unit: "$M", current: 0.21, previous: 0.09, trend: "up", rag: "amber" },
    { metric: "Cash Runway", group: "Financial", unit: "months", current: 16, previous: 30, trend: "down", rag: "amber" },
    { metric: "Working Capital", group: "Financial", unit: "$M", current: 4.1, previous: 6.8, trend: "down", rag: "amber" },
    { metric: "Customer Count", group: "Operational", unit: "accounts", current: 12, previous: 14, trend: "down", rag: "red" },
    { metric: "Churn", group: "Operational", unit: "%", current: 14.3, previous: 6.7, trend: "up", rag: "red" },
    { metric: "Headcount", group: "Operational", unit: "#", current: 610, previous: 664, trend: "down", rag: "amber" },
    { metric: "Sales Pipeline", group: "Operational", unit: "$M", current: 8.2, previous: 12.6, trend: "down", rag: "red" },
    { metric: "Partnerships", group: "Operational", unit: "#", current: 4, previous: 5, trend: "down", rag: "amber" },
  ],
  "vantage-fintech": [
    { metric: "ARR", group: "Financial", unit: "$M", current: 9.8, previous: 5.6, budget: 8.9, trend: "up", rag: "green" },
    { metric: "Revenue Growth", group: "Financial", unit: "%", current: 75.0, previous: 68.0, budget: 60.0, trend: "up", rag: "green" },
    { metric: "Gross Margin", group: "Financial", unit: "%", current: 71.4, previous: 66.2, budget: 68.0, trend: "up", rag: "green" },
    { metric: "EBITDA", group: "Financial", unit: "$M", current: -1.9, previous: -2.6, budget: -2.2, trend: "up", rag: "amber" },
    { metric: "EBITDA Margin", group: "Financial", unit: "%", current: -19.4, previous: -46.4, trend: "up", rag: "amber" },
    { metric: "Cash", group: "Financial", unit: "$M", current: 7.6, previous: 9.4, trend: "down", rag: "green" },
    { metric: "Monthly Burn", group: "Financial", unit: "$M", current: 0.19, previous: 0.24, trend: "down", rag: "green" },
    { metric: "Cash Runway", group: "Financial", unit: "months", current: 40, previous: 39, trend: "up", rag: "green" },
    { metric: "CAC", group: "Financial", unit: "$", current: 412, previous: 486, trend: "down", rag: "green" },
    { metric: "LTV", group: "Financial", unit: "$", current: 3160, previous: 2740, trend: "up", rag: "green" },
    { metric: "GMV (annualised)", group: "Operational", unit: "$M", current: 640, previous: 388, trend: "up", rag: "green" },
    { metric: "Customer Count", group: "Operational", unit: "merchants", current: 8420, previous: 5310, trend: "up", rag: "green" },
    { metric: "Churn", group: "Operational", unit: "%", current: 3.1, previous: 4.4, trend: "down", rag: "green" },
    { metric: "Headcount", group: "Operational", unit: "#", current: 184, previous: 131, trend: "up", rag: "green" },
  ],
  "skyline-mobility": [
    { metric: "Revenue (LTM)", group: "Financial", unit: "$M", current: 3.1, previous: 3.6, budget: 6.4, trend: "down", rag: "red" },
    { metric: "Revenue Growth", group: "Financial", unit: "%", current: -13.9, previous: 41.0, budget: 78.0, trend: "down", rag: "red" },
    { metric: "Gross Margin", group: "Financial", unit: "%", current: 11.2, previous: 15.6, budget: 22.0, trend: "down", rag: "red" },
    { metric: "EBITDA", group: "Financial", unit: "$M", current: -4.2, previous: -3.6, budget: -2.8, trend: "down", rag: "red" },
    { metric: "Cash", group: "Financial", unit: "$M", current: 1.1, previous: 2.9, trend: "down", rag: "red" },
    { metric: "Monthly Burn", group: "Financial", unit: "$M", current: 0.29, previous: 0.24, trend: "up", rag: "red" },
    { metric: "Cash Runway", group: "Financial", unit: "months", current: 4, previous: 12, trend: "down", rag: "red" },
    { metric: "CAC", group: "Financial", unit: "$", current: 18.4, previous: 12.1, trend: "up", rag: "red" },
    { metric: "LTV", group: "Financial", unit: "$", current: 26.0, previous: 34.5, trend: "down", rag: "red" },
    { metric: "GMV (annualised)", group: "Operational", unit: "$M", current: 41, previous: 47, trend: "down", rag: "red" },
    { metric: "Orders / month", group: "Operational", unit: "k", current: 780, previous: 910, trend: "down", rag: "red" },
    { metric: "Churn", group: "Operational", unit: "%", current: 19.8, previous: 13.2, trend: "up", rag: "red" },
    { metric: "Headcount", group: "Operational", unit: "#", current: 96, previous: 148, trend: "down", rag: "amber" },
  ],
  "nimbus-logistics": [
    { metric: "Revenue (LTM)", group: "Financial", unit: "$M", current: 96.2, previous: 82.4, budget: 94.0, trend: "up", rag: "green" },
    { metric: "Revenue Growth", group: "Financial", unit: "%", current: 16.7, previous: 19.4, budget: 14.0, trend: "down", rag: "green" },
    { metric: "Gross Margin", group: "Financial", unit: "%", current: 21.6, previous: 20.4, budget: 21.0, trend: "up", rag: "green" },
    { metric: "EBITDA", group: "Financial", unit: "$M", current: 8.4, previous: 6.1, budget: 8.0, trend: "up", rag: "green" },
    { metric: "EBITDA Margin", group: "Financial", unit: "%", current: 8.7, previous: 7.4, budget: 8.5, trend: "up", rag: "green" },
    { metric: "Cash", group: "Financial", unit: "$M", current: 14.9, previous: 13.1, trend: "up", rag: "green" },
    { metric: "Cash Runway", group: "Financial", unit: "months", current: 36, previous: 33, trend: "up", rag: "green" },
    { metric: "Working Capital", group: "Financial", unit: "$M", current: 11.2, previous: 12.9, trend: "down", rag: "amber" },
    { metric: "Customer Count", group: "Operational", unit: "shippers", current: 1420, previous: 1180, trend: "up", rag: "green" },
    { metric: "Churn", group: "Operational", unit: "%", current: 5.6, previous: 6.2, trend: "down", rag: "green" },
    { metric: "Headcount", group: "Operational", unit: "#", current: 940, previous: 880, trend: "up", rag: "green" },
    { metric: "Partnerships", group: "Operational", unit: "#", current: 11, previous: 8, trend: "up", rag: "green" },
  ],
  "terraflow-energy": [
    { metric: "Revenue (LTM)", group: "Financial", unit: "$M", current: 58.7, previous: 51.2, budget: 60.5, trend: "up", rag: "amber" },
    { metric: "Revenue Growth", group: "Financial", unit: "%", current: 14.6, previous: 17.9, budget: 18.2, trend: "down", rag: "amber" },
    { metric: "Gross Margin", group: "Financial", unit: "%", current: 62.4, previous: 63.1, budget: 63.0, trend: "down", rag: "green" },
    { metric: "EBITDA", group: "Financial", unit: "$M", current: 31.6, previous: 28.4, budget: 33.0, trend: "up", rag: "amber" },
    { metric: "EBITDA Margin", group: "Financial", unit: "%", current: 53.8, previous: 55.5, budget: 54.5, trend: "down", rag: "amber" },
    { metric: "Cash", group: "Financial", unit: "$M", current: 22.4, previous: 19.8, trend: "up", rag: "green" },
    { metric: "Working Capital", group: "Financial", unit: "$M", current: 17.6, previous: 15.1, trend: "up", rag: "green" },
    { metric: "Headcount", group: "Operational", unit: "#", current: 410, previous: 372, trend: "up", rag: "green" },
    { metric: "Product Milestones", group: "Operational", unit: "MW commissioned", current: 940, previous: 760, trend: "up", rag: "amber" },
    { metric: "Geographic Expansion", group: "Operational", unit: "states", current: 9, previous: 7, trend: "up", rag: "green" },
  ],
  "cobalt-cyber": [
    { metric: "ARR", group: "Financial", unit: "$M", current: 24.6, previous: 16.4, budget: 23.0, trend: "up", rag: "green" },
    { metric: "Revenue Growth", group: "Financial", unit: "%", current: 50.0, previous: 62.0, budget: 42.0, trend: "down", rag: "green" },
    { metric: "Gross Margin", group: "Financial", unit: "%", current: 81.4, previous: 79.2, budget: 80.0, trend: "up", rag: "green" },
    { metric: "EBITDA", group: "Financial", unit: "$M", current: 1.2, previous: -1.4, budget: 0.4, trend: "up", rag: "green" },
    { metric: "Cash", group: "Financial", unit: "$M", current: 18.2, previous: 17.4, trend: "up", rag: "green" },
    { metric: "Cash Runway", group: "Financial", unit: "months", current: 48, previous: 42, trend: "up", rag: "green" },
    { metric: "CAC", group: "Financial", unit: "$k", current: 34.2, previous: 39.6, trend: "down", rag: "green" },
    { metric: "LTV", group: "Financial", unit: "$k", current: 186, previous: 164, trend: "up", rag: "green" },
    { metric: "Customer Count", group: "Operational", unit: "accounts", current: 612, previous: 448, trend: "up", rag: "green" },
    { metric: "Churn", group: "Operational", unit: "%", current: 4.8, previous: 5.9, trend: "down", rag: "green" },
    { metric: "Headcount", group: "Operational", unit: "#", current: 268, previous: 214, trend: "up", rag: "green" },
    { metric: "Sales Pipeline", group: "Operational", unit: "$M", current: 41.2, previous: 33.8, trend: "up", rag: "green" },
  ],
  "meridian-realty": [
    { metric: "Revenue (LTM)", group: "Financial", unit: "$M", current: 34.1, previous: 30.6, budget: 33.4, trend: "up", rag: "green" },
    { metric: "Revenue Growth", group: "Financial", unit: "%", current: 11.4, previous: 9.8, budget: 9.2, trend: "up", rag: "green" },
    { metric: "EBITDA", group: "Financial", unit: "$M", current: 21.8, previous: 19.2, budget: 21.0, trend: "up", rag: "green" },
    { metric: "EBITDA Margin", group: "Financial", unit: "%", current: 63.9, previous: 62.7, budget: 62.9, trend: "up", rag: "green" },
    { metric: "Cash", group: "Financial", unit: "$M", current: 12.6, previous: 14.9, trend: "down", rag: "amber" },
    { metric: "Working Capital", group: "Financial", unit: "$M", current: 8.9, previous: 9.4, trend: "down", rag: "green" },
    { metric: "Customer Count", group: "Operational", unit: "tenants", current: 96, previous: 84, trend: "up", rag: "green" },
    { metric: "Headcount", group: "Operational", unit: "#", current: 176, previous: 168, trend: "up", rag: "green" },
    { metric: "Geographic Expansion", group: "Operational", unit: "parks", current: 14, previous: 12, trend: "up", rag: "green" },
  ],
  "orbit-saas": [
    { metric: "ARR", group: "Financial", unit: "$M", current: 68.4, previous: 54.1, budget: 66.0, trend: "up", rag: "green" },
    { metric: "Revenue Growth", group: "Financial", unit: "%", current: 26.4, previous: 31.2, budget: 22.0, trend: "down", rag: "green" },
    { metric: "Gross Margin", group: "Financial", unit: "%", current: 77.9, previous: 76.1, budget: 77.0, trend: "up", rag: "green" },
    { metric: "EBITDA", group: "Financial", unit: "$M", current: 9.6, previous: 5.2, budget: 8.8, trend: "up", rag: "green" },
    { metric: "EBITDA Margin", group: "Financial", unit: "%", current: 14.0, previous: 9.6, budget: 13.3, trend: "up", rag: "green" },
    { metric: "Cash", group: "Financial", unit: "$M", current: 31.4, previous: 26.8, trend: "up", rag: "green" },
    { metric: "CAC", group: "Financial", unit: "$k", current: 22.6, previous: 21.4, trend: "up", rag: "amber" },
    { metric: "LTV", group: "Financial", unit: "$k", current: 141, previous: 138, trend: "up", rag: "green" },
    { metric: "Customer Count", group: "Operational", unit: "clinics", current: 4120, previous: 3480, trend: "up", rag: "green" },
    { metric: "Churn", group: "Operational", unit: "%", current: 6.4, previous: 5.1, trend: "up", rag: "amber" },
    { metric: "NPS", group: "Operational", unit: "score", current: 44, previous: 49, trend: "down", rag: "amber" },
    { metric: "Headcount", group: "Operational", unit: "#", current: 512, previous: 470, trend: "up", rag: "green" },
  ],
};

export interface Alert {
  id: string;
  companyId: string;
  issue: string;
  category: string;
  severity: "High" | "Medium" | "Low";
  date: string;
  action: string;
  status: "Open" | "In Progress" | "Escalated" | "Closed";
  owner: string;
}

export const alerts: Alert[] = [
  { id: "a1", companyId: "skyline-mobility", issue: "Cash runway declined to 4 months", category: "Cash runway declining", severity: "High", date: "2026-08-04", action: "Convene emergency board call; evaluate bridge note vs structured wind-down", status: "Escalated", owner: "D. Novak" },
  { id: "a2", companyId: "helios-foods", issue: "Revenue 12.5% below FY plan for two consecutive quarters", category: "Revenue growth below plan", severity: "High", date: "2026-07-28", action: "Commission commercial diagnostic; reset FY27 budget with management", status: "In Progress", owner: "C. Whitfield" },
  { id: "a3", companyId: "helios-foods", issue: "Gross margin compression of 350 bps on input costs", category: "KPI deterioration", severity: "High", date: "2026-07-15", action: "Approve pricing pass-through and renegotiate top 5 supply contracts", status: "In Progress", owner: "C. Whitfield" },
  { id: "a4", companyId: "skyline-mobility", issue: "Monthly burn increased 21% QoQ", category: "Burn rate increasing", severity: "High", date: "2026-07-09", action: "Impose spend freeze; approve revised 6-month cash plan", status: "Open", owner: "D. Novak" },
  { id: "a5", companyId: "vantage-fintech", issue: "Series B pro-rata allocation expires 30 Sep 2026", category: "Follow-on investment decision required", severity: "Medium", date: "2026-08-01", action: "Prepare IC paper for $4.0M follow-on at $180M pre-money", status: "Open", owner: "A. Rahman" },
  { id: "a6", companyId: "skyline-mobility", issue: "Q2 MIS pack overdue by 34 days", category: "MIS/report overdue", severity: "Medium", date: "2026-07-31", action: "Escalate to founder; enforce information rights covenant", status: "Open", owner: "Portfolio Ops" },
  { id: "a7", companyId: "aurex-health", issue: "Series C secondary may dilute firm below 14%", category: "Ownership/cap-table change", severity: "Medium", date: "2026-07-22", action: "Exercise pro-rata rights; confirm anti-dilution treatment with counsel", status: "In Progress", owner: "R. Menon" },
  { id: "a8", companyId: "terraflow-energy", issue: "EBITDA tracking 4.2% below budget", category: "KPI deterioration", severity: "Medium", date: "2026-06-30", action: "Review O&M cost base and PPA tariff realisation", status: "Open", owner: "R. Menon" },
  { id: "a9", companyId: "orbit-saas", issue: "Q2 valuation mark requires refresh (comps down 9%)", category: "Valuation update required", severity: "Medium", date: "2026-07-05", action: "Update DCF and comp set; submit to Valuation Committee", status: "In Progress", owner: "Valuation Team" },
  { id: "a10", companyId: "cobalt-cyber", issue: "$50M ARR milestone expected Q4 2026", category: "Upcoming milestone", severity: "Low", date: "2026-08-06", action: "Prepare exit readiness assessment and banker shortlist", status: "Open", owner: "D. Novak" },
  { id: "a11", companyId: "meridian-realty", issue: "IPO readiness review scheduled Q1 2027", category: "Upcoming milestone", severity: "Low", date: "2026-06-18", action: "Confirm lock-in implications and pre-IPO placement strategy", status: "Open", owner: "S. Iyer" },
  { id: "a12", companyId: "nimbus-logistics", issue: "Working capital cycle extended by 9 days", category: "KPI deterioration", severity: "Low", date: "2026-05-27", action: "Monitor receivables ageing in next monthly MIS", status: "Closed", owner: "S. Iyer" },
];

// Portfolio value over time (USD M)
export const portfolioValueSeries = [
  { period: "Q1 24", cost: 108.0, fmv: 132.4, realised: 21.6 },
  { period: "Q2 24", cost: 112.0, fmv: 141.8, realised: 21.6 },
  { period: "Q3 24", cost: 124.0, fmv: 152.6, realised: 25.6 },
  { period: "Q4 24", cost: 126.0, fmv: 158.2, realised: 28.1 },
  { period: "Q1 25", cost: 128.0, fmv: 164.9, realised: 28.1 },
  { period: "Q2 25", cost: 130.0, fmv: 171.4, realised: 28.1 },
  { period: "Q3 25", cost: 131.0, fmv: 176.8, realised: 31.6 },
  { period: "Q4 25", cost: 132.0, fmv: 181.2, realised: 34.1 },
  { period: "Q1 26", cost: 132.0, fmv: 184.6, realised: 34.1 },
  { period: "Q2 26", cost: 132.0, fmv: 187.1, realised: 34.1 },
];

export const fmt = {
  m: (v: number, digits = 1) =>
    `${v < 0 ? "-" : ""}$${Math.abs(v).toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits })}M`,
  pct: (v: number, digits = 1) => `${v > 0 ? "+" : ""}${v.toFixed(digits)}%`,
  pctPlain: (v: number, digits = 1) => `${v.toFixed(digits)}%`,
  x: (v: number) => `${v.toFixed(2)}x`,
  date: (d: string) =>
    new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
};

export const unrealisedOf = (c: Company) => (c.status === "Realised" ? 0 : c.fmv - c.cost);

export function aggregate(list: Company[]) {
  const cost = list.reduce((s, c) => s + c.cost, 0);
  const fmv = list.reduce((s, c) => s + c.fmv, 0);
  const realised = list.reduce((s, c) => s + c.realised, 0);
  const unrealised = list.reduce((s, c) => s + unrealisedOf(c), 0);
  const total = fmv + realised;
  const moic = cost ? total / cost : 0;
  // Cost-weighted IRR approximation for the prototype
  const irr = cost ? list.reduce((s, c) => s + c.irr * c.cost, 0) / cost : 0;
  return { cost, fmv, realised, unrealised, total, moic, irr, count: list.length };
}

export function groupSum<T extends string>(
  list: Company[],
  key: (c: Company) => T,
  value: (c: Company) => number = (c) => c.fmv,
) {
  const map = new Map<T, number>();
  list.forEach((c) => map.set(key(c), (map.get(key(c)) ?? 0) + value(c)));
  return Array.from(map, ([name, value]) => ({ name, value: Number(value.toFixed(2)) })).sort(
    (a, b) => b.value - a.value,
  );
}

export const holdingPeriod = (d: string) => {
  const years = (Date.now() - new Date(d).getTime()) / (365.25 * 24 * 3600 * 1000);
  return `${years.toFixed(1)} yrs`;
};

export const filterFields = ["sector", "geography", "assetClass", "currency", "status"] as const;
