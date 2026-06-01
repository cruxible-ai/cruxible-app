'use client';

import { useState } from 'react';

type YamlLine = {
  indent: number;
  parts: { text: string; color: 'key' | 'value' | 'type' | 'comment' | 'punct' | 'string' }[];
};

type Domain = {
  label: string;
  title: string;
  description: string;
  lines: YamlLine[];
};

const domains: Domain[] = [
  {
    label: 'Trade Finance',
    title: 'Sanctions & export control screening',
    description: 'Trace ownership chains, directorships, and offshore shell structures to surface hidden connections to sanctioned entities before transactions clear.',
    lines: [
      { indent: 0, parts: [{ text: 'entity_types:', color: 'key' }] },
      { indent: 1, parts: [{ text: 'SanctionedEntity:', color: 'type' }] },
      { indent: 2, parts: [{ text: 'name: ', color: 'key' }, { text: '{type: string, indexed: true}', color: 'punct' }] },
      { indent: 2, parts: [{ text: 'country: ', color: 'key' }, { text: '{type: string}', color: 'punct' }] },
      { indent: 1, parts: [{ text: 'OffshoreCompany:', color: 'type' }] },
      { indent: 1, parts: [{ text: 'Officer:', color: 'type' }] },
      { indent: 0, parts: [] },
      { indent: 0, parts: [{ text: 'relationships:', color: 'key' }] },
      { indent: 1, parts: [{ text: '- ', color: 'punct' }, { text: 'officer_of', color: 'string' }, { text: ':     ', color: 'punct' }, { text: 'Officer', color: 'type' }, { text: ' → ', color: 'punct' }, { text: 'OffshoreCompany', color: 'type' }] },
      { indent: 1, parts: [{ text: '- ', color: 'punct' }, { text: 'xref_officer', color: 'string' }, { text: ':  ', color: 'punct' }, { text: 'Officer', color: 'type' }, { text: ' → ', color: 'punct' }, { text: 'SanctionedEntity', color: 'type' }] },
      { indent: 1, parts: [{ text: '- ', color: 'punct' }, { text: 'sdn_connection', color: 'string' }, { text: ': ', color: 'punct' }, { text: 'SanctionedEntity', color: 'type' }, { text: ' → ', color: 'punct' }, { text: 'SanctionedEntity', color: 'type' }] },
    ],
  },
  {
    label: 'Pharma',
    title: 'Multi-drug interaction & pathway analysis',
    description: 'Encode pharmacological relationships between drugs and enzymes, then query for multi-hop interaction cascades across CYP450 metabolic pathways.',
    lines: [
      { indent: 0, parts: [{ text: 'entity_types:', color: 'key' }] },
      { indent: 1, parts: [{ text: 'Drug:', color: 'type' }] },
      { indent: 2, parts: [{ text: 'name: ', color: 'key' }, { text: '{type: string}', color: 'punct' }] },
      { indent: 2, parts: [{ text: 'atc_code: ', color: 'key' }, { text: '{type: string}', color: 'punct' }] },
      { indent: 1, parts: [{ text: 'Enzyme:', color: 'type' }, { text: '  # e.g. CYP3A4', color: 'comment' }] },
      { indent: 0, parts: [] },
      { indent: 0, parts: [{ text: 'relationships:', color: 'key' }] },
      { indent: 1, parts: [{ text: '- ', color: 'punct' }, { text: 'interacts_with', color: 'string' }, { text: ': ', color: 'punct' }, { text: 'Drug', color: 'type' }, { text: ' → ', color: 'punct' }, { text: 'Drug', color: 'type' }] },
      { indent: 1, parts: [{ text: '- ', color: 'punct' }, { text: 'metabolized_by', color: 'string' }, { text: ': ', color: 'punct' }, { text: 'Drug', color: 'type' }, { text: ' → ', color: 'punct' }, { text: 'Enzyme', color: 'type' }] },
      { indent: 1, parts: [{ text: '- ', color: 'punct' }, { text: 'inhibits', color: 'string' }, { text: ':       ', color: 'punct' }, { text: 'Drug', color: 'type' }, { text: ' → ', color: 'punct' }, { text: 'Enzyme', color: 'type' }] },
      { indent: 1, parts: [{ text: '- ', color: 'punct' }, { text: 'same_class', color: 'string' }, { text: ':     ', color: 'punct' }, { text: 'Drug', color: 'type' }, { text: ' → ', color: 'punct' }, { text: 'Drug', color: 'type' }] },
    ],
  },
  {
    label: 'Cybersecurity',
    title: 'ATT&CK-based threat intelligence graphs',
    description: 'Map APT groups to techniques, malware, campaigns, and mitigations using the MITRE ATT&CK framework as a queryable knowledge graph.',
    lines: [
      { indent: 0, parts: [{ text: 'entity_types:', color: 'key' }] },
      { indent: 1, parts: [{ text: 'Group:', color: 'type' }, { text: '              # APT28, Lazarus', color: 'comment' }] },
      { indent: 1, parts: [{ text: 'Technique:', color: 'type' }, { text: '          # T1055', color: 'comment' }] },
      { indent: 1, parts: [{ text: 'Software:', color: 'type' }, { text: '           # malware | tool', color: 'comment' }] },
      { indent: 1, parts: [{ text: 'Mitigation:', color: 'type' }] },
      { indent: 0, parts: [] },
      { indent: 0, parts: [{ text: 'relationships:', color: 'key' }] },
      { indent: 1, parts: [{ text: '- ', color: 'punct' }, { text: 'uses_technique', color: 'string' }, { text: ':  ', color: 'punct' }, { text: 'Group', color: 'type' }, { text: ' → ', color: 'punct' }, { text: 'Technique', color: 'type' }] },
      { indent: 1, parts: [{ text: '- ', color: 'punct' }, { text: 'uses_software', color: 'string' }, { text: ':   ', color: 'punct' }, { text: 'Group', color: 'type' }, { text: ' → ', color: 'punct' }, { text: 'Software', color: 'type' }] },
      { indent: 1, parts: [{ text: '- ', color: 'punct' }, { text: 'mitigates', color: 'string' }, { text: ':       ', color: 'punct' }, { text: 'Mitigation', color: 'type' }, { text: ' → ', color: 'punct' }, { text: 'Technique', color: 'type' }] },
    ],
  },
  {
    label: 'Retail',
    title: 'Promotional lift & cannibalization analysis',
    description: 'Model product substitution and store relationships to measure promotional lift, detect cannibalization, and plan future promos with causal evidence.',
    lines: [
      { indent: 0, parts: [{ text: 'entity_types:', color: 'key' }] },
      { indent: 1, parts: [{ text: 'SKU:', color: 'type' }] },
      { indent: 2, parts: [{ text: 'price: ', color: 'key' }, { text: '{type: float}', color: 'punct' }] },
      { indent: 2, parts: [{ text: 'category: ', color: 'key' }, { text: '{type: string, indexed: true}', color: 'punct' }] },
      { indent: 1, parts: [{ text: 'Promotion:', color: 'type' }] },
      { indent: 1, parts: [{ text: 'Store:', color: 'type' }] },
      { indent: 0, parts: [] },
      { indent: 0, parts: [{ text: 'relationships:', color: 'key' }] },
      { indent: 1, parts: [{ text: '- ', color: 'punct' }, { text: 'targets', color: 'string' }, { text: ':     ', color: 'punct' }, { text: 'Promotion', color: 'type' }, { text: ' → ', color: 'punct' }, { text: 'SKU', color: 'type' }] },
      { indent: 1, parts: [{ text: '- ', color: 'punct' }, { text: 'substitutes', color: 'string' }, { text: ':  ', color: 'punct' }, { text: 'SKU', color: 'type' }, { text: ' → ', color: 'punct' }, { text: 'SKU', color: 'type' }] },
      { indent: 1, parts: [{ text: '- ', color: 'punct' }, { text: 'sold_at', color: 'string' }, { text: ':      ', color: 'punct' }, { text: 'SKU', color: 'type' }, { text: ' → ', color: 'punct' }, { text: 'Store', color: 'type' }] },
    ],
  },
  {
    label: 'Food Safety',
    title: 'Allergen traceability & recall impact analysis',
    description: 'Track ingredient-to-allergen relationships and cross-contamination paths across suppliers so recalls can trace impact in seconds, not days.',
    lines: [
      { indent: 0, parts: [{ text: 'entity_types:', color: 'key' }] },
      { indent: 1, parts: [{ text: 'Product:', color: 'type' }] },
      { indent: 1, parts: [{ text: 'Ingredient:', color: 'type' }] },
      { indent: 1, parts: [{ text: 'Allergen:', color: 'type' }] },
      { indent: 2, parts: [{ text: 'severity: ', color: 'key' }, { text: '{type: string}', color: 'punct' }] },
      { indent: 0, parts: [] },
      { indent: 0, parts: [{ text: 'relationships:', color: 'key' }] },
      { indent: 1, parts: [{ text: '- ', color: 'punct' }, { text: 'contains', color: 'string' }, { text: ':     ', color: 'punct' }, { text: 'Product', color: 'type' }, { text: ' → ', color: 'punct' }, { text: 'Ingredient', color: 'type' }] },
      { indent: 1, parts: [{ text: '- ', color: 'punct' }, { text: 'may_contain', color: 'string' }, { text: ':  ', color: 'punct' }, { text: 'Ingredient', color: 'type' }, { text: ' → ', color: 'punct' }, { text: 'Allergen', color: 'type' }] },
      { indent: 1, parts: [{ text: '- ', color: 'punct' }, { text: 'sourced_from', color: 'string' }, { text: ': ', color: 'punct' }, { text: 'Ingredient', color: 'type' }, { text: ' → ', color: 'punct' }, { text: 'Supplier', color: 'type' }] },
    ],
  },
];

