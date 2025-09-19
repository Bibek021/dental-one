// Mock data for dental services

import type { DentalService } from '../types';

export const dentalServices: DentalService[] = [
  // Preventive Care
  {
    id: 'service-001',
    name: 'Regular Cleaning',
    description: 'Professional teeth cleaning and polishing to remove plaque and tartar buildup',
    category: 'Preventive Care',
    duration: 45,
    cost: 120,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'service-002',
    name: 'Dental Examination',
    description: 'Comprehensive oral health examination including X-rays and cavity detection',
    category: 'Preventive Care',
    duration: 30,
    cost: 80,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'service-003',
    name: 'Fluoride Treatment',
    description: 'Fluoride application to strengthen tooth enamel and prevent cavities',
    category: 'Preventive Care',
    duration: 20,
    cost: 50,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'service-004',
    name: 'Dental Sealants',
    description: 'Protective coating applied to back teeth to prevent decay',
    category: 'Preventive Care',
    duration: 30,
    cost: 75,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },

  // Restorative Dentistry
  {
    id: 'service-005',
    name: 'Dental Filling',
    description: 'Tooth-colored composite or amalgam fillings for cavity repair',
    category: 'Restorative Dentistry',
    duration: 60,
    cost: 180,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'service-006',
    name: 'Dental Crown',
    description: 'Custom-made cap to restore damaged or weakened teeth',
    category: 'Restorative Dentistry',
    duration: 120,
    cost: 950,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'service-007',
    name: 'Dental Bridge',
    description: 'Fixed prosthetic to replace one or more missing teeth',
    category: 'Restorative Dentistry',
    duration: 150,
    cost: 1200,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'service-008',
    name: 'Root Canal Treatment',
    description: 'Endodontic treatment to save infected or severely decayed teeth',
    category: 'Restorative Dentistry',
    duration: 90,
    cost: 800,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },

  // Cosmetic Dentistry
  {
    id: 'service-009',
    name: 'Teeth Whitening',
    description: 'Professional whitening treatment for brighter, whiter teeth',
    category: 'Cosmetic Dentistry',
    duration: 75,
    cost: 400,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'service-010',
    name: 'Porcelain Veneers',
    description: 'Ultra-thin shells to improve the appearance of front teeth',
    category: 'Cosmetic Dentistry',
    duration: 120,
    cost: 1100,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'service-011',
    name: 'Dental Bonding',
    description: 'Tooth-colored resin application to repair chips, cracks, or gaps',
    category: 'Cosmetic Dentistry',
    duration: 45,
    cost: 250,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },

  // Oral Surgery
  {
    id: 'service-012',
    name: 'Tooth Extraction',
    description: 'Safe removal of damaged, decayed, or problematic teeth',
    category: 'Oral Surgery',
    duration: 45,
    cost: 200,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'service-013',
    name: 'Wisdom Tooth Removal',
    description: 'Surgical extraction of impacted or problematic wisdom teeth',
    category: 'Oral Surgery',
    duration: 90,
    cost: 350,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'service-014',
    name: 'Dental Implant',
    description: 'Permanent tooth replacement with titanium implant and crown',
    category: 'Oral Surgery',
    duration: 180,
    cost: 2500,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },

  // Orthodontics
  {
    id: 'service-015',
    name: 'Traditional Braces',
    description: 'Metal brackets and wires for comprehensive teeth straightening',
    category: 'Orthodontics',
    duration: 60,
    cost: 4500,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'service-016',
    name: 'Clear Aligners',
    description: 'Invisible orthodontic treatment using custom-made aligners',
    category: 'Orthodontics',
    duration: 45,
    cost: 3800,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'service-017',
    name: 'Retainer',
    description: 'Custom appliance to maintain teeth position after orthodontic treatment',
    category: 'Orthodontics',
    duration: 30,
    cost: 300,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },

  // Pediatric Dentistry
  {
    id: 'service-018',
    name: 'Children\'s Cleaning',
    description: 'Gentle dental cleaning specifically designed for children',
    category: 'Pediatric Dentistry',
    duration: 30,
    cost: 90,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'service-019',
    name: 'Space Maintainer',
    description: 'Device to preserve space for permanent teeth in children',
    category: 'Pediatric Dentistry',
    duration: 45,
    cost: 200,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },

  // Emergency Dentistry
  {
    id: 'service-020',
    name: 'Emergency Consultation',
    description: 'Urgent dental assessment and pain management',
    category: 'Emergency Dentistry',
    duration: 30,
    cost: 120,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
];

export const serviceCategories = [
  'Preventive Care',
  'Restorative Dentistry',
  'Cosmetic Dentistry',
  'Oral Surgery',
  'Orthodontics',
  'Pediatric Dentistry',
  'Emergency Dentistry',
];

// Helper functions for services
export function getServicesByCategory(category: string): DentalService[] {
  return dentalServices.filter(service => service.category === category);
}

export function getServiceById(id: string): DentalService | undefined {
  return dentalServices.find(service => service.id === id);
}

export function getActiveServices(): DentalService[] {
  return dentalServices.filter(service => service.isActive);
}