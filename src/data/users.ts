// Mock data for users with different roles

import type { 
  SuperAdmin, 
  ClinicAdmin, 
  Doctor, 
  Staff, 
  Patient,
  WorkingHours,
  Address
} from '../types';

// Working hours template
const defaultWorkingHours: WorkingHours = {
  monday: { isWorking: true, startTime: '09:00', endTime: '17:00' },
  tuesday: { isWorking: true, startTime: '09:00', endTime: '17:00' },
  wednesday: { isWorking: true, startTime: '09:00', endTime: '17:00' },
  thursday: { isWorking: true, startTime: '09:00', endTime: '17:00' },
  friday: { isWorking: true, startTime: '09:00', endTime: '17:00' },
  saturday: { isWorking: false },
  sunday: { isWorking: false },
};

const partTimeHours: WorkingHours = {
  monday: { isWorking: true, startTime: '09:00', endTime: '13:00' },
  tuesday: { isWorking: true, startTime: '09:00', endTime: '13:00' },
  wednesday: { isWorking: true, startTime: '09:00', endTime: '13:00' },
  thursday: { isWorking: false },
  friday: { isWorking: false },
  saturday: { isWorking: false },
  sunday: { isWorking: false },
};

// Super Admin
export const superAdmins: SuperAdmin[] = [
  {
    id: 'super-admin-001',
    email: 'admin@dentalOne.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    phone: '+1 (555) 123-4567',
    role: 'super_admin',
    permissions: ['manage_clinics', 'manage_subscriptions', 'view_analytics', 'manage_users'],
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
  },
];

// Clinic Admins
export const clinicAdmins: ClinicAdmin[] = [
  {
    id: 'admin-001',
    email: 'admin@smilebright.com',
    firstName: 'Michael',
    lastName: 'Chen',
    phone: '+1 (555) 234-5678',
    role: 'admin',
    clinicId: 'clinic-001',
    permissions: ['manage_staff', 'manage_patients', 'view_reports', 'manage_appointments'],
    isActive: true,
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'admin-002',
    email: 'admin@dentalcare.com',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    phone: '+1 (555) 345-6789',
    role: 'admin',
    clinicId: 'clinic-002',
    permissions: ['manage_staff', 'manage_patients', 'view_reports', 'manage_appointments'],
    isActive: true,
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-15'),
  },
];

