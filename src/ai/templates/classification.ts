// Classification template utilities (minimal scaffold)
export type ClassificationResult = {
  templateName: string;
  confidence: number;
};

export function classifyDocument(doc: any, templateName: string = 'default'): ClassificationResult {
  return { templateName, confidence: 0 };
}
