import { useState } from 'react';
import {
  FileText,
  Search,
  Plus,
  Calendar,
  User,
  Stethoscope,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  PlayCircle,
  Pill,
  FileEdit,
  Eye,
  Download
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import {
  treatments,
  getTreatmentsByStatus,
  getRecentTreatments,
  getTreatmentStats
} from '../../data/treatments';
import { allUsers } from '../../data/users';
import { dentalServices } from '../../data/services';
import type { Treatment, TreatmentStatus } from '../../types';

type ViewMode = 'list' | 'grid' | 'timeline';

export function TreatmentsManagement() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [statusFilter, setStatusFilter] = useState<TreatmentStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState<'all' | '7days' | '30days' | '90days'>('all');
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);

  // Get filtered treatments
  const getFilteredTreatments = () => {
    let filteredTreatments: Treatment[];

    // Apply status filter
    if (statusFilter !== 'all') {
      filteredTreatments = getTreatmentsByStatus(statusFilter);
    } else {
      filteredTreatments = [...treatments];
    }

    // Apply date filter
    if (dateFilter !== 'all') {
      const days = dateFilter === '7days' ? 7 : dateFilter === '30days' ? 30 : 90;
      const recentTreatments = getRecentTreatments(days);
      const recentIds = new Set(recentTreatments.map(t => t.id));
      filteredTreatments = filteredTreatments.filter(t => recentIds.has(t.id));
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredTreatments = filteredTreatments.filter(treatment => {
        const patient = allUsers.find((u: any) => u.id === treatment.patientId);
        const doctor = allUsers.find((u: any) => u.id === treatment.doctorId);
        const service = dentalServices.find((s: any) => s.id === treatment.serviceId);

        const patientName = patient ? `${patient.firstName} ${patient.lastName}` : '';
        const doctorName = doctor ? `${doctor.firstName} ${doctor.lastName}` : '';

        return (
          patientName.toLowerCase().includes(query) ||
          doctorName.toLowerCase().includes(query) ||
          treatment.diagnosis.toLowerCase().includes(query) ||
          treatment.treatmentPlan.toLowerCase().includes(query) ||
          treatment.notes?.toLowerCase().includes(query) ||
          service?.name.toLowerCase().includes(query)
        );
      });
    }

    return filteredTreatments;
  };

  const filteredTreatments = getFilteredTreatments();
  const stats = getTreatmentStats();

  // Helper function for currency formatting
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleTreatmentClick = (treatment: Treatment) => {
    setSelectedTreatment(treatment);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Treatment Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage patient treatments, plans, and medical records
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Treatment
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Treatments</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Planned</p>
              <p className="text-2xl font-bold text-blue-600">{stats.planned}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">In Progress</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.inProgress}</p>
            </div>
            <PlayCircle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
              <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Revenue</p>
              <p className="text-xl font-bold text-green-600">{formatCurrency(stats.totalRevenue)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Cost</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{formatCurrency(stats.averageCost)}</p>
            </div>
            <FileText className="w-8 h-8 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* View Mode Toggle */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 text-sm rounded-l-lg ${
                  viewMode === 'list' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                List
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 text-sm ${
                  viewMode === 'grid' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('timeline')}
                className={`px-3 py-1 text-sm rounded-r-lg ${
                  viewMode === 'timeline' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Timeline
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search treatments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-64"
              />
            </div>
            
            <Select
              options={[
                { label: 'All Status', value: 'all' },
                { label: 'Planned', value: 'planned' },
                { label: 'In Progress', value: 'in_progress' },
                { label: 'Completed', value: 'completed' },
                { label: 'Cancelled', value: 'cancelled' }
              ]}
              value={statusFilter}
              onChange={(value) => setStatusFilter(value as TreatmentStatus | 'all')}
            />
            
            <Select
              options={[
                { label: 'All Time', value: 'all' },
                { label: 'Last 7 days', value: '7days' },
                { label: 'Last 30 days', value: '30days' },
                { label: 'Last 90 days', value: '90days' }
              ]}
              value={dateFilter}
              onChange={(value) => setDateFilter(value as 'all' | '7days' | '30days' | '90days')}
            />
          </div>
        </div>
      </div>

      {/* Treatment Content */}
      {viewMode === 'list' ? (
        <TreatmentsList 
          treatments={filteredTreatments}
          onTreatmentClick={handleTreatmentClick}
        />
      ) : viewMode === 'grid' ? (
        <TreatmentsGrid 
          treatments={filteredTreatments}
          onTreatmentClick={handleTreatmentClick}
        />
      ) : (
        <TreatmentsTimeline 
          treatments={filteredTreatments}
          onTreatmentClick={handleTreatmentClick}
        />
      )}

      {/* Treatment Details Modal */}
      {selectedTreatment && (
        <TreatmentDetailsModal 
          treatment={selectedTreatment}
          onClose={() => setSelectedTreatment(null)}
        />
      )}
    </div>
  );
}

// Treatment List Component
function TreatmentsList({ 
  treatments, 
  onTreatmentClick 
}: { 
  treatments: Treatment[];
  onTreatmentClick: (treatment: Treatment) => void;
}) {
  if (treatments.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No treatments found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Try adjusting your filters or create a new treatment record.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Patient
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Diagnosis
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Treatment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Doctor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Cost
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {treatments.map((treatment) => (
              <TreatmentRow 
                key={treatment.id}
                treatment={treatment}
                onClick={onTreatmentClick}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Treatment Row Component
function TreatmentRow({ 
  treatment, 
  onClick 
}: { 
  treatment: Treatment;
  onClick: (treatment: Treatment) => void;
}) {
  const getPatientName = (patientId: string) => {
    const patient = allUsers.find((u: any) => u.id === patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient';
  };

  const getDoctorName = (doctorId: string) => {
    const doctor = allUsers.find((u: any) => u.id === doctorId);
    return doctor ? `${doctor.firstName} ${doctor.lastName}` : 'Unknown Doctor';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: TreatmentStatus) => {
    switch (status) {
      case 'planned':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <tr 
      className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
      onClick={() => onClick(treatment)}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <User className="w-8 h-8 text-gray-400 mr-3" />
          <div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {getPatientName(treatment.patientId)}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900 dark:text-white font-medium">
          {treatment.diagnosis}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          {treatment.treatmentPlan}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <Stethoscope className="w-4 h-4 text-gray-400 mr-2" />
          <div className="text-sm text-gray-900 dark:text-white">
            Dr. {getDoctorName(treatment.doctorId)}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(treatment.status)}`}>
          {treatment.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-medium">
        {formatCurrency(treatment.cost)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
        {formatDate(treatment.createdAt)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end space-x-2">
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <FileEdit className="w-4 h-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
}

// Treatment Grid Component
function TreatmentsGrid({ 
  treatments, 
  onTreatmentClick 
}: { 
  treatments: Treatment[];
  onTreatmentClick: (treatment: Treatment) => void;
}) {
  if (treatments.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No treatments found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Try adjusting your filters or create a new treatment record.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {treatments.map((treatment) => (
        <TreatmentCard 
          key={treatment.id}
          treatment={treatment}
          onClick={onTreatmentClick}
        />
      ))}
    </div>
  );
}

// Treatment Card Component
function TreatmentCard({ 
  treatment, 
  onClick 
}: { 
  treatment: Treatment;
  onClick: (treatment: Treatment) => void;
}) {
  const getPatientName = (patientId: string) => {
    const patient = allUsers.find((u: any) => u.id === patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient';
  };

  const getDoctorName = (doctorId: string) => {
    const doctor = allUsers.find((u: any) => u.id === doctorId);
    return doctor ? `${doctor.firstName} ${doctor.lastName}` : 'Unknown Doctor';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: TreatmentStatus) => {
    switch (status) {
      case 'planned':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: TreatmentStatus) => {
    switch (status) {
      case 'planned':
        return <Clock className="w-4 h-4" />;
      case 'in_progress':
        return <PlayCircle className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div 
      onClick={() => onClick(treatment)}
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:border-blue-300 dark:hover:border-blue-600 cursor-pointer transition-colors"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${getStatusColor(treatment.status)}`}>
            {getStatusIcon(treatment.status)}
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">
              {getPatientName(treatment.patientId)}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {formatDate(treatment.createdAt)}
            </p>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(treatment.status)}`}>
          {treatment.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </span>
      </div>

      <div className="space-y-3">
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">
            Diagnosis
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {treatment.diagnosis}
          </p>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">
            Treatment Plan
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {treatment.treatmentPlan}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Stethoscope className="w-4 h-4" />
            Dr. {getDoctorName(treatment.doctorId)}
          </div>
          <div className="font-semibold text-gray-900 dark:text-white">
            {formatCurrency(treatment.cost)}
          </div>
        </div>

        {treatment.prescriptions.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
            <Pill className="w-4 h-4" />
            {treatment.prescriptions.length} prescription{treatment.prescriptions.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  );
}

// Treatment Timeline Component
function TreatmentsTimeline({ 
  treatments, 
  onTreatmentClick 
}: { 
  treatments: Treatment[];
  onTreatmentClick: (treatment: Treatment) => void;
}) {
  // Group treatments by month for timeline view
  const groupedTreatments = treatments.reduce((groups, treatment) => {
    const monthKey = treatment.createdAt.toISOString().substring(0, 7); // YYYY-MM
    if (!groups[monthKey]) {
      groups[monthKey] = [];
    }
    groups[monthKey].push(treatment);
    return groups;
  }, {} as Record<string, Treatment[]>);

  const sortedMonths = Object.keys(groupedTreatments).sort().reverse();

  if (treatments.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No treatments found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Try adjusting your filters or create a new treatment record.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {sortedMonths.map((monthKey) => {
        const monthTreatments = groupedTreatments[monthKey];
        const monthDate = new Date(monthKey + '-01');
        const monthName = monthDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long'
        });

        return (
          <div key={monthKey} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {monthName}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {monthTreatments.length} treatment{monthTreatments.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {monthTreatments
                  .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                  .map((treatment) => (
                    <TreatmentTimelineItem 
                      key={treatment.id}
                      treatment={treatment}
                      onClick={onTreatmentClick}
                    />
                  ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Treatment Timeline Item Component
function TreatmentTimelineItem({ 
  treatment, 
  onClick 
}: { 
  treatment: Treatment;
  onClick: (treatment: Treatment) => void;
}) {
  const getPatientName = (patientId: string) => {
    const patient = allUsers.find((u: any) => u.id === patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient';
  };

  const getDoctorName = (doctorId: string) => {
    const doctor = allUsers.find((u: any) => u.id === doctorId);
    return doctor ? `${doctor.firstName} ${doctor.lastName}` : 'Unknown Doctor';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: TreatmentStatus) => {
    switch (status) {
      case 'planned':
        return 'bg-blue-500';
      case 'in_progress':
        return 'bg-yellow-500';
      case 'completed':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div 
      onClick={() => onClick(treatment)}
      className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 cursor-pointer transition-colors"
    >
      <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${getStatusColor(treatment.status)}`} />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">
              {getPatientName(treatment.patientId)} - {treatment.diagnosis}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {treatment.treatmentPlan}
            </p>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <Stethoscope className="w-4 h-4" />
                Dr. {getDoctorName(treatment.doctorId)}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(treatment.createdAt)}
              </span>
              {treatment.prescriptions.length > 0 && (
                <span className="flex items-center gap-1">
                  <Pill className="w-4 h-4" />
                  {treatment.prescriptions.length} Rx
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="font-semibold text-gray-900 dark:text-white">
              {formatCurrency(treatment.cost)}
            </div>
            <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 mt-1">
              {treatment.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Treatment Details Modal Component
function TreatmentDetailsModal({ 
  treatment, 
  onClose 
}: { 
  treatment: Treatment;
  onClose: () => void;
}) {
  const getPatientName = (patientId: string) => {
    const patient = allUsers.find((u: any) => u.id === patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient';
  };

  const getDoctorName = (doctorId: string) => {
    const doctor = allUsers.find((u: any) => u.id === doctorId);
    return doctor ? `${doctor.firstName} ${doctor.lastName}` : 'Unknown Doctor';
  };

  const getServiceName = (serviceId: string) => {
    const service = dentalServices.find((s: any) => s.id === serviceId);
    return service?.name || 'Unknown Service';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Treatment Details
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Patient Information
              </h3>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Patient:</span>
                  <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                    {getPatientName(treatment.patientId)}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Doctor:</span>
                  <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                    Dr. {getDoctorName(treatment.doctorId)}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Service:</span>
                  <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                    {getServiceName(treatment.serviceId)}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Treatment Status
              </h3>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Status:</span>
                  <span className="ml-2 px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {treatment.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Cost:</span>
                  <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                    {formatCurrency(treatment.cost)}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Created:</span>
                  <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                    {formatDateTime(treatment.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Medical Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Diagnosis
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  {treatment.diagnosis}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Treatment Plan
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  {treatment.treatmentPlan}
                </p>
              </div>
            </div>
            
            {treatment.notes && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Notes
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  {treatment.notes}
                </p>
              </div>
            )}
          </div>

          {/* Prescriptions */}
          {treatment.prescriptions.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Prescriptions
              </h3>
              <div className="space-y-4">
                {treatment.prescriptions.map((prescription, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Pill className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {prescription.medication}
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2 text-sm text-gray-600 dark:text-gray-400">
                          <div>
                            <span className="font-medium">Dosage:</span> {prescription.dosage}
                          </div>
                          <div>
                            <span className="font-medium">Frequency:</span> {prescription.frequency}
                          </div>
                          <div>
                            <span className="font-medium">Duration:</span> {prescription.duration}
                          </div>
                        </div>
                        {prescription.instructions && (
                          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-medium">Instructions:</span> {prescription.instructions}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button>
            <FileEdit className="w-4 h-4 mr-2" />
            Edit Treatment
          </Button>
        </div>
      </div>
    </div>
  );
}