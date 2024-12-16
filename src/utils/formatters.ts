interface CapabilityRange {
  min?: number;
  max?: number;
  step?: number;
}

export function formatCapabilityRange(range: CapabilityRange): string {
  if (!range) return 'N/A';
  
  return `${range.min || 'N/A'} - ${range.max || 'N/A'}${
    range.step ? ` (step: ${range.step})` : ''
  }`;
}