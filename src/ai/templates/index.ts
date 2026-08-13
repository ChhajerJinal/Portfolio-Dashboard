// AI Templates: classification and extraction placeholders
export type ClassificationResult = {
  templateName: string;
  confidence: number;
};

export type ExtractResult = {
  fields: Record<string, any>;
  errors?: string[];
};

export const DEFAULT_CLASSIFICATION_TEMPLATE = 'default';

/** Classify a document into a template for extraction. Placeholder implementation. */
export function classifyDocument(doc: any, templateName: string = DEFAULT_CLASSIFICATION_TEMPLATE): ClassificationResult {
  // In a real implementation, run a lightweight classifier here.
  return {
    templateName,
    confidence: 0,
  };
}

/** Extract fields from a document using a given template. Placeholder implementation. */
export function extractFields(doc: any, templateName: string = DEFAULT_CLASSIFICATION_TEMPLATE): ExtractResult {
  // In a real implementation, apply an extraction template and return structured fields.
  return { fields: {} };
}
