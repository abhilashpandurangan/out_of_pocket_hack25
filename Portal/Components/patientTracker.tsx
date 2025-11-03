
import React, { useState } from 'react';
import type { Patient } from '../types.ts';
import StatusBar from './StatusBar.tsx';
import { BellIcon } from './icons.tsx';

interface PatientTrackerProps {
  patient: Patient;
  onPing: (patientId: string) => void;
}

const PatientTracker: React.FC<PatientTrackerProps> = ({ patient, onPing }) => {
  const [isPinging, setIsPinging] = useState(false);

  const handlePing = () => {
    if (isPinging) return;
    setIsPinging(true);
    onPing(patient.id);
    setTimeout(() => setIsPinging(false), 2000); // Simulate API call duration
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:bg-slate-800 hover:shadow-cyan-500/10">
      <div className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold text-white mb-4 sm:mb-0">{patient.name}</h2>
          {patient.textResponseStatus === 'pending' && (
            <button
              onClick={handlePing}
              disabled={isPinging}
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-md shadow-sm hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-200 w-full sm:w-auto"
              aria-label={`Re-ping patient ${patient.name}`}
            >
              <BellIcon className="w-4 h-4" />
              <span>{isPinging ? 'Pinging...' : 'Re-ping Patient'}</span>
            </button>
          )}
        </div>
        <div className="mt-6">
          <StatusBar patient={patient} />
        </div>
      </div>
    </div>
  );
};

export default PatientTracker;