export interface CollectorResult {
  source: string;
  timestamp: string;
  rows: string[][];
  metadata?: Record<string, unknown>;
}

export type CollectorFn = () => Promise<CollectorResult>;