// Doctors
export const doctors: Doctor[] = [
  {
    id: 'doctor-001',
    email: 'dr.smith@smilebright.com',
    firstName: 'David',
    lastName: 'Smith',
    phone: '+1 (555) 456-7890',
    role: 'doctor',
    clinicId: 'clinic-001',
    specialization: ['General Dentistry', 'Cosmetic Dentistry'],
    licenseNumber: 'DDS-123456',
    experience: 12,
    education: ['DDS - University of California', 'Residency - UCLA Medical Center'],
    workingHours: defaultWorkingHours,
    isActive: true,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'doctor-002',
    email: 'dr.williams@smilebright.com',
    firstName: 'Jennifer',
    lastName: 'Williams',
    phone: '+1 (555) 567-8901',
    role: 'doctor',
    clinicId: 'clinic-001',
    specialization: ['Orthodontics', 'Pediatric Dentistry'],
    licenseNumber: 'DDS-234567',
    experience: 8,
    education: ['DDS - Harvard School of Dental Medicine', 'Orthodontics Residency - Boston University'],
    workingHours: {
      ...defaultWorkingHours,
      wednesday: { isWorking: false },
      saturday: { isWorking: true, startTime: '09:00', endTime: '13:00' },
    },
    isActive: true,
    createdAt: new Date('2024-01-06'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'doctor-003',
    email: 'dr.martinez@dentalcare.com',
    firstName: 'Carlos',
    lastName: 'Martinez',
    phone: '+1 (555) 678-9012',
    role: 'doctor',
    clinicId: 'clinic-002',
    specialization: ['Oral Surgery', 'Implantology'],
    licenseNumber: 'DDS-345678',
    experience: 15,
    education: ['DDS - University of Texas', 'Oral Surgery Residency - MD Anderson'],
    workingHours: defaultWorkingHours,
    isActive: true,
    createdAt: new Date('2024-01-07'),
    updatedAt: new Date('2024-01-15'),
  },
];

// Staff and Receptionists
export const staff: Staff[] = [
  {
    id: 'staff-001',
    email: 'lisa.brown@smilebright.com',
    firstName: 'Lisa',
    lastName: 'Brown',
    phone: '+1 (555) 789-0123',
    role: 'receptionist',
    clinicId: 'clinic-001',
    department: 'Front Desk',
    position: 'Lead Receptionist',
    workingHours: defaultWorkingHours,
    isActive: true,
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'staff-002',
    email: 'mark.davis@smilebright.com',
    firstName: 'Mark',
    lastName: 'Davis',
    phone: '+1 (555) 890-1234',
    role: 'staff',
    clinicId: 'clinic-001',
    department: 'Clinical',
    position: 'Dental Hygienist',
    workingHours: defaultWorkingHours,
    isActive: true,
    createdAt: new Date('2024-01-09'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'staff-003',
    email: 'anna.garcia@dentalcare.com',
    firstName: 'Anna',
    lastName: 'Garcia',
    phone: '+1 (555) 901-2345',
    role: 'receptionist',
    clinicId: 'clinic-002',
    department: 'Front Desk',
    position: 'Receptionist',
    workingHours: partTimeHours,
    isActive: true,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'staff-004',
    email: 'robert.lee@dentalcare.com',
    firstName: 'Robert',
    lastName: 'Lee',
    phone: '+1 (555) 012-3456',
    role: 'staff',
    clinicId: 'clinic-002',
    department: 'Clinical',
    position: 'Dental Assistant',
    workingHours: defaultWorkingHours,
    isActive: true,
    createdAt: new Date('2024-01-11'),
    updatedAt: new Date('2024-01-15'),
  },
];

// Sample addresses
const addresses: Address[] = [
  {
    street: '123 Main Street',
    city: 'Los Angeles',
    state: 'California',
    zipCode: '90210',
    country: 'USA',
  },
  {
    street: '456 Oak Avenue',
    city: 'San Francisco',
    state: 'California',
    zipCode: '94102',
    country: 'USA',
  },
  {
    street: '789 Pine Road',
    city: 'San Diego',
    state: 'California',
    zipCode: '92101',
    country: 'USA',
  },
];

// Patients
export const patients: Patient[] = [
  {
    id: 'patient-001',
    email: 'john.doe@email.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1 (555) 111-2222',
    role: 'patient',
    clinicId: 'clinic-001',
    dateOfBirth: new Date('1985-03-15'),
    gender: 'male',
    address: addresses[0],
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '+1 (555) 111-3333',
    },
    medicalHistory: {
      allergies: ['Penicillin'],
      medications: ['Lisinopril'],
      conditions: ['Hypertension'],
      surgeries: [],
      notes: 'Patient has anxiety about dental procedures',
    },
    status: 'active',
    lastVisit: new Date('2024-01-10'),
    nextAppointment: new Date('2024-02-15'),
    isActive: true,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'patient-002',
    email: 'mary.wilson@email.com',
    firstName: 'Mary',
    lastName: 'Wilson',
    phone: '+1 (555) 222-3333',
    role: 'patient',
    clinicId: 'clinic-001',
    dateOfBirth: new Date('1992-07-22'),
    gender: 'female',
    address: addresses[1],
    emergencyContact: {
      name: 'Tom Wilson',
      relationship: 'Father',
      phone: '+1 (555) 222-4444',
    },
    medicalHistory: {
      allergies: [],
      medications: [],
      conditions: [],
      surgeries: ['Wisdom tooth extraction (2020)'],
      notes: 'Regular patient, good oral hygiene',
    },
    status: 'active',
    lastVisit: new Date('2024-01-08'),
    nextAppointment: new Date('2024-02-20'),
    isActive: true,
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'patient-003',
    email: 'james.taylor@email.com',
    firstName: 'James',
    lastName: 'Taylor',
    phone: '+1 (555) 333-4444',
    role: 'patient',
    clinicId: 'clinic-002',
    dateOfBirth: new Date('1978-11-08'),
    gender: 'male',
    address: addresses[2],
    emergencyContact: {
      name: 'Susan Taylor',
      relationship: 'Spouse',
      phone: '+1 (555) 333-5555',
    },
    medicalHistory: {
      allergies: ['Latex'],
      medications: ['Metformin', 'Atorvastatin'],
      conditions: ['Diabetes Type 2', 'High Cholesterol'],
      surgeries: ['Root canal (2019)'],
      notes: 'Diabetic patient, requires premedication for some procedures',
    },
    status: 'inactive',
    lastVisit: new Date('2023-12-05'),
    isActive: true,
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'patient-004',
    email: 'lisa.johnson@email.com',
    firstName: 'Lisa',
    lastName: 'Johnson',
    phone: '+1 (555) 444-5555',
    role: 'patient',
    clinicId: 'clinic-001',
    dateOfBirth: new Date('1990-05-12'),
    gender: 'female',
    address: addresses[0],
    emergencyContact: {
      name: 'Michael Johnson',
      relationship: 'Husband',
      phone: '+1 (555) 444-6666',
    },
    medicalHistory: {
      allergies: [],
      medications: [],
      conditions: [],
      surgeries: [],
    },
    status: 'new',
    isActive: true,
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
  },
  {
    id: 'patient-005',
    email: 'robert.brown@email.com',
    firstName: 'Robert',
    lastName: 'Brown',
    phone: '+1 (555) 555-6666',
    role: 'patient',
    clinicId: 'clinic-001',
    dateOfBirth: new Date('1975-09-30'),
    gender: 'male',
    address: addresses[1],
    emergencyContact: {
      name: 'Patricia Brown',
      relationship: 'Wife',
      phone: '+1 (555) 555-7777',
    },
    medicalHistory: {
      allergies: ['Sulfa drugs'],
      medications: ['Aspirin'],
      conditions: ['Heart disease'],
      surgeries: ['Bypass surgery (2020)'],
      notes: 'Requires antibiotic prophylaxis',
    },
    status: 'active',
    lastVisit: new Date('2024-01-12'),
    nextAppointment: new Date(),
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-16'),
  },
];

// Combined users array for easier access
export const allUsers = [
  ...superAdmins,
  ...clinicAdmins,
  ...doctors,
  ...staff,
  ...patients,
];

// Helper functions
export function getUserById(id: string) {
  return allUsers.find(user => user.id === id);
}

export function getUsersByClinic(clinicId: string) {
  return allUsers.filter(user => 
    'clinicId' in user && user.clinicId === clinicId
  );
}

export function getUsersByRole(role: string) {
  return allUsers.filter(user => user.role === role);
}

export function getDoctorsByClinic(clinicId: string): Doctor[] {
  return doctors.filter(doctor => doctor.clinicId === clinicId);
}

export function getPatientsByClinic(clinicId: string): Patient[] {
  return patients.filter(patient => patient.clinicId === clinicId);
}