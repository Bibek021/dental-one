// Export all mock data from a single location

export * from './services';
export * from './users';
export * from './clinics';

// Re-export commonly used data for easy access
export { dentalServices, serviceCategories } from './services';
export { allUsers, superAdmins, clinicAdmins, doctors, staff, patients } from './users';
export { clinics, subscriptionPlans, subscriptions } from './clinics';