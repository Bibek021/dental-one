// Mock data for multi-clinic management

import type { Clinic, SubscriptionPlan, Subscription } from '../types';

// Subscription Plans
export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for small dental practices getting started',
    price: 99,
    currency: 'USD',
    interval: 'monthly',
    features: [
      'Up to 500 patients',
      'Basic scheduling',
      'Email support',
      '2 staff accounts',
      'Basic reports'
    ],
    maxPatients: 500,
    maxStaff: 2,
    hasAdvancedReporting: false,
    hasApi: false,
    hasCustomBranding: false,
    maxUsers: 2,
    isActive: true,
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Ideal for growing dental practices with advanced needs',
    price: 199,
    currency: 'USD',
    interval: 'monthly',
    features: [
      'Up to 2,000 patients',
      'Advanced scheduling',
      'Priority support',
      '10 staff accounts',
      'Advanced reports',
      'SMS notifications',
      'Inventory management'
    ],
    maxPatients: 2000,
    maxStaff: 10,
    hasAdvancedReporting: true,
    hasApi: false,
    hasCustomBranding: false,
    maxUsers: 10,
    isPopular: true,
    isActive: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Comprehensive solution for multi-location dental groups',
    price: 399,
    currency: 'USD',
    interval: 'monthly',
    features: [
      'Unlimited patients',
      'Multi-location support',
      '24/7 phone support',
      'Unlimited staff accounts',
      'Custom reports',
      'API access',
      'Custom branding',
      'Advanced integrations'
    ],
    maxPatients: -1, // unlimited
    maxStaff: -1, // unlimited
    hasAdvancedReporting: true,
    hasApi: true,
    hasCustomBranding: true,
    maxUsers: -1, // Unlimited
    isActive: true,
  },
];

// Subscriptions
export const subscriptions: Subscription[] = [
  {
    id: 'sub-001',
    clinicId: 'clinic-001',
    planId: 'professional',
    status: 'active',
    startDate: new Date('2023-06-15T00:00:00Z'),
    endDate: new Date('2025-06-15T00:00:00Z'),
    trialEndsAt: undefined,
    currentPeriodStart: new Date('2025-01-15T00:00:00Z'),
    currentPeriodEnd: new Date('2025-02-15T00:00:00Z'),
    cancelAtPeriodEnd: false,
    createdAt: new Date('2023-06-15T09:00:00Z'),
    updatedAt: new Date('2025-01-15T14:30:00Z'),
    metadata: {
      billingEmail: 'billing@smilebright.com',
      paymentMethod: 'card_ending_4242',
      lastPaymentDate: '2025-01-15T00:00:00Z'
    }
  },
  {
    id: 'sub-002',
    clinicId: 'clinic-002',
    planId: 'starter',
    status: 'trial',
    startDate: new Date('2024-01-15T00:00:00Z'),
    endDate: new Date('2025-01-15T00:00:00Z'),
    trialEndsAt: new Date('2025-02-15T00:00:00Z'),
    currentPeriodStart: new Date('2024-01-15T00:00:00Z'),
    currentPeriodEnd: new Date('2025-02-15T00:00:00Z'),
    cancelAtPeriodEnd: false,
    createdAt: new Date('2024-01-15T00:00:00Z'),
    updatedAt: new Date('2024-01-15T00:00:00Z'),
    metadata: {
      billingEmail: 'contact@dentalcare.com',
      paymentMethod: undefined,
      lastPaymentDate: undefined
    }
  },
  {
    id: 'sub-003',
    clinicId: 'clinic-003',
    planId: 'enterprise',
    status: 'active',
    startDate: new Date('2024-01-10T00:00:00Z'),
    endDate: new Date('2025-01-10T00:00:00Z'),
    trialEndsAt: undefined,
    currentPeriodStart: new Date('2025-01-10T00:00:00Z'),
    currentPeriodEnd: new Date('2025-02-10T00:00:00Z'),
    cancelAtPeriodEnd: false,
    createdAt: new Date('2024-01-10T13:45:00Z'),
    updatedAt: new Date('2025-01-15T16:10:00Z'),
    metadata: {
      billingEmail: 'billing@advanceddental.com',
      paymentMethod: 'card_ending_1234',
      lastPaymentDate: '2025-01-10T00:00:00Z'
    }
  }
];

