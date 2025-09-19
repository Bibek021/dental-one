// Mock data for billing system

import type { Invoice, Payment, InsuranceClaim, InvoiceItem } from '../types';

// Sample Invoice Items
const createInvoiceItems = (): InvoiceItem[] => [
  {
    id: 'item-001',
    serviceId: 'service-001',
    serviceName: 'Regular Cleaning',
    description: 'Routine dental cleaning and examination',
    quantity: 1,
    unitPrice: 120.00,
    totalPrice: 120.00,
  },
  {
    id: 'item-002',
    serviceId: 'service-002',
    serviceName: 'Tooth Filling',
    description: 'Composite filling for cavity treatment',
    quantity: 2,
    unitPrice: 180.00,
    totalPrice: 360.00,
  },
  {
    id: 'item-003',
    serviceId: 'service-003',
    serviceName: 'Root Canal',
    description: 'Root canal treatment for infected tooth',
    quantity: 1,
    unitPrice: 950.00,
    totalPrice: 950.00,
  },
  {
    id: 'item-004',
    serviceId: 'service-004',
    serviceName: 'Teeth Whitening',
    description: 'Professional teeth whitening treatment',
    quantity: 1,
    unitPrice: 400.00,
    totalPrice: 400.00,
  },
  {
    id: 'item-005',
    serviceId: 'service-005',
    serviceName: 'Dental Crown',
    description: 'Porcelain crown placement',
    quantity: 1,
    unitPrice: 1200.00,
    totalPrice: 1200.00,
  },
];

// Sample Invoices
export const invoices: Invoice[] = [
  {
    id: 'invoice-001',
    patientId: 'patient-001',
    clinicId: 'clinic-001',
    appointmentId: 'appointment-001',
    treatmentId: 'treatment-001',
    invoiceNumber: 'INV-2025-001',
    items: [createInvoiceItems()[0]],
    subtotal: 120.00,
    taxRate: 0.08,
    taxAmount: 9.60,
    discountAmount: 0,
    totalAmount: 129.60,
    status: 'paid',
    issueDate: new Date('2025-09-15'),
    dueDate: new Date('2025-10-15'),
    paidDate: new Date('2025-09-16'),
    notes: 'Payment received via credit card',
    createdAt: new Date('2025-09-15'),
    updatedAt: new Date('2025-09-16'),
  },
  {
    id: 'invoice-002',
    patientId: 'patient-002',
    clinicId: 'clinic-001',
    appointmentId: 'appointment-002',
    treatmentId: 'treatment-002',
    invoiceNumber: 'INV-2025-002',
    items: [createInvoiceItems()[1]],
    subtotal: 360.00,
    taxRate: 0.08,
    taxAmount: 28.80,
    discountAmount: 20.00,
    totalAmount: 368.80,
    status: 'sent',
    issueDate: new Date('2025-09-18'),
    dueDate: new Date('2025-10-18'),
    notes: 'Insurance pre-authorization required',
    createdAt: new Date('2025-09-18'),
    updatedAt: new Date('2025-09-18'),
  },
  {
    id: 'invoice-003',
    patientId: 'patient-003',
    clinicId: 'clinic-001',
    appointmentId: 'appointment-003',
    treatmentId: 'treatment-003',
    invoiceNumber: 'INV-2025-003',
    items: [createInvoiceItems()[2]],
    subtotal: 950.00,
    taxRate: 0.08,
    taxAmount: 76.00,
    discountAmount: 50.00,
    totalAmount: 976.00,
    status: 'overdue',
    issueDate: new Date('2025-08-20'),
    dueDate: new Date('2025-09-20'),
    notes: 'Payment plan available',
    createdAt: new Date('2025-08-20'),
    updatedAt: new Date('2025-09-19'),
  },
  {
    id: 'invoice-004',
    patientId: 'patient-004',
    clinicId: 'clinic-002',
    appointmentId: 'appointment-004',
    invoiceNumber: 'INV-2025-004',
    items: [createInvoiceItems()[3]],
    subtotal: 400.00,
    taxRate: 0.075,
    taxAmount: 30.00,
    discountAmount: 0,
    totalAmount: 430.00,
    status: 'paid',
    issueDate: new Date('2025-09-10'),
    dueDate: new Date('2025-10-10'),
    paidDate: new Date('2025-09-12'),
    notes: 'Cash payment received',
    createdAt: new Date('2025-09-10'),
    updatedAt: new Date('2025-09-12'),
  },
  {
    id: 'invoice-005',
    patientId: 'patient-005',
    clinicId: 'clinic-002',
    appointmentId: 'appointment-005',
    invoiceNumber: 'INV-2025-005',
    items: [createInvoiceItems()[4]],
    subtotal: 1200.00,
    taxRate: 0.075,
    taxAmount: 90.00,
    discountAmount: 100.00,
    totalAmount: 1190.00,
    status: 'sent',
    issueDate: new Date('2025-09-19'),
    dueDate: new Date('2025-10-19'),
    notes: 'Insurance claim submitted',
    createdAt: new Date('2025-09-19'),
    updatedAt: new Date('2025-09-19'),
  },
];

