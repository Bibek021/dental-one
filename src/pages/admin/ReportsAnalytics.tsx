// Reports & Analytics Dashboard

import { useState, useMemo } from 'react';
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  DollarSign,
  Activity,
  Clock,
  Star,
  Download,
  Eye
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { appointments } from '../../data/appointments';
import { treatments } from '../../data/treatments';
import { patients, allUsers } from '../../data/users';
import { getBillingStats } from '../../data/billing';
import { formatCurrency } from '../../utils';

type ReportPeriod = 'today' | 'week' | 'month' | 'quarter' | 'year';
type ReportCategory = 'overview' | 'patients' | 'appointments' | 'treatments' | 'revenue' | 'staff';

export function ReportsAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState<ReportPeriod>('month');
  const [selectedCategory, setSelectedCategory] = useState<ReportCategory>('overview');

  const analytics = useMemo(() => generateAnalytics(selectedPeriod), [selectedPeriod]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Reports & Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track practice performance and analyze key metrics
          </p>
        </div>
        <div className="flex gap-3">
          <Select
            value={selectedPeriod}
            onChange={(value) => setSelectedPeriod(value as ReportPeriod)}
            options={[
              { value: 'today', label: 'Today' },
              { value: 'week', label: 'This Week' },
              { value: 'month', label: 'This Month' },
              { value: 'quarter', label: 'This Quarter' },
              { value: 'year', label: 'This Year' },
            ]}
          />
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="flex flex-wrap gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'patients', label: 'Patients', icon: Users },
          { id: 'appointments', label: 'Appointments', icon: Calendar },
          { id: 'treatments', label: 'Treatments', icon: Activity },
          { id: 'revenue', label: 'Revenue', icon: DollarSign },
          { id: 'staff', label: 'Staff Performance', icon: Star },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setSelectedCategory(id as ReportCategory)}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedCategory === id
                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Report Content */}
      {selectedCategory === 'overview' && <OverviewReport analytics={analytics} period={selectedPeriod} />}
      {selectedCategory === 'patients' && <PatientReport analytics={analytics} period={selectedPeriod} />}
      {selectedCategory === 'appointments' && <AppointmentReport analytics={analytics} period={selectedPeriod} />}
      {selectedCategory === 'treatments' && <TreatmentReport analytics={analytics} period={selectedPeriod} />}
      {selectedCategory === 'revenue' && <RevenueReport analytics={analytics} period={selectedPeriod} />}
      {selectedCategory === 'staff' && <StaffReport analytics={analytics} period={selectedPeriod} />}
    </div>
  );
}

// Analytics data generator
function generateAnalytics(period: ReportPeriod) {
  const now = new Date();
  const periodStart = getPeriodStart(now, period);
  
  // Filter data by period
  const periodAppointments = appointments.filter(apt => 
    new Date(apt.startTime) >= periodStart && new Date(apt.startTime) <= now
  );
  
  const periodTreatments = treatments.filter(treatment => 
    new Date(treatment.createdAt) >= periodStart && new Date(treatment.createdAt) <= now
  );
  
  const billingStats = getBillingStats();
  
  return {
    appointments: {
      total: periodAppointments.length,
      completed: periodAppointments.filter(apt => apt.status === 'completed').length,
      cancelled: periodAppointments.filter(apt => apt.status === 'cancelled').length,
      noShow: periodAppointments.filter(apt => apt.status === 'no_show').length,
      byDay: generateDayBreakdown(periodAppointments, period),
    },
    patients: {
      total: patients.length,
      new: patients.filter(p => new Date(p.createdAt) >= periodStart).length,
      active: patients.filter(p => p.status === 'active').length,
      ageDistribution: generateAgeDistribution(),
    },
    treatments: {
      total: periodTreatments.length,
      completed: periodTreatments.filter(t => t.status === 'completed').length,
      inProgress: periodTreatments.filter(t => t.status === 'in_progress').length,
      revenue: periodTreatments.reduce((sum, t) => sum + t.cost, 0),
      byCategory: generateTreatmentsByCategory(periodTreatments),
    },
    revenue: {
      total: billingStats.totalRevenue,
      pending: billingStats.pendingRevenue,
      overdue: billingStats.overdueRevenue,
      averageValue: billingStats.averageInvoiceValue,
    },
    staff: {
      doctors: allUsers.filter(u => u.role === 'doctor').length,
      staff: allUsers.filter(u => u.role === 'staff').length,
      receptionists: allUsers.filter(u => u.role === 'receptionist').length,
      performance: generateStaffPerformance(periodAppointments, periodTreatments),
    },
  };
}