// Clinics
export const clinics: Clinic[] = [
  {
    id: 'clinic-001',
    name: 'SmileBright Dental Care',
    address: {
      street: '1234 Dental Street',
      city: 'Los Angeles',
      state: 'California',
      zipCode: '90210',
      country: 'USA',
    },
    phone: '+1 (555) 123-SMILE',
    email: 'info@smilebright.com',
    website: 'https://www.smilebright.com',
    description: 'A modern dental practice focused on comprehensive care and patient comfort. We offer the latest in dental technology and techniques.',
    subscriptionId: 'sub-001',
    settings: {
      workingHours: {
        monday: { isWorking: true, startTime: '08:00', endTime: '18:00' },
        tuesday: { isWorking: true, startTime: '08:00', endTime: '18:00' },
        wednesday: { isWorking: true, startTime: '08:00', endTime: '18:00' },
        thursday: { isWorking: true, startTime: '08:00', endTime: '18:00' },
        friday: { isWorking: true, startTime: '08:00', endTime: '17:00' },
        saturday: { isWorking: true, startTime: '09:00', endTime: '14:00' },
        sunday: { isWorking: false },
      },
      appointmentDuration: 60,
      timezone: 'America/Los_Angeles',
      currency: 'USD',
      appointmentBuffer: 15,
      allowOnlineBooking: true,
      requireApproval: false,
    },
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'clinic-002',
    name: 'Family Dental Care Center',
    address: {
      street: '5678 Health Boulevard',
      city: 'San Francisco',
      state: 'California',
      zipCode: '94102',
      country: 'USA',
    },
    phone: '+1 (555) 456-CARE',
    email: 'contact@dentalcare.com',
    website: 'https://www.familydentalcare.com',
    description: 'Your neighborhood family dental practice providing gentle, quality care for all ages. We specialize in preventive and restorative dentistry.',
    subscriptionId: 'sub-002',
    settings: {
      workingHours: {
        monday: { isWorking: true, startTime: '09:00', endTime: '17:00' },
        tuesday: { isWorking: true, startTime: '09:00', endTime: '17:00' },
        wednesday: { isWorking: true, startTime: '09:00', endTime: '17:00' },
        thursday: { isWorking: true, startTime: '09:00', endTime: '17:00' },
        friday: { isWorking: true, startTime: '09:00', endTime: '16:00' },
        saturday: { isWorking: false },
        sunday: { isWorking: false },
      },
      appointmentDuration: 45,
      timezone: 'America/Los_Angeles',
      currency: 'USD',
      appointmentBuffer: 10,
      allowOnlineBooking: true,
      requireApproval: true,
    },
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'clinic-003',
    name: 'Advanced Dental Specialists',
    address: {
      street: '9012 Specialist Drive',
      city: 'San Diego',
      state: 'California',
      zipCode: '92101',
      country: 'USA',
    },
    phone: '+1 (555) 789-SPEC',
    email: 'info@advanceddental.com',
    website: 'https://www.advanceddental.com',
    description: 'Specialized dental care including oral surgery, orthodontics, and cosmetic dentistry. State-of-the-art facility with expert specialists.',
    subscriptionId: 'sub-003',
    settings: {
      workingHours: {
        monday: { isWorking: true, startTime: '07:00', endTime: '19:00' },
        tuesday: { isWorking: true, startTime: '07:00', endTime: '19:00' },
        wednesday: { isWorking: true, startTime: '07:00', endTime: '19:00' },
        thursday: { isWorking: true, startTime: '07:00', endTime: '19:00' },
        friday: { isWorking: true, startTime: '07:00', endTime: '18:00' },
        saturday: { isWorking: true, startTime: '08:00', endTime: '16:00' },
        sunday: { isWorking: true, startTime: '10:00', endTime: '15:00' },
      },
      appointmentDuration: 90,
      timezone: 'America/Los_Angeles',
      currency: 'USD',
      appointmentBuffer: 20,
      allowOnlineBooking: false,
      requireApproval: true,
    },
    isActive: true,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-15'),
  },
];

// Helper functions
export function getClinicById(id: string): Clinic | undefined {
  return clinics.find(clinic => clinic.id === id);
}

export function getActiveClinic(): Clinic[] {
  return clinics.filter(clinic => clinic.isActive);
}

