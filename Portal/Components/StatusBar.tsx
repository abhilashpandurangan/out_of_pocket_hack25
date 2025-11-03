
import React from 'react';
import { motion } from 'framer-motion';
import type { Patient } from '../types.ts';
import { CheckIcon, DocumentSearchIcon, HourglassIcon, PhoneIcon, ShieldCheckIcon, XMarkIcon } from './icons.tsx';

interface StatusBarProps {
  patient: Patient;
}

interface StatusInfo {
  isCompleted: boolean;
  isInProgress: boolean;
  isFailed?: boolean;
  icon: React.ReactNode;
  label: string;
  description: string;
  color: string;
}

const StatusBar: React.FC<StatusBarProps> = ({ patient }) => {
  const { textResponseStatus, eligibilityStatus, coverageStatus } = patient;

  const step1: StatusInfo = {
    isCompleted: textResponseStatus === 'responded',
    isInProgress: false,
    icon: <PhoneIcon className="w-6 h-6" />,
    label: 'Contacted',
    description: textResponseStatus === 'responded' ? 'Patient has responded' : 'Awaiting patient response',
    color: 'cyan',
  };

  const step2: StatusInfo = {
    isCompleted: eligibilityStatus === 'completed',
    isInProgress: eligibilityStatus === 'in_progress',
    icon: <DocumentSearchIcon className="w-6 h-6" />,
    label: 'Eligibility',
    description: eligibilityStatus === 'completed' ? 'Check complete' : eligibilityStatus === 'in_progress' ? 'Check in progress' : 'Not started',
    color: 'indigo',
  };

  const step3: StatusInfo = {
    isCompleted: coverageStatus === 'covered',
    isInProgress: coverageStatus === 'pending_decision',
    isFailed: coverageStatus === 'not_covered',
    icon: <ShieldCheckIcon className="w-6 h-6" />,
    label: 'Coverage',
    description: coverageStatus === 'covered' ? 'Visit is covered' : coverageStatus === 'not_covered' ? 'Visit not covered' : coverageStatus === 'pending_decision' ? 'Decision pending' : 'Awaiting eligibility',
    color: 'emerald',
  };

  const steps = [step1, step2, step3];

  const getIconForState = (step: StatusInfo) => {
    if (step.isCompleted) return <CheckIcon className="w-6 h-6" />;
    if (step.isFailed) return <XMarkIcon className="w-6 h-6" />;
    if (step.isInProgress) return <HourglassIcon className="w-6 h-6 animate-spin" style={{ animationDuration: '3s' }} />;
    return step.icon;
  };

  const getBgColor = (step: StatusInfo) => {
    if (step.isCompleted) return `bg-emerald-500`;
    if (step.isFailed) return `bg-red-500`;
    if (step.isInProgress) return `bg-blue-500`;
    return `bg-slate-600`;
  };
  
  const getTextColor = (step: StatusInfo) => {
    if (step.isCompleted) return `text-emerald-300`;
    if (step.isFailed) return `text-red-300`;
    if (step.isInProgress) return `text-blue-300`;
    return `text-slate-400`;
  };

  return (
    <div className="flex items-center" aria-label="Patient status progress">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1, type: 'spring', stiffness: 300, damping: 20 }}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${getBgColor(step)} ${step.isInProgress ? 'animate-pulse' : ''}`}
              aria-live="polite"
              aria-label={step.description}
            >
              {getIconForState(step)}
            </motion.div>
            <div className="mt-2">
              <p className="text-sm font-medium text-slate-200">{step.label}</p>
              <p className={`text-xs ${getTextColor(step)}`}>{step.description}</p>
            </div>
          </div>

          {index < steps.length - 1 && (
            <div className="flex-1 h-1 mx-2 sm:mx-4 bg-slate-700 rounded-full overflow-hidden">
               <motion.div
                className={`h-full ${step.isCompleted ? 'bg-emerald-500' : 'bg-slate-700'}`}
                initial={{ width: '0%' }}
                animate={{ width: step.isCompleted ? '100%' : '0%' }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.5, ease: 'easeInOut' }}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StatusBar;
