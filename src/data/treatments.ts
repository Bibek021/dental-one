// Mock treatment data for testing and development

import type { Treatment, TreatmentStatus, Prescription } from '../types';

// Helper function to generate treatments
function generateTreatments(): Treatment[] {
  const treatments: Treatment[] = [];
  const now = new Date();

  // Sample diagnoses and treatment plans
  const diagnoses = [
    'Dental Caries (Tooth Decay)',
    'Gingivitis',
    'Periodontal Disease',
    'Tooth Fracture',
    'Root Canal Infection',
    'Tooth Sensitivity',
    'Malocclusion',
    'Tooth Abscess',
    'Wisdom Tooth Impaction',
    'Temporomandibular Joint Disorder',
    'Oral Thrush',
    'Tooth Erosion'
  ];

  const treatmentPlans = [
    'Composite filling for posterior tooth',
    'Professional cleaning and scaling',
    'Root canal therapy with crown placement',
    'Tooth extraction and implant planning',
    'Orthodontic braces consultation',
    'Periodontal deep cleaning (scaling and root planing)',
    'Dental crown restoration',
    'Teeth whitening treatment',
    'Dental bridge placement',
    'Wisdom tooth extraction',
    'TMJ therapy and splint fitting',
    'Fluoride treatment and oral hygiene education'
  ];

  const medications = [
    'Ibuprofen',
    'Acetaminophen',
    'Amoxicillin',
    'Clindamycin',
    'Hydrocodone',
    'Chlorhexidine mouthwash',
    'Fluoride gel',
    'Lidocaine gel'
  ];

  // Patient and doctor IDs from existing mock data
  const patientIds = ['patient-001', 'patient-002', 'patient-003', 'patient-004', 'patient-005'];
  const doctorIds = ['doctor-001', 'doctor-002'];
  const serviceIds = ['service-001', 'service-002', 'service-003', 'service-004'];

  // Generate treatments for the last 3 months
  for (let i = 0; i < 50; i++) {
    const createdDate = new Date(now);
    createdDate.setDate(now.getDate() - Math.floor(Math.random() * 90));

    const status = getRandomTreatmentStatus(createdDate);
    const diagnosis = diagnoses[Math.floor(Math.random() * diagnoses.length)];
    const treatmentPlan = treatmentPlans[Math.floor(Math.random() * treatmentPlans.length)];
    
    // Generate prescriptions (0-3 per treatment)
    const prescriptionCount = Math.floor(Math.random() * 4);
    const prescriptions: Prescription[] = [];
    
    for (let j = 0; j < prescriptionCount; j++) {
      const medication = medications[Math.floor(Math.random() * medications.length)];
      prescriptions.push({
        medication,
        dosage: getRandomDosage(medication),
        frequency: getRandomFrequency(),
        duration: getRandomDuration(),
        instructions: getRandomInstructions(medication)
      });
    }

    const treatment: Treatment = {
      id: `treatment-${String(i + 1).padStart(3, '0')}`,
      appointmentId: `appointment-${i + 1}`,
      patientId: patientIds[Math.floor(Math.random() * patientIds.length)],
      doctorId: doctorIds[Math.floor(Math.random() * doctorIds.length)],
      clinicId: 'clinic-001',
      serviceId: serviceIds[Math.floor(Math.random() * serviceIds.length)],
      diagnosis,
      treatmentPlan,
      notes: getRandomNotes(diagnosis, treatmentPlan),
      prescriptions,
      status,
      cost: getRandomCost(treatmentPlan),
      createdAt: createdDate,
      updatedAt: new Date(createdDate.getTime() + Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000))
    };

    treatments.push(treatment);
  }

  return treatments.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

// Helper functions
function getRandomTreatmentStatus(createdDate: Date): TreatmentStatus {
  const now = new Date();
  const daysSinceCreated = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysSinceCreated > 30) {
    return Math.random() > 0.2 ? 'completed' : 'cancelled';
  } else if (daysSinceCreated > 7) {
    return Math.random() > 0.3 ? 'completed' : 'in_progress';
  } else if (daysSinceCreated > 1) {
    return Math.random() > 0.4 ? 'in_progress' : 'planned';
  } else {
    return 'planned';
  }
}

function getRandomDosage(medication: string): string {
  const dosages: Record<string, string[]> = {
    'Ibuprofen': ['400mg', '600mg', '800mg'],
    'Acetaminophen': ['325mg', '500mg', '650mg'],
    'Amoxicillin': ['250mg', '500mg', '875mg'],
    'Clindamycin': ['150mg', '300mg'],
    'Hydrocodone': ['5mg', '7.5mg', '10mg'],
    'Chlorhexidine mouthwash': ['0.12%', '0.2%'],
    'Fluoride gel': ['1.1%', '2.26%'],
    'Lidocaine gel': ['2%', '4%']
  };

  const medicationDosages = dosages[medication];
  if (medicationDosages) {
    return medicationDosages[Math.floor(Math.random() * medicationDosages.length)];
  }
  return '1 unit';
}

function getRandomFrequency(): string {
  const frequencies = [
    'Once daily',
    'Twice daily', 
    'Three times daily',
    'Four times daily',
    'Every 4 hours',
    'Every 6 hours',
    'Every 8 hours',
    'Every 12 hours',
    'As needed',
    'Before meals',
    'After meals',
    'At bedtime'
  ];
  return frequencies[Math.floor(Math.random() * frequencies.length)];
}