export function getSubscriptionByClinic(clinicId: string): Subscription | undefined {
  return subscriptions.find(sub => sub.clinicId === clinicId);
}

export function getPlanById(planId: string): SubscriptionPlan | undefined {
  return subscriptionPlans.find(plan => plan.id === planId);
}

export function getClinicWithSubscription(clinicId: string) {
  const clinic = getClinicById(clinicId);
  if (!clinic) return null;

  const subscription = getSubscriptionByClinic(clinicId);
  if (!subscription) return null;

  const plan = getPlanById(subscription.planId);
  if (!plan) return null;

  return {
    clinic,
    subscription,
    plan,
  };
}

export function getActiveClinics(): Clinic[] {
  return clinics.filter(clinic => {
    const subscription = getSubscriptionByClinic(clinic.id);
    return subscription?.status === 'active';
  });
}

export function getTrialClinics(): Clinic[] {
  return clinics.filter(clinic => {
    const subscription = getSubscriptionByClinic(clinic.id);
    return subscription?.status === 'trial';
  });
}

export function getExpiredClinics(): Clinic[] {
  return clinics.filter(clinic => {
    const subscription = getSubscriptionByClinic(clinic.id);
    return subscription?.status === 'expired';
  });
}

export function getClinicStats() {
  const totalClinics = clinics.length;
  const activeSubs = subscriptions.filter(sub => sub.status === 'active').length;
  const trialSubs = subscriptions.filter(sub => sub.status === 'trial').length;
  const expiredSubs = subscriptions.filter(sub => sub.status === 'expired').length;
  
  const monthlyRevenue = subscriptions
    .filter(sub => sub.status === 'active')
    .reduce((total, sub) => {
      const plan = getPlanById(sub.planId);
      return total + (plan?.price || 0);
    }, 0);

  return {
    totalClinics,
    activeSubs,
    trialSubs,
    expiredSubs,
    monthlyRevenue,
    churnRate: ((expiredSubs / totalClinics) * 100).toFixed(1),
    conversionRate: ((activeSubs / (activeSubs + expiredSubs)) * 100).toFixed(1)
  };
}

// Mock API response helpers
export const mockClinicResponses = {
  // GET /api/clinics
  getClinics: () => ({
    data: clinics,
    total: clinics.length,
    page: 1,
    limit: 50,
    hasMore: false
  }),

  // GET /api/clinics/:id
  getClinic: (id: string) => {
    const clinic = getClinicById(id);
    if (!clinic) {
      return { error: 'Clinic not found', status: 404 };
    }
    return {
      data: {
        ...clinic,
        subscription: getSubscriptionByClinic(id),
        plan: getPlanById(getSubscriptionByClinic(id)?.planId || '')
      }
    };
  },

  // GET /api/clinics/:id/metrics
  getClinicMetrics: (id: string) => {
    // In real app, this would aggregate from patient/appointment/revenue data
    return {
      data: {
        totalPatients: Math.floor(Math.random() * 2000) + 500,
        activeStaff: Math.floor(Math.random() * 15) + 3,
        monthlyRevenue: Math.floor(Math.random() * 50000) + 20000,
        appointmentsThisMonth: Math.floor(Math.random() * 400) + 150,
        completionRate: Math.floor(Math.random() * 20) + 80,
        growthRate: (Math.random() * 40) - 10, // -10% to +30%
        subscriptionStatus: getSubscriptionByClinic(id)?.status || 'inactive',
        lastActivity: new Date()
      }
    };
  },

  // POST /api/clinics
  createClinic: (data: Partial<Clinic>) => ({
    data: {
      id: `clinic-${Date.now()}`,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true
    }
  }),

  // PUT /api/clinics/:id
  updateClinic: (id: string, data: Partial<Clinic>) => {
    const clinic = getClinicById(id);
    if (!clinic) {
      return { error: 'Clinic not found', status: 404 };
    }
    return {
      data: {
        ...clinic,
        ...data,
        updatedAt: new Date()
      }
    };
  },

  // GET /api/subscription-plans
  getSubscriptionPlans: () => ({
    data: subscriptionPlans
  }),

  // GET /api/subscriptions
  getSubscriptions: () => ({
    data: subscriptions,
    stats: getClinicStats()
  })
};