// Sample Payments
export const payments: Payment[] = [
  {
    id: 'payment-001',
    invoiceId: 'invoice-001',
    patientId: 'patient-001',
    clinicId: 'clinic-001',
    amount: 129.60,
    paymentMethod: 'card',
    paymentType: 'full',
    status: 'completed',
    transactionId: 'txn_001_cc',
    notes: 'Visa ending in 1234',
    processedAt: new Date('2025-09-16T10:30:00'),
    createdAt: new Date('2025-09-16T10:30:00'),
    updatedAt: new Date('2025-09-16T10:30:00'),
  },
  {
    id: 'payment-002',
    invoiceId: 'invoice-004',
    patientId: 'patient-004',
    clinicId: 'clinic-002',
    amount: 430.00,
    paymentMethod: 'cash',
    paymentType: 'full',
    status: 'completed',
    notes: 'Cash payment at front desk',
    processedAt: new Date('2025-09-12T14:15:00'),
    createdAt: new Date('2025-09-12T14:15:00'),
    updatedAt: new Date('2025-09-12T14:15:00'),
  },
  {
    id: 'payment-003',
    invoiceId: 'invoice-003',
    patientId: 'patient-003',
    clinicId: 'clinic-001',
    amount: 300.00,
    paymentMethod: 'bank_transfer',
    paymentType: 'partial',
    status: 'completed',
    transactionId: 'txn_003_bt',
    notes: 'Partial payment - payment plan',
    processedAt: new Date('2025-09-05T09:20:00'),
    createdAt: new Date('2025-09-05T09:20:00'),
    updatedAt: new Date('2025-09-05T09:20:00'),
  },
  {
    id: 'payment-004',
    invoiceId: 'invoice-002',
    patientId: 'patient-002',
    clinicId: 'clinic-001',
    amount: 100.00,
    paymentMethod: 'card',
    paymentType: 'deposit',
    status: 'pending',
    transactionId: 'txn_004_cc_pending',
    notes: 'Deposit payment - awaiting insurance',
    processedAt: new Date('2025-09-18T16:45:00'),
    createdAt: new Date('2025-09-18T16:45:00'),
    updatedAt: new Date('2025-09-18T16:45:00'),
  },
];

// Sample Insurance Claims
export const insuranceClaims: InsuranceClaim[] = [
  {
    id: 'claim-001',
    invoiceId: 'invoice-002',
    patientId: 'patient-002',
    clinicId: 'clinic-001',
    insuranceProvider: 'Blue Cross Blue Shield',
    policyNumber: 'BCBS-987654321',
    claimNumber: 'CLM-2025-001',
    submissionDate: new Date('2025-09-18'),
    status: 'processing',
    claimedAmount: 360.00,
    notes: 'Routine filling covered under plan',
    createdAt: new Date('2025-09-18'),
    updatedAt: new Date('2025-09-18'),
  },
  {
    id: 'claim-002',
    invoiceId: 'invoice-005',
    patientId: 'patient-005',
    clinicId: 'clinic-002',
    insuranceProvider: 'Aetna Dental',
    policyNumber: 'AETNA-123456789',
    claimNumber: 'CLM-2025-002',
    submissionDate: new Date('2025-09-19'),
    status: 'submitted',
    claimedAmount: 1200.00,
    notes: 'Crown procedure - major coverage',
    createdAt: new Date('2025-09-19'),
    updatedAt: new Date('2025-09-19'),
  },
  {
    id: 'claim-003',
    invoiceId: 'invoice-003',
    patientId: 'patient-003',
    clinicId: 'clinic-001',
    insuranceProvider: 'Delta Dental',
    policyNumber: 'DELTA-555666777',
    claimNumber: 'CLM-2025-003',
    submissionDate: new Date('2025-08-25'),
    status: 'approved',
    claimedAmount: 950.00,
    approvedAmount: 750.00,
    paidAmount: 750.00,
    notes: 'Approved with standard coverage',
    createdAt: new Date('2025-08-25'),
    updatedAt: new Date('2025-09-15'),
  },
];

// Utility functions for billing data
export const getInvoicesByClinic = (clinicId: string) => 
  invoices.filter(invoice => invoice.clinicId === clinicId);

export const getPaymentsByClinic = (clinicId: string) => 
  payments.filter(payment => payment.clinicId === clinicId);

export const getClaimsByClinic = (clinicId: string) => 
  insuranceClaims.filter(claim => claim.clinicId === clinicId);

export const getInvoicesByPatient = (patientId: string) => 
  invoices.filter(invoice => invoice.patientId === patientId);

export const getPaymentsByInvoice = (invoiceId: string) => 
  payments.filter(payment => payment.invoiceId === invoiceId);

export const getClaimsByInvoice = (invoiceId: string) => 
  insuranceClaims.filter(claim => claim.invoiceId === invoiceId);

// Statistics functions
export const getBillingStats = (clinicId?: string) => {
  const clinicInvoices = clinicId ? getInvoicesByClinic(clinicId) : invoices;
  const clinicPayments = clinicId ? getPaymentsByClinic(clinicId) : payments;
  
  const totalRevenue = clinicPayments
    .filter(payment => payment.status === 'completed')
    .reduce((sum, payment) => sum + payment.amount, 0);
    
  const pendingRevenue = clinicInvoices
    .filter(invoice => ['sent', 'viewed', 'overdue'].includes(invoice.status))
    .reduce((sum, invoice) => sum + invoice.totalAmount, 0);
    
  const overdueRevenue = clinicInvoices
    .filter(invoice => invoice.status === 'overdue')
    .reduce((sum, invoice) => sum + invoice.totalAmount, 0);
    
  return {
    totalInvoices: clinicInvoices.length,
    totalRevenue,
    pendingRevenue,
    overdueRevenue,
    averageInvoiceValue: clinicInvoices.length > 0 ? 
      clinicInvoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0) / clinicInvoices.length : 0,
  };
};