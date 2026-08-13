# Portfolio Intelligence Hub

Build a professional investment portfolio intelligence platform based strictly on the attached/reference HTML specification.

This is a functional FRONT-END PROTOTYPE for an investment firm. Use realistic dummy data. Do NOT build authentication, production backend infrastructure, external APIs, or real-time integrations.

The goal is to demonstrate the portfolio monitoring and portfolio display experience described in the specification.

IMPORTANT:

Do not invent a generic SaaS dashboard structure. Follow the terminology and information architecture in the specification.

==================================================

PRIMARY MODULE: PORTFOLIO MONITORING

==================================================

Create a left navigation with:

1. Portfolio Overview

2. Portfolio Companies

3. Ownership & Cap Table

4. Investment History

5. Investing Entities

6. Portfolio Monitoring

7. Alerts & Actions

The application should feel like an institutional investment/portfolio management platform: professional, information-dense, clean and easy for an investment team to use.

==================================================

1. PORTFOLIO OVERVIEW / COMMAND CENTRE

==================================================

Create a portfolio-level command centre.

Top-level KPI cards:

- Total Cost / Invested

- Current FMV / MTM

- Realised Proceeds

- Unrealised Gain/Loss

- Total Value

- MOIC

- IRR

- Number of Portfolio Companies

Include filters for:

- Company

- Sector

- Geography

- Asset Class

- Currency

- Investing Entity

- Investment Status

Create portfolio-level visualisations for:

- Portfolio value over time

- Investment exposure by sector

- Ownership exposure

- Geography exposure

- Currency exposure

- IRR by portfolio company

- MOIC by portfolio company

==================================================

2. PORTFOLIO COMPANIES

==================================================

Create a searchable and filterable portfolio company table.

Columns:

- Company

- Sector

- Subsector

- Geography

- Asset Class

- Investment Date

- Investment Round

- Instrument

- Total Cost

- Current FMV / MTM

- Realised Proceeds

- Unrealised Gain/Loss

- Ownership %

- MOIC

- IRR

- Status

Use realistic dummy companies and internally consistent financial numbers.

Clicking a company must open a detailed Company View.

==================================================

3. COMPANY-LEVEL VIEW

==================================================

Create a detailed company page containing:

Company information:

- Company Name

- Sector

- Subsector

- Geography

- Asset Class

Investment details:

- Investment Date

- Investment Round

- Instrument

- Total Investment / Cost

- Shares / Units

- Share Class

- Entry Valuation

- Entry ARR / Revenue Multiple

- Current FMV / MTM

- Unrealised Gain/Loss

- Realised Proceeds

- Currency

- Co-investors

Performance cards:

- Ownership %

- MOIC

- IRR

- Holding Period

Create clear sections/tabs for:

A. Investment Snapshot

B. Investment Transactions

C. Ownership & Cap Table

D. Portfolio Monitoring

E. Risks & Alerts

==================================================

4. INVESTMENT TRANSACTION HISTORY

==================================================

Create a transaction table containing:

- Date

- Transaction Type

- Round

- Instrument

- Investment Amount

- Shares / Units

- Price per Share

- Share Class

- Ownership %

Include multiple historical transactions for the dummy companies.

==================================================

5. OWNERSHIP & CAP TABLE

==================================================

Create an ownership/cap-table view.

Show:

- Founder ownership

- Investment firm ownership

- Other investors

- ESOP / employee pool

- Current ownership %

- Fully diluted ownership %

Also show relevant rights where applicable:

- Voting Rights

- Board Seat

- Board Observer

- KMP

- Anti-Dilution

- Pro-Rata / Follow-on Rights

- Information Rights

- Liquidation Preference

- Drag / Tag

- ROFR / ROFO

- Lock-in

- Consent / Reserved Matters

- Founder Vesting

- ESOP Dilution

Use a visual ownership breakdown alongside the detailed table.

==================================================

6. INVESTING ENTITY VIEW

==================================================

Create an Investing Entity section.

Support example entity types such as:

- SPV

- Trust

- HoldCo

- Personal

Show:

- Investing Entity

- Entity Type

- Jurisdiction

- Portfolio Companies held through the entity

- Total Cost

- Current FMV

- Unrealised Gain/Loss

- Realised Proceeds

- MOIC

- IRR

Include a consolidated view across investing entities.

==================================================

7. CROSS-PORTFOLIO VIEWS

==================================================

Create dedicated visual views for:

- Sector

- Ownership %

- Geography

- Currency

- KMP

These should allow the investment team to understand portfolio exposure.

==================================================

8. PORTFOLIO MONITORING / MIS

==================================================

Create a monitoring dashboard for portfolio companies.

Include relevant financial KPIs:

- Revenue

- Revenue Growth

- Gross Margin

- EBITDA

- EBITDA Margin

- Cash

- Monthly Burn

- Cash Runway

- ARR / GMV where applicable

- CAC

- LTV

- Working Capital

- Actual vs Budget

Include operational KPIs where applicable:

- Customer Count

- Churn

- NPS / CSAT

- Headcount

- Orders / GMV

- Product Milestones

- Geographic Expansion

- Sales Pipeline

- Partnerships

Show current value, previous period and trend.

Use:

GREEN = On Track

AMBER = Needs Attention

RED = Concern

==================================================

9. ALERTS & ACTIONS

==================================================

Create an Alerts & Actions page.

Example alerts:

- Revenue growth below plan

- Cash runway declining

- Burn rate increasing

- KPI deterioration

- Follow-on investment decision required

- MIS/report overdue

- Upcoming milestone

- Ownership/cap-table change

- Valuation update required

Each alert should show:

- Company

- Issue

- Severity

- Date

- Recommended Action

- Status

==================================================

10. AI / DATA-QUALITY CONCEPT

==================================================

Include a small but visible AI/data-intelligence concept in the prototype.

Show an example workflow:

Document / Email / Data

→ AI Extraction

→ Cross-validation

→ Human Review

→ Approved Data

→ Dashboard

Make it clear that AI assists with extraction, classification, validation and summarisation, but the investment team reviews/approves important data before it becomes official.

Do NOT attempt to build a real AI backend.

==================================================

DESIGN

==================================================

Use a premium institutional investment-management aesthetic.

- Clean light background

- Dark navy/charcoal typography

- Subtle borders

- Professional KPI cards

- Minimal rounded corners

- High information density

- Clean tables

- Professional charts

- Consistent spacing

- Responsive layout

Avoid a generic startup/SaaS landing-page aesthetic.

The product should look like an internal investment intelligence platform used by a professional investment team.

Prioritise:

1. Information hierarchy

2. Financial clarity

3. Ease of navigation

4. Professional presentation

5. Useful interactions

Use dummy data consistently throughout the application so that totals, ownership percentages, MOIC and IRR are logically coherent.



## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
