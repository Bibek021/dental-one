// Base types for the application

export type UserRole = 
  | 'super_admin' 
  | 'admin' 
  | 'doctor' 
  | 'staff' 
  | 'receptionist' 
  | 'patient';

export type SubscriptionStatus = 'active' | 'inactive' | 'trial' | 'expired';
export type AppointmentStatus = 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
export type TreatmentStatus = 'planned' | 'in_progress' | 'completed' | 'cancelled';

// User related types
export interface BaseUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SuperAdmin extends BaseUser {
  role: 'super_admin';
  permissions: string[];
}

export interface ClinicAdmin extends BaseUser {
  role: 'admin';
  clinicId: string;
  permissions: string[];
}

export interface Doctor extends BaseUser {
  role: 'doctor';
  clinicId: string;
  specialization: string[];
  licenseNumber: string;
  experience: number;
  education: string[];
  workingHours: WorkingHours;
}

export interface Staff extends BaseUser {
  role: 'staff' | 'receptionist';
  clinicId: string;
  department: string;
  position: string;
  workingHours: WorkingHours;
}

export interface Patient extends BaseUser {
  role: 'patient';
  clinicId?: string;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  address: Address;
  emergencyContact: EmergencyContact;
  medicalHistory: MedicalHistory;
  insuranceInfo?: InsuranceInfo;
  status: 'active' | 'inactive' | 'new';
  lastVisit?: Date;
  nextAppointment?: Date;
}

// Clinic related types
export interface Clinic {
  id: string;
  name: string;
  address: Address;
  phone: string;
  email: string;
  website?: string;
  logo?: string;
  description?: string;
  subscriptionId: string;
  settings: ClinicSettings;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClinicSettings {
  workingHours: WorkingHours;
  appointmentDuration: number; // in minutes
  timezone: string;
  currency: string;
  appointmentBuffer: number; // buffer time between appointments
  allowOnlineBooking: boolean;
  requireApproval: boolean;
}

// Subscription related types
export interface Subscription {
  id: string;
  clinicId: string;
  planId: string;
  status: SubscriptionStatus;
  startDate: Date;
  endDate: Date;
  trialEndsAt?: Date;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  createdAt: Date;
  updatedAt: Date;
  metadata?: {
    billingEmail?: string;
    paymentMethod?: string;
    lastPaymentDate?: string;
  };
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: 'monthly' | 'yearly';
  features: string[];
  maxUsers: number;
  maxPatients: number;
  maxStaff: number;
  hasAdvancedReporting: boolean;
  hasApi: boolean;
  hasCustomBranding: boolean;
  isPopular?: boolean;
  isActive: boolean;
}

// Appointment related types
export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  clinicId: string;
  serviceIds: string[];
  startTime: Date;
  endTime: Date;
  status: AppointmentStatus;
  notes?: string;
  symptoms?: string;
  isFollowUp: boolean;
  parentAppointmentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Treatment related types
export interface Treatment {
  id: string;
  appointmentId: string;
  patientId: string;
  doctorId: string;
  clinicId: string;
  serviceId: string;
  diagnosis: string;
  treatmentPlan: string;
  notes?: string;
  prescriptions: Prescription[];
  status: TreatmentStatus;
  cost: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DentalService {
  id: string;
  clinicId?: string; // null for default services
  name: string;
  description: string;
  category: string;
  duration: number; // in minutes
  cost: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Supporting types
export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface MedicalHistory {
  allergies: string[];
  medications: string[];
  conditions: string[];
  surgeries: string[];
  notes?: string;
}

export interface InsuranceInfo {
  provider: string;
  policyNumber: string;
  groupNumber?: string;
  expiryDate: Date;
}

export interface WorkingHours {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export interface DaySchedule {
  isWorking: boolean;
  startTime?: string; // "09:00"
  endTime?: string;   // "17:00"
  breaks?: TimeSlot[];
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
}

export interface Prescription {
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  role: UserRole;
  clinicId?: string;
}

// Theme types
export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  isDark: boolean;
}

// Billing & Payment types
export interface Invoice {
  id: string;
  patientId: string;
  clinicId: string;
  appointmentId?: string;
  treatmentId?: string;
  invoiceNumber: string;
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  status: InvoiceStatus;
  issueDate: Date;
  dueDate: Date;
  paidDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InvoiceItem {
  id: string;
  serviceId: string;
  serviceName: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Payment {
  id: string;
  invoiceId: string;
  patientId: string;
  clinicId: string;
  amount: number;
  paymentMethod: PaymentMethod;
  paymentType: PaymentType;
  status: PaymentStatus;
  transactionId?: string;
  notes?: string;
  processedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface InsuranceClaim {
  id: string;
  invoiceId: string;
  patientId: string;
  clinicId: string;
  insuranceProvider: string;
  policyNumber: string;
  claimNumber?: string;
  submissionDate: Date;
  status: ClaimStatus;
  claimedAmount: number;
  approvedAmount?: number;
  paidAmount?: number;
  rejectionReason?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type InvoiceStatus = 'draft' | 'sent' | 'viewed' | 'paid' | 'overdue' | 'cancelled';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded' | 'cancelled';
export type PaymentMethod = 'cash' | 'card' | 'check' | 'bank_transfer' | 'insurance';
export type PaymentType = 'full' | 'partial' | 'deposit' | 'refund';
export type ClaimStatus = 'draft' | 'submitted' | 'processing' | 'approved' | 'rejected' | 'paid';

// Multi-Clinic & Advanced Features Types
export interface ClinicMetrics {
  totalPatients: number;
  activeStaff: number;
  monthlyRevenue: number;
  appointmentsThisMonth: number;
  completionRate: number;
  growthRate: number;
  subscriptionStatus: SubscriptionStatus;
  lastActivity: Date;
}

export interface NotificationPreferences {
  userId: string;
  email: {
    appointments: boolean;
    payments: boolean;
    reminders: boolean;
    system: boolean;
  };
  sms: {
    appointments: boolean;
    payments: boolean;
    reminders: boolean;
    system: boolean;
  };
  push: {
    appointments: boolean;
    payments: boolean;
    reminders: boolean;
    system: boolean;
  };
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
  frequency: {
    immediate: string[];
    daily: string[];
    weekly: string[];
  };
}

export interface FileUpload {
  id: string;
  fileName: string;
  originalName: string;
  fileType: string;
  fileSize: number;
  uploadedBy: string;
  uploadedAt: Date;
  category: FileCategory;
  associatedId?: string; // patient, treatment, etc.
  isPublic: boolean;
  downloadUrl: string;
  thumbnailUrl?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  isRead: boolean;
  isArchived?: boolean;
  recipientId: string;
  createdAt: Date;
  metadata?: Record<string, any>;
}

export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  type: ReportType;
  parameters: ReportParameter[];
  schedule?: ReportSchedule;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReportSchedule {
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  dayOfWeek?: number;
  dayOfMonth?: number;
  time: string;
  recipients: string[];
  format: 'pdf' | 'excel' | 'csv';
}

export interface ReportParameter {
  key: string;
  label: string;
  type: 'string' | 'number' | 'date' | 'boolean' | 'select';
  required: boolean;
  defaultValue?: any;
  options?: { value: any; label: string }[];
}

export type FileCategory = 'xray' | 'treatment' | 'consent' | 'insurance' | 'policy' | 'report' | 'document' | 'image';
export type NotificationType = 'appointment' | 'payment' | 'system' | 'marketing' | 'alert' | 'reminder';
export type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent';
export type ReportType = 'financial' | 'clinical' | 'operational' | 'patient' | 'staff' | 'custom';