// Billing Management Dashboard

import { useState, useMemo } from 'react';
import { 
  DollarSign,
  FileText, 
  CreditCard, 
  AlertCircle, 
  Calendar,
  Search,
  Plus,
  Download,
  Eye,
  Edit,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { invoices, payments, insuranceClaims, getBillingStats } from '../../data/billing';
import { allUsers } from '../../data/users';
import { formatCurrency, formatDate } from '../../utils';
import type { Invoice } from '../../types';

type BillingView = 'overview' | 'invoices' | 'payments' | 'claims';

export function BillingManagement() {
  const [activeView, setActiveView] = useState<BillingView>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const stats = getBillingStats();

  const getPatientName = (patientId: string) => {
    const patient = allUsers.find((u: any) => u.id === patientId && u.role === 'patient');
    return patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient';
  };

  const filteredInvoices = useMemo(() => {
    return invoices.filter(invoice => {
      const patientName = getPatientName(invoice.patientId).toLowerCase();
      const invoiceNumber = invoice.invoiceNumber.toLowerCase();
      const query = searchQuery.toLowerCase();
      
      const matchesSearch = patientName.includes(query) || invoiceNumber.includes(query);
      const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
      
      let matchesDate = true;
      if (dateFilter !== 'all') {
        const now = new Date();
        const invoiceDate = new Date(invoice.issueDate);
        
        switch (dateFilter) {
          case 'today':
            matchesDate = invoiceDate.toDateString() === now.toDateString();
            break;
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            matchesDate = invoiceDate >= weekAgo;
            break;
          case 'month':
            matchesDate = invoiceDate.getMonth() === now.getMonth() && 
                         invoiceDate.getFullYear() === now.getFullYear();
            break;
        }
      }
      
      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [searchQuery, statusFilter, dateFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Billing & Payments
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage invoices, payments, and insurance claims
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Invoice
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview', icon: TrendingUp },
          { id: 'invoices', label: 'Invoices', icon: FileText },
          { id: 'payments', label: 'Payments', icon: CreditCard },
          { id: 'claims', label: 'Insurance Claims', icon: AlertCircle },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveView(id as BillingView)}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeView === id
                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Content Based on Active View */}
      {activeView === 'overview' && <BillingOverview stats={stats} />}
      {activeView === 'invoices' && (
        <InvoicesTab
          invoices={filteredInvoices}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          getPatientName={getPatientName}
        />
      )}
      {activeView === 'payments' && <PaymentsTab getPatientName={getPatientName} />}
      {activeView === 'claims' && <ClaimsTab getPatientName={getPatientName} />}
    </div>
  );
}

// Billing Overview Component
function BillingOverview({ stats }: { stats: ReturnType<typeof getBillingStats> }) {
  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Revenue
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(stats.totalRevenue)}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600 dark:text-green-400">+12.5% from last month</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Pending Revenue
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(stats.pendingRevenue)}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {((stats.pendingRevenue / (stats.totalRevenue + stats.pendingRevenue)) * 100).toFixed(1)}% of total
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Overdue Amount
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(stats.overdueRevenue)}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            <span className="text-sm text-red-600 dark:text-red-400">Needs attention</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Invoices
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.totalInvoices}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Avg: {formatCurrency(stats.averageInvoiceValue)}
            </span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Invoices */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Invoices
          </h3>
          <div className="space-y-4">
            {invoices.slice(0, 5).map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {invoice.invoiceNumber}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {formatDate(invoice.issueDate)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(invoice.totalAmount)}
                  </p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    invoice.status === 'paid'
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      : invoice.status === 'overdue'
                      ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                      : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                  }`}>
                    {invoice.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Payments */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Payments
          </h3>
          <div className="space-y-4">
            {payments.slice(0, 5).map((payment) => (
              <div key={payment.id} className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {payment.paymentMethod.replace('_', ' ').toUpperCase()}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {formatDate(payment.processedAt)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(payment.amount)}
                  </p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    payment.status === 'completed'
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      : payment.status === 'failed'
                      ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                      : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                  }`}>
                    {payment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Invoices Tab Component
function InvoicesTab({
  invoices,
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  dateFilter,
  setDateFilter,
  getPatientName,
}: {
  invoices: Invoice[];
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  dateFilter: string;
  setDateFilter: (value: string) => void;
  getPatientName: (patientId: string) => string;
}) {
  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search invoices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
        <div className="flex gap-2">
          <Select
            value={statusFilter}
            onChange={(value) => setStatusFilter(String(value))}
            options={[
              { value: 'all', label: 'All Status' },
              { value: 'draft', label: 'Draft' },
              { value: 'sent', label: 'Sent' },
              { value: 'paid', label: 'Paid' },
              { value: 'overdue', label: 'Overdue' },
            ]}
          />
          <Select
            value={dateFilter}
            onChange={(value) => setDateFilter(String(value))}
            options={[
              { value: 'all', label: 'All Time' },
              { value: 'today', label: 'Today' },
              { value: 'week', label: 'This Week' },
              { value: 'month', label: 'This Month' },
            ]}
          />
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {invoice.invoiceNumber}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(invoice.issueDate)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {getPatientName(invoice.patientId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {formatCurrency(invoice.totalAmount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      invoice.status === 'paid'
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        : invoice.status === 'overdue'
                        ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                        : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {formatDate(invoice.dueDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Payments Tab Component
function PaymentsTab({ getPatientName }: { getPatientName: (patientId: string) => string }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Payment ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Patient
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Method
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {payments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {payment.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {getPatientName(payment.patientId)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {formatCurrency(payment.amount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white capitalize">
                  {payment.paymentMethod.replace('_', ' ')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    payment.status === 'completed'
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      : payment.status === 'failed'
                      ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                      : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                  }`}>
                    {payment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {formatDate(payment.processedAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Claims Tab Component
function ClaimsTab({ getPatientName }: { getPatientName: (patientId: string) => string }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Claim Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Patient
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Insurance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Submitted
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {insuranceClaims.map((claim) => (
              <tr key={claim.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {claim.claimNumber || 'Pending'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {getPatientName(claim.patientId)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {claim.insuranceProvider}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {formatCurrency(claim.claimedAmount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    claim.status === 'approved' || claim.status === 'paid'
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      : claim.status === 'rejected'
                      ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                      : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                  }`}>
                    {claim.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {formatDate(claim.submissionDate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}