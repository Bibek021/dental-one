// Multi-Clinic Management System for Super Admins

import { useState, useMemo } from 'react';
import { 
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  Plus,
  Settings,
  Eye,
  Edit,
  MapPin,
  CheckCircle
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { clinics, subscriptions, subscriptionPlans } from '../../data/clinics';
import { formatCurrency, formatDate } from '../../utils';
import type { Clinic, ClinicMetrics } from '../../types';

type ClinicView = 'grid' | 'list' | 'analytics';
type ClinicFilter = 'all' | 'active' | 'trial' | 'expired' | 'inactive';

// Mock clinic metrics (in real app, this would come from API)
const clinicMetrics: Record<string, ClinicMetrics> = {
  'clinic-001': {
    totalPatients: 1247,
    activeStaff: 12,
    monthlyRevenue: 45670,
    appointmentsThisMonth: 324,
    completionRate: 92.5,
    growthRate: 15.2,
    subscriptionStatus: 'active',
    lastActivity: new Date('2025-09-19T14:30:00')
  },
  'clinic-002': {
    totalPatients: 892,
    activeStaff: 8,
    monthlyRevenue: 32150,
    appointmentsThisMonth: 256,
    completionRate: 88.7,
    growthRate: -2.1,
    subscriptionStatus: 'active',
    lastActivity: new Date('2025-09-19T09:15:00')
  },
  'clinic-003': {
    totalPatients: 2145,
    activeStaff: 18,
    monthlyRevenue: 78920,
    appointmentsThisMonth: 567,
    completionRate: 95.1,
    growthRate: 28.4,
    subscriptionStatus: 'active',
    lastActivity: new Date('2025-09-19T16:45:00')
  }
};

export function MultiClinicManagement() {
  const [activeView, setActiveView] = useState<ClinicView>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<ClinicFilter>('all');
  const [selectedClinics, setSelectedClinics] = useState<Set<string>>(new Set());

  const filteredClinics = useMemo(() => {
    return clinics.filter(clinic => {
      const matchesSearch = clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           clinic.address.city.toLowerCase().includes(searchQuery.toLowerCase());
      
      const subscription = subscriptions.find(sub => sub.clinicId === clinic.id);
      const matchesFilter = filterStatus === 'all' || 
                           (filterStatus === 'active' && subscription?.status === 'active') ||
                           (filterStatus === 'trial' && subscription?.status === 'trial') ||
                           (filterStatus === 'expired' && subscription?.status === 'expired') ||
                           (filterStatus === 'inactive' && subscription?.status === 'inactive');
      
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, filterStatus]);

  const aggregateMetrics = useMemo(() => {
    const metrics = Object.values(clinicMetrics);
    return {
      totalClinics: clinics.length,
      totalPatients: metrics.reduce((sum, m) => sum + m.totalPatients, 0),
      totalRevenue: metrics.reduce((sum, m) => sum + m.monthlyRevenue, 0),
      avgCompletionRate: metrics.reduce((sum, m) => sum + m.completionRate, 0) / metrics.length,
      activeClinics: metrics.filter(m => m.subscriptionStatus === 'active').length
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Clinic Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage all clinics, subscriptions, and performance metrics
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Bulk Actions
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Clinic
          </Button>
        </div>
      </div>

      {/* Aggregate Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <MetricCard
          title="Total Clinics"
          value={aggregateMetrics.totalClinics}
          icon={<Building2 className="w-6 h-6" />}
          color="blue"
        />
        <MetricCard
          title="Active Clinics"
          value={aggregateMetrics.activeClinics}
          subtitle={`${((aggregateMetrics.activeClinics / aggregateMetrics.totalClinics) * 100).toFixed(1)}% active`}
          icon={<CheckCircle className="w-6 h-6" />}
          color="green"
        />
        <MetricCard
          title="Total Patients"
          value={aggregateMetrics.totalPatients.toLocaleString()}
          icon={<Users className="w-6 h-6" />}
          color="purple"
        />
        <MetricCard
          title="Monthly Revenue"
          value={formatCurrency(aggregateMetrics.totalRevenue)}
          icon={<DollarSign className="w-6 h-6" />}
          color="emerald"
        />
        <MetricCard
          title="Avg Completion Rate"
          value={`${aggregateMetrics.avgCompletionRate.toFixed(1)}%`}
          icon={<TrendingUp className="w-6 h-6" />}
          color="indigo"
        />
      </div>

      {/* Filters and View Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <Input
            placeholder="Search clinics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
            className="max-w-sm"
          />
          <Select
            value={filterStatus}
            onChange={(value) => setFilterStatus(value as ClinicFilter)}
            options={[
              { value: 'all', label: 'All Clinics' },
              { value: 'active', label: 'Active' },
              { value: 'trial', label: 'Trial' },
              { value: 'expired', label: 'Expired' },
              { value: 'inactive', label: 'Inactive' },
            ]}
          />
        </div>
        
        <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          {[
            { id: 'grid', icon: Building2 },
            { id: 'list', icon: Filter },
            { id: 'analytics', icon: TrendingUp },
          ].map(({ id, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveView(id as ClinicView)}
              className={`p-2 rounded-md transition-colors ${
                activeView === id
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      </div>

      {/* Content based on view */}
      {activeView === 'grid' && (
        <ClinicGrid 
          clinics={filteredClinics} 
          metrics={clinicMetrics}
          selectedClinics={selectedClinics}
          onSelectionChange={setSelectedClinics}
        />
      )}
      {activeView === 'list' && (
        <ClinicList 
          clinics={filteredClinics} 
          metrics={clinicMetrics}
        />
      )}
      {activeView === 'analytics' && (
        <ClinicAnalytics clinics={filteredClinics} metrics={clinicMetrics} />
      )}
    </div>
  );
}

// Clinic Grid View
function ClinicGrid({ 
  clinics, 
  metrics,
  selectedClinics,
  onSelectionChange 
}: {
  clinics: Clinic[];
  metrics: Record<string, ClinicMetrics>;
  selectedClinics: Set<string>;
  onSelectionChange: (selected: Set<string>) => void;
}) {
  const toggleSelection = (clinicId: string) => {
    const newSelected = new Set(selectedClinics);
    if (newSelected.has(clinicId)) {
      newSelected.delete(clinicId);
    } else {
      newSelected.add(clinicId);
    }
    onSelectionChange(newSelected);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {clinics.map((clinic) => {
        const clinicMetric = metrics[clinic.id];
        const subscription = subscriptions.find(sub => sub.clinicId === clinic.id);
        const plan = subscriptionPlans.find(p => p.id === subscription?.planId);
        
        return (
          <div
            key={clinic.id}
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border-2 transition-all cursor-pointer ${
              selectedClinics.has(clinic.id)
                ? 'border-blue-500 dark:border-blue-400 ring-2 ring-blue-100 dark:ring-blue-900'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
            onClick={() => toggleSelection(clinic.id)}
          >
            <div className="p-6">
              {/* Clinic Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {clinic.name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {clinic.address.city}, {clinic.address.state}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {subscription && (
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      subscription.status === 'active'
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        : subscription.status === 'trial'
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                        : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                    }`}>
                      {subscription.status}
                    </span>
                  )}
                </div>
              </div>

              {/* Clinic Metrics */}
              {clinicMetric && (
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Patients</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {clinicMetric.totalPatients.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Monthly Revenue</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatCurrency(clinicMetric.monthlyRevenue)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {clinicMetric.completionRate}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Growth Rate</span>
                    <div className="flex items-center">
                      {clinicMetric.growthRate > 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                      )}
                      <span className={`font-medium ${
                        clinicMetric.growthRate > 0 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {clinicMetric.growthRate > 0 ? '+' : ''}{clinicMetric.growthRate}%
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Subscription Info */}
              {plan && (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Plan</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {plan.name} - {formatCurrency(plan.price)}/mo
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                <Button variant="ghost" size="sm" className="flex-1">
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  <Settings className="w-4 h-4 mr-2" />
                  Manage
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Clinic List View
function ClinicList({ clinics, metrics }: { clinics: Clinic[]; metrics: Record<string, ClinicMetrics> }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Clinic
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Patients
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Revenue
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Growth
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Last Activity
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {clinics.map((clinic) => {
              const clinicMetric = metrics[clinic.id];
              const subscription = subscriptions.find(sub => sub.clinicId === clinic.id);
              
              return (
                <tr key={clinic.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {clinic.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {clinic.address.city}, {clinic.address.state}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {subscription && (
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        subscription.status === 'active'
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                          : subscription.status === 'trial'
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                          : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                      }`}>
                        {subscription.status}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {clinicMetric ? clinicMetric.totalPatients.toLocaleString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    {clinicMetric ? formatCurrency(clinicMetric.monthlyRevenue) : 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    {clinicMetric && (
                      <div className="flex items-center">
                        {clinicMetric.growthRate > 0 ? (
                          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                        )}
                        <span className={`text-sm font-medium ${
                          clinicMetric.growthRate > 0 
                            ? 'text-green-600 dark:text-green-400' 
                            : 'text-red-600 dark:text-red-400'
                        }`}>
                          {clinicMetric.growthRate > 0 ? '+' : ''}{clinicMetric.growthRate}%
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {clinicMetric ? formatDate(clinicMetric.lastActivity) : 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Clinic Analytics View
function ClinicAnalytics({ clinics, metrics }: { clinics: Clinic[]; metrics: Record<string, ClinicMetrics> }) {
  const topPerformingClinics = useMemo(() => {
    return clinics
      .map(clinic => ({
        ...clinic,
        metrics: metrics[clinic.id]
      }))
      .filter(clinic => clinic.metrics)
      .sort((a, b) => (b.metrics?.monthlyRevenue || 0) - (a.metrics?.monthlyRevenue || 0))
      .slice(0, 5);
  }, [clinics, metrics]);

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Clinics */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Top Performing Clinics
          </h3>
          <div className="space-y-4">
            {topPerformingClinics.map((clinic, index) => (
              <div key={clinic.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white mr-3 ${
                    index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{clinic.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{clinic.address.city}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(clinic.metrics?.monthlyRevenue || 0)}
                  </p>
                  <div className="flex items-center">
                    {(clinic.metrics?.growthRate || 0) > 0 ? (
                      <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                    )}
                    <span className={`text-xs ${
                      (clinic.metrics?.growthRate || 0) > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {(clinic.metrics?.growthRate || 0) > 0 ? '+' : ''}{clinic.metrics?.growthRate || 0}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Growth Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Growth Analysis
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Growing Clinics</span>
              <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                {Object.values(metrics).filter(m => m.growthRate > 0).length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Declining Clinics</span>
              <span className="text-lg font-semibold text-red-600 dark:text-red-400">
                {Object.values(metrics).filter(m => m.growthRate < 0).length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Avg Growth Rate</span>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {(Object.values(metrics).reduce((sum, m) => sum + m.growthRate, 0) / Object.values(metrics).length).toFixed(1)}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Avg Completion Rate</span>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {(Object.values(metrics).reduce((sum, m) => sum + m.completionRate, 0) / Object.values(metrics).length).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Utility Components
interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'emerald' | 'indigo' | 'red' | 'yellow' | 'orange';
}

function MetricCard({ title, value, subtitle, icon, color }: MetricCardProps) {
  const colorClasses = {
    blue: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400',
    green: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400',
    purple: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400',
    emerald: 'bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400',
    indigo: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400',
    red: 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400',
    yellow: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400',
    orange: 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}