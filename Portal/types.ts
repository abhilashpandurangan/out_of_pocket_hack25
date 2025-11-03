
export type TextResponseStatus = 'responded' | 'pending';
export type EligibilityStatus = 'not_started' | 'in_progress' | 'completed';
export type CoverageStatus = 'covered' | 'not_covered' | 'pending_decision' | 'n/a';

export interface Patient {
  id: string;
  name: string;
  textResponseStatus: TextResponseStatus;
  eligibilityStatus: EligibilityStatus;
  coverageStatus: CoverageStatus;
}