// Mock appointment data for testing and development

import type { Appointment, AppointmentStatus } from '../types';

// Helper function to generate appointments for the current week and next week
function generateAppointments(): Appointment[] {
  const appointments: Appointment[] = [];
  const now = new Date();
  
  // Get Monday of current week
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + 1);
  
  const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];
  
  // Sample appointment data for 2 weeks
  for (let day = 0; day < 14; day++) {
    const appointmentDate = new Date(startOfWeek);
    appointmentDate.setDate(startOfWeek.getDate() + day);
    
    // Skip weekends for this example
    if (appointmentDate.getDay() === 0 || appointmentDate.getDay() === 6) {
      continue;
    }
    
    // Generate 2-4 appointments per day
    const appointmentsPerDay = Math.floor(Math.random() * 3) + 2;
    
    for (let i = 0; i < appointmentsPerDay; i++) {
      const timeSlot = timeSlots[Math.floor(Math.random() * timeSlots.length)];
      const [hours, minutes] = timeSlot.split(':').map(Number);
      
      const startTime = new Date(appointmentDate);
      startTime.setHours(hours, minutes, 0, 0);
      
      const endTime = new Date(startTime);
      endTime.setMinutes(endTime.getMinutes() + 30); // 30-minute appointments
      
      // Skip if we already have an appointment at this time
      if (appointments.some(apt => 
        apt.startTime.getTime() === startTime.getTime() && 
        apt.doctorId === getDoctorForTimeSlot(day, i)
      )) {
        continue;
      }
      
      const appointment: Appointment = {
        id: `appointment-${day}-${i}-${Date.now()}`,
        patientId: getPatientForSlot(day, i),
        doctorId: getDoctorForTimeSlot(day, i),
        clinicId: 'clinic-001',
        serviceIds: [getRandomServiceId()],
        startTime,
        endTime,
        status: getStatusForAppointment(startTime),
        notes: getRandomNotes(),
        symptoms: getRandomSymptoms(),
        isFollowUp: Math.random() > 0.8,
        createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(),
      };
      
      appointments.push(appointment);
    }
  }
  
  return appointments.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
}

// Helper functions
function getDoctorForTimeSlot(_day: number, slot: number): string {
  const doctors = ['doctor-001', 'doctor-002'];
  return doctors[slot % doctors.length];
}

function getPatientForSlot(day: number, slot: number): string {
  const patients = ['patient-001', 'patient-002', 'patient-003', 'patient-004', 'patient-005'];
  return patients[(day + slot) % patients.length];
}

function getRandomServiceId(): string {
  const services = ['service-001', 'service-002', 'service-003', 'service-004'];
  return services[Math.floor(Math.random() * services.length)];
}

function getStatusForAppointment(startTime: Date): AppointmentStatus {
  const now = new Date();
  const appointmentDate = new Date(startTime);
  
  if (appointmentDate < now) {
    // Past appointments are mostly completed
    return Math.random() > 0.2 ? 'completed' : 'cancelled';
  } else if (appointmentDate.toDateString() === now.toDateString()) {
    // Today's appointments
    if (appointmentDate.getTime() < now.getTime()) {
      return Math.random() > 0.3 ? 'completed' : 'in_progress';
    } else {
      return Math.random() > 0.5 ? 'confirmed' : 'scheduled';
    }
  } else {
    // Future appointments
    return Math.random() > 0.3 ? 'confirmed' : 'scheduled';
  }
}

function getRandomNotes(): string | undefined {
  const notes = [
    'Patient requested morning appointment',
    'Follow-up after root canal treatment',
    'Regular cleaning and checkup',
    'Patient has dental anxiety - extra time needed',
    'Insurance pre-authorization required',
    undefined,
    undefined, // More undefined to make notes optional
  ];
  return notes[Math.floor(Math.random() * notes.length)];
}

function getRandomSymptoms(): string | undefined {
  const symptoms = [
    'Tooth pain in upper right',
    'Sensitivity to cold',
    'Routine cleaning',
    'Gum bleeding',
    'Broken tooth',
    'Jaw pain',
    undefined,
    undefined,
    undefined, // More undefined to make symptoms optional
  ];
  return symptoms[Math.floor(Math.random() * symptoms.length)];
}

// Generate the appointments
export const appointments = generateAppointments();

// Helper functions for filtering appointments
export function getAppointmentsByDate(date: Date): Appointment[] {
  return appointments.filter(apt => 
    apt.startTime.toDateString() === date.toDateString()
  );
}

export function getAppointmentsByDoctor(doctorId: string): Appointment[] {
  return appointments.filter(apt => apt.doctorId === doctorId);
}

export function getAppointmentsByPatient(patientId: string): Appointment[] {
  return appointments.filter(apt => apt.patientId === patientId);
}

export function getAppointmentsByStatus(status: AppointmentStatus): Appointment[] {
  return appointments.filter(apt => apt.status === status);
}

export function getAppointmentsForWeek(weekStart: Date): Appointment[] {
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 7);
  
  return appointments.filter(apt => 
    apt.startTime >= weekStart && apt.startTime < weekEnd
  );
}

export function getTodaysAppointments(): Appointment[] {
  return getAppointmentsByDate(new Date());
}

export function getUpcomingAppointments(days: number = 7): Appointment[] {
  const now = new Date();
  const futureDate = new Date();
  futureDate.setDate(now.getDate() + days);
  
  return appointments.filter(apt => 
    apt.startTime >= now && apt.startTime <= futureDate
  ).sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
}