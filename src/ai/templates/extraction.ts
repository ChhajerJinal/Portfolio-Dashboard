// Extraction template utilities (minimal scaffold)
export type ExtractResult = {
  fields: Record<string, any>;
  errors?: string[];
};

export function extractFields(doc: any, templateName: string = 'default'): ExtractResult {
  return { fields: {} };
}
