
export interface CropData {
  type: string;
  confidence: number;
  lodgingArea?: number;
  diseaseLevel?: '轻度' | '中等' | '重度';
  yieldEstimate?: number;
}

export interface AssessmentPoint {
  id: string;
  x: number;
  y: number;
  type: 'damage' | 'disease' | 'normal';
  label: string;
}

export interface Factor {
  name: string;
  impact: number;
  description: string;
  icon: string;
}