function getRandomDuration(): string {
  const durations = [
    '3 days',
    '5 days',
    '7 days',
    '10 days',
    '14 days',
    '21 days',
    '30 days',
    'Until symptoms improve',
    'As directed by doctor',
    'Until next appointment'
  ];
  return durations[Math.floor(Math.random() * durations.length)];
}

function getRandomInstructions(medication: string): string | undefined {
  const instructions: Record<string, string[]> = {
    'Ibuprofen': ['Take with food', 'Do not exceed 3200mg per day', 'Take with plenty of water'],
    'Acetaminophen': ['Do not exceed 4000mg per day', 'Can be taken with or without food'],
    'Amoxicillin': ['Take with food to reduce stomach upset', 'Complete full course even if feeling better'],
    'Clindamycin': ['Take with full glass of water', 'Take with food to reduce stomach irritation'],
    'Hydrocodone': ['Take with food', 'Do not drive or operate machinery', 'Do not drink alcohol'],
    'Chlorhexidine mouthwash': ['Do not swallow', 'Rinse for 30 seconds then spit out', 'Do not eat or drink for 30 minutes after use'],
    'Fluoride gel': ['Apply thin layer to teeth', 'Do not rinse, eat, or drink for 30 minutes after application'],
    'Lidocaine gel': ['Apply to affected area only', 'Do not exceed recommended dosage']
  };

  const medicationInstructions = instructions[medication];
  if (medicationInstructions && Math.random() > 0.3) {
    return medicationInstructions[Math.floor(Math.random() * medicationInstructions.length)];
  }
  return undefined;
}

function getRandomNotes(diagnosis: string, treatmentPlan: string): string | undefined {
  const notes = [
    'Patient responded well to treatment',
    'Follow-up appointment scheduled in 2 weeks',
    'Patient experienced mild discomfort post-treatment',
    'Treatment completed successfully',
    'Patient advised on post-treatment care',
    'No complications observed during procedure',
    'Patient requires additional follow-up',
    'Treatment plan may need adjustment',
    'Patient showed good compliance with instructions',
    'Consider alternative treatment if symptoms persist',
    undefined,
    undefined // More undefined to make notes optional
  ];
  
  // Generate context-specific notes
  const contextNotes = [
    `${diagnosis} successfully treated with ${treatmentPlan.toLowerCase()}`,
    `Patient education provided regarding ${diagnosis.toLowerCase()}`,
    `${treatmentPlan} completed without complications`,
    `Monitoring progress of ${diagnosis.toLowerCase()} treatment`,
    `Patient satisfied with ${treatmentPlan.toLowerCase()} results`
  ];
  
  const allNotes = [...notes, ...contextNotes];
  return allNotes[Math.floor(Math.random() * allNotes.length)];
}

function getRandomCost(treatmentPlan: string): number {
  const costs: Record<string, [number, number]> = {
    'Composite filling for posterior tooth': [150, 300],
    'Professional cleaning and scaling': [80, 150],
    'Root canal therapy with crown placement': [1200, 2000],
    'Tooth extraction and implant planning': [2000, 4000],
    'Orthodontic braces consultation': [50, 100],
    'Periodontal deep cleaning (scaling and root planing)': [200, 400],
    'Dental crown restoration': [800, 1500],
    'Teeth whitening treatment': [300, 600],
    'Dental bridge placement': [1500, 3000],
    'Wisdom tooth extraction': [200, 500],
    'TMJ therapy and splint fitting': [400, 800],
    'Fluoride treatment and oral hygiene education': [50, 100]
  };

  const [min, max] = costs[treatmentPlan] || [100, 500];
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate the treatments
export const treatments = generateTreatments();

// Helper functions for filtering treatments
export function getTreatmentsByPatient(patientId: string): Treatment[] {
  return treatments.filter(treatment => treatment.patientId === patientId);
}

export function getTreatmentsByDoctor(doctorId: string): Treatment[] {
  return treatments.filter(treatment => treatment.doctorId === doctorId);
}

export function getTreatmentsByStatus(status: TreatmentStatus): Treatment[] {
  return treatments.filter(treatment => treatment.status === status);
}

export function getTreatmentsByDateRange(startDate: Date, endDate: Date): Treatment[] {
  return treatments.filter(treatment => 
    treatment.createdAt >= startDate && treatment.createdAt <= endDate
  );
}

export function getRecentTreatments(days: number = 30): Treatment[] {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  return treatments.filter(treatment => treatment.createdAt >= cutoffDate);
}

export function getTreatmentStats() {
  const total = treatments.length;
  const planned = treatments.filter(t => t.status === 'planned').length;
  const inProgress = treatments.filter(t => t.status === 'in_progress').length;
  const completed = treatments.filter(t => t.status === 'completed').length;
  const cancelled = treatments.filter(t => t.status === 'cancelled').length;
  
  const totalRevenue = treatments
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.cost, 0);
  
  const averageCost = total > 0 ? treatments.reduce((sum, t) => sum + t.cost, 0) / total : 0;

  return {
    total,
    planned,
    inProgress,
    completed,
    cancelled,
    totalRevenue,
    averageCost
  };
}