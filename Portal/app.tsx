
import React from 'react';
import { usePatientData } from './hooks/usePatientData.ts';
import PatientTracker from './Components/patientTracker.tsx';
import { LogoIcon } from './Components/icons.tsx';

const App: React.FC = () => {
  const { patients, pingPatient } = usePatientData();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans p-4 sm:p-6 lg:p-8">
      <header className="max-w-5xl mx-auto mb-12 text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <LogoIcon className="w-12 h-12 text-cyan-400" />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Patient Eligibility Dashboard
          </h1>
        </div>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Live status of patient insurance verification.
        </p>
      </header>
      <main className="max-w-5xl mx-auto">
        <div className="space-y-6">
          {patients.map((patient) => (
            <PatientTracker key={patient.id} patient={patient} onPing={pingPatient} />
          ))}
        </div>
      </main>
      <footer className="text-center mt-12 text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} MedTrack Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
