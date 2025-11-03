
import { useState } from 'react';
import type { Patient } from '../types.ts';

const samplePatients: Patient[] = [
  {
    id: 'p1',
    name: 'Eleanor Vance',
    textResponseStatus: 'responded',
    eligibilityStatus: 'completed',
    coverageStatus: 'covered',
  },
  {
    id: 'p2',
    name: 'Marcus Thorne',
    textResponseStatus: 'pending',
    eligibilityStatus: 'not_started',
    coverageStatus: 'n/a',
  },
  {
    id: 'p3',
    name: 'Isabella Rossi',
    textResponseStatus: 'responded',
    eligibilityStatus: 'in_progress',
    coverageStatus: 'n/a',
  },
  {
    id: 'p4',
    name: 'Julian Croft',
    textResponseStatus: 'responded',
    eligibilityStatus: 'completed',
    coverageStatus: 'not_covered',
  },
  {
    id: 'p5',
    name: 'Aria Chen',
    textResponseStatus: 'responded',
    eligibilityStatus: 'not_started',
    coverageStatus: 'n/a',
  },
  {
    id: 'p6',
    name: 'Leo Gallagher',
    textResponseStatus: 'responded',
    eligibilityStatus: 'completed',
    coverageStatus: 'pending_decision',
  },
];

export const usePatientData = () => {
  const [patients, setPatients] = useState<Patient[]>(samplePatients);
  
  // This is a simulation. In a real app, this would trigger a backend API call.
  const pingPatient = (patientId: string) => {
    console.log(`Pinging patient with ID: ${patientId}`);
    // Here you could add logic to show a toast notification, etc.
  };

  return { patients, setPatients, pingPatient };
};