// Atom One Dark palette
const colorMap = {
  key: 'text-[#E06C75]',
  value: 'text-[#D19A66]',
  type: 'text-[#E5C07B]',
  comment: 'text-[#5C6370]',
  punct: 'text-[#ABB2BF]',
  string: 'text-[#98C379]',
};

function YamlBlock({ lines }: { lines: YamlLine[] }) {
  return (
    <pre className="font-mono text-[13px] leading-[1.8] overflow-x-auto">
      {lines.map((line, i) => (
        <div key={i} style={{ paddingLeft: `${line.indent * 16}px` }}>
          {line.parts.length === 0 ? '\u00A0' : line.parts.map((part, j) => (
            <span key={j} className={colorMap[part.color]}>{part.text}</span>
          ))}
        </div>
      ))}
    </pre>
  );
}

export function UseCasesGrid() {
  const [active, setActive] = useState(0);
  const current = domains[active];

  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-medium mb-3">
            One engine, any domain
          </h2>
          <p className="text-muted-foreground font-light max-w-2xl mx-auto">
            Define entity types and relationships in YAML. Cruxible Core handles the graph, the queries, and the receipts.
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex items-center justify-center gap-1 mb-6 overflow-x-auto">
          {domains.map((d, i) => (
            <button
              key={d.label}
              onClick={() => setActive(i)}
              className={`px-4 py-2 text-sm rounded-lg whitespace-nowrap transition-colors ${
                i === active
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Content: description left, code right */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left — description */}
          <div className="md:w-[280px] shrink-0">
            <h3 className="text-base font-medium mb-2">{current.title}</h3>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              {current.description}
            </p>
          </div>

          {/* Right — code panel */}
          <div className="flex-1 rounded-xl overflow-hidden border border-[#3E4451]">
            <div className="bg-[#282C34] p-6">
              <YamlBlock lines={current.lines} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