function getPeriodStart(now: Date, period: ReportPeriod): Date {
  const date = new Date(now);
  
  switch (period) {
    case 'today':
      date.setHours(0, 0, 0, 0);
      break;
    case 'week':
      date.setDate(date.getDate() - date.getDay());
      date.setHours(0, 0, 0, 0);
      break;
    case 'month':
      date.setDate(1);
      date.setHours(0, 0, 0, 0);
      break;
    case 'quarter':
      const quarter = Math.floor(date.getMonth() / 3);
      date.setMonth(quarter * 3, 1);
      date.setHours(0, 0, 0, 0);
      break;
    case 'year':
      date.setMonth(0, 1);
      date.setHours(0, 0, 0, 0);
      break;
  }
  
  return date;
}

function generateDayBreakdown(appointments: any[], period: ReportPeriod) {
  const breakdown: Record<string, number> = {};
  const days = period === 'today' ? 1 : period === 'week' ? 7 : 30;
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    breakdown[dateStr] = appointments.filter(apt => 
      new Date(apt.startTime).toISOString().split('T')[0] === dateStr
    ).length;
  }
  
  return breakdown;
}

function generateAgeDistribution() {
  const ranges = { '0-17': 0, '18-34': 0, '35-54': 0, '55+': 0 };
  
  patients.forEach(patient => {
    const age = new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear();
    if (age <= 17) ranges['0-17']++;
    else if (age <= 34) ranges['18-34']++;
    else if (age <= 54) ranges['35-54']++;
    else ranges['55+']++;
  });
  
  return ranges;
}

function generateTreatmentsByCategory(treatments: any[]) {
  const categories: Record<string, number> = {};
  
  treatments.forEach(() => {
    const category = 'General'; // Simplified for demo
    categories[category] = (categories[category] || 0) + 1;
  });
  
  return categories;
}

function generateStaffPerformance(appointments: any[], treatments: any[]) {
  const performance: Record<string, any> = {};
  
  const doctors = allUsers.filter(u => u.role === 'doctor');
  
  doctors.forEach(doctor => {
    const doctorAppointments = appointments.filter(apt => apt.doctorId === doctor.id);
    const doctorTreatments = treatments.filter(t => t.doctorId === doctor.id);
    
    performance[doctor.id] = {
      name: `${doctor.firstName} ${doctor.lastName}`,
      appointments: doctorAppointments.length,
      treatments: doctorTreatments.length,
      revenue: doctorTreatments.reduce((sum, t) => sum + t.cost, 0),
      rating: 4.5 + Math.random() * 0.5, // Mock rating
    };
  });
  
  return performance;
}

// Report Components
function OverviewReport({ analytics }: { analytics: any; period: string }) {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Appointments"
          value={analytics.appointments.total}
          change="+12.5%"
          trend="up"
          icon={<Calendar className="w-6 h-6" />}
          color="blue"
        />
        <MetricCard
          title="Total Patients"
          value={analytics.patients.total}
          change="+8.2%"
          trend="up"
          icon={<Users className="w-6 h-6" />}
          color="green"
        />
        <MetricCard
          title="Completed Treatments"
          value={analytics.treatments.completed}
          change="+15.3%"
          trend="up"
          icon={<Activity className="w-6 h-6" />}
          color="purple"
        />
        <MetricCard
          title="Total Revenue"
          value={formatCurrency(analytics.revenue.total)}
          change="+22.1%"
          trend="up"
          icon={<DollarSign className="w-6 h-6" />}
          color="emerald"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointment Status Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Appointment Status Distribution
          </h3>
          <div className="space-y-3">
            <StatusBar
              label="Completed"
              value={analytics.appointments.completed}
              total={analytics.appointments.total}
              color="green"
            />
            <StatusBar
              label="Scheduled"
              value={analytics.appointments.total - analytics.appointments.completed - analytics.appointments.cancelled}
              total={analytics.appointments.total}
              color="blue"
            />
            <StatusBar
              label="Cancelled"
              value={analytics.appointments.cancelled}
              total={analytics.appointments.total}
              color="red"
            />
          </div>
        </div>

        {/* Patient Age Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Patient Age Distribution
          </h3>
          <div className="space-y-3">
            {Object.entries(analytics.patients.ageDistribution).map(([range, count]) => (
              <StatusBar
                key={range}
                label={range}
                value={count as number}
                total={analytics.patients.total}
                color="indigo"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PatientReport({ analytics }: { analytics: any; period: string }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Total Patients"
          value={analytics.patients.total}
          subtitle="All registered patients"
          icon={<Users className="w-6 h-6" />}
          color="blue"
        />
        <MetricCard
          title="New Patients"
          value={analytics.patients.new}
          subtitle="This period"
          icon={<TrendingUp className="w-6 h-6" />}
          color="green"
        />
        <MetricCard
          title="Active Patients"
          value={analytics.patients.active}
          subtitle="Currently active"
          icon={<Activity className="w-6 h-6" />}
          color="purple"
        />
      </div>

      {/* Patient Demographics Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Patient Demographics
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Age Group
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Count
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {Object.entries(analytics.patients.ageDistribution).map(([range, count]) => (
                <tr key={range}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {range}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {count as number}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {((count as number / analytics.patients.total) * 100).toFixed(1)}%
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

function AppointmentReport({ analytics }: { analytics: any; period: string }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          title="Total Appointments"
          value={analytics.appointments.total}
          icon={<Calendar className="w-6 h-6" />}
          color="blue"
        />
        <MetricCard
          title="Completed"
          value={analytics.appointments.completed}
          icon={<TrendingUp className="w-6 h-6" />}
          color="green"
        />
        <MetricCard
          title="Cancelled"
          value={analytics.appointments.cancelled}
          icon={<Clock className="w-6 h-6" />}
          color="red"
        />
        <MetricCard
          title="No Show"
          value={analytics.appointments.noShow}
          icon={<Eye className="w-6 h-6" />}
          color="orange"
        />
      </div>
    </div>
  );
}

function TreatmentReport({ analytics }: { analytics: any; period: string }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Total Treatments"
          value={analytics.treatments.total}
          icon={<Activity className="w-6 h-6" />}
          color="blue"
        />
        <MetricCard
          title="Completed"
          value={analytics.treatments.completed}
          icon={<TrendingUp className="w-6 h-6" />}
          color="green"
        />
        <MetricCard
          title="In Progress"
          value={analytics.treatments.inProgress}
          icon={<Clock className="w-6 h-6" />}
          color="yellow"
        />
      </div>
    </div>
  );
}

function RevenueReport({ analytics }: { analytics: any; period: string }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value={formatCurrency(analytics.revenue.total)}
          icon={<DollarSign className="w-6 h-6" />}
          color="green"
        />
        <MetricCard
          title="Pending"
          value={formatCurrency(analytics.revenue.pending)}
          icon={<Clock className="w-6 h-6" />}
          color="yellow"
        />
        <MetricCard
          title="Overdue"
          value={formatCurrency(analytics.revenue.overdue)}
          icon={<TrendingDown className="w-6 h-6" />}
          color="red"
        />
        <MetricCard
          title="Average Invoice"
          value={formatCurrency(analytics.revenue.averageValue)}
          icon={<BarChart3 className="w-6 h-6" />}
          color="blue"
        />
      </div>
    </div>
  );
}

function StaffReport({ analytics }: { analytics: any; period: string }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Doctors"
          value={analytics.staff.doctors}
          icon={<Users className="w-6 h-6" />}
          color="blue"
        />
        <MetricCard
          title="Staff Members"
          value={analytics.staff.staff}
          icon={<Users className="w-6 h-6" />}
          color="green"
        />
        <MetricCard
          title="Receptionists"
          value={analytics.staff.receptionists}
          icon={<Users className="w-6 h-6" />}
          color="purple"
        />
      </div>

      {/* Staff Performance Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Doctor Performance
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Appointments
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Treatments
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {Object.values(analytics.staff.performance).map((doctor: any) => (
                <tr key={doctor.name}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {doctor.name}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {doctor.appointments}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {doctor.treatments}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {formatCurrency(doctor.revenue)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      {doctor.rating.toFixed(1)}
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

// Utility Components
interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: string;
  trend?: 'up' | 'down';
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'emerald' | 'indigo' | 'red' | 'yellow' | 'orange';
}

function MetricCard({ title, value, subtitle, change, trend, icon, color }: MetricCardProps) {
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
          {change && (
            <div className="flex items-center mt-2">
              {trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm ${
                trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {change}
              </span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

interface StatusBarProps {
  label: string;
  value: number;
  total: number;
  color: 'green' | 'blue' | 'red' | 'indigo';
}

function StatusBar({ label, value, total, color }: StatusBarProps) {
  const percentage = total > 0 ? (value / total) * 100 : 0;
  
  const colorClasses = {
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    red: 'bg-red-500',
    indigo: 'bg-indigo-500',
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {value} ({percentage.toFixed(1)}%)
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${colorClasses[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}